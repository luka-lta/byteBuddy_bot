import {Command} from "../structures/Command";
import ApiUtil from "../utils/ApiUtil";
import CommandStatus from "../utils/CommandStatus";
import {EmbedBuilder} from "discord.js";

export default new Command({
    data: {
        name: "disable",
        description: "Disable a command",
        options: [
            {
                type: 3,
                name: "command",
                description: "The command to disable",
                required: true
            }
        ]
    },
    userPermissions: ["Administrator"],
    allowDm: false,
    execute: async ({interaction}) => {
        const command = interaction.options.get("command").value as string

        try {
            if (await ApiUtil.disableCommand(command)) {
                CommandStatus.addToCache(command)

                const embed = new EmbedBuilder()
                    .setColor("#03ff46")
                    .setTitle("`" + command + "` wurde deaktiviert")
                interaction.reply({embeds: [embed]})
                return;
            }

            const embed = new EmbedBuilder()
                .setColor("#03ff46")
                .setTitle("`" + command + "` ist bereits deaktiviert")
            interaction.reply({embeds: [embed]})
            return;
        } catch (e) {
            const embed = new EmbedBuilder()
                .setColor("#fc030b")
                .setTitle("An error occurred while disabling `" + command + "`")
            interaction.reply({embeds: [embed]})
        }
    }
})