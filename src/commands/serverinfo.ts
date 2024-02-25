import {Command} from "../structures/Command";
import {defaultEmbed} from "../utils/EmbedUtils";
import {EmbedBuilder} from "discord.js";

export default new Command({
   data: {
         name: "serverinfo",
         description: "Get the server info!",
    },
    allowDm: true,
    execute: async ({interaction}): Promise<void> => {
        const createdAt: string = interaction.guild.createdAt.getDay() + "." + interaction.guild.createdAt.getMonth().toString() + "." + interaction.guild.createdAt.getFullYear().toString();
        const embed: EmbedBuilder = await defaultEmbed(interaction.guild.id);

        embed.setTitle(interaction.guild.name)
        embed.addFields(
            { name: "Member:", value: String(interaction.guild.memberCount) },
            { name: "Channel:", value: String(interaction.guild.channels.channelCountWithoutThreads) },
            { name: "Boosts:", value: String(interaction.guild.premiumSubscriptionCount) },
            { name: "Servererstellung:", value: createdAt, inline: false },
        );
        embed.setThumbnail(interaction.guild.iconURL());

        await interaction.reply({embeds: [embed], ephemeral: true});
    }
});