const menuBtn=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav');
if(menuBtn&&nav){menuBtn.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuBtn.setAttribute('aria-expanded',String(open));});}

const progress=document.getElementById('progressBar');
const updateProgress=()=>{const h=document.documentElement;const p=(h.scrollTop/(h.scrollHeight-h.clientHeight))*100; if(progress)progress.style.width=`${p}%`;};
window.addEventListener('scroll',updateProgress,{passive:true}); updateProgress();

const reveals=[...document.querySelectorAll('.reveal')];
if('IntersectionObserver'in window){reveals.forEach(el=>{el.style.opacity='0';el.style.transform='translateY(24px)';});
const io=new IntersectionObserver((entries)=>entries.forEach(e=>{if(e.isIntersecting){e.target.style.opacity='1';e.target.style.transform='none';}}),{threshold:.1}); reveals.forEach(el=>io.observe(el));}

const parallax=[...document.querySelectorAll('[data-parallax]')];
window.addEventListener('mousemove',(e)=>{const x=(e.clientX/window.innerWidth-.5)*2;const y=(e.clientY/window.innerHeight-.5)*2;parallax.forEach(el=>{const f=Number(el.dataset.parallax||0);el.style.transform=`translate3d(${x*f}px,${y*f}px,0)`;});});

const form=document.querySelector('form'); const note=document.querySelector('.form-note');
if(form){form.addEventListener('submit',e=>{e.preventDefault();if(note)note.textContent='Danke. Ihre diskrete Anfrage wurde vorgemerkt. Wir melden uns zeitnah persönlich.';form.reset();});}
