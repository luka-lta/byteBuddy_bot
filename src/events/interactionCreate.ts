import {CommandInteractionOptionResolver, GuildMember} from "discord.js";
import { client } from "../../main";
import { Event } from "../structures/Event"
import { ExtendedInteraction } from "../types/commandType"
import checkPermissions from "../utils/permissionHandler";
import CommandStatus from "../utils/CommandStatus";
import {CommandType} from "../commandType";

export default new Event("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return

    const command: CommandType = client.commands.get(interaction.commandName)

    if (!command) return

    if (await checkPermissions(command, interaction)) return

    if (CommandStatus.checkStatus(command.data.name, interaction)) return

    try {
        command.execute({
            args: interaction.options as CommandInteractionOptionResolver,
            client,
            interaction: interaction as ExtendedInteraction
        })
    } catch (error) {
        console.error(error)
        await interaction.reply({ content: "There was an error while executing this command!", ephemeral: true})
    }
})