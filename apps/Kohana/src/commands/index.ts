import type { Client, CommandInteraction } from 'discord.js';
import { ContextMenuCommandBuilder, SlashCommandBuilder } from 'discord.js';
import { z } from 'zod';
import type { StructurePredicate } from '../util/loaders.js';

/**
 * Defines the structure of a command
 */
export interface Command {
	/**
	 * The category of the command
	 */
	category?: string;

	/**
	 * The data for the command
	 */
	data: ContextMenuCommandBuilder | SlashCommandBuilder;

	/**
	 * The function to execute when the command is called
	 *
	 * @param interaction - The interaction of the command
	 */
	execute(interaction: CommandInteraction, opts: { client: Client<true> }): Promise<void> | void;
}

/**
 * Defines the schema for a command
 */
export const schema = z.object({
	category: z.string().optional().default('Miscellaneous'),
	data: z.union([z.instanceof(SlashCommandBuilder), z.instanceof(ContextMenuCommandBuilder)]),
	execute: z.function(),
});

/**
 * Defines the predicate to check if an object is a valid Command type.
 */
export const predicate: StructurePredicate<Command> = (structure: unknown): structure is Command =>
	schema.safeParse(structure).success;
