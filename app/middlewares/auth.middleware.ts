import { development } from "../../config/environment";
import jwt from "jsonwebtoken";

export const checkJWT = (req: any, res: any, next: any) => {
  try {
    if (req.headers.authorization != "") {
      const token = req.headers.authorization.split(" ")[1];
      const decode = jwt.verify(
        token,
        development.managementApiCred.client_secret
      );
      req.userData = decode;
      // console.log(req.userData);
    }

    next();
  } catch (error: any) {
    if(error) {
      res.status(401).send("Something went wrong!!");
    }
    // if (error.name === "JsonWebTokenError") {
    //   res.status(401).send("Invalid token");
    // } else if (error.name === "TokenExpiredError") {
    //   res.status(401).send("Token expired");
    // } else {
    //   res.status(401).send("Authentication failed");
    // }
  }
};
