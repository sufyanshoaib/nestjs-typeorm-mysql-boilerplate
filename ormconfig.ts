import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";

const config: MysqlConnectionOptions = {
    type: "mysql",
    "host": "127.0.0.1",
    "port": 3306,
    "username": "root",
    "password": "root",
    "database": "testdb",
    "synchronize": true,
    "logging": true,
    "entities": [
        "dist/src/**/**/*.entity.js"
    ],
    "migrations": [
        'dist/src/db/migrations/*.js' //Tell Typeorm where the migration scripts are
    ],
    "cli" : {
        migrationsDir : 'src/db/migrations'
    }


}

export default config;