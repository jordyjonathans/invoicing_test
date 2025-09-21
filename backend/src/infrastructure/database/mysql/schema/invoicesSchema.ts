import { char, int, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { metaData } from "@infrastructure/database/mysql/metadata";

export const invoicesTable = mysqlTable("invoices", {
  id: int({ unsigned: true }).autoincrement().primaryKey(),
  customer: varchar({ length: 100 }).notNull(),
  salesPerson: varchar("sales_person", { length: 100 }).notNull(),
  paymentType: varchar("payment_type", { length: 100 }).notNull(),
  notes: varchar("payment_type", { length: 100 }).notNull().default(""),
  ...metaData,
});
