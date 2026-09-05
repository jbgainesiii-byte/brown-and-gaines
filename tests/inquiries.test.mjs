import assert from 'node:assert/strict';
import { test } from 'node:test';
import { registerHooks } from 'node:module';
import { DatabaseSync } from 'node:sqlite';
import { readFileSync, readdirSync } from 'node:fs';

const sqlite=new DatabaseSync(':memory:');
for(const name of readdirSync(new URL('../drizzle/',import.meta.url)).filter(x=>x.endsWith('.sql')).sort()) sqlite.exec(readFileSync(new URL('../drizzle/'+name,import.meta.url),'utf8'));
const database = {
  prepare(sql) {
    return {
      bind(...values) {
        return { async run() { return sqlite.prepare(sql).run(...values); } };
      }
    };
  }
};
const runtime={DB:database,ASSETS:{fetch:async()=>new Response('Not found',{status:404})}};
globalThis.__bandgTestEnv=runtime;
registerHooks({resolve(specifier,context,nextResolve){if(specifier==='cloudflare:workers')return{url:'bandg:cloudflare-workers',shortCircuit:true};return nextResolve(specifier,context)},load(url,context,nextLoad){if(url==='bandg:cloudflare-workers')return{format:'module',source:'export const env=globalThis.__bandgTestEnv;',shortCircuit:true};return nextLoad(url,context)}});
const {default:worker}=await import('../dist/server/index.js');
const ctx={waitUntil(){},passThroughOnException(){}};
const request=(payload,origin='https://example.test')=>new Request('https://example.test/api/inquiries',{method:'POST',headers:{'Content-Type':'application/json','Origin':origin},body:JSON.stringify(payload)});
const sample={requestId:'1768476c-9ce1-4b2c-83d5-0b04b13e69d3',name:'Test Owner',email:'owner@example.test',business:'Example test business',interest:'Business strategy',message:'A synthetic inquiry used to verify storage.',website:''};

test('homepage renders firm identity, content, and metadata',async()=>{
 const response=await worker.fetch(new Request('https://example.test/',{headers:{accept:'text/html'}}),runtime,ctx);
 assert.equal(response.status,200);const html=await response.text();
 assert.match(html,/Build what/);assert.match(html,/Business Strategy &amp; Implementation/);
 assert.match(html,/Johnny B. Gaines III/);assert.match(html,/href="\/events"/);assert.match(html,/id="main"/);assert.match(html,/Illustrative engagement/);
 assert.doesNotMatch(html,/Starter Project|codex-preview/);
});

test('events route renders the truthful calendar and page metadata',async()=>{
 const response=await worker.fetch(new Request('https://example.test/events',{headers:{accept:'text/html'}}),runtime,ctx);
 assert.equal(response.status,200);const html=await response.text();
 assert.match(html,/Upcoming events/);assert.match(html,/The Founders/);assert.match(html,/September 10, 2026/);assert.match(html,/19646 W Nine Mile Road/);assert.match(html,/match-made-flyer.png/);assert.match(html,/Private, invitation-only/);assert.match(html,/UNO, in good company/);
 assert.match(html,/aria-current="page"/);assert.match(html,/Eventbrite registration link coming soon/);
 assert.match(html,/rel="canonical"[^>]+\/events/);
});

test('inquiries validate, save once on retries, and fail honestly when storage is unavailable',async()=>{
 let response=await worker.fetch(request({...sample,email:'invalid'}),runtime,ctx);assert.equal(response.status,400);
 response=await worker.fetch(request(sample,'https://unrelated.test'),runtime,ctx);assert.equal(response.status,403);
 response=await worker.fetch(request({...sample,website:'spam'}),runtime,ctx);assert.equal(response.status,400);
 response=await worker.fetch(request(sample),runtime,ctx);assert.equal(response.status,201);assert.equal((await response.json()).reference,'BG-1768476C');
 response=await worker.fetch(request(sample),runtime,ctx);assert.equal(response.status,201);
 const count=sqlite.prepare('SELECT count(*) AS total FROM inquiries').get();assert.equal(count.total,1);
 const row=sqlite.prepare('SELECT * FROM inquiries').get();assert.equal(row.business,sample.business);assert.equal(row.status,'new');
 runtime.DB=null;
 response=await worker.fetch(request({...sample,requestId:'fa4a647b-ad0b-4d2e-aacb-c41f2d244d7e'}),runtime,ctx);assert.equal(response.status,503);assert.match((await response.json()).error,/hasn’t been saved/);
 runtime.DB=database;
});

test('business intake preserves structured answers and rejects invalid ones',async()=>{
 const intake={stage:'Operating business',outcome:'More prospects become paying customers.',priority:'Sales and follow-up',timing:'This month',budget:'Need guidance'};
 const payload={...sample,requestId:'ae8d5c42-fdd5-4d32-9040-606b74f1526e',source:'event',intake};
 let response=await worker.fetch(request(payload),runtime,ctx);assert.equal(response.status,201);
 const row=sqlite.prepare('SELECT * FROM inquiries WHERE id=?').get(payload.requestId);assert.equal(row.source,'event');assert.deepEqual(JSON.parse(row.intake_json),intake);
 response=await worker.fetch(request({...payload,intake:{...intake,budget:'anything'}}),runtime,ctx);assert.equal(response.status,400);
 response=await worker.fetch(new Request('https://example.test/start',{headers:{accept:'text/html'}}),runtime,ctx);assert.equal(response.status,200);assert.match(await response.text(),/What needs/);
});

 test('firm and CRM pages preserve disclosure and the intake path',async()=>{
 for(const [route,required] of [['/our-firm',['Ryan Brown','Johnny B.','Illustrative portrait','ryan-placeholder.png','johnny-placeholder.png']],['/in-practice/crm',['Fictional business','/demos/crm.html','12,700','/start?topic=quote-follow-up']]]){
 const response=await worker.fetch(new Request('https://example.test'+route,{headers:{accept:'text/html'}}),runtime,ctx);assert.equal(response.status,200);const html=await response.text();for(const text of required)assert.ok(html.includes(text),route+' missing '+text);
 }
 });
