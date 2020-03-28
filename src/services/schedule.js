const knex = require('../db/connection');
const messageConfig = require('../config/msgConfig');

function getAllSchedule() {
    return knex('sms_schedule')
        .select(
            ['sms_schedule.*',
                'sms_complain.complain_no as compo',
                'sms_machine.mod_id',
                'sms_complain.job_title',
                'sms_complain.complain_job_title',
                'sms_complain.customer_name',
                'sms_complain.customer_phno',
                'sms_complain.distance',
                'sms_complain.location',
                'sms_complain.date',
                'sms_complain.description',
                'sms_complain.job_description'

            ])
        .leftJoin('sms_complain', 'sms_schedule.comp_id', 'sms_complain.id')
        .leftJoin('sms_machine','sms_complain.mac_id','sms_machine.id')
        .leftJoin('sms_model', 'sms_machine.mod_id', 'sms_model.id')
}
async function getmachinehistory(id)
{
  const machine= await  knex('sms_schedule')
  .select(
    ['sms_schedule.*',
     'sms_complain.complain_no as compo',
     'sms_machine.mod_id',
     'sms_complain.job_title',
     'sms_complain.complain_job_title',
     'sms_complain.customer_name',
     'sms_complain.customer_phno',
     'sms_complain.distance',
     'sms_complain.location',
     'sms_complain.date',
     'sms_complain.description',
     'sms_complain.job_description',
     'sms_model.model_no',
     'sms_machine.fup',
     'sms_machine.machine_serial_no',
     'sms_machine.machine_engine_serial_no',
     'sms_machine.wyear',
     'sms_machine.workinghr',
     'sms_department.name as depname'
]
  )
  .leftJoin('sms_complain','sms_schedule.comp_id','sms_complain.id')
  .leftJoin('sms_machine','sms_complain.mac_id','sms_machine.id')
  .where({'sms_complain.mac_id': parseInt(id)})
  return machine
}
async function getscheduleforjob(id) {
    const model=  await knex('sms_schedule')
        .select(
                ['sms_schedule.*',
                'sms_complain.complain_no as compo',
                'sms_machine.mod_id',
                'sms_complain.job_title',
                'sms_complain.complain_job_title',
                'sms_complain.customer_name',
                'sms_complain.customer_phno',
                'sms_complain.distance',
                'sms_complain.location',
                'sms_complain.date',
                'sms_complain.description',
                'sms_complain.job_description',
                'sms_model.model_no',
                'sms_machine.fup',
                'sms_machine.machine_serial_no',
                'sms_machine.machine_engine_serial_no',
                'sms_machine.wyear',
                'sms_machine.workinghr',
                'sms_department.name as depname'

            ])
        .leftJoin('sms_complain', 'sms_schedule.comp_id', 'sms_complain.id')
        .leftJoin('sms_machine', 'sms_complain.mac_id', 'sms_machine.id')
        .leftJoin('sms_model', 'sms_machine.mod_id', 'sms_model.id')
        .leftJoin('sms_department', 'sms_complain.dep_id', 'sms_department.id')
        .where({ 'sms_schedule.id': parseInt(id) });
    return   model
}
async function getmachineByfup(id) {
    const model = await knex('sms_schedule')
    .select(['sms_complain.mac_id','sms_machine.fup'])
    .where({ 'sms_schedule.id': parseInt(id) })
    .leftJoin('sms_complain','sms_schedule.comp_id','sms_complain.id')
    .leftJoin('sms_machine','sms_complain.mac_id','sms_machine.id')
    return model[0]
}
async function getscheduleByIdforjob(id) {
    const model = await knex('sms_schedule')
        .select(
        [   'sms_schedule.*',
            'sms_complain.complain_no as compo',
            'sms_machine.mod_id',
            'sms_complain.job_title',
            'sms_complain.complain_job_title',
            'sms_complain.customer_name',
            'sms_complain.customer_phno',
            'sms_complain.distance',
            'sms_complain.location',
            'sms_complain.date',
            'sms_complain.description',
            'sms_complain.job_description',
            'sms_model.model_no',
            'sms_machine.fup',
            'sms_machine.machine_serial_no',
            'sms_machine.machine_engine_serial_no',
            'sms_machine.wyear',
            'sms_machine.workinghr',
            'sms_department.name as depname'

        ])
            .leftJoin('sms_complain', 'sms_schedule.comp_id', 'sms_complain.id')
            .leftJoin('sms_machine', 'sms_complain.mac_id', 'sms_machine.id')
            .leftJoin('sms_model', 'sms_machine.mod_id', 'sms_model.id')
            .leftJoin('sms_department', 'sms_complain.dep_id', 'sms_department.id')
            .where({ 'sms_schedule.id': parseInt(id) });
    return model[0]
}

async function getscheduleById(id) {
    const model = await knex('sms_schedule')
        .select(
            ['sms_schedule.*',
            'sms_complain.complain_no as compo',
            'sms_machine.mod_id',
            'sms_complain.job_title',
            'sms_complain.complain_job_title',
            'sms_complain.customer_name',
            'sms_complain.customer_phno',
            'sms_complain.distance',
            'sms_complain.location',
            'sms_complain.date',
            'sms_complain.description',
            'sms_model.model_no as model_number'

            ])
            .leftJoin('sms_complain', 'sms_schedule.comp_id', 'sms_complain.id')
            .leftJoin('sms_machine','sms_complain.mac_id','sms_machine.id')
            .leftJoin('sms_model','sms_machine.mod_id','sms_model.id')
        .where({ 'sms_schedule.id': parseInt(id) });
    return model[0]
}

async function addschedule(schedule) {

    return knex.transaction((trx) => {
        return knex('sms_schedule')
            .insert(schedule)
            .transacting(trx)
            .then((response) => {
                console.log('Response is ' + JSON.stringify(response));
                if (response[0] > 0) {
                    return response[0];
                } else {
                    throw ('error');
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
            if (response && response == 'error') {
                return 'error';
            } else {
                return getscheduleById(response);
            }
        })
        .catch((err) => {
            console.error(err);
        });
}

async function updateSchedule(id, schedule) {
    return knex.transaction(async (trx) => {
        return knex('sms_schedule')
            .transacting(trx)
            .update(schedule)
            .where({ id: parseInt(id) })
            .then((response) => {
                console.log('Response is ' + JSON.stringify(response));
                if (response > 0) {
                    return 'success';
                } else {
                    return 'error';
                }
            })
            .then(trx.commit)
            .catch((err) => {
                trx.rollback;
                console.error('Exception error....' + err);
                return 'error'
            });
    })
        .then((response) => {
            console.log('Transaction object return object: ' + response);
            if (response && response == 'success') {
                return getscheduleById(id);
            } else {
                return 'error';
            }
        })
        .catch((err) => {
            console.error(err);
        });
}

async function deleteSchedule(id) {
    return knex.transaction(async (trx) => {
        return knex('sms_schedule')
            .transacting(trx)
            .del()
            .where({ id: parseInt(id) })
            .then((response) => {
                if (response) {
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
            if (response && response == 'success') {
                return 'success';
            } else {
                return 'error';
            }
        })
        .catch((err) => {
            console.error(err);
        });
}

module.exports = {
    getAllSchedule,
    getscheduleById,
    addschedule,
    updateSchedule,
    deleteSchedule,
    getscheduleforjob,
    getscheduleByIdforjob,
    getmachineByfup,
    getmachinehistory
};
