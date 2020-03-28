const position = [
  {
    id: 1,
    name: 'Position 1',
    description: 'positon1',
    created_by: 'super-admin',
    updated_by: 'super-admin'
  },
  {
    id: 2,
    name: 'Position 2',
    description: 'positon2',
    created_by: 'super-admin',
    updated_by: 'super-admin'
  }
];
var model = [
	{
		id: 1,
		model_no: 'M-0001',
		description: 'model 1',
		created_by: 'super-admin',
		updated_by: 'super-admin'
	},
	{
		id: 2,
		model_no: 'M-0002',
		description: 'model 2',
		created_by: 'super-admin',
		updated_by: 'super-admin'
	},
	{
		id: 3,
		model_no: 'M-0003',
		description: 'model 3',
		created_by: 'super-admin',
		updated_by: 'super-admin'
	}
];

exports.seed = function(knex, Promise) {
  return knex('sms_position').del()
  .then(() => {
    return knex('sms_model').del();
  })
  .then(() => {
    return knex('sms_position').insert(position);
  })
  .then(() => {
    return knex('sms_model').insert(model);
  })
};
