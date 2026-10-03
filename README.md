# Komova plugin

Bring your Komova projects into conversations with Claude or OpenAI. The plugin lets your assistant read Projects and Items, make requested changes, ask for structured answers through Forms, and record results in Feed. You can see the same work in Komova, including who owns the next action and what it depends on.

Install **the Komova plugin from this marketplace** to get its remote MCP connection, the **`komova-work` skill**, product references, and all four MCP guides together. This is the distribution channel for the complete package: no separate guide download, source checkout, or skill installation is needed. Adding the MCP URL as a custom connector alone does not install the skill or its local references.

You need a Komova account. After installation, authorize the bundled connection through OAuth with your own account. Installation alone does not grant access to your data.

## Install in Claude

1. Open **Customize → Plugins → Add → Add marketplace → Add from a repository**.
2. Enter `https://github.com/komova-app/marketplace` and add the marketplace.
3. In **Discover**, find **Komova** and select **Add**.
4. Authorize the bundled Komova connector through OAuth. Confirm the plugin is installed, its skill appears in the **`/` menu**, and its connector is enabled in your conversation.

See [Claude's plugin installation guide](https://support.claude.com/en/articles/13837440-use-plugins-in-claude).

## Install in OpenAI

For a managed ChatGPT workspace, an administrator opens **Admin → Plugins → Add → Import marketplace**, sets the source to `https://github.com/komova-app/marketplace`, leaves **Path** empty, and imports it. Users then open **Plugins Directory**, select their workspace tab, install **Komova**, and authorize its bundled connection. Start a new conversation with the plugin enabled.

This repository's bundled MCP configuration requires the **ChatGPT desktop app**; a web-only custom connector does not install the skill. Workspace permissions may control availability. See [OpenAI's plugin management guide](https://learn.chatgpt.com/docs/enterprise/plugin-management).

For Codex, add the marketplace with `codex plugin marketplace add komova-app/marketplace`, then install Komova from **Plugins Directory** in the Codex app. See [OpenAI's plugin documentation](https://developers.openai.com/plugins/build/plugins). Installation and successful Komova OAuth authorization are separate checks.

## Example requests

Ask for the operation you need. For an overview:

> Use Komova to list my Projects with their IDs. Do not create or change anything.

For a particular Project:

> Read this Project and its Items. Explain who owns each next action and which prerequisites remain unfinished.

For a requested change:

> Check this Project's existing Items, then create an Item assigned to me to review the design proposal tomorrow. Avoid duplicating an existing action and verify the saved result.

The assistant follows your request and any review boundary you set. It checks current records before changing them and verifies saved results by ID. If a call has an uncertain result, it checks existing records before retrying to avoid duplicates. These are examples, not a required onboarding sequence.

You can also delete a Project from its app detail or through MCP. Deletion requires explicit confirmation of the exact Project and removes its contained work and related saved evidence. The assistant identifies the current name and UUID and explains the scope before using `delete_project`; inbox Items and other Projects remain outside that scope. Ordinary requested creations and updates do not require this destructive confirmation step.

## Learn the tools

- [App model](plugins/komova/skills/komova-work/references/app-model.md): Projects, Items, Forms, and what appears in List and Feed.
- [Tool reference](plugins/komova/skills/komova-work/references/tools.md): supported calls, inputs, and effects.
- [Feed guide](plugins/komova/skills/komova-work/references/feed.md): Entries, Reminders, and sources.
- [Getting started](plugins/komova/skills/komova-work/references/guides/getting-started.md): MCP connection, identifiers, and query scopes.
- [Items and Entries](plugins/komova/skills/komova-work/references/guides/items-and-entries.md): fields, dependencies, Forms, and app behavior.
- [Feedback and handoffs](plugins/komova/skills/komova-work/references/guides/feedback-and-handoffs.md): feedback versions, human actions, and saved attachments.
- [ChangeEvents](plugins/komova/skills/komova-work/references/guides/change-events.md): retained history, snapshots, and pagination.

The [bundled skill](plugins/komova/skills/komova-work/SKILL.md) connects these local references without imposing a particular project workflow. MCP instructions, tool descriptions, resource metadata, guides, and plugin skill references are in English. Account content and requested work keep the person's preferred language; the app translates its interface according to its language setting. The packaged guides describe this release, and `get_komova_guide` can provide current server behavior after connection. Never paste passwords, tokens, or OAuth codes into a conversation or Form.

This package documents 39 tools, including `get_form_attachment` for saved Form evidence and `delete_project` for explicitly confirmed Project deletion. This package does not automatically update an installed connector or its server. An existing 37-tool or 38-tool connector may need its catalog refreshed after the server update; check the tools available in that conversation before requesting either capability. The app handles file uploads and storage quota in Forms and Settings.

## Maintain the package

The four bundled guide files are generated from the API's static guide bodies. In a development workspace with the sibling API checkout, run `python scripts/sync-mcp-guides.py` after changing those bodies, then `python scripts/sync-mcp-guides.py --check` before release. `--api-source` can select the source file in another checkout. This maintainer command parses strings without importing or starting the API; installed plugins never need that checkout.

Run `node --test tests/package.test.mjs` to verify the package's inventory and local links. The suite also compares the catalog with a sibling API checkout when present. Run it with only this repository available to verify standalone distribution.
