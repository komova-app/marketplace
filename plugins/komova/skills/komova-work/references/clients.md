# Connect an MCP client

Komova's remote Streamable HTTP endpoint is `https://api.komova.app/mcp`. Authorize it with your Komova account through the client's browser OAuth flow. Account permissions and tool behavior are the same across clients.

The marketplace plugin bundles this skill and its references. A client configured with only the MCP endpoint receives server tools and guides; it does not install the local skill. Use a client's supported plugin installation where available, or its remote MCP configuration when a connection alone is sufficient.

## OAuth support

Komova uses authorization code OAuth with **PKCE S256**, resource binding and issuer identification. Discovery advertises Client ID Metadata Documents (**CIMD**) and public Dynamic Client Registration (**DCR**). DCR issues a client identifier without a client secret. A registered application's name is **self-declared**: consent shows that distinction and the callback destination. Review both before granting access.

Curated CIMD identifiers cover ChatGPT, Claude web, Codex and Hermes. Public DCR lets other compatible clients register their callbacks. HTTP callbacks are restricted to loopback hosts; native ports can vary while preserving the registered host and path. HTTPS callbacks match their registration exactly. Hermes' curated metadata uses its documented callback ports. Code exchange binds the exact callback used for that authorization, including its port. Tokens and authorization codes remain bound to the requesting client and Komova resource. Registration alone grants no account access.

Server **protocol integration tests** cover these registration and authorization contracts. This is separate from a **real client login**, which requires that client's actual browser authorization and a successful authenticated tool call. Configuration or a saved credential does not prove every client flow was tested. Client settings can change; the primary documentation below describes each client's setup.

## Client setup

| Client | Connection route | Primary documentation |
| --- | --- | --- |
| ChatGPT | Install the marketplace plugin and authorize its bundled connector, or configure the remote URL through supported connector controls. | [OpenAI authentication](https://developers.openai.com/plugins/build/auth) |
| Codex app and CLI | Install the plugin, or add the URL and log in. Automatic registration uses CIMD or DCR. The preconfigured `codex` identifier supports Komova's native callback contract. | [Codex MCP](https://developers.openai.com/codex/mcp) |
| Claude web | Install the plugin and authorize its connector, or use custom connector settings. | [Claude plugins](https://support.claude.com/en/articles/13837440-use-plugins-in-claude) |
| Claude Code | Add a remote HTTP server, then complete OAuth from its MCP controls. DCR registers the local callback. | [Claude Code MCP](https://code.claude.com/docs/en/mcp) |
| OpenCode | Configure a remote MCP server; OAuth discovery and DCR handle registration. | [OpenCode MCP](https://opencode.ai/docs/en/mcp-servers/) |
| Hermes | Enable OAuth for the remote URL. Its curated CIMD supports the documented local callback ports; DCR is also available. | [Hermes MCP](https://hermes-agent.nousresearch.com/docs/reference/mcp-config-reference/) |
| OpenClaw | Add a Streamable HTTP server with OAuth and complete the client's login command. | [OpenClaw MCP](https://docs.openclaw.ai/tools/mcp) |
| DeepSeek | Choose DeepSeek as the model in an MCP client such as Claude Code, OpenCode or OpenClaw. That client owns MCP configuration and OAuth. | [DeepSeek integrations](https://api-docs.deepseek.com/guides/coding_agents/) |

DeepSeek is a **model provider** in this setup. Model tool calling does not itself supply an MCP connection or an OAuth client. This guide does not claim native MCP support in DeepSeek's web app.

For Codex CLI:

```sh
codex mcp add komova --url https://api.komova.app/mcp
codex mcp login komova
```

For Claude Code:

```sh
claude mcp add --transport http komova https://api.komova.app/mcp
```

Then open its MCP controls to authorize Komova. For OpenCode, add this remote server to its configuration:

```json
{
  "mcp": {
    "komova": {
      "type": "remote",
      "url": "https://api.komova.app/mcp"
    }
  }
}
```

Run `opencode mcp auth komova` when explicit authorization is needed. For Hermes, enable OAuth for the remote URL:

```yaml
mcp_servers:
  komova:
    url: https://api.komova.app/mcp
    auth: oauth
```

For OpenClaw:

```sh
openclaw mcp add komova --url https://api.komova.app/mcp --transport streamable-http
openclaw mcp login komova
```

## Verify the connection

After authorization, ask the assistant to list your Projects without changing them. Check that Komova tools are available and the response belongs to your account; an empty Project list can be valid. See the [tool reference](tools.md) and [getting started](guides/getting-started.md).

If authorization reports an unsupported client or redirect URI, report the client name, version, public client identifier and callback host/path. Never share a complete authorization URL, callback query, code, state, token or password. Use the client's official login flow to reconnect after a server compatibility change. An installed connector may also need its catalog refreshed independently of authentication.
