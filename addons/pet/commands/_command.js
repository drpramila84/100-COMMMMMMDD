/**
 * @namespace: addons/pet/commands/_command.js
 * @type: Command Group Definition
 * @copyright © 2025 LORD_RAJBHAI
 * @assistant chaa & graa
 * @version 0.9.11-beta
 */
const { SlashCommandBuilder, InteractionContextType } = require('discord.js');

module.exports = {
    guildOnly: true,
    data: new SlashCommandBuilder()
        .setName('pet')
        .setDescription('🐾 All commands related to the pet system.')
        .setContexts(InteractionContextType.Guild),
};
