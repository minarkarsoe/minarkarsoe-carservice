const knex = require('../db/connection');

async function getDashboardEmp() {
    const employees = await knex('sms_employee')
        .count({ all: 'id' });
    return employees[0];
}

async function getEmpByPosition() {
    const employees = await knex('sms_employee')
        .select('sms_position.name as position')
        .leftJoin('sms_position', 'sms_employee.position_id', 'sms_position.id')
        .count({ count: 'sms_employee.id' })
        .groupBy('position_id')

    return employees;
}

async function getDashboardComplain() {
    const complains = await knex('sms_complain')
        .count({ all: 'id' });
    return complains[0];
}

async function getCompBySts() {
    const complains = await knex('sms_complain')
        .select('complain_status as status')
        .count({ count: 'id' })
        .groupBy('complain_status')

    return complains;
}

async function getDashboardMac() {
    const machines = await knex('sms_machine')
        .count({ all: 'id' });
    return machines[0];
}

async function getMacByMod() {
    const machines = await knex('sms_machine')
        .select('sms_model.model_no as model')
        .leftJoin('sms_model', 'sms_machine.mod_id', 'sms_model.id')
        .count({ count: 'sms_machine.id' })
        .groupBy('mod_id')

    return machines;
}

module.exports = {
    getDashboardEmp,
    getEmpByPosition,
    getCompBySts,
    getDashboardComplain,
    getDashboardMac,
    getMacByMod
};