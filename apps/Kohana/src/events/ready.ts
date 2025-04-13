import { Events } from 'discord.js';
import deploy from '../util/deploy.js';
import type { Event } from './index.js';

export default {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		await deploy(client.user.id);
		client.user.setPresence({ status: 'idle' });
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
} satisfies Event<Events.ClientReady>;
