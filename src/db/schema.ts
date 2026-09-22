import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const reservations = pgTable("reservations", {
  id: serial("id").primaryKey(),
  date: text("date").notNull(),
  time: text("time").notNull(),
  partySize: text("party_size").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  notes: text("notes"),
  status: text("status", { enum: ["pending", "approved", "declined"] })
    .notNull()
    .default("pending"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type Reservation = typeof reservations.$inferSelect;
export type NewReservation = typeof reservations.$inferInsert;
