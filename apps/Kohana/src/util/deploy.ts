import process from 'node:process';
import { URL } from 'node:url';
import { API } from '@discordjs/core/http-only';
import { REST } from 'discord.js';
import { loadCommands } from './loaders.js';

export default async function deploy(applicationId: string) {
	const commands = await loadCommands(new URL('../commands/', import.meta.url));
	const commandData = [...commands.values()].map((command) => command.data.toJSON());

	const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN!);
	const api = new API(rest);

	const result = await api.applicationCommands.bulkOverwriteGlobalCommands(applicationId, commandData);

	console.log(`Successfully registered ${result.length} commands.`);
}
