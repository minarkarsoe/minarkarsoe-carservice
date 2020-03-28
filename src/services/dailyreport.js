const knex = require('../db/connection');
const messageConfig = require('../config/msgConfig');

function getAlldailyreport() {
    return knex('sms_dailyreport')
    .select(['sms_dailyreport.*','sms_schedule.job_code as jcode','sms_schedule.start_date as sdate','sms_schedule.end_date as edate','sms_machine.fup as fup'])
    .leftJoin('sms_schedule','sms_dailyreport.sch_id','sms_schedule.id')
    .leftJoin('sms_machine','sms_dailyreport.mac_id','sms_machine.id')
    
}
async function getAlldailyreportbyemp(id) {
    const model= knex('sms_dailyreport')
    .select(['sms_dailyreport.*','sms_schedule.job_code as jcode','sms_schedule.start_date as sdate','sms_schedule.end_date as edate','sms_machine.fup as fup'])
    .leftJoin('sms_schedule','sms_dailyreport.sch_id','sms_schedule.id')
    .leftJoin('sms_machine','sms_dailyreport.mac_id','sms_machine.id')
    .where({'sms_dailyreport.e_id':parseInt(id)})
    return model
}
async function getdailyreportById(id) {
    const model = await knex('sms_dailyreport')
    .select(['sms_dailyreport.*','sms_schedule.job_code as jcode','sms_machine.fup as fup'])
    .where({ 'sms_dailyreport.id': parseInt(id) })
    .leftJoin('sms_schedule','sms_dailyreport.sch_id','sms_schedule.id')
    .leftJoin('sms_machine','sms_dailyreport.mac_id','sms_machine.id');
    return model[0]
}

async function getDailyReportByMachineId(id) {
    const dailyreport = await knex ('sms_dailyreport')
    .select(['sms_dailyreport.*','sms_schedule.job_code as jcode','sms_machine.fup as fup'])
    .where({ 'sms_dailyreport.mac_id': parseInt(id) })
    .orderBy([{ column: 'sms_dailyreport.date', order: 'desc' }])
    .leftJoin('sms_schedule','sms_dailyreport.sch_id','sms_schedule.id')
    .leftJoin('sms_machine','sms_dailyreport.mac_id','sms_machine.id');
    return dailyreport
}
async function dailyreportbyemployee(id){
    const dailyreport = knex('sms_dailyreport')
    .select(['sms_dailyreport.*','sms_schedule.job_code as jcode','sms_machine.fup as fup','sms_employee.*'])
    .where({ 'sms_employee.id': parseInt(id) })
    .leftJoin('sms_schedule','sms_dailyreport.sch_id','sms_schedule.id')
    .leftJoin('sms_complain','sms_schedule.comp_id','sms_schedule.id')
    .leftJoin('sms_machine','sms_complain.mac_id','sms_machine.id')
    .leftJoin('sms_employee','sms_dailyreport.e_id','sms_employee.id')
    return dailyreport[0]
}

async function adddailyreport(dailyreport) {

    return knex.transaction((trx) => {
        return knex('sms_dailyreport')
        .insert(dailyreport)
        .transacting(trx)
        .then((response) => {
            console.log('Response is ' + JSON.stringify(response));
            if(response[0] > 0) {
                return response[0];
            } else {
                throw('error');
            }
        })
        .then(trx.commit)
        .catch((err) => {
            trx.rollback;
            console.error('Exception error....', err);
            return 'error'
        });
    })
    .then((response) => {
        console.log(response)
        console.log('Transaction object return object: ', response);
        if(response && response == 'error') {
            return 'error';
        } else {
            return getdailyreportById(response);
        }
    })
    .catch((err) => {
        console.error(err);
    });
}

async function updatedailyreport(id, dailyreport) {
    return knex.transaction(async (trx) => {
        return knex('sms_dailyreport')
        .transacting(trx)
        .update(dailyreport)
        .where({ id: parseInt(id) })
        .then((response) => {
            // console.log('Response is ' + JSON.stringify(response));
            if(response > 0) {
                return 'success';
            } else {
                return 'error';
            }
        })
        .then(trx.commit)
        .catch((err) => {
            trx.rollback;
            // console.error('Exception error....' + err);
            return 'error'
        });
    })
    .then((response) => {
        // console.log('Transaction object return object: ' + response);
        if(response && response == 'success') {
            return getdailyreportById(id);
        } else {
            return 'error';
        }
    })
    .catch((err) => {
        // console.error(err);
    });
}

async function deletedailyreport(id) {
    return knex.transaction(async (trx) => {
        return knex('sms_dailyreport')
        .transacting(trx)
        .del()
        .where({ id: parseInt(id) })
        .then((response) => {
            if(response) {
                return 'success';
            } else {
                return 'error';
            }
        })
        .then(trx.commit)
        .catch((err) => {
            trx.rollback;
            return 'error'
        });
    })
    .then((response) => {
        if(response && response == 'success') {
            return 'success';
        } else {
            return 'error';
        }
    })
    .catch((err) => {
        // console.error(err);
    });
}

module.exports = {
    getAlldailyreport,
    getdailyreportById,
    adddailyreport,
    updatedailyreport,
    deletedailyreport,
    getDailyReportByMachineId,
    dailyreportbyemployee,
    getAlldailyreportbyemp
    
};
