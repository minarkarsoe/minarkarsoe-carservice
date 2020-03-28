const knex = require('../db/connection');
const messageConfig = require('../config/msgConfig');

function getAllModule() {
    return knex('sms_mdul')
    .select(['sms_mdul.*','sms_employee.name as ename'])
    .leftJoin('sms_employee','sms_mdul.e_id','sms_employee.id')
}

async function getmoduleById(id) {
    const model = await knex('sms_mdul')
    .select(['sms_mdul.*','sms_employee.name as ename'])
    .where({ 'sms_mdul.id': parseInt(id) })
    .leftJoin('sms_employee','sms_mdul.e_id','sms_employee.id')
    return model[0]
}

async function addmodule(module) {

    return knex.transaction((trx) => {
        return knex('sms_mdul')
        .insert(module)
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
            return getmoduleById(response);
        }
    })
    .catch((err) => {
        console.error(err);
    });
}

async function updatemodule(id, module) {
    return knex.transaction(async (trx) => {
        return knex('sms_mdul')
        .transacting(trx)
        .update(module)
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
            return getmoduleById(id);
        } else {
            return 'error';
        }
    })
    .catch((err) => {
        // console.error(err);
    });
}

async function deletemodule(id) {
    return knex.transaction(async (trx) => {
        return knex('sms_mdul')
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
    getAllModule,
    getmoduleById,
    addmodule,
    updatemodule,
    deletemodule
};
