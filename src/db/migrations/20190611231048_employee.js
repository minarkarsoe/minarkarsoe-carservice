
exports.up = function(knex, Promise) {
    return Promise.all([
      knex.schema.createTable('sms_mdul',(t)=>
     {
       t.increments().primary();
       t.string('modulename').notNullable();
       t.integer('e_id').notNullable().unsigned();
       t.string('action').notNullable();
       t.string('remark').notNullable();
       t.foreign('e_id').references('id').inTable('sms_employee').onDelete('CASCADE')
        // Table Default Fields
        t.timestamp('created_at').defaultTo(knex.fn.now());
        t.string('created_by').notNullable();
        t.timestamp('updated_at').defaultTo(knex.fn.now());
        t.string('updated_by').notNullable();
        t.integer('version_no').defaultTo(1);
        t.decimal('sort_order_no').defaultTo(0);
     }),
      //@daily report
      knex.schema.createTable('sms_dailyreport', (t) => {
        t.increments().primary();
        t.timestamp('date').defaultTo(knex.fn.now());
        t.string('wkhour').notNullable();
        t.text('description').notNullable();
        t.string('remark').notNullable();
        t.integer('sch_id').notNullable().unsigned();
        t.integer('mac_id').notNullable().unsigned();
        t.integer('e_id').notNullable().unsigned();
        t.foreign('sch_id').references('id').inTable('sms_schedule').onDelete('CASCADE');
        t.foreign('mac_id').references('id').inTable('sms_machine').onDelete('CASCADE');
        t.foreign('e_id').references('id').inTable('sms_employee').onDelete('CASCADE');
        // Table Default Fields
        t.timestamp('created_at').defaultTo(knex.fn.now());
        t.string('created_by').notNullable();
        t.timestamp('updated_at').defaultTo(knex.fn.now());
        t.string('updated_by').notNullable();
        t.integer('version_no').defaultTo(1);
        t.boolean('status').defaultTo(true);
        t.decimal('sort_order_no').defaultTo(0);
      }),
      //@sms_usr_role
      knex.schema.createTable('sms_usr_role', (t) => {
        t.increments();
        t.integer('user_id').unsigned().notNullable();
        t.integer('role_id').unsigned().notNullable();
        t.foreign('user_id').references('id').inTable('sms_usr').onDelete('CASCADE');;
        t.foreign('role_id').references('id').inTable('sms_role').onDelete('CASCADE');;
      }),
      //@sms_usr
      knex.schema.createTable('sms_usr', (t) => {
        t.increments();
        t.string('user_name').notNullable().unique();
        t.string('email').notNullable().unique();
        t.integer('e_id').unsigned().notNullable();
        t.boolean('email_confirmed').defaultTo(false);
        t.longtext('password_hash').notNullable();
        t.string('phone_no');
        t.boolean('phone_no_confirmed').defaultTo(false);
        t.boolean('two_factor_enabled').defaultTo(false);
        t.datetime('lock_out_end');
        t.boolean('lock_out_enabled').defaultTo(false);
        t.integer('access_failed_count').defaultTo(0);
        t.foreign('e_id').references('id').inTable('sms_employee').onDelete('CASCADE');
        // Table Default Fields
        t.timestamp('created_at').defaultTo(knex.fn.now());
        t.string('created_by').notNullable();
        t.timestamp('updated_at').defaultTo(knex.fn.now());
        t.string('updated_by').notNullable();
        t.integer('version_no').defaultTo(1);
        t.string('status');
        t.decimal('sort_order_no').defaultTo(0);
      }),

      //@sms_employee
    knex.schema.createTable('sms_employee', (t) => {
        t.increments();
        t.integer('schedule_id').unsigned();
        t.integer('position_id').unsigned().notNullable();
        t.integer('department_id').unsigned().notNullable();
        t.string('image').notNullable();
        t.string('name').notNullable().unique();
        t.string('nric').notNullable().unique();
        t.date('dob').notNullable();
        t.string('code').notNullable().unique();
        t.foreign('position_id').references('id').inTable('sms_position').onDelete('CASCADE');
        t.foreign('schedule_id').references('id').inTable('sms_schedule').onDelete('CASCADE');
        t.foreign('department_id').references('id').inTable('sms_department').onDelete('CASCADE');
        t.timestamp('start_date').defaultTo(knex.fn.now());
        t.string('email').notNullable().unique();
        t.string('phone');
        t.string('parmanent_address').notNullable();
        t.string('temporary_address').notNullable();
        t.string('father_name').notNullable();
        t.string('mother_name').notNullable();
        t.string('education').notNullable();
        t.string('social_media_link').notNullable();
        t.timestamp('created_at').defaultTo(knex.fn.now());
        t.string('created_by').notNullable();
        t.timestamp('updated_at').defaultTo(knex.fn.now());
        t.string('updated_by').notNullable();
        t.integer('version_no').defaultTo(1);
        t.boolean('status').defaultTo(true);
        t.decimal('sort_order_no').defaultTo(0);
      }),
      //@sms_customerpayment
      knex.schema.createTable('sms_customerpayment',(t)=>
      {
        t.increments().primary();
        t.string('invoice').notNullable();
        t.string('ammount').notNullable();
        t.string('paymentdate').notNullable();
        t.integer('schedule_id').unsigned().notNullable();
        t.foreign('schedule_id').references('id').inTable('sms_schedule').onDelete('CASCADE');
         // Table Default Fields
         t.timestamp('created_at').defaultTo(knex.fn.now());
         t.string('created_by').notNullable();
         t.timestamp('updated_at').defaultTo(knex.fn.now());
         t.string('updated_by').notNullable();
         t.integer('version_no').defaultTo(1);
         t.decimal('sort_order_no').defaultTo(0);
      }),

      //@sms_complain
      knex.schema.createTable('sms_complain', (t) => {
        t.increments().primary();
        t.string('complain_no').notNullable();
        t.string('wyear').notNullable();
        t.integer('dep_id').notNullable().unsigned();
        t.integer('mac_id').notNullable().unsigned();
        t.string('workinghr').notNullable();
        t.string('customer_name').notNullable();
        t.string('distance').notNullable();
        t.string('customer_phno').notNullable().unique();
        t.string('location').notNullable();
        t.string('job_title').notNullable();
        t.string('complain_job_title').notNullable();
        t.string('date').notNullable();
        t.text('description');
        t.text('job_description');
        t.string('complain_status')
        t.timestamp('created_at').defaultTo(knex.fn.now());
        t.foreign('dep_id').references('id').inTable('sms_department').onDelete('CASCADE');
        t.foreign('mac_id').references('id').inTable('sms_machine').onDelete('CASCADE');
        // Table Default Fields
        t.string('created_by').notNullable();
        t.timestamp('updated_at').defaultTo(knex.fn.now());
        t.string('updated_by').notNullable();
        t.integer('version_no').defaultTo(1);
        t.boolean('status').defaultTo(true);
        t.decimal('sort_order_no').defaultTo(0);
      }),
      //@sms_schedule
        knex.schema.createTable('sms_schedule', (t) => {
          t.increments().primary();
          t.integer('comp_id').unsigned().notNullable();
          t.string('start_date').notNullable();
          t.string('end_date').notNullable();
          t.string('ammount').notNullable();
          t.string('service_charge').notNullable();
          t.string('job_title').notNullable();
          t.boolean('inspection').defaultTo(true);
          t.boolean('watching_list').defaultTo(true);
          t.string('job_status').notNullable();
          t.string('job_code').notNullable().unique();
          t.string('schedule_status');
          t.text('j_description');
          t.boolean('status').defaultTo(false);
          t.foreign('comp_id').references('id').inTable('sms_complain').onDelete('CASCADE');
          // Table Default Fields
          t.timestamp('created_at').defaultTo(knex.fn.now());
          t.string('created_by').notNullable();
          t.timestamp('updated_at').defaultTo(knex.fn.now());
          t.string('updated_by').notNullable();
          t.integer('version_no').defaultTo(1);

          t.decimal('sort_order_no').defaultTo(0);
        }),
      //@sms_machine
      knex.schema.createTable('sms_machine', (t) => {
          t.increments().primary();
          t.string('fup').unique().notNullable();
          t.string('location').notNullable();
          t.string('machine_engine_serial_no').notNullable().unique();
          t.integer('mod_id').unsigned().notNullable();
          t.string('machine_serial_no').notNullable().unique();
          t.string('workinghr');
          t.string('wyear');
          t.foreign('mod_id').references('id').inTable('sms_model').onDelete('CASCADE');


          // Table Default Fields
          t.timestamp('created_at').defaultTo(knex.fn.now());
          t.string('created_by').notNullable();
          t.timestamp('updated_at').defaultTo(knex.fn.now());
          t.string('updated_by').notNullable();
          t.integer('version_no').defaultTo(1);
          t.boolean('status').defaultTo(true);
          t.decimal('sort_order_no').defaultTo(0);
      }),
    //@sms_model
    knex.schema.createTable('sms_model', (t) => {
        t.increments().primary();
        t.string('model_no').notNullable().unique();
        t.text('description');
        // Table Default Fields
        t.timestamp('created_at').defaultTo(knex.fn.now());
        t.string('created_by').notNullable();
        t.timestamp('updated_at').defaultTo(knex.fn.now());
        t.string('updated_by').notNullable();
        t.integer('version_no').defaultTo(1);
        t.boolean('status').defaultTo(true);
        t.decimal('sort_order_no').defaultTo(0);
      }),
    //@sms_role
    knex.schema.createTable('sms_role', (t) => {
      t.increments();
      t.string('name').notNullable().unique();
      t.string('description');

      // Table Default Fields
      t.timestamp('created_at').defaultTo(knex.fn.now());
      t.string('created_by').notNullable();
      t.timestamp('updated_at').defaultTo(knex.fn.now());
      t.string('updated_by').notNullable();
      t.integer('version_no').defaultTo(1);
      t.boolean('status').defaultTo(true);
      t.decimal('sort_order_no').defaultTo(0);
    }),

    //sms_prm
    knex.schema.createTable('sms_prm', (t) => {
      t.increments();
      t.string('name').notNullable().unique();
      t.text('description');

      // Table Default Fields
      t.timestamp('created_at').defaultTo(knex.fn.now());
      t.string('created_by').notNullable();
      t.timestamp('updated_at').defaultTo(knex.fn.now());
      t.string('updated_by').notNullable();
      t.integer('version_no').defaultTo(1);
      t.boolean('status').defaultTo(true);
      t.decimal('sort_order_no').defaultTo(0);
    }),

    knex.schema.createTable('sms_role_prm', (t) => {
      t.increments();
      t.integer('permission_id').unsigned().notNullable();
      t.integer('role_id').unsigned().notNullable();

      t.foreign('permission_id').references('id').inTable('sms_prm').onDelete('CASCADE');;
      t.foreign('role_id').references('id').inTable('sms_role').onDelete('CASCADE');;
    }),
    //@sms_position
    knex.schema.createTable('sms_position', (t) => {
        t.increments().primary();
        t.string('name').notNullable().unique();
        t.text('description');
        // Table Default Fields
        t.timestamp('created_at').defaultTo(knex.fn.now());
        t.string('created_by').notNullable();
        t.timestamp('updated_at').defaultTo(knex.fn.now());
        t.string('updated_by').notNullable();
        t.integer('version_no').defaultTo(1);
        t.boolean('status').defaultTo(true);
        t.decimal('sort_order_no').defaultTo(0);
      }),
    //@sms_department
    knex.schema.createTable('sms_department', (t) => {
        t.increments().primary();
        t.string('name').notNullable().unique();
        t.string('dcode').notNullable().unique();
        t.text('description');
        // Table Default Fields
        t.timestamp('created_at').defaultTo(knex.fn.now());
        t.string('created_by').notNullable();
        t.timestamp('updated_at').defaultTo(knex.fn.now());
        t.string('updated_by').notNullable();
        t.integer('version_no').defaultTo(1);
        t.boolean('status').defaultTo(true);
        t.decimal('sort_order_no').defaultTo(0);
      }),
      knex.schema.createTable('sms_public', (t) => {
        t.increments().primary();
        t.string('name').notNullable().unique();
        t.string('email').notNullable().unique();
        t.text('address');
        t.string('phone').notNullable();
        // Table Default Fields
        t.integer('version_no').defaultTo(1);
        t.timestamp('created_at').defaultTo(knex.fn.now());
        t.timestamp('updated_at').defaultTo(knex.fn.now());
        t.string('created_by').notNullable();
        t.boolean('status').defaultTo(true);
        t.string('updated_by').notNullable();
        t.decimal('sort_order_no').defaultTo(0);
        })
]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('sms_employee'),
        knex.schema.dropTable('sms_machine'),
        knex.schema.dropTable('sms_schedule'),
        knex.schema.dropTable('sms_dailyreport'),
        knex.schema.dropTable('sms_asschedule'),
        knex.schema.dropTable('sms_complain'),
        knex.schema.dropTable('sms_model'),
        knex.schema.dropTable('sms_position'),
        knex.schema.dropTable('sms_department'),
        knex.schema.dropTable('sms_mdul'),
        knex.schema.dropTable('sms_role'),
        knex.schema.dropTable('sms_role_prm'),
        knex.schema.dropTable('sms_prm_mdul'),
        knex.schema.dropTable('sms_usr_role'),
        knex.schema.dropTable('sms_public')
        ]);
};
