const bcrypt = require('bcryptjs');
var machine = [
	{
		id: 1,
		fup:'sdds',
		mod_id:1,
    machine_serial_no: '424367',
    machine_engine_serial_no: '38754',
		location:'Yangon',
		workinghr:'230hr',
		wyear:'3year',
		created_by: 'super-admin',
		updated_by: 'super-admin'
	},
	{
		id: 2,
		fup:'wrtrreter',
		mod_id:2,
    machine_serial_no: '424368',
    machine_engine_serial_no: '38755',
		location:'Yangon',
		workinghr:'230hr',
		wyear:'3year',
		created_by: 'super-admin',
		updated_by: 'super-admin'
	},
	{
		id: 3,
		fup:'irut',
		mod_id:3,
		machine_serial_no: '424369',
		machine_engine_serial_no: '38756',
		location:'Yangon',
		workinghr:'230hr',
		wyear:'3year',
		created_by: 'super-admin',
		updated_by: 'super-admin'
	}
];


var com = [
  {
    id : 1,
    complain_no: 'C12345',
    wyear : '3 Years',
    dep_id:1,
    mac_id :1,
    workinghr : '150 ',
    customer_name : 'U  Aung',
    distance : '300 Mil',
    customer_phno : '091065478',
    location : 'Ayeyarwady',
    job_title : 'Service',
    complain_job_title: 'No signal',
    date : '24/5/2016',
    description: 'The wyear we are protecting',
    job_description : 'if the ...',
    created_by: 'super-admin',
    updated_by: 'super-admin'
  }

];

exports.seed = function(knex, Promise) {
  return knex('sms_machine').del()
  .then(()=>{
    return knex('sms_complain').del();
  })
  .then(() => {
    return knex('sms_machine').insert(machine);
  })
  .then(()=>{
    return knex('sms_complain').insert(com);
  })
};
