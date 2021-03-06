const Router = require('koa-router');
const scheduleQueries = require('../services/schedule');
const messageConfig = require('../config/msgConfig');

const router = new Router();
const BASE = '/schedule';

router.get(BASE, async(ctx) => {
    try{

        const schedule = await scheduleQueries.getAllSchedule();

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
        const schedule = await scheduleQueries.getscheduleById(ctx.params.id);
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

router.post(`${BASE}`,async (ctx) => {
    try {
        const schedule = await scheduleQueries.addschedule(ctx.request.body);
        console.log(ctx.request.body)
        if(schedule && schedule != 'error') {
            ctx.status = 201;
            ctx.body = {
                status: messageConfig.status.success,
                data: schedule
            };
        } else {
            ctx.status = 404;
            ctx.body = {
                status: messageConfig.status.error,
                message: messageConfig.message.error.internalError
            };
        }
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
        ctx.request.body.created_by = "Admin";
        ctx.request.body.updated_by = "Admin";
        const schedule = await scheduleQueries.updateSchedule(ctx.params.id, ctx.request.body);
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
        console.log('Router Exception Error .... : ' + err);
        ctx.status = 400;
        ctx.body = {
            status: messageConfig.status.error,
            message: err.message || messageConfig.message.error.internalError
        };
    }
});

router.delete(`${BASE}/:id`, async (ctx) => {

    try {
        const schedule = await scheduleQueries.deleteSchedule(ctx.params.id);
        console.log(schedule)
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
                message: messageConfig.message.error.fileNotFound
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
