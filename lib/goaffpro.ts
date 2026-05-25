/**
 * GoAffPro server-side conversion reporting.
 *
 * Called from /api/lead after a successful waitlist signup. Reports a
 * zero-value order to GoAffPro so the referring affiliate gets credit
 * for the lead. Always non-throwing — failures are logged and swallowed
 * so a GoAffPro outage never breaks the waitlist itself.
 */

const GOAFFPRO_ENDPOINT = 'https://api.goaffpro.com/v1/admin/orders';

type ReportArgs = {
  referralCode: string;
  email: string;
  name: string;
  orderNumber: string;
};

export async function reportGoaffproConversion(args: ReportArgs): Promise<void> {
  const token = process.env.GOAFFPRO_ACCESS_TOKEN?.trim();
  if (!token) {
    console.warn('[goaffpro] GOAFFPRO_ACCESS_TOKEN not set — skipping');
    return;
  }
  if (!args.referralCode) {
    return;
  }

  try {
    const res = await fetch(GOAFFPRO_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goaffpro-access-token': token,
      },
      body: JSON.stringify({
        number: args.orderNumber,
        ref_code: args.referralCode,
        total: 0,
        currency: 'AED',
        customer: {
          email: args.email,
          name: args.name,
        },
        line_items: [
          {
            name: 'Waitlist signup',
            price: 0,
            quantity: 1,
          },
        ],
      }),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => '');
      console.error(
        `[goaffpro] conversion report failed: ${res.status} ${body.slice(0, 200)}`,
      );
    }
  } catch (err) {
    console.error('[goaffpro] conversion report errored:', err);
  }
}
