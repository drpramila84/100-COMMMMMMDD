/**
 * @namespace: addons/pet/commands/admin/_group.js
 * @type: Subcommand Group Definition
 * @copyright © 2025 LORD_RAJBHAI
 * @assistant chaa & graa
 * @version 0.9.11-beta
 */

module.exports = {
    subcommand: true,
    data: (group) => group.setName('admin').setDescription('Administrative pet management commands.'),
};
