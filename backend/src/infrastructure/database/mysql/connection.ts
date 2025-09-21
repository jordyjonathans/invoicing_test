import { env } from "@infrastructure/config/env";
import { drizzle, type MySql2Database } from "drizzle-orm/mysql2";
import { createPool, Pool } from "mysql2/promise";

export class MysqlConnection {
  private static instance: MysqlConnection;
  private db: MySql2Database | undefined;
  private pool: Pool | undefined;

  private constructor() {}

  private async connect(
    host: string,
    user: string,
    password: string,
    database: string
  ) {
    try {
      const poolConnection: Pool = createPool({
        host,
        user,
        password,
        database,
      });

      this.db = drizzle(poolConnection);
      this.pool = poolConnection;
    } catch (e) {}
  }

  static async connect(
    host: string,
    user: string,
    password: string,
    database: string
  ): Promise<MySql2Database> {
    if (!MysqlConnection.instance) {
      MysqlConnection.instance = new MysqlConnection();
      await MysqlConnection.instance.connect(host, user, password, database);
      console.log("MYSQL DB Connected");
    }
    return MysqlConnection.instance.db!;
  }

  static getDbInstance() {
    if (!MysqlConnection.instance || !MysqlConnection.instance.db) {
      throw new Error(
        "❌ Mysql has not been connected yet! Please connect it first."
      );
    }
    return MysqlConnection.instance.db;
  }

  static getPoolConnection() {
    if (!MysqlConnection.instance || !MysqlConnection.instance.pool) {
      throw new Error(
        "❌ Mysql has not been connected yet! Please connect it first."
      );
    }
    return MysqlConnection.instance.pool;
  }
}
