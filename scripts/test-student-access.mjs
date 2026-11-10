import ts from 'typescript';
import { mkdtempSync, readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import assert from 'node:assert/strict';

const root = mkdtempSync(join(tmpdir(), 'academy-auth-'));
const dir = join(root, 'api');
mkdirSync(dir);
mkdirSync(join(dir, '_lib'));
mkdirSync(join(dir, '_lab-assets'));
mkdirSync(join(root, 'shared'));
writeFileSync(join(root, 'package.json'), '{"type":"module"}');
writeFileSync(join(dir, '_lab-assets/index.html'), 'protected lab');
const compile = source => ts.transpileModule(readFileSync(source, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.ES2022, target: ts.ScriptTarget.ES2022 },
}).outputText;
writeFileSync(join(root, 'shared/academy-catalog.js'), compile('shared/academy-catalog.ts'));
for (const file of ['student', 'lab', '_lib/http', '_lib/environment', '_lib/catalog', '_lib/supabase', '_lib/student-access']) {
  writeFileSync(join(dir, file + '.js'), compile('api/' + file + '.ts'));
}
process.env.SUPABASE_URL = 'https://test.invalid';
process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-only';
let access = true, stored = false, future = false, expired = false;
const userId = '12345678-1234-1234-1234-123456789abc';
globalThis.fetch = async url => {
  let data = [];
  if (url.includes('/auth/v1/user')) data = { id: userId, email: 'test@example.com' };
  else if (url.includes('/entitlements')) data = access ? [{ access_starts_at: future ? '2999-01-01' : null, access_ends_at: expired ? '2020-01-01' : null }] : [];
  else if (url.includes('/student_lab_sessions')) data = stored ? [{ user_id: userId }] : [];
  return { ok: true, status: 200, text: async () => JSON.stringify(data), json: async () => data };
};
function response() {
  return { statusCode: 0, headers: {}, setHeader(key, value) { this.headers[key] = value; }, end(value) { this.body = value; } };
}
try {
  const student = (await import(join(dir, 'student.js'))).default;
  const lab = (await import(join(dir, 'lab.js'))).default;
  const studentRequest = { method: 'POST', headers: { authorization: 'Bearer test' } };
  let res = response();
  await student({ method: 'POST', headers: {} }, res);
  assert.equal(res.statusCode, 401);
  access = false;
  res = response(); await student(studentRequest, res); assert.equal(res.statusCode, 403);
  access = true; future = true;
  res = response(); await student(studentRequest, res); assert.equal(res.statusCode, 403);
  future = false; expired = true;
  res = response(); await student(studentRequest, res); assert.equal(res.statusCode, 403);
  expired = false;
  res = response(); await student(studentRequest, res); assert.equal(res.statusCode, 200);
  assert.match(res.headers['Set-Cookie'], /HttpOnly; Secure; SameSite=Strict/);
  const overview = JSON.parse(res.body).subjects;
  assert.deepEqual(overview.map(course => course.course), ['Music Production', 'Music Business']);
  assert.equal(overview[0].subjects.length, 4);
  assert.equal(overview[0].subjects[0], 'FL Studio Essentials');
  assert.equal(overview[1].subjects.length, 4);
  res = response(); await lab({ method: 'GET', headers: {}, url: '/' }, res); assert.equal(res.statusCode, 401);
  const headers = { cookie: '__Host-lukulu_lab=' + 'a'.repeat(64) };
  res = response(); await lab({ method: 'GET', headers, url: '/' }, res); assert.equal(res.statusCode, 403);
  stored = true;
  res = response(); await lab({ method: 'GET', headers, url: '/?asset=../../secret' }, res); assert.equal(res.statusCode, 404);
  res = response(); await lab({ method: 'GET', headers, url: '/?asset=index.html' }, res); assert.equal(res.body.toString(), 'protected lab');
  access = false;
  res = response(); await lab({ method: 'GET', headers, url: '/?asset=index.html' }, res); assert.equal(res.statusCode, 403);
  console.log('Passed: login required, future/expired enrolment denied, eight-module overview, HttpOnly session, protected assets, traversal rejection and access revocation.');
} finally {
  rmSync(root, { recursive: true, force: true });
}
