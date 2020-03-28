const knex = require('../db/connection');
const messageConfig = require('../config/msgConfig');

function getAllcustomerpayment() {
    return knex('sms_customerpayment')
    .select(['sms_customerpayment.*',
             'sms_complain.complain_no',
             'sms_complain.customer_name',
            ])
    .leftJoin('sms_schedule', 'sms_customerpayment.schedule_id', 'sms_schedule.id')
    .leftJoin('sms_complain','sms_schedule.comp_id','sms_complain.id')        
}

async function getcustomerpaymentById(id) {
    const model = await knex('sms_customerpayment')
    .select(['sms_customerpayment.*',
             'sms_schedule.schedule_status',
             'sms_complain.complain_no',
             'sms_complain.customer_name' 
            ])
    .leftJoin('sms_schedule', 'sms_customerpayment.schedule_id', 'sms_schedule.id')
    .leftJoin('sms_complain','sms_schedule.comp_id','sms_complain.id')        
            
    .where({ 'sms_customerpayment.id': parseInt(id) });
    return model[0]
}

async function addcustomerpayment(customerpayment) {

    return knex.transaction((trx) => {
        return knex('sms_customerpayment')
        .insert(customerpayment)
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
            return getcustomerpaymentById(response);
        }
    })  
    .catch((err) => {
        console.error(err);
    });    
}

async function updatecustomerpayment(id, customerpayment) {
    return knex.transaction(async (trx) => {
        return knex('sms_customerpayment')
        .transacting(trx)
        .update(customerpayment)
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
            return getcustomerpaymentById(id);
        } else {
            return 'error';
        }
    })   
    .catch((err) => {
        // console.error(err);
    });
}

async function deletecustomerpayment(id) {
    return knex.transaction(async (trx) => {
        return knex('sms_customerpayment')
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
    getAllcustomerpayment,
    getcustomerpaymentById,
    addcustomerpayment,
    updatecustomerpayment,
    deletecustomerpayment
};