import { SlashCommandBuilder } from 'discord.js';
import { type Command } from './index.js';

export default {
	category: 'General',
	data: new SlashCommandBuilder().setName('ping').setDescription('Ping!'),
	async execute(interaction, { client }) {
		// Defer the interaction so we can edit it later and calculate the latency
		await interaction.deferReply({
			ephemeral: true,
		});

		// Calculate the latency
		const latency = Date.now() - interaction.createdTimestamp;

		// Edit the interaction with the latency
		await interaction.editReply(`🏓 Latency is ${latency}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
	},
} satisfies Command;
