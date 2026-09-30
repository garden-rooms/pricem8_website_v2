import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  inbound_leads: defineTable({
    emailId: v.string(),
    from: v.string(),
    to: v.string(),
    subject: v.string(),
    createdAt: v.number(),
  }).index("by_createdAt", ["createdAt"]),

  waiting_list: defineTable({
    email: v.string(),
    trade: v.string(),
    createdAt: v.number(),
  }).index("by_createdAt", ["createdAt"]),

  roast_submissions: defineTable({
    email: v.string(),
    quoteText: v.string(),
    storageId: v.optional(v.string()), // For the uploaded file
    status: v.string(), // "pending", "completed"
    createdAt: v.number(),
  }).index("by_createdAt", ["createdAt"]),
});
