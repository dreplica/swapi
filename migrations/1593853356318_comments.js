/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createExtension('uuid-ossp', {
        ifNotExists: true,
    })

    pgm.createTable('comments', {
        id: {
            type: 'uuid',
            notNull: true,
            primaryKey: true,
            default: pgm.func('uuid_generate_v4()'),
            comment: 'this is the id field',
        },
        episodeid: {
            type: 'INTEGER',
            notNUll: true
        },
        comment: {
            type: 'VARCHAR(500)',
            notNUll: true
        },
        ipaddress: {
            type: 'VARCHAR(100)',
            notNUll: true
        },
        created: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp')
        }
    })
};

exports.down = pgm => {
    pgm.dropTable('comments')
    pgm.dropExtension('uuid-ossp')

};
