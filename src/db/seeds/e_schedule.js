
  const schedule = [
    {
      id: 1,
      comp_id:1,
      job_code:'J4546',
      start_date:'2012-11-04',
      end_date:'2012-11-04',
      job_title:'Work',
      ammount:'20000',
      service_charge:'6000',
      job_status:'Assign',
      j_description:'sada',
      created_by: 'super-admin',
      updated_by: 'super-admin'
    },
    {
      id: 2,
      comp_id:1,
      job_code:'J5432',
      start_date:'2012-11-04',
      end_date:'2012-11-04',
      ammount:'40000',
      job_title:'Work',
      service_charge:'6000',
      job_status:'Assign',
      j_description:'sada',
      created_by: 'super-admin',
      updated_by: 'super-admin'
    }
  ];
  
exports.seed = function(knex, Promise) {
    return knex('sms_schedule').del()
    .then(() => {
        return knex('sms_schedule').insert(schedule)
    })
};
  