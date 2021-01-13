import { Config } from 'knex';
import { env } from './src/app/config/environment';

const config: Config = {
  client: 'pg',
  connection: env.postgresConnectionUrl,
  useNullAsDefault: true,
  migrations: {
    directory: './src/infrastructure/migrations',
    loadExtensions: ['.js', '.ts'],
  },
  seeds: {
    directory: './src/infrastructure/seeds',
  },

  // Modify this if you want to see the actual SQL queries executed thru knex
  debug: false,
};

export default config; // For application use
module.exports = config; // For CLI use
