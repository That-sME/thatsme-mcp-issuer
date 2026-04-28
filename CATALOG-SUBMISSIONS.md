# MCP Catalog Submission Packet — thatsme-mcp-issuer

**Founder action**: paste the content below into each of the four MCP catalogs. Each takes ~5 minutes. All free.

---

## Common Information (use across all submissions)

**Server name**: `thatsme-mcp-issuer`

**Display name**: That's Me — Issuer

**npm package**: https://www.npmjs.com/package/thatsme-mcp-issuer

**GitHub**: https://github.com/thatsmeapp/thatsme-mcp-issuer

**Maintainer**: That's Me Ltd. — support@thatsme.com.br

**License**: MIT

**Tags / categories**: credentials, certificates, badges, education, business, b2b, issuance, verification, anti-fraud

**Short description (one line, ~140 chars)**:
> Issue verifiable digital certificates, query engagement funnels, and export data — for educators, HR, sports, and cultural organizations.

**Tagline (~60 chars)**:
> Issue verifiable credentials with anti-fraud and AI next-step.

**Long description (~400 words)**:
> The That's Me Issuer MCP server lets AI agents and tools automate digital-credential issuance and engagement analysis on the That's Me platform — the world's first RewardTech.
>
> That's Me transforms certificates into permanent, SHA-256-verified, AI-recommended digital records. Every issuer is human-reviewed (manual KYB), every certificate carries an immutable hash, and every fraud is investigated and acted on operationally.
>
> With this MCP, AI agents can:
> - Search public events on the That's Me directory
> - Issue certificates programmatically (Pro+ plans)
> - Query engagement funnels per event (Pro+ plans)
> - List recipients and segment audiences (Pro+ plans)
> - Export emission data as CSV (Pro+ plans)
>
> Use cases: course platforms automating bulk certificate issuance after enrollment, HR systems issuing onboarding/training credentials, event organizers issuing race medals at scale, AI agents querying engagement to recommend the next learning step.
>
> Install: `npx -y thatsme-mcp-issuer`
>
> Or connect remotely: `https://mcp.thatsme.com.br/mcp` with Bearer auth.
>
> Requires a That's Me account on Pro plan or higher and an API key (Settings → Integrations).

**Tools exposed**:
- `search_events` — Search public events in the directory
- `issue_certificates` — Issue digital certificates to recipients
- `get_engagement_funnel` — Engagement metrics for an event
- `list_recipients` — List event recipients with segmentation
- `export_csv` — Export emission and engagement data

**Authentication**: API key (Bearer token), available at Settings → Integrations on app.thatsme.com.br.

**Plans**: Free tier supports `search_events` only. `issue_certificates` and analytics tools require Pro plan ($129/mo) or higher.

---

## 1. Official MCP Registry (replaces mcp.run) — https://registry.modelcontextprotocol.io

> **Important**: `mcp.run` was rebranded into `turbomcp.ai` (now an enterprise self-hosted gateway, not a public catalog). The official replacement is the **MCP Registry** at registry.modelcontextprotocol.io, backed by Anthropic, GitHub, PulseMCP, and Microsoft.

Submission is via the `mcp-publisher` CLI tool, not a web form. Repo is already prepared (`package.json` has `mcpName: io.github.thatsmeapp/issuer`, `server.json` filled in). Three commands:

```bash
# 1. Install the publisher CLI (one-time)
brew install mcp-publisher

# 2. Authenticate via GitHub device flow (no creepy OAuth scopes)
cd /Users/bernardo/Desktop/thatsme/thatsme/thatsme-mcp-issuer
mcp-publisher login github

# 3. Publish
mcp-publisher publish
```

Verify with:
```bash
curl "https://registry.modelcontextprotocol.io/v0.1/servers?search=io.github.thatsmeapp/issuer"
```

## 2. smithery.ai — https://smithery.ai (OAuth caveat)

> Smithery's GitHub OAuth asks for `gists (write)`, `starring (write)`, and `watching (write)` scopes — broader than a catalog needs. Worst case is auto-stars/auto-watches in your activity feed; private repos are not exposed. Two safer paths:
> - Skip Smithery entirely (the official Registry above is canonical)
> - Authorize from a secondary GitHub account, or revoke immediately at https://github.com/settings/applications after they index your server

If you proceed:
1. Sign in with GitHub
2. Click "Add a server"
3. Reference repo URL: https://github.com/thatsmeapp/thatsme-mcp-issuer
4. Smithery scrapes the README and package.json automatically — verify fields match
5. Submit for indexing

## 3. pulsemcp.com — https://www.pulsemcp.com

1. Sign in with GitHub or email
2. Submit form (or open issue on their public listing repo if no submit form)
3. Use the common info above
4. Provide tagline + tools list

## 4. glama.ai — https://glama.ai/mcp/servers

1. Glama auto-indexes from npm and GitHub. Often no manual submission needed — search for `thatsme-mcp-issuer` first; if listed, claim it
2. If not auto-indexed, use their submission form (top-right "Add server" button or "/contribute")
3. Use Long description + tags above

---

## Bonus catalogs (low effort, high SEO value)

**npm trends / npm tags**: ensure `package.json` `keywords` includes:
```json
"keywords": ["mcp", "model-context-protocol", "credentials", "certificates", "badges", "issuance", "verification", "anti-fraud", "thatsme", "rewardtech"]
```

**Awesome MCP Servers (GitHub list)**: open a PR to https://github.com/punkpeye/awesome-mcp-servers adding a line under the appropriate category (Business/Productivity).

**Anthropic / OpenAI / Claude integrations galleries**: when official catalogs from these vendors open, submit there too.

---

## Quick checklist after submitting

- [ ] mcp.run profile live
- [ ] smithery.ai listing live  
- [ ] pulsemcp.com listing live
- [ ] glama.ai listing live
- [ ] `awesome-mcp-servers` PR opened
- [ ] npm keywords updated
- [ ] Test query in ChatGPT/Claude one week later: "MCP server for issuing digital certificates" — does thatsme appear?
