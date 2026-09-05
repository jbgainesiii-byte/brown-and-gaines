import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
export const inquiries = sqliteTable("inquiries", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  business: text("business").notNull(),
  interest: text("interest").notNull(),
  message: text("message").notNull(),
  source: text("source").notNull().default("website"),
  intakeJson: text("intake_json"),
  status: text("status").notNull().default("new"),
  createdAt: integer("created_at").notNull(),
});
