const knex = require('../db/connection');
const messageConfig = require('../config/msgConfig');

function getAllComplain() {
    return knex('sms_complain')
        .select(
            ['sms_complain.*',
             'sms_machine.fup as fup_no',
             'sms_department.name as dep_name',
             'sms_model.model_no as mod_no'
            ])
        .leftJoin('sms_machine', 'sms_complain.mac_id', 'sms_machine.id')
        .leftJoin('sms_department', 'sms_complain.dep_id', 'sms_department.id')
        .leftJoin('sms_model','sms_machine.mod_id','sms_model.id')
}

async function getcomplainById(id) {
    const model = await knex('sms_complain')
        .select(
            ['sms_complain.*',
            'sms_model.model_no as mod_no',
            'sms_machine.fup as fup_no',
            'sms_department.name as dep_name'

            ])
            .leftJoin('sms_machine', 'sms_complain.mac_id', 'sms_machine.id')
            .leftJoin('sms_model', 'sms_machine.mod_id', 'sms_model.id')
            .leftJoin('sms_department', 'sms_complain.dep_id', 'sms_department.id')
            .where({ 'sms_complain.id': parseInt(id) });
    return model[0]
}

async function addComplain(complain) {

    return knex.transaction((trx) => {
        return knex('sms_complain')
            .insert(complain)
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
                return getcomplainById(response);
            }
        })
        .catch((err) => {
            console.error(err);
        });
}

async function updateComplain(id, complain) {
    return knex.transaction(async (trx) => {
        return knex('sms_complain')
            .transacting(trx)
            .update(complain)
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
                return getcomplainById(id);
            } else {
                return 'error';
            }
        })
        .catch((err) => {
            console.error(err);
        });
}

async function deleteComplain(id) {
    return knex.transaction(async (trx) => {
        return knex('sms_complain')
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

async function rejectComplain(id, complain) {
    return knex.transaction(async (trx) => {
        return knex('sms_complain')
            .transacting(trx)
            .update({'sms_complain.complain_status': 'Rejected'})
            .where({ id: parseInt(id) })
            .then((response) => {
                // console.log('Response is ' + JSON.stringify(response)); 
                if (response > 0) {
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
            if (response && response == 'success') {
                return getcomplainById(id);
            } else {
                return 'error';
            }
        })
        .catch((err) => {
            // console.error(err);
        });
}

module.exports = {
    rejectComplain,
    getAllComplain,
    getcomplainById,
    addComplain,
    updateComplain,
    deleteComplain
};