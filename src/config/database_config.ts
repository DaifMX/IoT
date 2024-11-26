import 'dotenv/config';

//=========================================================================================================
const DATABASE_CONFIG = {
  production: {
    username: process.env.MARIADB_USER!,
    password: process.env.MARIADB_PASS!,
    database: process.env.MARIADB_DBNAME!,
    host: process.env.MARIADB_IP!,
    port: parseInt(process.env.MARIADB_PORT!),
  },
  development: {
    username: process.env.POSTGRES_USER!,
    password: process.env.POSTGRES_PASS!,
    database: process.env.POSTGRES_DBNAME!,
    host: process.env.POSTGRES_IP!,
    port: parseInt(process.env.POSTGRES_PORT!),
  },
};

export default DATABASE_CONFIG;