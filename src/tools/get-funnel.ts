import { z } from 'zod';
import { apiCall } from '../client.js';

export const getFunnelTool = {
  name: 'get_engagement_funnel',
  description:
    'Get the engagement funnel for a specific event: how many ' +
    'certificates were issued, accepted, viewed, shared on LinkedIn, ' +
    'and clicked on recommendations. Use to understand event ' +
    'performance. Requires PRO plan or higher.',
  schema: {
    event_id: z.string().describe('The event ID to get funnel data for'),
  },
  handler: async (args: { event_id: string }) => {
    try {
      const data = await apiCall<any>(`/dashboard/funnel/${args.event_id}`);

      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify({
              event_id: args.event_id,
              funnel: {
                issued: data.issued,
                accepted: data.accepted,
                viewed: data.viewed,
                shared: data.shared,
                event_url_clicks: data.event_url_clicks,
              },
              rates: {
                acceptance_rate: data.issued > 0
                  ? `${((data.accepted / data.issued) * 100).toFixed(1)}%`
                  : '0%',
                view_rate: data.accepted > 0
                  ? `${((data.viewed / data.accepted) * 100).toFixed(1)}%`
                  : '0%',
                share_rate: data.viewed > 0
                  ? `${((data.shared / data.viewed) * 100).toFixed(1)}%`
                  : '0%',
              },
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
