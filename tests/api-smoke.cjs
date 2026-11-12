/** Run after npm install: node tests/api-smoke.cjs */
"use strict";
const assert = require("node:assert/strict");
const http = require("node:http");
const app = require("../server");

function request(port, path) {
  return new Promise((resolve, reject) => {
    http.get({ hostname: "127.0.0.1", port, path }, (response) => {
      let body = "";
      response.setEncoding("utf8");
      response.on("data", chunk => body += chunk);
      response.on("end", () => resolve({ status: response.statusCode, body }));
      response.on("error", reject);
    }).on("error", reject);
  });
}

async function main() {
  const server = app.listen(0, "127.0.0.1");
  try {
    await new Promise((resolve, reject) => {
      if (server.listening) return resolve();
      server.once("listening", resolve);
      server.once("error", reject);
    });
    const port = server.address().port;
    const example = await request(port, "/api/example");
    assert.equal(example.status, 200);
    assert.equal(JSON.parse(example.body).message, "This is an example response from the API.");
    const missing = await request(port, "/api/does-not-exist");
    assert.equal(missing.status, 404);
    console.log("PASS: Academy Express API example endpoint and missing route");
  } finally {
    await new Promise(resolve => server.close(resolve));
  }
}
main().catch(err => { console.error(err); process.exitCode = 1; });
