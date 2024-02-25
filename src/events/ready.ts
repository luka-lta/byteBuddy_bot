import { Event } from "../structures/Event";
import { client } from "../../main";
import delay from "../utils/delay";
import {ActivityType} from "discord.js";

export default new Event("ready", async (): Promise<void> => {
    console.log(`The client has been successfully logged in as user ${client.user.username}`)

    // Status loop
    const messages = ["/help", "by Luka", "Hello there"]
    while (true) {
        for (const message of messages) {
            client.user.setActivity(message, { type: ActivityType.Playing})
            await delay(15000)
        }
    }
})