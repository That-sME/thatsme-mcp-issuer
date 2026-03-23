import { z } from 'zod';
import { apiCall } from '../client.js';

export const searchEventsTool = {
  name: 'search_events',
  description:
    'Search events created by your organization in thatsme. ' +
    'Use to find a specific event before issuing certificates or ' +
    'checking engagement. Returns event_id, name, date, ' +
    'and total emissions count.',
  schema: {
    query: z.string().describe('Event name to search'),
    limit: z
      .number()
      .optional()
      .describe('Max results (default 10, max 50)'),
  },
  handler: async (args: { query: string; limit?: number }) => {
    const limit = Math.min(args.limit || 10, 50);
    const params = new URLSearchParams();
    if (args.query) params.set('search', args.query);
    params.set('limit', String(limit));

    try {
      const data = await apiCall<any>(
        `/dashboard/events/list?${params.toString()}`,
      );

      const events = (data.events || []).map((e: any) => ({
        event_id: e.event_id,
        name: e.name,
        category: e.category,
        date: e.initial_date,
        status: e.status,
        total_emissions: e.certificate_count || 0,
        badges: (e.badges || []).map((b: any) => ({
          badge_id: b.badge_id,
          name: b.name,
        })),
      }));

      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify({ total: data.total || events.length, events }),
          },
        ],
      };
    } catch (err: any) {
      return {
        content: [
          { type: 'text' as const, text: JSON.stringify({ error: err.message, events: [] }) },
        ],
      };
    }
  },
};
