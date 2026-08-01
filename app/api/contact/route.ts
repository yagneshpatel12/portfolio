import { Resend } from "resend";

// Resend's test sender can only deliver to the address that owns the account,
// which is exactly what a contact form needs. Swap CONTACT_FROM for a verified
// domain address later without touching this file.
const FROM = process.env.CONTACT_FROM ?? "Portfolio <onboarding@resend.dev>";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

const escape = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;

  if (!apiKey || !to) {
    console.error("Contact form: RESEND_API_KEY or CONTACT_TO is missing.");
    return Response.json(
      { ok: false, error: "Email isn't configured yet." },
      { status: 500 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Bad request." }, { status: 400 });
  }

  const str = (key: string) =>
    typeof body[key] === "string" ? (body[key] as string).trim() : "";

  // Bots fill hidden fields. Answer 200 so they don't learn anything.
  if (str("website")) return Response.json({ ok: true });

  const name = str("name");
  const email = str("email");
  const message = str("message");
  const intent = str("intent") || "Enquiry";
  const company = str("company");
  const timing = str("timing");

  if (
    !name ||
    !email ||
    message.length < 10 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)
  ) {
    return Response.json(
      { ok: false, error: "Please check the form and try again." },
      { status: 422 }
    );
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (rateLimited(ip)) {
    return Response.json(
      { ok: false, error: "Too many messages. Try again in a little while." },
      { status: 429 }
    );
  }

  const lines = [
    `Looking for: ${intent}`,
    `Name: ${name}`,
    `Email: ${email}`,
    company && `Company: ${company}`,
    timing && `Timing: ${timing}`,
    "",
    message,
  ].filter(Boolean) as string[];

  const FONT =
    "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";
  const firstName = name.split(" ")[0];
  const sentAt = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });

  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:0 0 12px;font:600 11px/1.4 ${FONT};letter-spacing:.12em;text-transform:uppercase;color:#8A9689;white-space:nowrap;vertical-align:top;width:96px">${label}</td>
      <td style="padding:0 0 12px;font:400 15px/1.5 ${FONT};color:#0E2A21;vertical-align:top">${value}</td>
    </tr>`;

  const html = `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light only"></head>
<body style="margin:0;padding:0;background:#F7F5EF;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0">${escape(
    `${name}${company ? ` · ${company}` : ""} — ${message.slice(0, 90)}`
  )}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#F7F5EF">
    <tr><td align="center" style="padding:28px 12px">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background:#FFFFFF;border:1px solid #E3DFD1;border-radius:18px;overflow:hidden">

        <tr><td style="background:#0B3B2E;padding:26px 28px">
          <p style="margin:0 0 10px;font:700 11px/1 ${FONT};letter-spacing:.18em;text-transform:uppercase;color:#FFC12B">New enquiry</p>
          <h1 style="margin:0;font:700 24px/1.2 ${FONT};letter-spacing:-.02em;color:#F7F5EF">${escape(
            intent
          )}</h1>
          <p style="margin:10px 0 0;font:400 13px/1.4 ${FONT};color:rgba(247,245,239,.6)">yagneshpateldev.com &middot; ${sentAt} IST</p>
        </td></tr>

        <tr><td style="padding:26px 28px 4px">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
            ${row("Name", `<strong style="font-weight:700">${escape(name)}</strong>`)}
            ${row(
              "Email",
              `<a href="mailto:${escape(
                email
              )}" style="color:#FF5A24;text-decoration:none;font-weight:600">${escape(
                email
              )}</a>`
            )}
            ${company ? row("Company", escape(company)) : ""}
            ${timing ? row("Timing", escape(timing)) : ""}
          </table>
        </td></tr>

        <tr><td style="padding:8px 28px 0">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#F7F5EF;border-radius:12px">
            <tr>
              <td width="4" style="background:#FF5A24;border-radius:12px 0 0 12px"></td>
              <td style="padding:18px 20px;font:400 15px/1.65 ${FONT};color:#0E2A21">${escape(
                message
              ).replace(/\n/g, "<br>")}</td>
            </tr>
          </table>
        </td></tr>

        <tr><td style="padding:24px 28px 28px">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0">
            <tr><td align="center" bgcolor="#FF5A24" style="border-radius:999px">
              <a href="mailto:${escape(email)}?subject=${encodeURIComponent(
                `Re: ${intent}`
              )}" style="display:inline-block;padding:13px 26px;font:600 15px/1 ${FONT};color:#FFFFFF;text-decoration:none;border-radius:999px">Reply to ${escape(
                firstName
              )}</a>
            </td></tr>
          </table>
          <p style="margin:14px 0 0;font:400 13px/1.5 ${FONT};color:#8A9689">Or just hit reply. This email is addressed back to ${escape(
            firstName
          )}.</p>
        </td></tr>

        <tr><td style="background:#F7F5EF;border-top:1px solid #E3DFD1;padding:16px 28px">
          <p style="margin:0;font:400 12px/1.5 ${FONT};color:#8A9689">Sent from the contact form on yagneshpateldev.com</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM,
      to: [to],
      replyTo: email,
      subject: `${intent} — ${name}`,
      text: lines.join("\n"),
      html,
    });

    if (error) {
      console.error("Contact form: Resend rejected the send.", error);
      return Response.json(
        { ok: false, error: "The message didn't go through." },
        { status: 502 }
      );
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("Contact form: send failed.", err);
    return Response.json(
      { ok: false, error: "The message didn't go through." },
      { status: 500 }
    );
  }
}
