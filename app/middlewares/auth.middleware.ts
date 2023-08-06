import { development } from "../../config/environment";
import jwt from 'jsonwebtoken';

export const checkJWT = (req: any, res: any, next: any) => {
  try {
    if (req.headers.authorization != '') {
      const token = req.headers.authorization.split(" ")[1];
      const decode = jwt.verify(token, development.managementApiCred.client_secret);
      req.userData = decode;      
    }
    next();
  } catch (error) {
    res.status(401).send(error);
    next();
  }
};
