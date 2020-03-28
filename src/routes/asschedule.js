const Router = require('koa-router');
const complainQueries = require('../services/complain');
const scheduleQueries=require('../services/schedule');
const employeeQueries=require('../services/employee');
const messageConfig = require('../config/msgConfig');

const router = new Router();
const BASE = '/asschedule';

router.get(BASE, async(ctx) => {
    try{

        const complain = await complainQueries.getAllComplain();

        ctx.body = {
            status: messageConfig.status.success,
            data: complain
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
        const complain = await complainQueries.getcomplainById(ctx.params.id);
        ctx.body = {
            status: messageConfig.status.success,
            data: complain
        };
        const getmachinehistory = await scheduleQueries.getmachinehistory();
        ctx.body={
          status:massageConfig.status.success,
          data:getmachinehistory
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
        const complain = await complainQueries.updateComplain(ctx.params.id, ctx.request.body);
        if(complain && complain != 'error') {
            ctx.status = 200;
            ctx.body = {
                status: 'success',
                data: complain
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

router.delete(`${BASE}/:id`, async (ctx) => {

    try {
        const complain = await complainQueries.deleteComplain(ctx.params.id);
        console.log(complain)
        if(complain && complain != 'error') {
            ctx.status = 200;
            ctx.body = {
                status: 'success',
                data: complain
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
