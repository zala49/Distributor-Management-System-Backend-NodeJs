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
        jwksUri: 'https://mbeat.us.auth0.com/.well-known/jwks.json',
        audience: 'https://mbeat.us.auth0.com/api/v2/',
        issuer: 'https://mbeat.us.auth0.com/'
    },
    managementApiCred: {
        url: 'https://mbeat.us.auth0.com/oauth/token',
        grant_type: 'client_credentials',
        client_id: 'X5RhAXjVxx2Tw8mcefvpmaF59xZBGLRn',
        client_secret: 'B19fijc1T9e7ynwye3b8pqWWk5GGiZcmklzdg7fO2iWoVd7uiKAoWc1Z5JRx9Pm1',
        audience: 'https://mbeat.us.auth0.com/api/v2/'
    }
};