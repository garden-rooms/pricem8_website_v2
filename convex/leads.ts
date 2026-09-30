import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createFromInbound = mutation({
  args: {
    emailId: v.string(),
    from: v.string(),
    to: v.string(),
    subject: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("inbound_leads", {
      ...args,
      createdAt: Date.now(),
    });
  },
});
