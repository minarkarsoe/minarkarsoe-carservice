const Router = require('koa-router');
const roleQueries = require('../services/role');
const messageConfig = require('../config/msgConfig');

const router = new Router();
const BASE = '/roles';

router.get(BASE, async(ctx) => {
    try{

        const role = await roleQueries.getAllrole();

        ctx.body = {
            status: messageConfig.status.success,
            data: role
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
        const role = await roleQueries.getroleById(ctx.params.id);
        ctx.body = {
            status: messageConfig.status.success,
            data: role
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
        const role = await roleQueries.addrole(ctx.request.body);
        console.log(ctx.request.body)
        if(role && role != 'error') {
            ctx.status = 201;
            ctx.body = {
                status: messageConfig.status.success,
                data: role
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
        const role = await roleQueries.updaterole(ctx.params.id, ctx.request.body);
        if(role && role != 'error') {
            ctx.status = 200;
            ctx.body = {
                status: 'success',
                data: role
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
        const role = await roleQueries.deleterole(ctx.params.id);
        console.log(role)
        if(role && role != 'error') {
            ctx.status = 200;
            ctx.body = {
                status: 'success',
                data: role
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
