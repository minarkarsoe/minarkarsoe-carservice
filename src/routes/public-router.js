const Router = require('koa-router');
const publicQueries = require('../services/public');
const messageConfig = require('../config/msgConfig');

const router = new Router();
const BASE = '/publics';

router.get(BASE, async(ctx) => {
    try{

        const publics = await publicQueries.getAllpublic();

        ctx.body = {
            status: messageConfig.status.success,
            data: publics
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
        const public = await publicQueries.getpublicById(ctx.params.id);
        ctx.body = {
            status: messageConfig.status.success,
            data: public
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
         ctx.request.body.created_by = "Admin";
         ctx.request.body.updated_by = "Admin";
        const public = await publicQueries.addpublic(ctx.request.body);
        console.log(ctx.request.body)
        if(public && public != 'error') {
            ctx.status = 201;
            ctx.body = {
                status: messageConfig.status.success,
                data: public
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
        const public = await publicQueries.updatepublic(ctx.params.id, ctx.request.body);
        if(public && public != 'error') {
            ctx.status = 200;
            ctx.body = {
                status: 'success',
                data: public
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
        const public = await publicQueries.deletepublic(ctx.params.id);
        console.log(public)
        if(public && public != 'error') {
            ctx.status = 200;
            ctx.body = {
                status: 'success',
                data: public
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
