import {CommandInteraction, EmbedBuilder} from "discord.js"
import {CommandType} from "../types/commandType"
import {client} from "../../main";

export default async function checkPermissions(command: CommandType, interaction: CommandInteraction) {
    if (!command.userPermissions && !command.botPermissions) return

    const guildMember = await interaction.guild.members.fetch(interaction.user.id)
    const guildBot = await interaction.guild.members.fetch(client.user.id)

    const requiredUserPermissions = [];
    const requiredBotPermissions = [];

    if (command.userPermissions) {
        for (const permission of command.userPermissions) {
            if (!guildMember.permissions.has(permission)) {
                requiredUserPermissions.push(permission)
            }
        }
    }

    if (command.botPermissions) {
        for (const permission of command.botPermissions) {
            if (!guildBot.permissions.has(permission)) {
                requiredBotPermissions.push(permission)
            }
        }
    }

    if (requiredBotPermissions.length != 0 || requiredUserPermissions.length != 0) {
        const embed = new EmbedBuilder().setColor("#fc030b")

        if (requiredUserPermissions) embed.setTitle("Dazu bist du nicht berechtigt")
        else if (requiredBotPermissions) embed.setTitle("Dafür fehlen mir Berechtigungen")

        embed.setDescription("Folgende Berechtigungen fehlen:")

        if (requiredUserPermissions.length != 0) {
            let userValue = ""
            requiredUserPermissions.forEach(permission => {
                if (userValue === undefined) userValue = permission + "\n"
                else userValue += permission + "\n"
            })
            embed.addFields()

            embed.addFields({name: "user", value: userValue, inline: true})
        }

        if (requiredBotPermissions.length != 0) {
            let botValue = ""
            requiredBotPermissions.forEach(permission => {
                if (botValue === undefined) botValue = permission + "\n"
                else botValue += permission + "\n"
            })

            embed.addFields({name: "Bot", value: botValue, inline: true})
        }

        interaction.reply({embeds: [embed], ephemeral: true})

        return true
    }

    return false
}