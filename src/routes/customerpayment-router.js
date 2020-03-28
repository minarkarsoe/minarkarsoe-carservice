const Router = require('koa-router');
const customerpaymentQueries = require('../services/customerpayment');
const messageConfig = require('../config/msgConfig');

const router = new Router();
const BASE = '/customerpayment';

router.get(BASE, async (ctx) => {
    try {

        const customerpayments = await customerpaymentQueries.getAllcustomerpayment();

        ctx.body = {
            status: messageConfig.status.success,
            data: customerpayments
        };
    } catch (err) {
        ctx.status = 400;
        ctx.body = {
            status: messageConfig.status.error,
            message: err.message || messageConfig.message.error.internalError
        };
    }
});

router.get(`${BASE}/:id`, async (ctx) => {
    try {
        const customerpayment = await customerpaymentQueries.getcustomerpaymentById(ctx.params.id);
        ctx.body = {
            status: messageConfig.status.success,
            data: customerpayment
        };
    } catch (err) {
        ctx.status = 400;
        ctx.body = {
            status: messageConfig.status.error,
            message: err.message || messageConfig.message.error.internalError
        };
    }
});
router.post(`${BASE}`,async (ctx) => {
    try {
        ctx.request.body.created_by = "Admin";
        ctx.request.body.updated_by = "Admin";
        const customerpayment = await customerpaymentQueries.addcustomerpayment(ctx.request.body);
        console.log(ctx.request.body)
        if(customerpayment && customerpayment != 'error') {
            ctx.status = 201;
            ctx.body = {
                status: messageConfig.status.success,
                data: customerpayment
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
        const customerpayment = await customerpaymentQueries.updatecustomerpayment(ctx.params.id, ctx.request.body);
        if(customerpayment && customerpayment != 'error') {
            ctx.status = 200;
            ctx.body = {
                status: 'success',
                data: customerpayment
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
router.put(`${BASE}/reject/:id`, async (ctx) => {
    try {
        console.log(ctx.request.body);
        
        const customerpayment = await customerpaymentQueries.rejectcustomerpayment(ctx.params.id, ctx.request.body);
        if (customerpayment && customerpayment != 'error') {
            ctx.status = 200;
            ctx.body = {
                status: 'success',
                data: customerpayment
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
        const customerpayment = await customerpaymentQueries.deletecustomerpayment(ctx.params.id);
        console.log(customerpayment)
        if(customerpayment && customerpayment != 'error') {
            ctx.status = 200;
            ctx.body = {
                status: 'success',
                data: customerpayment
            };
        } else {
            ctx.status = 404;
            ctx.body = {
                status: messageConfig.status.error,
                message: messageConfig.message.error.fileNotFound
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

module.exports = router;
