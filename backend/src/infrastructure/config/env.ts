import path from "node:path";
import dotenv from "dotenv";

dotenv.config();
export const env = () => {
  return {
    MYSQL_HOST: process.env.MYSQL_HOST || "",
    MYSQL_USER: process.env.MYSQL_USER || "",
    MYSQL_PASSWORD: process.env.MYSQL_PASSWORD || "",
    MYSQL_DATABASE: process.env.MYSQL_DATABASE || "",
    PORT: process.env.PORT || "",
    API_VERSION: process.env.API_VERSION || "",
    WEB_DOMAIN: process.env.WEB_DOMAIN || "",
    WS_PORT: process.env.WS_PORT || "",
  };
};
