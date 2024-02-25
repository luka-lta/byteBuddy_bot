import {Client, Routes, Collection, GatewayIntentBits, REST} from "discord.js";
import fs from "fs"
import {CommandType} from "../types/commandType";

const intents: GatewayIntentBits[] = [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions
]

export class ExtendedClient extends Client {
    commands: Collection<string, CommandType> = new Collection()

    constructor() {
        super({ intents: intents })
    }

    start(): void {
        this.registerModules()
        this.deployCommands()
        this.login(process.env.BOT_TOKEN)
    }

    async registerModules(): Promise<void> {
        //Commands
        const commandFiles = []
        commandFiles.push.apply(commandFiles, fs.readdirSync(`${__dirname}/../commands`).filter(file => file.endsWith('.ts')))

        for (const file of commandFiles) {
            const command: CommandType = (await import(`${__dirname}/../commands/${file}`)).default
            this.commands.set(command.data.name, command)
        }

        //Events
        const eventFiles = []
        eventFiles.push.apply(eventFiles, fs.readdirSync(`${__dirname}/../events`).filter(file => file.endsWith('.ts')))

        for (const file of eventFiles) {
            // @ts-ignore
            const event: Event<keyof ClientEvents> = (await import(`${__dirname}/../events/${file}`)).default
            this.on(event.event, event.execute)
        }
    }

    async deployCommands(): Promise<void> {
        const guildCommands = []
        const dmCommands = []

        const commandFiles = []
        commandFiles.push.apply(commandFiles, fs.readdirSync(`${__dirname}/../commands`).filter(file => file.endsWith('.ts')))
        commandFiles.push.apply(commandFiles, fs.readdirSync(`${__dirname}/../commands`).filter(file => file.endsWith('.js')))

        console.log(commandFiles)

        for (const file of commandFiles) {
            const command = await import(`${__dirname}/../commands/${file}`)

            if (command.default.allowDm === true || command.default.allowDm === undefined) {
                dmCommands.push(command.default.data)
            }
        }

        for (const file of commandFiles) {
            const command = await import(`${__dirname}/../commands/${file}`)

            if (!dmCommands.includes(command.default.data)) {
                guildCommands.push(command.default.data)
            }
        }

        const rest: REST = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

        await (async (): Promise<void> => {
            try {
                console.log('Started refreshing application (/) commands.')

                await rest.put(
                    Routes.applicationCommands(process.env.BOT_ID),
                    {body: dmCommands},
                )

                await rest.put(
                    Routes.applicationGuildCommands(process.env.BOT_ID, process.env.GUILD_ID),
                    {body: guildCommands},
                )

                console.log('Successfully reloaded application (/) commands.')
            } catch (error) {
                console.error(error)
            }
        })()
    }
}