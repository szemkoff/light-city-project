const nav=document.getElementById('nav');addEventListener('scroll',()=>nav.classList.toggle('solid',scrollY>40),{passive:true});
const links=document.getElementById('navLinks');document.getElementById('menu').onclick=()=>links.classList.toggle('open');links.onclick=()=>links.classList.remove('open');
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
// Sky: stars + glowing dome horizon
const c=document.getElementById('sky'),x=c.getContext('2d');let W,H,stars=[],dpr=Math.min(devicePixelRatio||1,2);
function size(){W=c.clientWidth;H=c.clientHeight;c.width=W*dpr;c.height=H*dpr;x.setTransform(dpr,0,0,dpr,0,0);stars=Array.from({length:Math.round(W*H/2600)},()=>({x:Math.random()*W,y:Math.random()*H*.8,r:Math.random()*1.2+.2,t:Math.random()*6.28,s:Math.random()*.02+.005}))}
function draw(t){x.clearRect(0,0,W,H);
 const g=x.createRadialGradient(W*.72,H*.92,0,W*.72,H*.92,Math.max(W,H)*.75);g.addColorStop(0,'rgba(242,196,109,.32)');g.addColorStop(.35,'rgba(160,110,60,.10)');g.addColorStop(1,'rgba(7,8,13,0)');x.fillStyle=g;x.fillRect(0,0,W,H);
 for(const s of stars){s.t+=s.s;x.globalAlpha=.35+.65*Math.abs(Math.sin(s.t));x.fillStyle='#fff6e0';x.beginPath();x.arc(s.x,s.y,s.r,0,6.28);x.fill()}x.globalAlpha=1;
 const cx=W*(W<700?.5:.66),base=H*.98,R=Math.min(W*.24,H*.34),p=(t||0)/1000;
 // spire beam
 const sx=cx+R*1.15,beam=x.createLinearGradient(sx,0,sx,base);beam.addColorStop(0,'rgba(255,231,176,0)');beam.addColorStop(1,'rgba(255,231,176,.5)');x.fillStyle=beam;x.fillRect(sx-1,0,2,base);
 x.strokeStyle='rgba(255,231,176,.9)';x.lineWidth=1.5;x.beginPath();x.moveTo(sx-10,base);x.lineTo(sx,base-R*1.7);x.lineTo(sx+10,base);x.stroke();
 x.fillStyle='rgba(255,240,200,'+(.7+.3*Math.sin(p*2))+')';x.shadowColor='#f2c46d';x.shadowBlur=30;x.beginPath();x.arc(sx,base-R*1.7,4,0,6.28);x.fill();x.shadowBlur=0;
 // geodesic dome
 x.lineWidth=1;
 for(let i=1;i<=6;i++){const a=i/6*Math.PI/2,ry=R*Math.sin(a),rx=R*Math.cos(a);x.strokeStyle='rgba(242,196,109,'+(.15+.06*i)+')';x.beginPath();x.ellipse(cx,base-ry,rx,rx*.18,0,Math.PI,0,false);x.stroke()}
 for(let k=0;k<14;k++){const ph=k/14*Math.PI+p*.05;const cos=Math.cos(ph);x.strokeStyle='rgba(242,196,109,'+(.12+.25*Math.abs(Math.sin(ph)))+')';x.beginPath();for(let j=0;j<=24;j++){const a=j/24*Math.PI/2;const px=cx+R*Math.cos(a)*cos,py=base-R*Math.sin(a)-R*Math.cos(a)*.18*Math.sin(ph)*-1*0;j?x.lineTo(px,py):x.moveTo(px,py)}x.stroke()}
 const glow=x.createRadialGradient(cx,base,0,cx,base,R);glow.addColorStop(0,'rgba(255,220,150,.35)');glow.addColorStop(1,'rgba(255,220,150,0)');x.fillStyle=glow;x.beginPath();x.arc(cx,base,R,Math.PI,0);x.fill();
 // smaller domes
 [[-1.25,.45],[-.75,.3]].forEach(([o,s])=>{const dx=cx+R*o,dr=R*s;x.strokeStyle='rgba(242,196,109,.4)';for(let i=1;i<=3;i++){x.beginPath();x.arc(dx,base,dr*i/3,Math.PI,0);x.stroke()}});
 if(!reduce)requestAnimationFrame(draw)}
