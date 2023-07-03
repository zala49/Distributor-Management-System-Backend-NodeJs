export let environment: 'development' = 'development';

type dbConfigType = {
    host: string,
    username: string,
    port: number,
    password: string,
    database: string,
    dialect: string,
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
    host: "localhost",
    username: "postgres",
    port: 5432,
    password: "7401",
    database: "DMS",
    dialect: "postgres",
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