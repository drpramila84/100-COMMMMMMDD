/**
 * @namespace: addons/dashboard/web/helpers/visitor.js
 * @type: Helper Script
 * @copyright © 2025 LORD_RAJBHAI
 * @assistant chaa & graa
 * @version 0.9.11-beta
 */

const Visitor = require('@addons/dashboard/database/models/Visitor');
const logger = require('@coreHelpers/logger');
const crypto = require('crypto');

/**
 * Middleware to fetch visitor data and provide it to all EJS files via `res.locals`.
 */
const loadVisitorCounts = async (req, res, next) => {
    try {
        if (!Visitor || typeof Visitor.countWithCache !== 'function') {
            res.locals.todayVisitors = 0;
            res.locals.totalVisitors = 0;
            return next();
        }
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const [todayCount, totalCount] = await Promise.all([
            Visitor.countWithCache({ where: { visitDate: today } }).catch(() => 0),
            Visitor.countWithCache({}).catch(() => 0),
        ]);

        res.locals.todayVisitors = todayCount || 0;
        res.locals.totalVisitors = totalCount || 0;
    } catch (error) {
        console.error('Failed to load visitor data:', error);
        res.locals.todayVisitors = 0;
        res.locals.totalVisitors = 0;
    }
    next();
};

/**
 * Middleware to track unique visitors per day.
 */
const trackVisitor = async (req, res, next) => {
    try {
        if (!Visitor || !Visitor.findOrCreateWithCache || typeof Visitor.findOrCreateWithCache !== 'function') {
            return next();
        }
        
        const ip = req.headers['x-forwarded-for']?.split(',').shift() || req.socket.remoteAddress;

        if (!ip) return next();

        const ipHash = crypto.createHash('sha256').update(ip).digest('hex');
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        try {
            const result = await Visitor.findOrCreateWithCache({
                where: {
                    ipHash: ipHash,
                    visitDate: today,
                },
            }).catch(() => [null, false]);
            
            if (!result || !Array.isArray(result)) {
                return next();
            }
            
            const [visitor, created] = result;

            if (created) {
                await Visitor.clearCache({ queryType: 'count', where: { visitDate: today } }).catch(() => {});
                await Visitor.clearCache({ queryType: 'count' }).catch(() => {});
                logger.info(`✅ New unique visitor detected today. Count caches cleared.`);
            }
        } catch (dbError) {
            console.error('Database error tracking visitor:', dbError);
        }
    } catch (error) {
        console.error('Failed to track visitor:', error);
    }

    next();
};

module.exports = { loadVisitorCounts, trackVisitor };
