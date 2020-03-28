const Router = require('koa-router');
const moduleQueries = require('../services/module');
const messageConfig = require('../config/msgConfig');

const router = new Router();
const BASE = '/modules';

router.get(BASE, async(ctx) => {
    try{

        const modules = await moduleQueries.getAllModule();
        console.log(module)
        ctx.body = {
            status: messageConfig.status.success,
            data: modules
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
        const module = await moduleQueries.getmoduleById(ctx.params.id);
        ctx.body = {
            status: messageConfig.status.success,
            data: module
        };
        console.log(data)
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
        const module = await moduleQueries.addmodule(ctx.request.body);
        console.log(ctx.request.body)
        if(module && module != 'error') {
            ctx.status = 201;
            ctx.body = {
                status: messageConfig.status.success,
                data: module
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
        const module = await moduleQueries.updatemodule(ctx.params.id, ctx.request.body);
        if(module && module != 'error') {
            ctx.status = 200;
            ctx.body = {
                status: 'success',
                data: module
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
        const module = await moduleQueries.deletemodule(ctx.params.id);
        console.log(module)
        if(module && module != 'error') {
            ctx.status = 200;
            ctx.body = {
                status: 'success',
                data: module
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
