const Router = require('koa-router');

// import router files
const indexRoutes = require('./index');
const userRoutes = require('./user-router');
const authRoutes = require('./auth-router');
const positionRoutes = require('./position-router');
const machineRoutes = require('./machine-router');
const modelRoutes = require('./model-router');
const employeeRoutes = require('./employee-router');
const depRoutes = require('./dep-router');
const complainRoutes = require('./complain_router');
const scheduleRoutes = require('./schedule_router');
const assignRoutes = require('./assign-router');
const employeescheduleRoutes = require('./employeeschedule');
const jobRoutes = require('./scheduleforjb-router')
const dailyRoutes = require('./dailyreport_router')
const moduleRoutes = require('./module-router')
const roleRoutes = require('./role-router')
const customerpaymentRoutes = require('./customerpayment-router')
const userRoleRoutes = require('./user_role_router')
const dailyreportbyemp = require('./dailyreportbyemp');
const dailreportbyemployee = require('./dailyreportbyemp-router')
const dashboard = require('./dashboard')
const public = require('./public-router');
const router = new Router({ prefix: '/api/v1' });

// use router files
router.use(indexRoutes.routes(), router.allowedMethods());
router.use(userRoutes.routes(), router.allowedMethods());
router.use(authRoutes.routes(), router.allowedMethods());
router.use(positionRoutes.routes(), router.allowedMethods());
router.use(machineRoutes.routes(), router.allowedMethods());
router.use(modelRoutes.routes(), router.allowedMethods());
router.use(depRoutes.routes(), router.allowedMethods());
router.use(employeeRoutes.routes(), router.allowedMethods());
router.use(complainRoutes.routes(), router.allowedMethods());
router.use(scheduleRoutes.routes(), router.allowedMethods());
router.use(assignRoutes.routes(), router.allowedMethods());
router.use(employeescheduleRoutes.routes(), router.allowedMethods());
router.use(jobRoutes.routes(), router.allowedMethods());
router.use(dailyRoutes.routes(), router.allowedMethods());
router.use(moduleRoutes.routes(), router.allowedMethods());
router.use(roleRoutes.routes(), router.allowedMethods());
router.use(customerpaymentRoutes.routes(), router.allowedMethods());
router.use(userRoleRoutes.routes(), router.allowedMethods());
router.use(dailyreportbyemp.routes(), router.allowedMethods());
router.use(dailreportbyemployee.routes(), router.allowedMethods());
router.use(dashboard.routes(), router.allowedMethods());
router.use(public.routes(),router.allowedMethods());

module.exports = router;
