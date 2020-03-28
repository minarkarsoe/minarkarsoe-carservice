const Router = require('koa-router');
const scheduleQueries = require('../services/schedule');
const messageConfig = require('../config/msgConfig');

const router = new Router();
const BASE = '/schedulejob';
router.get(`/getmachinehistory/:id`, async(ctx) => {
    try{

        const schedule = await scheduleQueries.getmachinehistory(ctx.params.id);

        ctx.body = {
            status: messageConfig.status.success,
            data: schedule
        };
    } catch(err) {
        ctx.status = 400;
        ctx.body = {
            status: messageConfig.status.error,
            message: err.message || messageConfig.message.error.internalError
        };
    }
});
router.get(`/employees_chedule/:id`, async(ctx) => {
    try{

        const schedule = await scheduleQueries.getscheduleforjob(ctx.params.id);

        ctx.body = {
            status: messageConfig.status.success,
            data: schedule
        };
    } catch(err) {
        ctx.status = 400;
        ctx.body = {
            status: messageConfig.status.error,
            message: err.message || messageConfig.message.error.internalError
        };
    }
});

router.get(`${BASE}/:id`, async (ctx) => {
    try {
        const schedule = await scheduleQueries.getscheduleByIdforjob(ctx.params.id);
        ctx.body = {
            status: messageConfig.status.success,
            data: schedule
        };
    } catch(err) {
        ctx.status = 400;
        ctx.body = {
            status: messageConfig.status.error,
            message: err.message || messageConfig.message.error.internalError
        };
    }
});
router.put(`${BASE}/:id`, async (ctx) => {
    try {
        const schedule = await scheduleQueries.updateschedule(ctx.params.id, ctx.request.body);
        if(schedule && schedule != 'error') {
            ctx.status = 200;
            ctx.body = {
                status: 'success',
                data: schedule
            };
        } else {
            ctx.status = 404;
            ctx.body = {
                status: messageConfig.status.error,
                message: messageConfig.message.error.internalError
            };
        }
    } catch (err) {
        // console.log('Router Exception Error .... : ' + err);
        ctx.status = 400;
        ctx.body = {
            status: messageConfig.status.error,
            message: err.message || messageConfig.message.error.internalError
        };
    }
});

module.exports = router;
