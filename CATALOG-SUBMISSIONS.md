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

## 1. mcp.run — https://mcp.run

1. Sign in with GitHub
2. Visit https://mcp.run/submit (or click "Submit a server")
3. Fill: name, description (use Long description above), npm URL, GitHub URL
4. Category: "Business" or "Issuance"
5. Add tags: credentials, certificates, b2b
6. Submit

## 2. smithery.ai — https://smithery.ai

1. Sign in with GitHub
2. Click "Add a server"
3. Reference repo URL: https://github.com/thatsmeapp/thatsme-mcp-issuer
4. Smithery scrapes the README and package.json automatically — verify fields match
5. Add the long description above as override if scrape is incomplete
6. Submit for indexing

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
