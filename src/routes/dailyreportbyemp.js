const Router = require('koa-router');
const dailyreportQueries = require('../services/dailyreport');
const messageConfig = require('../config/msgConfig');
const router = new Router();
const BASE = '/empdailyreport';

// router.get(BASE, async(ctx) => {
    // try{
//
        // const dailyreport = await dailyreportQueries.getAlldailyreport();
//
        // ctx.body = {
            // status: messageConfig.status.success,
            // data: dailyreport
        // };
    // } catch(err) {
        // ctx.status = 400;
        // ctx.body = {
            // status: messageConfig.status.error,
            // message: err.message || messageConfig.message.error.internalError
        // };
    // }
// });

router.get(`/dailyreportbyemp/:id`, async (ctx) => {
    try {
        const dailyreport = await dailyreportQueries.dailyreportbyemployee(ctx.params.id);
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

router.get(`${BASE}/:id`, async (ctx) => {
    try {
        const dailyreport = await dailyreportQueries.getdailyreportById(ctx.params.id);
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

// router.get(`/getservicemandailyreport/:id`, async (ctx) => {
//     try {
//         const dailyreport = await dailyreportQueries.getDailyReportByMachineId(ctx.params.id);
//         ctx.body = {
//             status: messageConfig.status.success,
//             data: dailyreport
//         };
//     } catch(err) {
//         ctx.status = 400;
//         ctx.body = {
//             status: messageConfig.status.error,
//             message: err.message || messageConfig.message.error.internalError
//         };
//     }
// });

router.post(`${BASE}`,async (ctx) => {
    try {
        ctx.request.body.created_by = "Admin";
        ctx.request.body.updated_by = "Admin";
        const dailyreport = await dailyreportQueries.adddailyreport(ctx.request.body);
        console.log(ctx.request.body)
        if(dailyreport && dailyreport != 'error') {
            ctx.status = 201;
            ctx.body = {
                status: messageConfig.status.success,
                data: dailyreport
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
        const dailyreport = await dailyreportQueries.updatedailyreport(ctx.params.id, ctx.request.body);
        if(dailyreport && dailyreport != 'error') {
            ctx.status = 200;
            ctx.body = {
                status: 'success',
                data: dailyreport
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
        const dailyreport = await dailyreportQueries.deletedailyreport(ctx.params.id);
        console.log(dailyreport)
        if(dailyreport && dailyreport != 'error') {
            ctx.status = 200;
            ctx.body = {
                status: 'success',
                data: dailyreport
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
