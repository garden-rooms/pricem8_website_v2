// convex/resendInbound.ts
import { httpAction } from "./_generated/server";
import { api } from "./_generated/api";

export const handleResendInbound = httpAction(async (ctx, request) => {
  const payload = await request.json();

  if (payload.type !== "email.received") {
    return new Response("ignored", { status: 200 });
  }

  const data = payload.data ?? {};
  const emailId: string = data.email_id;
  const from: string = data.from ?? "";
  const to: string =
    Array.isArray(data.to) && data.to.length > 0 ? data.to[0] : "";
  const subject: string = data.subject ?? "";

  // 1) Store as lead
  await ctx.runMutation(api.leads.createFromInbound, {
    emailId,
    from,
    to,
    subject,
  });

  const apiKey = process.env.RESEND_API_KEY;
  const notifyEmail = process.env.NOTIFY_EMAIL;

  if (!apiKey || !notifyEmail) {
    console.log("Missing RESEND_API_KEY or NOTIFY_EMAIL env vars");
    return new Response("ok", { status: 200 });
  }

  // 2) Fetch full received email content (TEXT + HTML)
  let fullText = "";
  let fullHtml = "";

  try {
    const res = await fetch(
      `https://api.resend.com/emails/receiving/${encodeURIComponent(emailId)}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      console.log("Failed to fetch received email", res.status, await res.text());
    } else {
      const fullEmail = await res.json();
      fullText = fullEmail?.text ?? "";
      fullHtml = fullEmail?.html ?? "";
    }
  } catch (err) {
    console.log("Error fetching received email", err);
  }

  // 3) Send notification to you
  const htmlBody = `
    <h2>New inbound email received</h2>
    <p><b>From:</b> ${from}</p>
    <p><b>To:</b> ${to}</p>
    <p><b>Subject:</b> ${subject}</p>
    <hr/>
    <h3>Plain text body:</h3>
    <pre style="white-space: pre-wrap;">${fullText || "(no text body)"}</pre>
    ${
      fullHtml
        ? `
      <hr/>
      <h3>HTML body:</h3>
      ${fullHtml}
    `
        : ""
    }
  `;

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "PriceM8 Leads <no-reply@pricem8.uk>",
      to: [notifyEmail],
      subject: `New inbound email from ${from}`,
      html: htmlBody,
    }),
  });

  return new Response("ok", { status: 200 });
});
