import {Client, Collection, GatewayIntentBits} from "discord.js";
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
}