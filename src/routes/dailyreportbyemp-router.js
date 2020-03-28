const Router = require('koa-router');
const dailyreportQueries = require('../services/dailyreport');
const messageConfig = require('../config/msgConfig');
const router = new Router();
const BASE = '/dailyreportbyemployee';

router.get(`${BASE}/:id`, async (ctx) => {
    try {
        const dailyreport = await dailyreportQueries.getAlldailyreportbyemp(ctx.params.id);
        ctx.body = {
            status: messageConfig.status.success,
            data: dailyreport
        };
    } catch(err) {
        ctx.status = 400;
        ctx.body = {
            status: messageConfig.status.error,
            message: err.message || messageConfig.message.error.internalError
        };
    }
});
module.exports = router;