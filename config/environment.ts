export let environment: 'development' = 'development';

type dbConfigType = {
    host: string,
    username: string,
    port: number,
    password: string,
    database: string,
    dialect: string,
    dev:boolean,
    jwtVerification: {
        jwksUri: string,
        audience: string,
        issuer: string,
    },
    managementApiCred: {
        url: string
        grant_type: string
        client_id: string
        client_secret: string
        audience: string
    }
};

export const development: dbConfigType = {
    // host: "localhost",
    // username: "postgres",
    // port: 5432,
    // password: "Bhavesh@1599",
    // database: "TEST",
    // dialect: "postgres",
    // dev: true,
    host: 'dpg-ciiempmnqql0tc3rbmo0-a.singapore-postgres.render.com',
    username: 'root',
    port: 5432,
    database: 'postgresdb_2d8i',
    dialect: 'postgres',
    password: 'M4obuM6MixdfqdI9W1lrhXPsH0lGN3m0',
    dev: false,
    jwtVerification: {
        jwksUri: 'https://dev-2x5ceivn4roumjbl.us.auth0.com/.well-known/jwks.json',
        audience: 'http://localhost:4200',
        issuer: 'https://dev-2x5ceivn4roumjbl.us.auth0.com/',
    },
    managementApiCred: {
        url: 'https://dev-2x5ceivn4roumjbl.us.auth0.com/oauth/token',
        grant_type: 'client_credentials',
        client_id: 'mMe017OYhbhsgUvJVZ3GWoAuxsSuJzOn',
        client_secret: 'Rla6mg6m8Bwq3Yb2vPrneqmfPoGQyP9uG1aHg6rDsFUsqFRoZKOPdsqFlssaa0yx',
        audience: 'https://dev-2x5ceivn4roumjbl.us.auth0.com/api/v2/'
    }
};