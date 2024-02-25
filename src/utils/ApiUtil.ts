import {Snowflake} from "discord.js";

export interface Config {
    guildId: number;
    serverName: string;
    themeColor: string;
}

export const getConfigKeys = async (guildId: Snowflake): Promise<Config> => {
    const response: Response = await fetch(`http://localhost/api/v1/config?guildId=${guildId}`, {
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

export const updateConfig = async (guildId: Snowflake, serverName: string|null, themeColor: string|null): Promise<void> => {
    const dataToSend = {};
    if (serverName !== null) {
        dataToSend["server_name"] = serverName;
    }
    if (themeColor !== null) {
        dataToSend["theme_color"] = themeColor;
    }

    const response: Response = await fetch(`http://localhost/api/v1/config?guildId=${guildId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: Object.keys(dataToSend).length > 0 ? JSON.stringify(dataToSend) : undefined,
    });

    if (!response.ok) {
        console.error(`Failed to update config for guild ${guildId}`);
    }
}

export const updateChannel = async (guildId: Snowflake, channelType: string, channelId: number): Promise<void> => {
    const response: Response = await fetch(`http://localhost/api/v1/channels?guildId=${guildId}&channelType=${channelType}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({channelId: channelId}),
    });

    if (!response.ok) {
        console.error(`Failed to update config for guild ${guildId}`);
    }
}

export const stringToColour = (str: string) => {
    let hash = 0;
    str.split('').forEach(char => {
        hash = char.charCodeAt(0) + ((hash << 5) - hash)
    })
    let colour = '#'
    for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xff
        colour += value.toString(16).padStart(2, '0')
    }
    return colour
}