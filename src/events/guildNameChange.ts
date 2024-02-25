import {Event} from "../structures/Event";
import {updateConfig} from "../utils/ApiUtil";
import {Guild} from "discord.js";

export default new Event("guildUpdate", async (oldGuild: Guild, newGuild: Guild): Promise<void> => {
    if (oldGuild.name !== newGuild.name) updateConfig(newGuild.id, newGuild.name, null).catch(err => console.error(err));
});
