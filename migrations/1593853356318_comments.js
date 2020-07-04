/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('comments', {
        id: {
            type: 'INTEGER',
            notNUll:true
        },
        comment: {
            type: 'VARCHAR(500)',
            notNUll:true
        },
        created: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp')
        }
    })
};

exports.down = pgm => {};
