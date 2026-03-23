import { z } from 'zod';
import { apiCall } from '../client.js';

export const listRecipientsTool = {
  name: 'list_recipients',
  description:
    'List recipients for a specific event with their certificate ' +
    'status (pending, accepted, refused). Paginated, max 50 per ' +
    'page. Emails are partially masked for privacy. ' +
    'Requires PRO plan or higher.',
  schema: {
    event_id: z.string().describe('The event ID to list recipients for'),
    page: z.number().optional().describe('Page number (default 1)'),
    status: z
      .enum(['all', 'accepted', 'pending', 'refused'])
      .optional()
      .describe('Filter by acceptance status (default: all)'),
  },
  handler: async (args: {
    event_id: string;
    page?: number;
    status?: string;
  }) => {
    const params = new URLSearchParams();
    params.set('page', String(args.page || 1));
    if (args.status && args.status !== 'all') {
      params.set('status', args.status.toUpperCase());
    }

    try {
      const data = await apiCall<any>(
        `/dashboard/winners/${args.event_id}?${params.toString()}`,
      );

      const recipients = (data.winners || []).map((w: any) => ({
        name: w.name || w.full_name,
        email: maskEmail(w.email),
        status: w.status,
        badge_name: w.badge_name,
        issued_at: w.created_at,
      }));

      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify({
              event_id: args.event_id,
              page: args.page || 1,
              total: data.total,
              recipients,
            }),
          },
        ],
      };
    } catch (err: any) {
      return {
        content: [
          { type: 'text' as const, text: JSON.stringify({ error: err.message }) },
        ],
      };
    }
  },
};

function maskEmail(email: string): string {
  if (!email) return '';
  const [local, domain] = email.split('@');
  if (!domain) return email;
  const visible = local.slice(0, 2);
  return `${visible}***@${domain}`;
}