size();addEventListener('resize',size);requestAnimationFrame(draw);
// Architecture line drawing
(function(){const s=document.getElementById('domeSvg'),ns='http://www.w3.org/2000/svg';let h='<defs><radialGradient id="dg" cx="50%" cy="100%" r="70%"><stop offset="0" stop-color="#f2c46d" stop-opacity=".35"/><stop offset="1" stop-color="#f2c46d" stop-opacity="0"/></radialGradient></defs><path d="M30 300a140 140 0 0 1 280 0z" fill="url(#dg)"/>';
 const cx=170,b=300,R=140;for(let i=1;i<6;i++){const a=i/6*Math.PI/2,y=b-R*Math.sin(a),rx=R*Math.cos(a);h+=`<path d="M${cx-rx} ${y}h${2*rx}" stroke="#f2c46d" stroke-opacity=".5"/>`}
 for(let k=1;k<12;k++){const f=Math.cos(k/12*Math.PI);let d='';for(let j=0;j<=20;j++){const a=j/20*Math.PI/2;d+=(j?'L':'M')+(cx+R*Math.cos(a)*f).toFixed(1)+' '+(b-R*Math.sin(a)).toFixed(1)}h+=`<path d="${d}" stroke="#f2c46d" stroke-opacity=".45" fill="none"/>`}
 h+=`<path d="M30 300a140 140 0 0 1 280 0" stroke="#ffe7b0" fill="none" stroke-width="1.5"/><path d="M350 300L362 40L374 300" stroke="#ffe7b0" fill="none" stroke-width="1.2"/><circle cx="362" cy="40" r="5" fill="#ffe7b0"><animate attributeName="r" values="4;7;4" dur="3s" repeatCount="indefinite"/></circle><path d="M0 300h400" stroke="#a19c92" stroke-opacity=".4"/><text x="170" y="326" fill="#a19c92" font-size="11" text-anchor="middle" font-family="Satoshi">30–45 m communosphere</text><text x="362" y="326" fill="#a19c92" font-size="11" text-anchor="middle" font-family="Satoshi">60–120 m spire</text>`;
 s.innerHTML=h})();
// tabs
document.querySelectorAll('.tab').forEach(b=>b.onclick=()=>{document.querySelectorAll('.tab').forEach(t=>t.classList.toggle('active',t===b));document.getElementById('spec-dome').hidden=b.dataset.tab!=='dome';document.getElementById('spec-spire').hidden=b.dataset.tab!=='spire'});
// scenarios
const S=[['$22.1M','$1.8M','150','160'],['$45M','$2.5M','200','180'],['$95.5M','$4.5M','300','220']];
document.querySelectorAll('.scen-switch button').forEach(b=>b.onclick=()=>{document.querySelectorAll('.scen-switch button').forEach(t=>t.classList.toggle('active',t===b));const v=S[b.dataset.s];['k-capex','k-opex','k-cap','k-be'].forEach((id,i)=>document.getElementById(id).textContent=v[i])});
// reveal + counters
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15});
document.querySelectorAll('.reveal,.bar').forEach(el=>io.observe(el));
document.querySelectorAll('[data-count]').forEach(el=>{const n=+el.dataset.count,t0=performance.now();(function f(t){const k=Math.min((t-t0)/1600,1);el.textContent=Math.round(n*(1-Math.pow(1-k,3)));if(k<1)requestAnimationFrame(f)})(t0)});
// form
document.getElementById('joinForm').onsubmit=async e=>{e.preventDefault();const f=e.target,m=document.getElementById('formMsg');m.textContent='Thank you — you\u2019re on the list. We\u2019ll be in touch as Stage 2 opens.';f.reset()};
