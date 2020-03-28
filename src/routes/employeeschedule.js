const Router = require('koa-router');
const employeeQueries = require('../services/employee');
const messageConfig = require('../config/msgConfig');
const router = new Router();
const BASE = '/employeeschedule';

router.get(`${BASE}/:id`, async (ctx) => {
    try {
        const employee = await employeeQueries.getEmployeebySchedule(ctx.params.id);
        ctx.body = {
            status: messageConfig.status.success,
            data: employee
        };
    } catch (err) {
        ctx.status = 400;
        ctx.body = {
            status: messageConfig.status.error,
            message: err.message || messageConfig.message.error.internalError
        };
    }
});
router.put(`${BASE}/:id`, async (ctx) => {
    if (ctx.request.body.image != null && typeof(ctx.request.body.image)!== 'string')  {
        ctx.request.body.image = saveImageByBase64(ctx.request.body.image);
    }
    try {
        ctx.request.body.created_by = "Admin";
        ctx.request.body.updated_by = "Admin";
        console.log(ctx.request.body);
        
        const model = await employeeQueries.updateEmployee(ctx.params.id, ctx.request.body);
        if (model && model != 'error') {
            ctx.status = 200;
            ctx.body = {
                status: 'success',
                data: model
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