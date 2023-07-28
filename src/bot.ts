import dotenv from "dotenv";
import { ClientHandler } from "./clientHandler";

dotenv.config();

const token = process.env.TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;

if (token == null || clientId == null || guildId == null) {
    console.error("Token, Client ID or Guild ID is null");
    process.exit(1);
}

console.log("Bot is starting...");

const clientHandler = new ClientHandler(token, clientId, guildId);

console.log("Bot started");

console.log("Registering commands...");

clientHandler.registerCommands();

console.log("Commands registered");
