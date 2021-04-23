import databaseConfig from './database.json'
interface IDatabaseConfig {
    username: string;
    password: string;
    database: string;
    host: string;
    dialect: 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'mariadb';
    timezone: string;
}

const configs = {
    development: {
        server: {
            host: '10.90.25.60',
            port: 3001
        },
        database: databaseConfig.development as IDatabaseConfig,
        jwt: {
            privateKey: 'ebscn'
        }
    },
    test: {
        server: {
            host: '10.90.25.60',
            port: 3001
        },
        database: databaseConfig.test as IDatabaseConfig,
        jwt: {
            privateKey: 'ebscn'
        }
    },
    production: {
        server: {
            host: '10.90.25.60',
            port: 3001
        },
        database: databaseConfig.production as IDatabaseConfig,
        jwt: {
            privateKey: 'ebscn'
        }
    },
}
type configKeys = keyof typeof configs;
const NODE_EVN = process.env.NODE_EVN as configKeys || 'development';
export default configs[NODE_EVN]