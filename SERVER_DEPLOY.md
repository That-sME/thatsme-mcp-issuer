# Deploy no servidor

## 1. Copiar arquivos (rodar localmente)

```bash
chmod +x deploy.sh
./deploy.sh
```

## 2. Conectar no servidor

```bash
ssh usuario@servidor
```

## 3. Subir o container

```bash
cd /opt/thatsme-mcp

# Criar .env com a API key (primeira vez)
echo "THATSME_API_KEY=sua-key-aqui" > .env

docker compose up -d --build
docker ps  # verificar que esta rodando
docker logs mcp-issuer  # verificar logs
```

## 4. Configurar nginx

Copiar o nginx.conf para o servidor:

```bash
sudo cp nginx.conf /etc/nginx/sites-available/mcp-thatsme
sudo ln -sf /etc/nginx/sites-available/mcp-thatsme /etc/nginx/sites-enabled/
sudo nginx -t          # testar config
sudo nginx -s reload   # aplicar
```

## 5. SSL com certbot

```bash
sudo certbot --nginx -d mcp.thatsme.com.br
```

## 6. Verificar

```bash
# Health check
curl https://mcp.thatsme.com.br/health
# Esperado: {"status":"ok","server":"thatsme-issuer","version":"1.0.0"}

# MCP initialize (precisa Accept header correto)
curl -X POST https://mcp.thatsme.com.br/mcp \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"test","version":"1.0"}}}'
# Esperado: SSE response com serverInfo thatsme-issuer
```

## 7. Troubleshooting

```bash
# Ver logs do container
docker logs -f mcp-issuer

# Rebuild se mudou codigo
docker compose up -d --build --force-recreate

# Testar localmente sem docker
THATSME_API_KEY=xxx MCP_TRANSPORT=http MCP_PORT=3010 node dist/index.js
```
