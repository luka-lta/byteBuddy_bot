import {EmbedBuilder, Snowflake} from "discord.js";
import {getConfigKeys} from "./ApiUtil";

export const defaultEmbed = async (guildId: Snowflake): Promise<EmbedBuilder> => {
    const color = await getConfigKeys(guildId).then(config => config.themeColor);
    const date = new Date();
    return new EmbedBuilder()
        .setColor(`#${color}`)
        .setTimestamp(date);
}

