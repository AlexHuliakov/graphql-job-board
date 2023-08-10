import knex from 'knex';

export const connection = knex({
  client: 'better-sqlite3',
  connection: {
    filename: process.env.DB_FILENAME,
  },
  useNullAsDefault: true,
});
