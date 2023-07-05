import express, { Express } from "express";
import dotenv from "dotenv";
import http from 'http';
import cors from "cors";
import { ErrorHandlerMiddleware } from "./app/middlewares/errorHandlerMiddleware";
import UserRoute from './app/router/userInfo.route';
import CityRoute from './app/router/city.router';
import ProductRoute from './app/router/product.router';
import OrderRoute from './app/router/order.router';
import MerchantRoute from './app/router/merchant.route';
import DistributorRoute from './app/router/distributor.route';
// import { auth } from 'express-oauth2-jwt-bearer';


dotenv.config();

const app: Express = express();
const server = http.createServer(app);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());


const port = process.env.PORT ?? 8000;
// const getJwtCheck = auth({
//   audience: 'http://localhost:4200',
//   issuerBaseURL: 'https://dev-2x5ceivn4roumjbl.us.auth0.com/',
//   tokenSigningAlg: 'RS256'
// });
// app.use(getJwtCheck);
app.use(ErrorHandlerMiddleware.handler);


app.use("/api/user", UserRoute);
app.use("/api/city", CityRoute);
app.use("/api/product", ProductRoute);
app.use("/api/order", OrderRoute);
app.use("/api/merchant", MerchantRoute);
app.use("/api/distributor", DistributorRoute);

server.listen(port, () => {
  console.log(`⚡️[server]: Server and Socket is running at http://localhost:${port}`)
});


// const axios = require('axios');


// const getToken = async () => {
//   try {
//     const response = await axios.post(`https://${process.env.AUTH0_DOMAIN}/oauth/token`, {
//       grant_type: 'client_credentials',
//       client_id: development.managementApiCred.client_id,
//       client_secret: development.managementApiCred.client_secret,
//       audience: development.managementApiCred.audience,
//     });
//     return response.data.access_token;
//   } catch (error: any) {
//      console.log("sorry got error!")
//   }
// };

// getToken()
//   .then(token => {
//     console.log('Access Token:', token);
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });