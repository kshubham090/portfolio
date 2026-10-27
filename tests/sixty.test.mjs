import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import vm from 'node:vm';

const read = name => readFileSync(new URL('../'+name, import.meta.url), 'utf8');
const days = JSON.parse(read('src/sixty/curriculum.json'));
const support = JSON.parse(read('src/sixty/support.json'));
const resources = JSON.parse(read('src/sixty/resources.json'));

test('60 days contain exactly 120 distinct LeetCode and 60 distinct Codeforces problems', () => {
  assert.deepEqual(days.map(d => d.day), Array.from({ length:60 }, (_,i) => i+1));
  const problems = days.flatMap(d => d.problems);
  assert.equal(problems.length, 180);
  assert.equal(new Set(problems.map(p=>p.url)).size, 180);
  assert.equal(problems.filter(p=>p.platform==='LeetCode').length, 120);
  assert.equal(problems.filter(p=>p.platform==='Codeforces').length, 60);
  for(const day of days) {
    assert.deepEqual(day.problems.map(p=>p.platform), ['LeetCode','LeetCode','Codeforces']);
    for(const problem of day.problems) {
      assert.equal(problem.hints.length, 3);
      assert.ok(problem.target.length>5 && problem.brief.length>20);
    }
  }
});

test('each chapter has reading material and clearly labeled community resources', () => {
  assert.equal(resources.length,10);
  for(const group of resources) {
    assert.ok(group.resources.filter(r=>r.kind!=='Community').length>=2, group.phase);
    assert.ok(group.resources.some(r=>r.kind==='Community'), group.phase);
    for(const resource of group.resources) {
      assert.match(resource.url, /^https:\/\//);
      assert.ok(['read','search-excerpt','search-link'].includes(resource.verified));
    }
  }
});

test('builder reuses portfolio tokens/fonts and emits an unlisted, ungated, noindex document', () => {
  execFileSync(process.execPath,['scripts/build-sixty.mjs']);
  const html=read('public/sixty.html');
  assert.match(html, /name="robots" content="noindex, nofollow, noarchive, nosnippet"/);
  assert.match(html, /name="googlebot" content="noindex, nofollow, noarchive, nosnippet"/);
  assert.match(html, /IBM\+Plex\+Mono/);
  const tokens=read('src/index.css').match(/:root\s*\{[^}]+\}/)[0].replace(':root',':root,html[data-theme]');
  assert.ok(html.includes(tokens));
  assert.ok(!html.includes('googletagmanager.com'));
  assert.ok(!html.includes('type="password"'));
  assert.ok(!read('public/sitemap.xml').includes('/sixty'));
  assert.ok(!read('src/components/Nav.tsx').includes('/sixty'));
  assert.ok(!read('src/components/Footer.tsx').includes('/sixty'));
});

test('all public aliases carry noindex headers and rewrite before the SPA fallback', () => {
  const config=JSON.parse(read('vercel.json'));
  for(const source of ['/sixty','/sixty/','/sixty.html']) {
    const rule=config.headers.find(r=>r.source===source);
    assert.ok(rule, source);
    assert.equal(rule.headers.find(h=>h.key==='X-Robots-Tag').value,'noindex, nofollow, noarchive, nosnippet');
  }
  for(const source of ['/sixty','/sixty/']) {
    const index=config.rewrites.findIndex(r=>r.source===source);
    assert.ok(index>=0 && index<config.rewrites.findIndex(r=>r.source==='/(.*)'));
    assert.equal(config.rewrites[index].destination,'/sixty.html');
  }
});

function stateFunctions() {
  const source=read('src/sixty/guide.js');
  const context=vm.createContext({
    document:{getElementById:id=>({textContent:JSON.stringify(id==='curriculum-data'?days:id==='support-data'?support:resources)})},
    localStorage:{getItem:()=>null},Date,Set,Map,Number,Array,Math,JSON,console,
  });
  const stop=source.indexOf('function save()');
  vm.runInContext(source.slice(0,stop)+'\nthis.normalize=normalize;this.defaults=defaults;this.ds=ds;',context);
  return context;
}

test('old two-problem backups preserve notes without falsely completing new assignments', () => {
  const {normalize}=stateFunctions();
  const saved=normalize({version:1,app:'sixty-java-dsa',days:{1:{solved:[true,true],checks:[true,true,true],complete:true,notes:'keep my reasoning',confidence:'review'}}});
  assert.equal(saved.version,2);
  assert.deepEqual(Array.from(saved.days[1].solved),[false,false,false]);
  assert.equal(saved.days[1].complete,false);
  assert.equal(saved.days[1].notes,'keep my reasoning');
  assert.equal(saved.days[1].confidence,'review');
});

test('new backups match solved state by problem URL, not array position', () => {
  const {normalize}=stateFunctions();
  const urls=days[0].problems.map(p=>p.url);
  const saved=normalize({version:2,days:{1:{problemUrls:[urls[2],urls[0],urls[1]],solved:[true,false,true],hints:[3,0,1],checks:[true,true,true],complete:true}}});
  assert.deepEqual(Array.from(saved.days[1].solved),[false,true,true]);
  assert.deepEqual(Array.from(saved.days[1].hints),[0,1,3]);
  assert.equal(saved.days[1].complete,false);
});

test('third problem is required for completion; malformed hints and steps are bounded', () => {
  const {normalize}=stateFunctions();
  const saved=normalize({version:2,days:{1:{problemUrls:days[0].problems.map(p=>p.url),solved:[true,true],checks:[true,true,true],complete:true,hints:[-5,200,1.5],step:200}}});
  assert.equal(saved.days[1].complete,false);
  assert.deepEqual(Array.from(saved.days[1].hints),[0,3,1]);
  assert.equal(saved.days[1].step,days[0].dryRun.steps.length-1);
});
