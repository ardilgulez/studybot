import { REST, Routes } from "discord.js";
import { commands } from "./commands/command-list";

export const registerCommands = async (
    token: string,
    clientId: string,
    guildId: string
) => {
    const rest = new REST({ version: "10" }).setToken(token);
    try {
        await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
            body: commands,
        });
    } catch (error) {
        console.error("There was an error");
        console.error(error);
    }
};
