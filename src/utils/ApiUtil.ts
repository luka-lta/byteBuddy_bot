import {Snowflake} from "discord.js";
import {ChannelResponse} from "../structures/channelResponse";
import {getFormattedDate} from "./DateFormatter";

export interface Config {
    guildId: number;
    serverName: string;
    themeColor: string;
}

export default class ApiUtil {
    private static endpoint: string = "http://localhost/api/v1";

    static registerGuild = async (guildId: Snowflake, serverName: string): Promise<boolean> => {
        const response: Response = await fetch(`${this.endpoint}/register?guildId=${guildId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                serverName: serverName,
            }),
        });

        if (!response.ok) {
            console.error(`Failed to register guild ${serverName} with id ${guildId}`);
            return false;
        }

        return true;
    }

    static getConfigKeys = async (guildId: Snowflake): Promise<Config> => {
        const response: Response = await fetch(`${this.endpoint}/guild?guildId=${guildId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            console.error(`Failed to get config for guild ${guildId}`);
        }

        const data = await response.json();
        return data.data;
    }

    static updateConfig = async (guildId: Snowflake, serverName: string | null, themeColor: string | null): Promise<boolean> => {
        const dataToSend = {};
        if (serverName !== null) {
            dataToSend["server_name"] = serverName;
        }
        if (themeColor !== null) {
            dataToSend["theme_color"] = themeColor;
        }

        const response: Response = await fetch(`${this.endpoint}/guild?guildId=${guildId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: Object.keys(dataToSend).length > 0 ? JSON.stringify(dataToSend) : undefined,
        });

        if (!response.ok) {
            console.error(`Failed to update config for guild ${guildId}`);
            return false;
        }

        return true;
    }

    static updateChannel = async (guildId: Snowflake, channelType: string, channelId: string): Promise<boolean> => {
        const response: Response = await fetch(`${this.endpoint}/channels?guildId=${guildId}&channelType=${channelType}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({channelId: channelId}),
        });

        if (!response.ok) {
            console.error(`Failed to update config for guild ${guildId}`);
            return false;
        }

        return true;
    }

    static getChannelId = async (guildId: Snowflake, channelType: string): Promise<any> => {
        const response: Response = await fetch(`${this.endpoint}/channels?guildId=${guildId}&channelType=${channelType}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            console.error(`Failed to get channels for guild ${guildId}`);
        }

        const data = await response.json();
        return data.data['channelId'];
    }

    static fetchBirthdays = async (guildId: Snowflake): Promise<any> => {
        const response: Response = await fetch(`${this.endpoint}/birthdays?guildId=${guildId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            console.error(`Failed to fetch birthdays for guild ${guildId}`);
        }

        return await response.json();
    }

    static setBirthday = async (guildId: Snowflake, userId: Snowflake, date: Date): Promise<boolean> => {
        const response: Response = await fetch(`${this.endpoint}/birthdays?guildId=${guildId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userId.toString(),
                birthdayDate: getFormattedDate(date),
            }),
        });

        if (!response.ok) {
            console.error(`Failed to set birthday for user ${userId}`);
            return false;
        }

        return true;
    }
}