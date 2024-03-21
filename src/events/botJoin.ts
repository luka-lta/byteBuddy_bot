import { Event } from "../structures/Event"
import ApiUtil from "../utils/ApiUtil";
import {ByteBuddyGuild} from "../value/ByteBuddyGuild";
import {Guild} from "discord.js";

export default new Event("guildCreate", async (interaction: Guild): Promise<void> => {
    console.log(`Joined a new guild: ${interaction.name} with ${interaction.memberCount} members`);
    const guild: ByteBuddyGuild = ByteBuddyGuild.create({
        guildId: interaction.id,
        serverName: interaction.name,
        themeColor: null
    });

    ApiUtil.registerGuild(guild).catch(err => console.error(err));
});