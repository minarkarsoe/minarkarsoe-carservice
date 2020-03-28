const knex = require('../db/connection');
const messageConfig = require('../config/msgConfig');

function getAllrole() {
    return knex('sms_role')
    .select('*');
}

async function getroleById(id) {
    const model = await knex('sms_role')
    .select('*')
    .where({ id: parseInt(id) });
    return model[0]
}

async function addrole(role) {

    return knex.transaction((trx) => {
        return knex('sms_role')
        .insert(role)
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
            return getroleById(response);
        }
    })
    .catch((err) => {
        console.error(err);
    });
}

async function updaterole(id, role) {
    return knex.transaction(async (trx) => {
        return knex('sms_role')
        .transacting(trx)
        .update(role)
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
            return getroleById(id);
        } else {
            return 'error';
        }
    })
    .catch((err) => {
        // console.error(err);
    });
}

async function deleterole(id) {
    return knex.transaction(async (trx) => {
        return knex('sms_role')
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
    getAllrole,
    getroleById,
    addrole,
    updaterole,
    deleterole
};
