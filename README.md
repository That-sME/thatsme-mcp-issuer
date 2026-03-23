# thatsme MCP — Issuer (B2B)

Permite que times e sistemas automatizem emissoes de certificados
e consultem dados de engajamento da thatsme via IA.

## Requisitos

- Conta thatsme com plano PRO ou superior
- API key (Settings > Integracoes na plataforma)

## Opcao 1 — Instalacao local (npx)

```bash
npx -y thatsme-mcp-issuer
```

### Claude Desktop

```json
{
  "mcpServers": {
    "thatsme": {
      "command": "npx",
      "args": ["-y", "thatsme-mcp-issuer"],
      "env": {
        "THATSME_API_KEY": "sua-api-key-aqui"
      }
    }
  }
}
```

### Cursor

Adicionar em `.cursor/mcp.json`:

```json
{
  "thatsme": {
    "command": "npx",
    "args": ["-y", "thatsme-mcp-issuer"],
    "env": { "THATSME_API_KEY": "sua-api-key-aqui" }
  }
}
```

## Opcao 2 — Conexao remota (sem instalar nada)

```json
{
  "mcpServers": {
    "thatsme": {
      "url": "https://mcp.thatsme.com.br/mcp",
      "headers": {
        "Authorization": "Bearer SUA_API_KEY"
      }
    }
  }
}
```

Obtenha sua API key em app.thatsme.com.br/settings/integrations

## Tools disponiveis

| Tool | Plano minimo | O que faz |
|------|-------------|-----------|
| `search_events` | Starter | Buscar eventos da org |
| `issue_certificates` | Pro | Emitir certificados |
| `get_engagement_funnel` | Pro | Ver funil por evento |
| `list_recipients` | Pro | Listar destinatarios |
| `export_csv` | Pro | Exportar dados em CSV |

## Exemplo de uso com Claude

> "Emita certificados de conclusao para todos os participantes
> do DevFest 2025 usando o badge Gold"

Claude vai:
1. Chamar `search_events` para encontrar o DevFest 2025
2. Chamar `issue_certificates` com os destinatarios
3. Confirmar o resultado

## Variaveis de ambiente

| Variavel | Obrigatoria | Default |
|----------|-------------|---------|
| `THATSME_API_KEY` | Sim | - |
| `THATSME_API_URL` | Nao | `https://service.thatsme.com.br/api` |
| `MCP_TRANSPORT` | Nao | `stdio` (usar `http` para remote) |
| `MCP_PORT` | Nao | `3010` (apenas no modo http) |
