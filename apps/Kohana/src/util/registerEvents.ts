import { Events, type Client } from 'discord.js';
import type { Command } from '../commands/index.js';
import type { Event } from '../events/index.js';

export function registerEvents(commands: Map<string, Command>, events: Event[], client: Client): void {
	// Create an event to handle command commands
	const interactionCreateEvent: Event<Events.InteractionCreate> = {
		name: Events.InteractionCreate,
		async execute(interaction) {
			if (!interaction.isChatInputCommand()) return;
			if (interaction.isCommand()) {
				const command = commands.get(interaction.commandName);

				if (!command) throw new Error(`Command '${interaction.commandName}' not found.`);

				try {
					await command.execute(interaction, { client: client as Client<true> });
				} catch (error) {
					console.error(error);
					const errMessage = {
						content: 'There was an error while executing this command!',
						ephemeral: true,
					};
					if (interaction.replied || interaction.deferred) await interaction.followUp(errMessage);
					else await interaction.reply(errMessage);
				}
			}
		},
	};

	for (const event of [...events, interactionCreateEvent])
		client[event.once ? 'once' : 'on'](event.name, async (...args) => event.execute(...args));
}
