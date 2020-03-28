
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('sms_assign_schedule', t => {
            t.increments();
            t.integer('complain_id').unsigned().notNullable();
            t.datetime('start_date').notNullable(); 
            t.datetime('end_date').notNullable();                     
            t.double('service_charge');
            t.double('amount').notNullable();
            t.double('job_code').notNullable();
            t.string('job_status').notNullable();
            t.string('job_title').notNullable();
            t.string('inspection');
            t.string('watchingList');
            t.string('description');
            t.foreign('complain_id').references('id')
                .inTable('sms_complain');
            
            // Table Default Fields
            t.timestamp('created_at').defaultTo(knex.fn.now());
            t.string('created_by').notNullable();
            t.timestamp('updated_at').defaultTo(knex.fn.now());
            t.string('updated_by').notNullable();
            t.integer('version_no').defaultTo(1);
            t.string('status').defaultTo("ACTIVE");
            t.decimal('sort_order_no').defaultTo(0);
        }),

        knex.schema.createTable('sms_assign_employee', t => {
            t.increments();
            t.integer('employee_id').unsigned().notNullable();
            t.integer('assign_schedule_id').unsigned().notNullable();
            t.double('job_code').notNullable();
            t.foreign('employee_id').references('id').inTable('sms_employee');
            t.foreign('assign_schedule_id').references('id').inTable('sms_assign_schedule');

            // Table Default Fields
            t.timestamp('created_at').defaultTo(knex.fn.now());
            t.string('created_by').notNullable();
            t.timestamp('updated_at').defaultTo(knex.fn.now());
            t.string('updated_by').notNullable();
            t.integer('version_no').defaultTo(1);
            t.string('status').defaultTo("ACTIVE");
            t.decimal('sort_order_no').defaultTo(0);
        })
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('sms_assign_schedule'),
        knex.schema.dropTable('sms_assign_employee')
    ]);
};
