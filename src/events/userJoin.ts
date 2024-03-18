import {Event} from "../structures/Event";
import {Guild, GuildMember, TextChannel} from "discord.js";
import ApiUtil from "../utils/ApiUtil";
import {defaultEmbed} from "../utils/EmbedUtils";

export default new Event("guildMemberAdd", async (user: GuildMember): Promise<void> => {
    const guild: Guild = user.guild;
    const welcomeChannelId = await ApiUtil.getChannelId(guild.id, "welcome");
    if (welcomeChannelId === null) return;

    const channel: TextChannel = guild.channels.cache.get(welcomeChannelId) as TextChannel;
    if (channel === undefined) return;

    const embed = await defaultEmbed(guild.id);
    embed.setDescription(`Welcome to the server, ${user.user.username}!`);

    await channel.send({embeds: [embed]});
});
