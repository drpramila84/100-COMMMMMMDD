/**
 * @namespace: addons/economy/register.js
 * @type: Module
 * @copyright © 2025 LORD_RAJBHAI
 * @assistant chaa & graa
 * @version 0.9.11-beta
 */

const { initializeOrderProcessing } = require('./helpers/orderProcessor');
module.exports = {
    async initialize(bot) {
        const summery = [];
        initializeOrderProcessing(bot);
        summery.push('   └─ Task: Order processing');
        return summery;
    },
};
