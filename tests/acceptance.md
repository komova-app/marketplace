# Komova marketplace package acceptance

These checks define the product documentation delivered by this repository. They do not authorize a production connection or a tester invitation.

1. **First connection:** a new Claude Chat or supported ChatGPT user can find the canonical MCP URL, complete their own OAuth flow, enable Komova in that chat, and read one Project they own. A legitimately empty account is distinguished from a failed connection. The GitHub plugin and a ChatGPT custom app are clearly different installation paths; a draft ChatGPT app is not described as a workspace publication.
2. **One approved write:** the guide checks existing Items, proposes a title, assignee, and Project, then waits for human approval before calling the creation tool. It identifies essential fields and verifies the returned UUID in Komova; an uncertain result is checked before retrying. It never implies that installing a plugin alone grants write access.
3. **Product model:** a reader can distinguish Project, Item, Form, Entry, Reminder, Feedback, and ChangeEvent; status from assignee; a prerequisite from `blocked`; and a locally saved Form draft from a submitted answer. The guide states where List, Item detail, and Feed show each result.
4. **Tool contract:** every exported MCP tool appears once in the tool reference with its current input names and a practical use. Important validation and side effects are explicit. Mobile REST operations are not advertised as MCP tools.
5. **Feed narrative:** the reference shows how to write a durable Entry with its event, outcome, reason, evidence, and limits in natural prose, using structured HTTPS sources. It distinguishes an Entry from a short immediate Reminder and explains Feed paging and full-detail access.
6. **Boundaries:** the install package contains no coordinator tick, Project Manager, lease-renewal schedule, or automatic project-review procedure. It contains no secret, private credential, complete OAuth redirect URL, or claim that refresh-token exchange or revocation was verified.
7. **Package integrity:** manifest JSON parses, the MCP URL is canonical, all skill reference links resolve inside the plugin, and the tool inventory agrees with the sibling API checkout when it is available.

Run `node --test tests/package.test.mjs` from this repository. Review the first five scenarios against the rendered README and skill references before changing or publishing the marketplace.
