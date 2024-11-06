import 'dotenv/config';

//=========================================================================================================
const DATABASE_CONFIG = {
  development: {
    username: process.env.MARIADB_USER!,
    password: process.env.MARIADB_PASS!,
    database: process.env.MARIADB_DBNAME!,
    host: process.env.MARIADB_IP!,
    port: parseInt(process.env.MARIADB_PORT!),
  },
};

export default DATABASE_CONFIG;