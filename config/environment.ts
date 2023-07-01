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
        audience: 'http://localhost:8000/api',
        issuer: 'https://mbeat.us.auth0.com/api/v2/'
    },
    managementApiCred: {
        url: 'https://dev-2x5ceivn4roumjbl.us.auth0.com/oauth/token',
        grant_type: 'client_credentials',
        client_id: 'n2cd1KemVlQkPWEIynB0rJl8cfBnHIJs',
        client_secret: 'I2o2Ipuom31KweOIQTXkKKR8ZMuiNsgmrmijRPRfSA8OEhMXUqJv9tgikVOEn77A',
        audience: 'https://mbeat.us.auth0.com/api/v2/'
    }
};