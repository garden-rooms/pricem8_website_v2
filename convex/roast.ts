import { v } from "convex/values";
import { mutation, action } from "./_generated/server";
import { api } from "./_generated/api";

// Mutation to generate an upload URL for file uploads
export const generateUploadUrl = mutation(async (ctx) => {
    return await ctx.storage.generateUploadUrl();
});

// Mutation to save the submission to the database
export const saveSubmission = mutation({
    args: {
        email: v.string(),
        quoteText: v.string(),
        storageId: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("roast_submissions", {
            email: args.email,
            quoteText: args.quoteText,
            storageId: args.storageId,
            status: "pending",
            createdAt: Date.now(),
        });
    },
});

// Action to coordinate the submission notification
export const submit = action({
    args: {
        email: v.string(),
        quoteText: v.string(),
        storageId: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        "use node";
        // 1. Save data to Convex DB
        await ctx.runMutation(api.roast.saveSubmission, {
            email: args.email,
            quoteText: args.quoteText,
            storageId: args.storageId,
        });

        // 2. Get file URL if it exists
        let fileUrl = null;
        if (args.storageId) {
            fileUrl = await ctx.storage.getUrl(args.storageId);
        }

        // 3. Send email via Resend
        const apiKey = process.env.RESEND_API_KEY;
        const notifyEmail = process.env.NOTIFY_EMAIL;

        if (!apiKey || !notifyEmail) {
            console.log("Missing RESEND_API_KEY or NOTIFY_EMAIL env vars");
            return;
        }

        try {
            const emailBody = `
        <h2>New Roast Request Received!</h2>
        <p><b>Email:</b> ${args.email}</p>
        <p><b>Quote Text:</b></p>
        <pre style="background: #f4f4f5; padding: 12px; border-radius: 6px;">${args.quoteText}</pre>
        ${fileUrl ? `<p><a href="${fileUrl}" style="color: #0f766e; font-weight: bold;">View Uploaded File</a></p>` : "<p>No file uploaded.</p>"}
        <p><b>Time:</b> ${new Date().toLocaleString()}</p>
      `;

            await fetch("https://api.resend.com/emails", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    from: "PriceM8 Roasts <no-reply@pricem8.uk>",
                    to: [notifyEmail],
                    subject: `Roast Request from ${args.email}`,
                    html: emailBody,
                }),
            });
        } catch (error) {
            console.error("Failed to send email:", error);
        }
    },
});
