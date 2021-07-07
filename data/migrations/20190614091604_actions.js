exports.up = function(knex, Promise) {
    return knex.schema.createTable('actions', tbl => {
        tbl.increments();
          tbl
             .string('description', 255)
             .notNullable()
          tbl
             .string('notes', 255)
             .notNullable()
  
           tbl
              .integer('project_id')
              .unsigned()
              .references('id')
              .inTable('projects')
              .onDelete('CASCADE') 
              .onUpdate('CASCADE');

            tbl
              .boolean('completed')
              .defaultTo(false);
      })
  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('actions')
  
};