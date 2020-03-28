const Router = require('koa-router');
const user_roleQueries = require('../services/user_role');
const messageConfig = require('../config/msgConfig');

const router = new Router();
const BASE = '/user_roles';

router.get(BASE, async(ctx) => {
    try{

        const user_role = await user_roleQueries.getAlluser_role();

        ctx.body = {
            status: messageConfig.status.success,
            data: user_role
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
        const user_role = await user_roleQueries.getuser_roleById(ctx.params.id);
        ctx.body = {
            status: messageConfig.status.success,
            data: user_role
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
        // ctx.request.body.created_by = "Admin";
        // ctx.request.body.updated_by = "Admin";
        const user_role = await user_roleQueries.adduser_role(ctx.request.body);
        console.log(ctx.request.body)
        if(user_role && user_role != 'error') {
            ctx.status = 201;
            ctx.body = {
                status: messageConfig.status.success,
                data: user_role
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
        const user_role = await user_roleQueries.updateuser_role(ctx.params.id, ctx.request.body);
        if(user_role && user_role != 'error') {
            ctx.status = 200;
            ctx.body = {
                status: 'success',
                data: user_role
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
        const user_role = await user_roleQueries.deleteuser_role(ctx.params.id);
        console.log(user_role)
        if(user_role && user_role != 'error') {
            ctx.status = 200;
            ctx.body = {
                status: 'success',
                data: user_role
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
