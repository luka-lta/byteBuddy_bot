import {Event} from "../structures/Event";
import {Guild, GuildMember, TextChannel} from "discord.js";
import ApiUtil from "../utils/ApiUtil";
import {defaultEmbed} from "../utils/EmbedUtils";

export default new Event("guildMemberRemove", async (user: GuildMember): Promise<void> => {
    const guild: Guild = user.guild;
    const leaveChannel: TextChannel = await ApiUtil.getChannelByType(guild.id, "leave");

    if (leaveChannel === null || leaveChannel === undefined) return;

    const embed = await defaultEmbed(guild.id);
    embed.setTitle("Member Left");
    embed.setDescription(`Goodbye, ${user.user.username}!`);
    embed.setThumbnail(user.user.displayAvatarURL());
    embed.setTimestamp();

    await leaveChannel.send({embeds: [embed]});
});
