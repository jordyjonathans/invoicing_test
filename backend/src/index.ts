// import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cors from "cors";

import { env } from "@infrastructure/config/env";
import orderRouter from "@infrastructure/routes/orderRoutes";
import { WSConnection } from "@infrastructure/ws/connection";
import { MysqlConnection } from "@infrastructure/database/mysql/connection";

async function main() {
  try {
    const ENV = env();
    // const UPLOAD_DIR = path.join(__dirname, env().UPLOAD_DIR);
    // if (!fs.existsSync(UPLOAD_DIR)) {
    //   fs.mkdirSync(UPLOAD_DIR);
    // }

    // await MysqlConnection.connect();

    await MysqlConnection.connect(
      ENV.MYSQL_HOST,
      ENV.MYSQL_USER,
      ENV.MYSQL_PASSWORD,
      ENV.MYSQL_DATABASE
    );

    WSConnection.connect(Number(ENV.WS_PORT));

    const app = express();

    // Middleware
    app.use(morgan("dev"));
    app.use(
      cors({
        origin: ENV.WEB_DOMAIN,
        credentials: true,
      })
    );
    app.use(express.json());

    // Routers
    app.use(`/${ENV.API_VERSION}/api/order`, orderRouter);

    app.listen(ENV.PORT, () => {
      console.log(`Server is running on Port : ${ENV.PORT}`);
    });
  } catch (ex) {
    console.log(`Failed to connect : ${ex}`);
  }
}

main();
