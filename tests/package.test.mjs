import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const plugin = path.join(repo, 'plugins/komova');
const skill = path.join(plugin, 'skills/komova-work');
const read = relative => fs.readFileSync(path.join(repo, relative), 'utf8');

test('the package advertises one canonical remote MCP server', () => {
  const marketplace = JSON.parse(read('.claude-plugin/marketplace.json'));
  const manifest = JSON.parse(read('plugins/komova/.claude-plugin/plugin.json'));
  const mcp = JSON.parse(read('plugins/komova/.mcp.json'));
  assert.equal(marketplace.plugins.length, 1);
  assert.equal(marketplace.plugins[0].source, './plugins/komova');
  assert.equal(manifest.name, 'komova');
  assert.deepEqual(Object.keys(mcp.mcpServers), ['komova']);
  assert.equal(mcp.mcpServers.komova.url, 'https://api.komova.app/mcp');
});

test('the published skill has self-contained product references', () => {
  const body = fs.readFileSync(path.join(skill, 'SKILL.md'), 'utf8');
  assert.match(body, /^---\nname: komova-work\n/m);
  for (const reference of ['app-model.md', 'tools.md', 'feed.md']) {
    assert.match(body, new RegExp(`references/${reference.replace('.', '\\.')}`));
    assert.ok(fs.statSync(path.join(skill, 'references', reference)).isFile());
  }
  assert.doesNotMatch(body, /(?:15.minute tick|coordinator tick|Project Manager|one active agent Item per Project)/i);
});

test('first use separates client setup, read verification, and an approved write', () => {
  const readme = read('README.md');
  const skillBody = read('plugins/komova/skills/komova-work/SKILL.md');
  assert.match(readme, /Claude Chat[^\n]*conector/i);
  assert.match(readme, /ChatGPT[^\n]*app MCP/i);
  assert.match(readme, /list_projects/);
  assert.match(readme, /get_project/);
  assert.match(readme, /add_item/);
  assert.match(readme, /sin crear ni modificar/i);
  assert.match(readme, /lista vacía/i);
  assert.match(skillBody, /First use/i);
  assert.match(skillBody, /authorization/i);
  assert.match(skillBody, /UUID/);
});

test('relative documentation links resolve within this package', () => {
  const docs = [
    'README.md',
    'plugins/komova/skills/komova-work/SKILL.md',
    'plugins/komova/skills/komova-work/references/app-model.md',
    'plugins/komova/skills/komova-work/references/tools.md',
    'plugins/komova/skills/komova-work/references/feed.md',
  ];
  for (const doc of docs) {
    const body = read(doc);
    for (const [, target] of body.matchAll(/!?\[[^\]]*\]\(([^)]+)\)/g)) {
      if (/^(?:https?:|#)/.test(target)) continue;
      const pathname = target.split('#')[0];
      assert.ok(fs.existsSync(path.resolve(repo, path.dirname(doc), pathname)), `${doc} has a broken link: ${target}`);
    }
  }
});

test('the packaged tool reference covers the exported API catalog and input names', t => {
  const reference = fs.readFileSync(path.join(skill, 'references/tools.md'), 'utf8');
  const rows = new Map();
  for (const match of reference.matchAll(/^\| `([a-z_]+)` \| ([^\n]*)$/gm)) {
    assert.ok(!rows.has(match[1]), `duplicate tool ${match[1]}`);
    rows.set(match[1], match[2]);
  }
  assert.equal(rows.size, 37, 'the current public MCP exposes 37 tools');

  const api = path.resolve(repo, '../api/app');
  if (!fs.existsSync(path.join(api, 'mcp_server.py'))) {
    t.diagnostic('Sibling API checkout absent; package inventory checked without source comparison.');
    return;
  }
  const source = ['mcp_server.py', 'mcp_guides.py'].map(file => fs.readFileSync(path.join(api, file), 'utf8')).join('\n');
  const functions = [...source.matchAll(/@mcp\.tool\([^\n]*\)\n\s*(?:async )?def ([a-z_]+)\(([\s\S]*?)\)\s*->/g)];
  assert.equal(functions.length, 37, 'source catalog changed; update the package deliberately');
  assert.deepEqual([...rows.keys()].sort(), functions.map(match => match[1]).sort());
  for (const [, name, signature] of functions) {
    const params = [...signature.matchAll(/(?:^|,\s*)([a-z_]+):/g)].map(match => match[1]);
    for (const param of params) {
      assert.match(rows.get(name), new RegExp(`\\b${param}\\b`), `${name} is missing parameter ${param}`);
    }
  }
});

test('the package keeps internal operations and old origins out of the public guide', () => {
  const files = [
    'README.md',
    'plugins/komova/skills/komova-work/SKILL.md',
    'plugins/komova/skills/komova-work/references/app-model.md',
    'plugins/komova/skills/komova-work/references/tools.md',
    'plugins/komova/skills/komova-work/references/feed.md',
  ];
  for (const file of files) {
    const body = read(file);
    assert.doesNotMatch(body, /komova-api\.eigen\.cl|api-deks\.eigen\.cl/i, file);
    assert.doesNotMatch(body, /(?:15.minute tick|Project Manager|global coordinator)/i, file);
  }
});
