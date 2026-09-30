import { v } from "convex/values";
import { mutation, action } from "./_generated/server";
import { api } from "./_generated/api";

export const join = mutation({
    args: {
        email: v.string(),
        trade: v.string(),
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("waiting_list", {
            email: args.email,
            trade: args.trade,
            createdAt: Date.now(),
        });
    },
});

export const submit = action({
    args: {
        email: v.string(),
        trade: v.string(),
    },
    handler: async (ctx, args) => {
        // 1. Store in Convex
        await ctx.runMutation(api.waitingList.join, {
            email: args.email,
            trade: args.trade,
        });

        // 2. Send email via Resend
        const apiKey = process.env.RESEND_API_KEY;
        const notifyEmail = process.env.NOTIFY_EMAIL;

        if (!apiKey || !notifyEmail) {
            console.log("Missing RESEND_API_KEY or NOTIFY_EMAIL env vars");
            return;
        }

        try {
            await fetch("https://api.resend.com/emails", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    from: "PriceM8 Waiting List <no-reply@pricem8.uk>",
                    to: [notifyEmail],
                    subject: `New Waiting List Sign-up: ${args.email}`,
                    html: `
            <h2>New User on Waiting List</h2>
            <p><b>Email:</b> ${args.email}</p>
            <p><b>Trade:</b> ${args.trade}</p>
            <p><b>Time:</b> ${new Date().toLocaleString()}</p>
          `,
                }),
            });
        } catch (error) {
            console.error("Failed to send email:", error);
            // We don't throw here so the user still sees success if DB write worked
        }
    },
});
