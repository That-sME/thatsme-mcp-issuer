#!/usr/bin/env node
import './config.js'; // validate API key before anything else
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { searchEventsTool } from './tools/search-events.js';
import { issueCertificatesTool } from './tools/issue-certificates.js';
import { getFunnelTool } from './tools/get-funnel.js';
import { listRecipientsTool } from './tools/list-recipients.js';
import { exportCsvTool } from './tools/export-csv.js';
import { validateRetroactiveAchievementTool } from './tools/validate-retroactive-achievement.js';

function registerTools(server: McpServer) {
  server.tool(
    searchEventsTool.name,
    searchEventsTool.description,
    searchEventsTool.schema,
    searchEventsTool.handler,
  );

  server.tool(
    issueCertificatesTool.name,
    issueCertificatesTool.description,
    issueCertificatesTool.schema,
    issueCertificatesTool.handler,
  );

  server.tool(
    getFunnelTool.name,
    getFunnelTool.description,
    getFunnelTool.schema,
    getFunnelTool.handler,
  );

  server.tool(
    listRecipientsTool.name,
    listRecipientsTool.description,
    listRecipientsTool.schema,
    listRecipientsTool.handler,
  );

  server.tool(
    exportCsvTool.name,
    exportCsvTool.description,
    exportCsvTool.schema,
    exportCsvTool.handler,
  );

  server.tool(
    validateRetroactiveAchievementTool.name,
    validateRetroactiveAchievementTool.description,
    validateRetroactiveAchievementTool.schema,
    validateRetroactiveAchievementTool.handler,
  );
}

async function main() {
  if (process.env.MCP_TRANSPORT === 'http') {
    const { StreamableHTTPServerTransport } = await import(
      '@modelcontextprotocol/sdk/server/streamableHttp.js'
    );
    const { createMcpExpressApp } = await import(
      '@modelcontextprotocol/sdk/server/express.js'
    );
    const { randomUUID } = await import('node:crypto');

    const allowedHosts = (process.env.MCP_ALLOWED_HOSTS ?? 'localhost,127.0.0.1,[::1]')
      .split(',')
      .map((h) => h.trim())
      .filter(Boolean);
    const app = createMcpExpressApp({ host: '0.0.0.0', allowedHosts });
    const transports: Record<string, InstanceType<typeof StreamableHTTPServerTransport>> = {};

    app.post('/mcp', async (req: any, res: any) => {
      const sessionId = req.headers['mcp-session-id'] as string | undefined;

      if (sessionId && transports[sessionId]) {
        await transports[sessionId].handleRequest(req, res, req.body);
        return;
      }

      // New session — create transport + server
      const transport = new StreamableHTTPServerTransport({
        sessionIdGenerator: () => randomUUID(),
        onsessioninitialized: (id: string) => {
          transports[id] = transport;
        },
      });

      transport.onclose = () => {
        if (transport.sessionId) {
          delete transports[transport.sessionId];
        }
      };

      const server = new McpServer({
        name: 'thatsme-issuer',
        version: '1.0.0',
      });
      registerTools(server);
      await server.connect(transport);
      await transport.handleRequest(req, res, req.body);
    });

    app.get('/mcp', async (req: any, res: any) => {
      const sessionId = req.headers['mcp-session-id'] as string;
      if (sessionId && transports[sessionId]) {
        await transports[sessionId].handleRequest(req, res);
      } else {
        res.status(400).json({
          jsonrpc: '2.0',
          error: { code: -32000, message: 'Invalid session' },
          id: null,
        });
      }
    });

    app.get('/health', (_req: any, res: any) => {
      res.json({ status: 'ok', server: 'thatsme-issuer', version: '1.0.0' });
    });

    const port = parseInt(process.env.MCP_PORT || '3010', 10);
    app.listen(port, '0.0.0.0', () => {
      console.log(`[thatsme-mcp-issuer] HTTP server listening on port ${port}`);
    });
  } else {
    // Default: stdio transport
    const server = new McpServer({
      name: 'thatsme-issuer',
      version: '1.0.0',
    });
    registerTools(server);
    const transport = new StdioServerTransport();
    await server.connect(transport);
  }
}

main().catch((err) => {
  console.error('[thatsme-mcp-issuer] Fatal error:', err);
  process.exit(1);
});
