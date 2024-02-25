import { Event } from "../structures/Event"
import {Guild} from "discord.js";
import ApiUtil from "../utils/ApiUtil";

export default new Event("guildCreate", async (interaction: Guild): Promise<void> => {
    console.log(`Joined a new guild: ${interaction.name} with ${interaction.memberCount} members`);
    ApiUtil.registerGuild(interaction.id, interaction.name).catch(err => console.error(err));
});