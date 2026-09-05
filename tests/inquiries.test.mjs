import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const output = path.join(root, "out");

async function readOutput(relativePath) {
  return readFile(path.join(output, relativePath), "utf8");
}

async function readJavaScriptTree(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const contents = await Promise.all(entries.map(async (entry) => {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return readJavaScriptTree(entryPath);
    return entry.name.endsWith(".js") ? readFile(entryPath, "utf8") : "";
  }));
  return contents.join("\n");
}

test("exports the public routes and firm identity", async () => {
  const home = await readOutput("index.html");
  const events = await readOutput("events/index.html");
  const firm = await readOutput("our-firm/index.html");
  const crm = await readOutput("in-practice/crm/index.html");
  const intake = await readOutput("start/index.html");

  assert.match(home, /Build what/);
  assert.match(home, /Business Strategy &amp; Implementation/);
  assert.match(home, /Johnny B. Gaines III/);
  assert.match(events, /Upcoming events/);
  assert.match(events, /Coming soon\./);
  assert.doesNotMatch(events, /The Founders’ Dinner|Match Made|UNO, in good company/);
  assert.match(firm, /Ryan Brown/);
  assert.match(firm, /Johnny B\./);
  assert.match(crm, /Fictional business/);
  assert.match(crm, /12,700/);
  assert.match(intake, /What needs/);
});

test("exports Netlify form blueprints with every stored field", async () => {
  const forms = await readOutput("__forms.html");
  assert.match(forms, /name="general-inquiry"/);
  assert.match(forms, /name="business-intake"/);
  assert.match(forms, /data-netlify="true"/);
  assert.match(forms, /netlify-honeypot="website"/);

  for (const field of ["requestId", "source", "name", "email", "business", "interest", "message", "stage", "outcome", "priority", "timing", "budget", "website"]) {
    assert.match(forms, new RegExp(`name="${field}"`));
  }
});

test("client bundles submit URL-encoded data to Netlify Forms", async () => {
  const scripts = await readJavaScriptTree(path.join(output, "_next", "static"));
  assert.match(scripts, /__forms\.html/);
  assert.match(scripts, /application\/x-www-form-urlencoded/);
  assert.match(scripts, /general-inquiry/);
  assert.match(scripts, /business-intake/);
  assert.doesNotMatch(scripts, /\/api\/inquiries/);
});
