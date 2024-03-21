import {Event} from "../structures/Event";
import {EmbedBuilder, Guild, GuildMember} from "discord.js";
import ApiUtil from "../utils/ApiUtil";
import {defaultEmbed} from "../utils/EmbedUtils";

export default new Event("guildMemberAdd", async (user: GuildMember): Promise<void> => {
    const guild: Guild = user.guild;
    const welcomeChannel = await ApiUtil.getChannelByType(guild.id, "welcome");

    if (welcomeChannel === null || welcomeChannel === undefined) return;

    const embed: EmbedBuilder = await defaultEmbed(guild.id)
    embed.setTitle("Member Joined")
    embed.setDescription(`Welcome to the server, ${user.user.username}!`)
    embed.setThumbnail(user.user.displayAvatarURL())
    embed.setTimestamp();

    await welcomeChannel.send({embeds: [embed]});
});
