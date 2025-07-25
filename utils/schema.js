import { serial, pgTable, text, varchar } from "drizzle-orm/pg-core";

export const AceThat = pgTable("mockInterview", {
  id: serial("id").primaryKey(), // PK
  jsMockResp: text("jsonMockResp").notNull(), // Correct
  jobPosition: varchar("jobPosition").notNull(), // Correct
  jobDesc: varchar("jobDesc").notNull(), // Correct
  jobExperience: varchar("jobExperience").notNull(), // Correct
  createdBy: varchar("createdBy").notNull(), // Correct
  createdAt: varchar("createdAt").notNull(), // Correct
  mockId: varchar("mockId").notNull(), // Correct
});

export const UserAnswer = pgTable("userAnswer", {
  id: serial("id").primaryKey(),
  mockIdRef: varchar("mockId").notNull(),
  question: varchar("question").notNull(),
  correctAnswer: varchar("correctAns").notNull(),
  userAns: text("userAns").notNull(),
  feedback: text("feedback").notNull(),
  rating: varchar("rating").notNull(),
  userEmail: varchar("userEmail").notNull(),
  createdAt: varchar("createdAt"),
});
