import { Event } from "../structures/Event";
import { client } from "../../main";
import delay from "../utils/delay";
import {ActivityType} from "discord.js";
import BirthdayHandler from "../handler/BirthdayHandler";

export default new Event("ready", async (): Promise<void> => {
    console.log(`The client has been successfully logged in as user ${client.user.username}`)

    // CHECK IF BIRTHDAY MESSAGE ALREADY SENT
    setInterval(BirthdayHandler.checkBirthdays, 24 * 60 * 60 * 1000); // Überprüfe täglich um Mitternacht
    // Status loop
    const messages: string[] = ["/help", "by Luka", "Hello there"]
    while (true) {
        for (const message of messages) {
            client.user.setActivity(message, { type: ActivityType.Playing})
            await delay(15000)
        }
    }
})