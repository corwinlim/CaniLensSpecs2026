// Node.js simulation for CaniLensHUD Build 50. NOT a Lens Studio integration test.
const fs = require('fs');
const vm = require('vm');
const assert = require('assert');
const source = fs.readFileSync(__dirname + '/../Assets/CaniLensHUDBuild50.js', 'utf8');
let tests = 0;
function check(label, fn) { fn(); tests++; console.log('PASS ' + label); }
function boot(options={}) {
  const events={}; const logs=[];
  const text=()=>({text:''});
  const script={statusText:text(),signalText:text(),interpretationText:text(),disclaimerText:text(),
    autoCycle:options.autoCycle === undefined ? true : options.autoCycle,
    enableTap:options.enableTap === undefined ? true : options.enableTap,
    cycleSeconds:options.cycleSeconds === undefined ? 4 : options.cycleSeconds,
    createEvent(name) { if(options.failTap && name==='TapEvent') throw Error('no tap'); if(options.failUpdate && name==='UpdateEvent') throw Error('no update'); return { bind(f){ events[name]=f; } }; }
  };
  const ctx={ script, print: s=>logs.push(s), getDeltaTime:()=>options.dt===undefined?1:options.dt, isFinite };
  vm.runInNewContext(source,ctx,{timeout:1000});
  return { script, events, logs, tick(n=1){for(let i=0;i<n;i++)events.UpdateEvent?.();}, tap(){events.TapEvent?.();} };
}
check('initial IDLE',()=>assert.equal(boot().script.statusText.text,'CaniLens | IDLE'));
check('fixture disclaimer initial',()=>assert.match(boot().script.disclaimerText.text,/FIXTURE DEMO/));
check('4 seconds advances INTERPRET',()=>{const b=boot();b.tick(4);assert.equal(b.script.statusText.text,'CaniLens | INTERPRET')});
check('8 seconds advances RESET',()=>{const b=boot();b.tick(8);assert.equal(b.script.statusText.text,'CaniLens | RESET')});
check('12 seconds wraps IDLE',()=>{const b=boot();b.tick(12);assert.equal(b.script.statusText.text,'CaniLens | IDLE')});
check('disclaimer persists in all states',()=>{const b=boot();for(let i=0;i<16;i++){b.tick();assert.match(b.script.disclaimerText.text,/FIXTURE DEMO/)}});
check('tap triggers manually',()=>{const b=boot();b.tap();assert.equal(b.script.statusText.text,'CaniLens | INTERPRET')});
check('tap absence does not block auto-cycle',()=>{const b=boot({failTap:true});b.tick(4);assert.equal(b.script.statusText.text,'CaniLens | INTERPRET')});
check('tap disabled does not block cycle',()=>{const b=boot({enableTap:false});assert.ok(!b.events.TapEvent);b.tick(4);assert.equal(b.script.statusText.text,'CaniLens | INTERPRET')});
check('auto-cycle disabled does not advance',()=>{const b=boot({autoCycle:false});b.tick(12);assert.equal(b.script.statusText.text,'CaniLens | IDLE')});
check('invalid interval defaults to four',()=>{const b=boot({cycleSeconds:0});b.tick(4);assert.equal(b.script.statusText.text,'CaniLens | INTERPRET')});
check('unbound text components do not crash',()=>{const ctx={script:{autoCycle:true,enableTap:false,cycleSeconds:4,createEvent(){return{bind(){}}}},print(){},getDeltaTime:()=>1,isFinite};vm.runInNewContext(source,ctx,{timeout:1000})});
check('no real pet claim in source',()=>assert.ok(!/pet is (happy|sad)|dog is (happy|sad)/i.test(source)));
console.log('RESULT '+tests+'/'+tests+' PASS (Node VM simulation only)');
