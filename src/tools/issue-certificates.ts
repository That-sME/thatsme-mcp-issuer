import { z } from 'zod';
import { apiCall } from '../client.js';

export const issueCertificatesTool = {
  name: 'issue_certificates',
  description:
    'Issue digital certificates to a list of recipients for a ' +
    'specific event. Each recipient receives a 3D badge via ' +
    'email (and WhatsApp if enabled). Requires PRO plan or higher. ' +
    'Returns emission_id and status per recipient.',
  schema: {
    event_id: z.string().describe('The event ID to issue certificates for'),
    badge_id: z.string().describe('The badge/TM ID to use for this emission'),
    recipients: z
      .array(
        z.object({
          email: z.string().describe('Recipient email address'),
          name: z.string().describe('Recipient full name'),
          reason: z
            .string()
            .optional()
            .describe('Why this person is receiving the certificate'),
        }),
      )
      .describe('List of recipients (max 500 per call)'),
  },
  handler: async (args: {
    event_id: string;
    badge_id: string;
    recipients: Array<{ email: string; name: string; reason?: string }>;
  }) => {
    if (args.recipients.length === 0) {
      return {
        content: [
          { type: 'text' as const, text: JSON.stringify({ error: 'recipients list is empty' }) },
        ],
      };
    }

    if (args.recipients.length > 500) {
      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify({ error: 'Max 500 recipients per call. Split into batches.' }),
          },
        ],
      };
    }

    try {
      const data = await apiCall<any>('/v1.0/emissions', {
        method: 'POST',
        body: JSON.stringify({
          event_id: args.event_id,
          badge_id: args.badge_id,
          recipients: args.recipients.map((r) => ({
            recipient_email: r.email,
            recipient_name: r.name,
            reason: r.reason || '',
          })),
        }),
      });

      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify({
              emission_id: data.emission_id,
              total_sent: data.total_sent || args.recipients.length,
              status: data.status || 'processing',
              results: data.results,
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
