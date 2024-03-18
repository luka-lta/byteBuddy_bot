import {Event} from "../structures/Event";
import {Guild, GuildMember, TextChannel} from "discord.js";
import ApiUtil from "../utils/ApiUtil";
import {defaultEmbed} from "../utils/EmbedUtils";

export default new Event("guildMemberRemove", async (user: GuildMember): Promise<void> => {
    const guild: Guild = user.guild;
    const leaveChannelId: string|null = await ApiUtil.getChannelId(guild.id, "leave");

    if (leaveChannelId === null) return;

    const channel: TextChannel = guild.channels.cache.get(leaveChannelId) as TextChannel;
    if (channel === undefined) return;

    const embed = await defaultEmbed(guild.id);
    embed.setDescription(`Uff the user: ${user.user.username} is going away!`);

    await channel.send({embeds: [embed]});
});
