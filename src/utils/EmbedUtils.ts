import {ColorResolvable, EmbedBuilder, Snowflake} from "discord.js";
import ApiUtil from "./ApiUtil";

export const defaultEmbed = async (guildId: Snowflake): Promise<EmbedBuilder> => {
    const color: ColorResolvable = await ApiUtil.getGuildData(guildId).then(config => config.themeColor) as ColorResolvable;
    const date = new Date();
    console.log(color)
    return new EmbedBuilder()
        .setColor(color)
        .setTimestamp(date);
}

export const errorEmbed = (message: string): EmbedBuilder => {
    return new EmbedBuilder()
        .setColor('#a80f21')
        .setDescription(message);
}

