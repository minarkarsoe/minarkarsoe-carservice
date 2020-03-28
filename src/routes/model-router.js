const Router = require('koa-router');
const modelQueries = require('../services/model');
const messageConfig = require('../config/msgConfig');

const router = new Router();
const BASE = '/models';

router.get(BASE, async (ctx) => {
    try {

        const models = await modelQueries.getAllModel();

        ctx.body = {
            status: messageConfig.status.success,
            data: models
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
        const models = await modelQueries.getmodelById(ctx.params.id);
        ctx.body = {
            status: messageConfig.status.success,
            data: models
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
        const models = await modelQueries.addmodel(ctx.request.body);
        console.log(ctx.request.body)
        if(models && models != 'error') {
            ctx.status = 201;
            ctx.body = {
                status: messageConfig.status.success,
                data: models
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
        const models = await modelQueries.updatemodel(ctx.params.id, ctx.request.body);
        if(models && models != 'error') {
            ctx.status = 200;
            ctx.body = {
                status: 'success',
                data: models
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
        const position = await modelQueries.deletemodel(ctx.params.id);
        console.log(position)
        if(position && position != 'error') {
            ctx.status = 200;
            ctx.body = {
                status: 'success',
                data: position
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
