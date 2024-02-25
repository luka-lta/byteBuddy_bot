import {Event} from "../structures/Event";
import {Guild} from "discord.js";
import ApiUtil from "../utils/ApiUtil";

export default new Event("guildUpdate", async (oldGuild: Guild, newGuild: Guild): Promise<void> => {
    if (oldGuild.name !== newGuild.name) ApiUtil.updateConfig(newGuild.id, newGuild.name, null).catch(err => console.error(err));
});
