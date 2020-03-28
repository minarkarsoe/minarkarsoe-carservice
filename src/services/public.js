const knex = require('../db/connection');
const messageConfig = require('../config/msgConfig');

function getAllpublic() {
    return knex('sms_public')
    .select('*');
}

async function getpublicById(id) {
    const model = await knex('sms_public')
    .select('*')
    .where({ id: parseInt(id) });
    return model[0]
}

async function addpublic(public) {

    return knex.transaction((trx) => {
        return knex('sms_public')
        .insert(public)
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
            return getpublicById(response);
        }
    })
    .catch((err) => {
        console.error(err);
    });
}

async function updatepublic(id, public) {
    return knex.transaction(async (trx) => {
        return knex('sms_public')
        .transacting(trx)
        .update(public)
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
            return getpublicById(id);
        } else {
            return 'error';
        }
    })
    .catch((err) => {
        // console.error(err);
    });
}

async function deletepublic(id) {
    return knex.transaction(async (trx) => {
        return knex('sms_public')
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
    getAllpublic,
    getpublicById,
    addpublic,
    updatepublic,
    deletepublic
};
