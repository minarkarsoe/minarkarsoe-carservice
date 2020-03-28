
var employee = [
    {
      id: 1,
      image: '1.jpg',
      name: "Aung Aung",
      nric: "12/KKK(098433)",
      dob: '1997-05-29',
      code: 'EMP1',
      position_id:2 ,
      department_id: 2,
      email: "emp1@gmail.com",
      phone: "09951211111",
      parmanent_address: 'Hello',
      temporary_address: 'Heee',
      father_name: 'Mg Mg',
      mother_name: 'Aye Aye',
      education: 'Grade 11',
      social_media_link: 'www.google.com',
      created_by: 'super-admin',
      updated_by: 'super-admin'
    },
    {
      id: 2,
      image: '2.jpg',
      name: "Kyaw Kyaw",
      nric: "12/LKV(098433)",
      dob: '1995-05-29',
      code: 'EMP2',
      position_id: 1 ,
      department_id:1,
      email: "emp@gmail.com",
      phone: "09951211111",
      parmanent_address: 'Hello',
      temporary_address: 'Heee',
      father_name: 'Mg Mg',
      mother_name: 'Aye Aye',
      education: 'Grade 11',
      social_media_link: 'www.google.com',
      created_by: 'super-admin',
      updated_by: 'super-admin'
    },
  
  ]
  
  exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('sms_employee').del()
  
    .then(() => {
      return knex('sms_employee').insert(employee);
    })
  
  };
  