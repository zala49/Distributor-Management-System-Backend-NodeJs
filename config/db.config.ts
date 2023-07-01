import { Dialect } from 'sequelize';
import { environment, development } from './environment'

const getConfig = (env: 'development') => {
    switch (env) {
        case 'development' : {
            return {
                HOST: development.host,
                USER: development.username,
                PASSWORD: development.password,
                DB: development.database,
                dialect: development.dialect as Dialect,
                pool: {
                    max: 5,
                    min: 0,
                    acquire: 3000,
                    idle: 1000
                }
            }
        }
    }
};

export default getConfig(environment);