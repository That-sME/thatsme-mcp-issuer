#!/bin/bash
set -e

echo "-> Building MCP server..."
cd "$(dirname "$0")"
npm run build

echo "-> Syncing to server..."
rsync -avz --exclude node_modules --exclude .git \
  ./ deploy@seu-servidor:/opt/thatsme-mcp/

echo "-> Done. Run on server:"
echo "  cd /opt/thatsme-mcp && docker compose up -d --build"
