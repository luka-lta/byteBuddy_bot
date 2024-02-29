import {ColorResolvable, EmbedBuilder, Snowflake} from "discord.js";
import ApiUtil from "./ApiUtil";

export const defaultEmbed = async (guildId: Snowflake): Promise<EmbedBuilder> => {
    const color: ColorResolvable = await ApiUtil.getConfigKeys(guildId).then(config => config.themeColor) as ColorResolvable;
    const date = new Date();
    return new EmbedBuilder()
        .setColor(color)
        .setTimestamp(date);
}

