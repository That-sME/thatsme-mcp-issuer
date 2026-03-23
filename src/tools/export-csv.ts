import { z } from 'zod';
import { config } from '../config.js';

export const exportCsvTool = {
  name: 'export_csv',
  description:
    'Export emission data for all events as a CSV file. ' +
    'Returns the CSV content as a string. Each row is one event ' +
    'with: name, total issued, accepted, acceptance rate, ' +
    'last emission date. Requires PRO plan or higher.',
  schema: {
    period: z
      .enum(['30d', '90d', 'all'])
      .optional()
      .describe('Time period to export (default: 30d)'),
  },
  handler: async (args: { period?: string }) => {
    const params = new URLSearchParams();
    params.set('period', args.period || '30d');

    try {
      const res = await fetch(
        `${config.apiUrl}/dashboard/export/csv?${params.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${config.apiKey}`,
          },
        },
      );

      if (!res.ok) {
        const body = await res.text();
        throw new Error(`thatsme API error ${res.status}: ${body}`);
      }

      const csv = await res.text();

      return {
        content: [{ type: 'text' as const, text: csv }],
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
