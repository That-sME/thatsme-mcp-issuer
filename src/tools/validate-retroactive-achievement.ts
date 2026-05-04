import { z } from 'zod';
import { apiCall } from '../client.js';

/**
 * Hugo Furtado retroactive issuance.
 *
 * The user-facing flow:
 *   1. A thatsme user adds an old achievement (e.g. a 1956 swimming title)
 *      and lists "UFMG" as the issuer. The Achievement is stored as
 *      `requires_outreach=true` and shows up in the admin issuer-leads list.
 *   2. Sales onboards the issuer Company on thatsme. The Company creates a
 *      retroactive Event and Badge in their dashboard (e.g. "UFMG — Validation
 *      Backlog 1950s").
 *   3. The issuer (or this tool, on their behalf) calls the endpoint below
 *      for each Achievement they recognise as legitimate. thatsme creates an
 *      official Post linked back to the Achievement, freezes the assertion
 *      JSON (sha256-assertion-v1), and flips Achievement.status to
 *      PROMOTED_TO_POST.
 */
export const validateRetroactiveAchievementTool = {
  name: 'validate_retroactive_achievement',
  description:
    'Issue an official retroactive certificate (Post) from a user-submitted ' +
    'unverified Achievement. The caller MUST be an admin of the Company that ' +
    'owns the provided event_id and badge_id — thatsme rejects cross-issuer ' +
    'attempts. The original conquest date is preserved on the certificate. ' +
    'Used for the Hugo Furtado lead-conversion flow.',
  schema: {
    achievement_id: z
      .string()
      .describe(
        'thatsme Achievement ID requesting verification. Find these via the ' +
          'admin issuer-leads list.',
      ),
    event_id: z
      .string()
      .describe(
        'Event owned by the issuer Company that the Achievement maps to ' +
          '(typically a "Backlog Validation" event).',
      ),
    badge_id: z
      .string()
      .describe('Badge of that Event used for the retroactive certificate.'),
    reason: z
      .string()
      .optional()
      .describe(
        "Optional override for the certificate's `reason` field. Defaults " +
          "to the Achievement's title.",
      ),
    expires_at: z
      .string()
      .optional()
      .describe('Optional ISO-8601 expiration date.'),
  },
  handler: async (args: {
    achievement_id: string;
    event_id: string;
    badge_id: string;
    reason?: string;
    expires_at?: string;
  }) => {
    try {
      const data = await apiCall<{ post_id: string; achievement_id: string }>(
        `/achievement/${encodeURIComponent(args.achievement_id)}/issue-retroactive`,
        {
          method: 'POST',
          body: JSON.stringify({
            event_id: args.event_id,
            badge_id: args.badge_id,
            reason: args.reason,
            expires_at: args.expires_at,
          }),
        },
      );
      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify({
              ok: true,
              post_id: data.post_id,
              achievement_id: data.achievement_id,
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
