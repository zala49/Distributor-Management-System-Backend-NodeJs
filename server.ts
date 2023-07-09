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
import { checkJWT } from "./app/middlewares/auth.middleware";

dotenv.config();

const app: Express = express();
const server = http.createServer(app);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

const port = process.env.PORT ?? 8000;
app.use(ErrorHandlerMiddleware.handler);


app.use("/api/user", UserRoute);
app.use(checkJWT);
app.use("/api/city", CityRoute);
app.use("/api/product", ProductRoute);
app.use("/api/order", OrderRoute);
app.use("/api/merchant", MerchantRoute);
app.use("/api/distributor", DistributorRoute);

server.listen(port, () => {
  console.log(`⚡️[server]: Server and Socket is running at http://localhost:${port}`)
});