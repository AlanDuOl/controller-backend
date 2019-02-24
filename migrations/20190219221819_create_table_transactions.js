
exports.up = function(knex, Promise) {
    return knex.schema.createTable('transactions', table => {
        table.increments('id').unsigned().primary()
        table.integer('userId').unsigned().notNull().references('id').inTable('users').onDelete('CASCADE')
        table.string('type').notNull()
        table.string('transaction').notNull()
        table.string('description').notNull()
        table.decimal('amount', 14, 2).notNull()
        table.dateTime('transactionDate').notNull()
        table.dateTime('createdAt').notNull()
        table.dateTime('updatedAt').nullable()
        table.dateTime('deletedAt').nullable()
    })
};

exports.down = function(knex, Promise) {
    knex.schema.dropTable('transactions')
};
