# Komova plugin

Bring your Komova projects into conversations with Claude or OpenAI. The plugin lets your assistant read Projects and Items, make requested changes, ask for structured answers through Forms, and record results in Feed. You can see the same work in Komova, including who owns the next action and what it depends on.

This marketplace packages **two parts together**: Komova's remote MCP connection and the **`komova-work` skill**, with references explaining the tools and how their results appear in the app. Install the plugin to get both. Adding the MCP URL as a custom connector alone does not install the skill.

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

## Try it

Start with a read:

> Use Komova to list my Projects with their IDs. Do not create or change anything.

Then select a Project:

> Read this Project and its Items. Explain who owns each next action and which prerequisites remain unfinished.

To try a change:

> Check this Project's existing Items, then propose one small Item assigned to me. Wait for my approval before creating it.

After an approved write, ask the assistant to read the result by ID and confirm it appears in Komova. If a call has an uncertain result, check existing records before retrying to avoid duplicates.

## Learn the tools

- [App model](plugins/komova/skills/komova-work/references/app-model.md): Projects, Items, Forms, and what appears in List and Feed.
- [Tool reference](plugins/komova/skills/komova-work/references/tools.md): supported calls, inputs, and effects.
- [Feed guide](plugins/komova/skills/komova-work/references/feed.md): Entries, Reminders, and sources.

The [bundled skill](plugins/komova/skills/komova-work/SKILL.md) connects these references. For current server behavior, ask the assistant to call `get_komova_guide`. Never paste passwords, tokens, or OAuth codes into a conversation or Form.
