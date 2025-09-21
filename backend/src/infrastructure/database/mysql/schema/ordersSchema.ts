import { bigint, int, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { metaData } from "@infrastructure/database/mysql/metadata";
import { invoicesTable } from "./invoicesSchema";

export const ordersTable = mysqlTable("orders", {
  id: int({ unsigned: true }).autoincrement().primaryKey(),
  invoiceID: int("invoice_id", { unsigned: true })
    .notNull()
    .references(() => invoicesTable.id),
  quantity: int({ unsigned: true }).notNull(),
  totalCogs: bigint("total_cogs", { mode: "number" }).notNull(),
  totalPrice: bigint("total_price", { mode: "number" }).notNull(),
  ...metaData,
});
