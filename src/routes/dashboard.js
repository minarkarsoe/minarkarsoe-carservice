const Router = require('koa-router');
const dashboard = require('../services/dashboard');
const messageConfig = require('../config/msgConfig');
const router = new Router();
const BASE = '/dashboard';

router.get(`${BASE}`, async (ctx) => {
    try {
        const empall = await dashboard.getDashboardEmp();
        const wPosition = await dashboard.getEmpByPosition();
        const compall = await dashboard.getDashboardComplain();
        const compsts = await dashboard.getCompBySts();
        const macall = await dashboard.getDashboardMac();
        const macMod = await dashboard.getMacByMod();

        ctx.body = {
            status: messageConfig.status.success,
            emp: {
                ...empall, wPosition: wPosition
            },
            comp: {
                ...compall, comStatus: compsts
            },
            mac: {
                ...macall, macModel: macMod
            }
        };
    } catch (err) {
        ctx.status = 400;
        ctx.body = {
            status: messageConfig.status.error,
            message: err.message || messageConfig.message.error.internalError
        };
    }
});
module.exports = router;