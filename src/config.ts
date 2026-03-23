export const config = {
  apiUrl: process.env.THATSME_API_URL || 'https://service.thatsme.com.br/api',
  apiKey: process.env.THATSME_API_KEY ?? '',
};

if (!config.apiKey) {
  console.error('[thatsme-mcp-issuer] THATSME_API_KEY is required');
  process.exit(1);
}
