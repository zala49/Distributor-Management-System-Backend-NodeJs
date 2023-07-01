import * as jwt from "express-jwt";
import jwksRsa from "jwks-rsa";
import * as dotenv from "dotenv";
import { development, environment } from "../../config/environment";

dotenv.config();

// for client creds
const getCheckJwt = (env: 'development') => {
  switch (env) {
    case 'development': {
      return jwt.expressjwt({
        secret: jwksRsa.expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: development.jwtVerification.jwksUri
        }) as jwt.GetVerificationKey,
        audience: development.jwtVerification.audience,
        issuer: development.jwtVerification.issuer,
        algorithms: ['RS256']
      });
    }
  }
};
export const checkJwt = getCheckJwt(environment);