import {EmbedBuilder, User} from "discord.js";
import {Command} from "../structures/Command";
import {defaultEmbed} from "../utils/EmbedUtils";

export default new Command({
    data: {
        name: "userinfo",
        description: "Shows the info of a member",
        options: [
            {
                type: 6,
                name: "member",
                description: "The member you want to get the info from",
            },
        ],
    },
    allowDm: true,
    execute: async ({interaction}): Promise<void> => {
        let premiumSice: string;
        let member: User;
        const inputMember = interaction.options.get("member")

        if (inputMember === null) {
            member = interaction.user;
        } else {
            member = inputMember.user;
        }

        const guildMember = await interaction.guild.members.fetch(member.id)

        let roles = "";
        guildMember.roles.cache.forEach(role => {
            if (role.name === "@everyone") return

            if (roles === undefined) {
                roles = "<@&" + role.id + "> "
            } else {
                roles += "<@&" + role.id + "> "
            }
        })

        const joinedAt = guildMember.joinedAt.getDay() + "." + guildMember.joinedAt.getMonth().toString() + "." + guildMember.joinedAt.getFullYear().toString()

        if (guildMember.premiumSince === null) {
            premiumSice = "0";
        } else {
            premiumSice = guildMember.premiumSince.toString();
        }

        const embed: EmbedBuilder = await defaultEmbed(interaction.guild.id)
        embed.setColor("#ff9e00")
        embed.setTitle(guildMember.displayName)
        embed.setThumbnail(member.avatarURL())
        embed.addFields(
            {name: "Name", value: member.username, inline: true},
            {name: "ID", value: String(member.id), inline: true},
            {name: "Joined at", value: joinedAt, inline: true},
            {name: "Boost since", value: premiumSice, inline: true}
        )

        if (roles != "") {
            embed.addFields({name: "Roles", value: roles, inline: true})
        }

        await interaction.reply({embeds: [embed], ephemeral: true})
    }
});