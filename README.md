# Komova marketplace

![Komova](assets/komova-logo.svg)

This repository distributes the Komova plugin for Claude. It connects to the official remote MCP endpoint at `https://komova-api.eigen.cl/mcp`. Authentication uses Komova's OAuth flow; the repository contains no account credentials.

## Claude Chat

In Claude, open **Customize → Plugins → Add → Add marketplace → Add from a repository**. Enter this repository's GitHub URL. Find **komova** in Discover and add it. Complete the Komova connection in Claude's own authorization screen, then confirm that the plugin can read a Project and an Item you can access.

## Claude Code

Run `/plugin marketplace add komova-app/marketplace`, then `/plugin install komova@komova-marketplace`. Use `/mcp` to complete authorization and verify the connection. The same repository can be installed from Claude Desktop's Code tab.

## ChatGPT and Codex

Workspaces with plugin administration can import a GitHub marketplace through **Workspace settings → Plugins → Add → Import marketplace**. Use the repository URL and leave the manifest path empty. Importing the marketplace and being able to use its MCP plugin in ChatGPT web are separate checks: ChatGPT may classify a plugin with `.mcp.json` as **Desktop only**. The Komova MCP connection can also be configured directly as a ChatGPT app using its HTTPS endpoint when that surface is available.

The marketplace grants no access by itself. Each client must finish Komova authorization, and its permissions are limited to the account that connects it.
