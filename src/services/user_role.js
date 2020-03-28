const knex = require('../db/connection');
const messageConfig = require('../config/msgConfig');

function getAlluser_role() {
    return knex('sms_usr_role')
    .select('sms_usr_role.*','sms_usr.user_name as user_name','sms_role.name as name', )
        .leftJoin('sms_usr','sms_usr.id', 'sms_usr_role.user_id')
        .leftJoin('sms_role','sms_role.id', 'sms_usr_role.role_id')
}

async function getuser_roleById(id) {
    const model = await knex('sms_usr_role')
    .select('*')
    .where({ id: parseInt(id) });
    return model[0]
}

async function adduser_role(user_role) {

    return knex.transaction((trx) => {
        return knex('sms_usr_role')
        .insert(user_role)
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
            return getuser_roleById(response);
        }
    })
    .catch((err) => {
        console.error(err);
    });
}

async function updateuser_role(id, user_role) {
    return knex.transaction(async (trx) => {
        return knex('sms_usr_role')
        .transacting(trx)
        .update(user_role)
        .where({ id: parseInt(id) })
        .then((response) => {
             console.log('Response is ' + JSON.stringify(response));
            if(response > 0) {
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
        if(response && response == 'success') {
            return getuser_roleById(id);
        } else {
            return 'error';
        }
    })
    .catch((err) => {
        console.error(err);
    });
}

async function deleteuser_role(id) {
    return knex.transaction(async (trx) => {
        return knex('sms_usr_role')
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
    getAlluser_role,
    getuser_roleById,
    adduser_role,
    updateuser_role,
    deleteuser_role
};
