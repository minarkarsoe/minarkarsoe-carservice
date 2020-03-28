const Router = require('koa-router');
const complainQueries = require('../services/complain');
const messageConfig = require('../config/msgConfig');

const router = new Router();

router.get(`/reject/:id`, async (ctx) => {
    try {
        const complain = await complainQueries.getcomplainById(ctx.params.id);
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

router.put(`/reject/:id`, async(ctx) => {
    const complain = await complainQueries.updateComplain(ctx.params.id, ctx.request.body);
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
})

// router.put(`complain_reject/:id`, async (ctx) => {
//     try {
//         const complain = await complainQueries.updateComplain(ctx.params.id, ctx.request.body);
//         if(complain && complain != 'error') {
//             ctx.status = 200;
//             ctx.body = {
//                 status: 'success',
//                 data: complain
//             };
//         } else {
//             ctx.status = 404;
//             ctx.body = {
//                 status: messageConfig.status.error,
//                 message: messageConfig.message.error.internalError
//             };
//         }
//     } catch (err) {
//         // console.log('Router Exception Error .... : ' + err);
//         ctx.status = 400;
//         ctx.body = {
//             status: messageConfig.status.error,
//             message: err.message || messageConfig.message.error.internalError
//         };
//     }
// });


module.exports = router;
