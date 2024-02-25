import fs from "fs";
import {REST, Routes} from "discord.js";
require('dotenv').config()

async function deployCommands() {
    const guildCommands = []
    const dmCommands = []

    const commandFiles = []
    commandFiles.push.apply(commandFiles, fs.readdirSync(`${__dirname}/src/commands`).filter(file => file.endsWith('.ts')))

    console.log(commandFiles)

    for (const file of commandFiles) {
        const command = await import(`${__dirname}/src/commands/${file}`)

        if (command.default.allowDm === true || command.default.allowDm === undefined) {
            dmCommands.push(command.default.data)
        }
    }

    for (const file of commandFiles) {
        const command = await import(`${__dirname}/src/commands/${file}`)

        if (!dmCommands.includes(command.default.data)) {
            guildCommands.push(command.default.data)
        }
    }

    const rest: REST = new REST({version: '10'}).setToken(process.env.BOT_TOKEN);

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

deployCommands();