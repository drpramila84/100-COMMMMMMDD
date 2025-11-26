/**
 * @namespace: addons/giveaway/tasks/giveawayScheduler.js
 * @type: Scheduled Task
 * @copyright © 2025 LORD_RAJBHAI
 * @assistant chaa & graa
 * @version 0.9.11-beta
 */

// addons/giveaway/helpers/giveawayScheduler.js
const { Op } = require('sequelize');
const Giveaway = require('../database/models/Giveaway');
const { announceWinners } = require('../helpers/giveawayManager');
const logger = require('@coreHelpers/logger');

const CHECK_INTERVAL = kythia.addons.giveaway.checkInterval * 1000;

async function checkExpiredGiveaways(client) {
    try {
        if (!Giveaway || typeof Giveaway.getAllCache !== 'function') {
            return;
        }
        
        const expiredGiveaways = await Giveaway.getAllCache({
            where: {
                ended: false,
                endTime: {
                    [Op.lte]: new Date(),
                },
            },
        }).catch((err) => {
            logger.warn('🎁 Could not fetch giveaways from database:', err.message);
            return [];
        });

        if (expiredGiveaways && Array.isArray(expiredGiveaways) && expiredGiveaways.length > 0) {
            logger.info(`🎁 Found ${expiredGiveaways.length} expired giveaways.`);
            for (const giveaway of expiredGiveaways) {
                try {
                    await announceWinners(client, giveaway);
                } catch (announceError) {
                    logger.error('🎁 Error announcing winners:', announceError);
                }
            }
        }
    } catch (error) {
        if (error && error.message !== 'Cannot convert undefined or null to object') {
            logger.error('🎁 Failed to check giveaways:', error);
        }
    }
}

function initializeGiveawayScheduler(client) {
    logger.info(`🎁 Giveaway Scheduler activated! Checking every ${kythia.addons.giveaway.checkInterval} seconds.`);
    checkExpiredGiveaways(client);
    setInterval(() => checkExpiredGiveaways(client), CHECK_INTERVAL);
}

module.exports = { initializeGiveawayScheduler };
