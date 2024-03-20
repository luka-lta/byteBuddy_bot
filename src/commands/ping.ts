import {Command} from "../structures/Command";
import ApiUtil, {GuildData} from "../utils/ApiUtil";
import {defaultEmbed} from "../utils/EmbedUtils";

export default new Command({
    data: {
        name: "ping",
        description: "Ping",
    },
    userPermissions: ['Administrator'],
    allowDm: true,
    execute: async ({interaction}): Promise<void> => {
        const data: GuildData = await ApiUtil.getGuildData(interaction.guild.id);
        const embed = await defaultEmbed(interaction.guild.id);
        embed.setTitle("Pong!");
        embed.setDescription(`Server: ${interaction.guild.name}`);
        embed.addFields(
            {name: "Server ID", value: interaction.guild.id,},
            {name: "Server name", value: data.serverName},
            {name: "Theme Color", value: data.themeColor}
        );

        await interaction.reply({
            ephemeral: true,
            embeds: [embed]
        });
    }
})