import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = path => readFileSync(resolve(root, path), 'utf8');
const days = JSON.parse(read('src/sixty/curriculum.json'));
const support = JSON.parse(read('src/sixty/support.json'));
const resources = JSON.parse(read('src/sixty/resources.json'));
const urls = new Set();
const phases = ['arrays','strings','search','structures','recursion','dp','advanced-dp','trees','graphs','mastery'];
function require(condition, message) { if (!condition) throw new Error(message); }
require(days.length === 60, 'Sixty requires exactly 60 days.');
for (const [index, day] of days.entries()) {
  require(day.day === index + 1, 'Day order must be 1 through 60.');
  require(day.phase === phases[Math.floor(index / 6)], `Day ${day.day}: unexpected chapter.`);
  require(day.problems.length === 3, `Day ${day.day}: requires 3 problems.`);
  require(day.problems.map(p => p.platform).join(',') === 'LeetCode,LeetCode,Codeforces', `Day ${day.day}: requires 2 LeetCode then 1 Codeforces.`);
  for (const p of day.problems) {
    const pattern = p.platform === 'LeetCode' ? /^https:\/\/leetcode\.com\/problems\/[a-z0-9-]+\/$/ : /^https:\/\/codeforces\.com\/problemset\/problem\/\d+\/[A-Z]\d?$/;
    require(pattern.test(p.url), `Day ${day.day}: invalid problem URL ${p.url}`);
    require(!urls.has(p.url), `Repeated problem ${p.url}`); urls.add(p.url);
    require(p.title && p.brief && p.target && p.hints.length === 3, `Day ${day.day}: incomplete problem guidance.`);
  }
  require(day.lesson.length === 3 && day.checklist.length === 3 && day.dryRun.steps.length >= 3, `Day ${day.day}: incomplete lesson.`);
}
require(urls.size === 180, 'Sixty requires 180 distinct problems.');
require(resources.length === 10 && phases.every(phase => resources.some(r => r.phase === phase && r.resources.length >= 3)), 'Every chapter needs study resources.');
const rootTokens = read('src/index.css').match(/:root\s*\{[^}]+\}/)?.[0];
require(rootTokens, 'Cannot find the portfolio design tokens.');
const tokenBlock = rootTokens.replace(':root', ':root,html[data-theme]');
const fontLinks = read('index.html').match(/<link[^>]+(?:fonts\.googleapis\.com|fonts\.gstatic\.com)[^>]*>/g)?.join('\n') ?? '';
const json = value => JSON.stringify(value).replaceAll('<', '\\u003c').replaceAll('\u2028', '\\u2028').replaceAll('\u2029', '\\u2029');
const html = read('src/sixty/shell.html')
  .replace('<!--__PORTFOLIO_FONTS__-->', fontLinks)
  .replace('/*__CSS__*/', read('src/sixty/guide.css') + '\n' + tokenBlock + '\n' + read('src/sixty/portfolio.css'))
  .replace('__CURRICULUM__', json(days))
  .replace('__SUPPORT__', json(support))
  .replace('__RESOURCES__', json(resources))
  .replace('/*__JS__*/', read('src/sixty/guide.js'));
require(!/__(?:CSS|JS|CURRICULUM|SUPPORT|RESOURCES)__/.test(html), 'Unresolved template marker.');
writeFileSync(resolve(root, 'public/sixty.html'), html);
console.log(`Built /sixty: ${days.length} days, ${urls.size} distinct problems, ${Buffer.byteLength(html).toLocaleString()} bytes.`);
