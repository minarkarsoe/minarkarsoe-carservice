const department = [
  {
    id: 1,
    name: 'Department 1',
    dcode:'A001',
    description: 'dep1',
    created_by: 'super-admin',
    updated_by: 'super-admin'
  },
  {
    id: 2,
    name: 'Department 2',
    dcode:'B003',
    description: 'dep2',
    created_by: 'super-admin',
    updated_by: 'super-admin'
  },
  {
    id: 3,
    name: 'Department 3',
    dcode:'C004',
    description: 'dep3',
    created_by: 'super-admin',
    updated_by: 'super-admin'
  }
];

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('sms_department').del()
    .then(function () {
      return knex('sms_department').insert(department);
    });
};
