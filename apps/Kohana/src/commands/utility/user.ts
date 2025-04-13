import { SlashCommandBuilder } from 'discord.js';
import { type Command } from '../index.js';

export default {
	data: new SlashCommandBuilder().setName('user').setDescription('Get information about the user.'),
	async execute(interaction) {
		await interaction.reply(`This command was run by ${interaction.user.username}.`);
	},
} satisfies Command;
