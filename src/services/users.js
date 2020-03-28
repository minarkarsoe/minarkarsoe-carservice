const knex = require('../db/connection');
var bcrypt = require('bcryptjs');
const messageConfig = require('../config/msgConfig');

function getAllUsers() {
    return knex('sms_usr')
        .select('sms_usr.*','sms_employee.phone as phone_number','sms_employee.nric as nric','sms_employee.email as email', 'sms_employee.code as code')
        .leftJoin('sms_employee','sms_employee.id', 'sms_usr.e_id')
}

async function getUserById(id) {
    const model = await knex('sms_usr')
    .select(['sms_usr.*',
    'sms_employee.code as ecode',
    'sms_employee.email as email',
    'sms_employee.phone as phone',
    'sms_employee.nric as nric',
    ])

    .leftJoin('sms_employee', 'sms_usr.e_id', 'sms_employee.id')
    .where({ 'sms_usr.id': parseInt(id) });
    return model[0]
}
async function getCurrentUser(id) {
    const model = await knex('sms_usr')
        .select(['sms_usr.*', 'sms_role.name as rolename','sms_employee.image as image','sms_employee.schedule_id '])
        .leftJoin('sms_usr_role', 'sms_usr_role.user_id', 'sms_usr.id')
        .leftJoin('sms_role', 'sms_usr_role.role_id', 'sms_role.id')
        .leftJoin('sms_employee','sms_usr.e_id','sms_employee.id')
        .where({ 'sms_usr.id': id })
    return model[0];    
}

async function getUserByName(name) {
    const model = await knex('sms_usr')
        .select(['sms_usr.*', 'sms_role.name as rolename','sms_employee.image as image','sms_employee.schedule_id '])
        .leftJoin('sms_usr_role', 'sms_usr_role.user_id', 'sms_usr.id')
        .leftJoin('sms_role', 'sms_usr_role.role_id', 'sms_role.id')
        .leftJoin('sms_employee','sms_usr.e_id','sms_employee.id')
        .where({ 'sms_usr.email': name })
    return model[0];
}
function addUser(user) {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(user.password_hash, salt);
    user.password_hash = hash;
    return knex.transaction((trx) => {
        return knex('sms_usr')
            .insert(user)
            .transacting(trx)
            .then((response) => {
                console.log('Response is ' + JSON.stringify(response));
                if (response[0] > 0) {
                    return response[0];
                } else {
                    return 'error';
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
            console.log('Transaction object return object: ', response);
            if (response && response == 'error') {
                return 'error';
            } else {
                console.log('getUserById ', response)
                return getUserById(response);
            }
        })
        .catch((err) => {
            console.error(err);
        });
}

async function updateUser(id, user) {
    return knex.transaction(async (trx) => {
        return knex('sms_usr')
            .transacting(trx)
            .update(user)
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
                return getUserById(id);
            } else {
                return 'error';
            }
        })
        .catch((err) => {
            // console.error(err);
        });
}

async function deleteUser(id) {
    return knex.transaction(async (trx) => {
        return knex('sms_usr_role')
            .transacting(trx)
            .del()
            .where({ user_id: parseInt(id) })
            .then(() => {
                return knex('sms_usr')
                    .transacting(trx)
                    .del()
                    .where({ id: parseInt(id) })
            })
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
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser,
    getUserByName,
    getCurrentUser
};