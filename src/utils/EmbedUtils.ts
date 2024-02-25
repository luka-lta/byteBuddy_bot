import {EmbedBuilder, Snowflake} from "discord.js";
import ApiUtil from "./ApiUtil";

export const defaultEmbed = async (guildId: Snowflake): Promise<EmbedBuilder> => {
    const color: string = await ApiUtil.getConfigKeys(guildId).then(config => config.themeColor);
    const date = new Date();
    return new EmbedBuilder()
        .setColor(`#${color}`)
        .setTimestamp(date);
}

