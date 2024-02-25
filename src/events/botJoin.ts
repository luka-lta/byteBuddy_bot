import { Event } from "../structures/Event"
import {Guild} from "discord.js";

export default new Event("guildCreate", async (interaction: Guild): Promise<void> => {
    console.log(`Joined a new guild: ${interaction.name} with ${interaction.memberCount} members`);
    const response: Response = await fetch(`http://localhost/api/v1/register?guildId=${interaction.id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            serverName: interaction.name,
        }),
    });

    if (!response.ok) {
        console.error(`Failed to register guild ${interaction.name} with id ${interaction.id}`);
    }

    console.log(await response.json());
});