// app/delete-account/page.tsx
// Account & data deletion page for iClose — served at /delete-account.
// Server component (no "use client" needed). Self-contained styles so it
// renders correctly whether or not the site uses Tailwind.

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Delete your account · iClose',
  description: 'How to delete your iClose account and what data is removed or retained.',
};

const styles = `
  .del-root { --bg:#000; --ink:#f5f5f7; --muted:#a1a1a6; --faint:#6e6e73; --lime:#9eff00; --card:#0d0d0f; --hair:#1c1c1f;
    background:var(--bg); color:var(--ink); min-height:100vh;
    font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; -webkit-font-smoothing:antialiased; position:relative; }
  .del-root::before { content:''; position:fixed; inset:0; z-index:0; pointer-events:none;
    background:radial-gradient(80% 55% at 22% 8%, rgba(158,255,0,0.14), rgba(158,255,0,0.03) 45%, transparent 75%); }
  .del-wrap { position:relative; z-index:1; max-width:720px; margin:0 auto; padding:48px 24px 96px; }
  .del-brand { font-weight:800; font-size:22px; letter-spacing:-.5px; }
  .del-brand .dot { color:var(--lime); }
  .del-root h1 { font-family:'Anton','Inter',sans-serif; font-weight:400; font-size:clamp(38px,8vw,64px); line-height:1.02;
    letter-spacing:.5px; margin:40px 0 14px; text-transform:uppercase; }
  .del-root h1 .lime { color:var(--lime); }
  .del-lede { color:var(--muted); font-size:17px; line-height:1.6; margin:0 0 40px; max-width:60ch; }
  .del-root h2 { font-size:14px; font-weight:600; text-transform:uppercase; letter-spacing:1.2px; color:var(--lime); margin:40px 0 14px; }
  .del-root p { color:var(--muted); font-size:16px; line-height:1.65; }
  .del-card { background:var(--card); border:1px solid var(--hair); border-radius:18px; padding:24px 26px; margin:16px 0; }
  .del-steps { counter-reset:s; list-style:none; margin:0; padding:0; }
  .del-steps li { counter-increment:s; position:relative; padding:14px 0 14px 46px; border-bottom:1px solid var(--hair);
    color:var(--ink); font-size:16px; line-height:1.5; }
  .del-steps li:last-child { border-bottom:0; }
  .del-steps li::before { content:counter(s); position:absolute; left:0; top:12px; width:30px; height:30px; border-radius:50%;
    background:var(--lime); color:#000; font-weight:800; font-size:14px; display:flex; align-items:center; justify-content:center; }
  .del-list { margin:0; padding:0; list-style:none; }
  .del-list li { padding:9px 0 9px 26px; position:relative; color:var(--ink); font-size:15.5px; line-height:1.5; border-bottom:1px solid var(--hair); }
  .del-list li:last-child { border-bottom:0; }
  .del-list li::before { content:''; position:absolute; left:2px; top:16px; width:7px; height:7px; border-radius:50%; background:var(--lime); }
  .del-list.retain li::before { background:var(--faint); }
  .del-root a { color:var(--lime); text-decoration:none; }
  .del-root a:hover { text-decoration:underline; }
  .del-root strong { color:var(--ink); font-weight:600; }
  .del-foot { margin-top:64px; padding-top:24px; border-top:1px solid var(--hair); color:var(--faint); font-size:13px; }
`;

export default function DeleteAccountPage() {
  return (
    <main className="del-root">
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="del-wrap">
        <div className="del-brand">iClose<span className="dot">.</span></div>

        <h1>Delete your <span className="lime">account</span></h1>
        <p className="del-lede">
          You can permanently delete your iClose account and its associated data at any time — directly in the
          app, or by contacting us. Here&rsquo;s exactly how it works and what happens to your data.
        </p>

        <h2>Delete from within the app</h2>
        <div className="del-card">
          <ol className="del-steps">
            <li>Open the iClose app and sign in.</li>
            <li>Go to <strong>Account</strong> (bottom tab).</li>
            <li>Scroll to the bottom and tap <strong>Delete account</strong>.</li>
            <li>Confirm. Your account and personal data are permanently removed.</li>
          </ol>
        </div>

        <h2>Prefer to email us?</h2>
        <p>
          Send a deletion request from your registered email address to{' '}
          <a href="mailto:hello@iclose.ae?subject=Delete%20my%20iClose%20account">hello@iclose.ae</a>{' '}with the
          subject &ldquo;Delete my account.&rdquo; We verify ownership and complete the deletion within{' '}
          <strong>30 days</strong>.
        </p>

        <h2>What gets deleted</h2>
        <div className="del-card">
          <ul className="del-list">
            <li>Your name, email address and phone number</li>
            <li>Your profile and account settings</li>
            <li>Saved bank accounts and IBAN details</li>
            <li>Uploaded documents and verification files</li>
            <li>Your inquiries, deals and in-app activity</li>
            <li>Push notification tokens</li>
          </ul>
        </div>

        <h2>What we may retain</h2>
        <p>
          To comply with UAE anti-money-laundering, tax and real-estate regulations, we may retain a limited
          record of <strong>completed financial transactions</strong> (e.g. deal and payout records) for the
          period required by law, after which it is permanently deleted. This retained data is not used to
          identify or contact you for any other purpose.
        </p>
        <div className="del-card">
          <ul className="del-list retain">
            <li>Completed transaction / payout records — retained only as required by applicable law, then deleted</li>
          </ul>
        </div>

        <h2>Questions</h2>
        <p>
          Contact us any time at <a href="mailto:hello@iclose.ae">hello@iclose.ae</a>. See also our{' '}
          <a href="/privacy">Privacy Policy</a>.
        </p>

        <p className="del-foot">© iClose — iclose.ae · This page describes account and data deletion for the iClose mobile app.</p>
      </div>
    </main>
  );
}
