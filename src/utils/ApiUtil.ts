import {Snowflake, TextChannel} from "discord.js";
import {getFormattedDate} from "./DateFormatter";
import {ByteBuddyGuild} from "../value/ByteBuddyGuild";
import {ByteBuddyChannel} from "../value/ByteBuddyChannel";

export default class ApiUtil {
    private static endpoint: string = "http://localhost/api/v1";

    static checkHealth = async (): Promise<boolean> => {
        try {
            const response: Response = await fetch(`${this.endpoint}/health`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            return response.ok;
        } catch (e) {
            return false;
        }
    }


    static registerGuild = async (guild: ByteBuddyGuild): Promise<boolean> => {
        const response: Response = await fetch(`${this.endpoint}/register?guildId=${guild.guildId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                serverName: guild.serverName,
            }),
        });

        if (!response.ok) {
            console.error(`Failed to register guild ${guild.serverName} with id ${guild.guildId}`);
            return false;
        }

        return true;
    }

    static getGuildData = async (guildId: Snowflake): Promise<ByteBuddyGuild> => {
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
        return ByteBuddyGuild.create(data.data);
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

    static getChannelByType = async (guildId: Snowflake, channelType: string): Promise<TextChannel|null> => {
        const response: Response = await fetch(`${this.endpoint}/channels?guildId=${guildId}&channelType=${channelType}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            console.error(`Failed to get channels for guild ${guildId}`);
        }

        if (response.status === 404) {
            return null;
        }

        const data = await response.json();
        const channel: ByteBuddyChannel = ByteBuddyChannel.create(data.data);
        return channel.asTextChannel(guildId);
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

    static fetchDisabledCommands = async (): Promise<Array<string>|null> => {
        const response: Response = await fetch(`${this.endpoint}/commands?status=disabled`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();


        if (data.message === 'No disabled commands found') {
            return null;
        }

        const disabledCommands = [];

        for (let command of data.data) {
            disabledCommands.push(command.commandName);
        }

        return disabledCommands;
    }

    static disableCommand = async (commandName: string): Promise<boolean> => {
        const response: Response = await fetch(`${this.endpoint}/commands/disable?name=${commandName}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.status > 500) {
            throw new Error(`Failed to disable command ${commandName}`);
        }

        const data = await response.json();
        return data.message !== 'Command is already disabled';
    }

    static enableCommand = async (commandName: string): Promise<boolean> => {
        const response: Response = await fetch(`${this.endpoint}/commands/enable?name=${commandName}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.status > 500) {
            throw new Error(`Failed to enable command ${commandName}`);
        }

        const data = await response.json();
        return data.message !== 'Command is not disabled';
    }

    static deployCommandsToDatabase = async (commands: Array<any>): Promise<boolean> => {
        const response: Response = await fetch(`${this.endpoint}/commands/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(commands),
        });

        if (!response.ok) {
            console.error(`Failed to deploy commands to database`);
            return false;
        }

        return true;
    }
}