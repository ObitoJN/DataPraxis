'use strict';
const benchmarkData = {
  '27b': {base: [35.78,38.50,70.79], ours:[55.11,51.90,74.16]},
  '35b': {base: [36.45,31.30,59.55], ours:[52.67,41.00,71.91]}
};
const benchmarkNames=['DABStep','JobBench','RideBench'];
function renderBenchmarks(key){
  const data=benchmarkData[key];
  document.getElementById('benchmark-cards').innerHTML=benchmarkNames.map((name,i)=>{
    const gain=(data.ours[i]-data.base[i]).toFixed(2);
    return `<article class="benchmark-card"><h3>${name}</h3><span class="score">${data.ours[i].toFixed(2)}</span><span class="gain">+${gain} ${i===0?'pp':'points'}</span><div class="bar-row" aria-label="Base model: ${data.base[i].toFixed(2)}"><div class="bar-track"><div class="bar-fill" style="width:${data.base[i]}%"></div></div><span class="bar-value">${data.base[i].toFixed(2)}</span></div><div class="bar-row ours" aria-label="DataPraxis: ${data.ours[i].toFixed(2)}"><div class="bar-track"><div class="bar-fill" style="width:${data.ours[i]}%"></div></div><span class="bar-value">${data.ours[i].toFixed(2)}</span></div></article>`;
  }).join('');
  document.querySelectorAll('[data-backbone]').forEach(b=>{const active=b.dataset.backbone===key;b.classList.toggle('selected',active);b.setAttribute('aria-pressed',String(active));});
}
document.querySelectorAll('[data-backbone]').forEach(b=>b.addEventListener('click',()=>renderBenchmarks(b.dataset.backbone)));
renderBenchmarks('27b');
const resultRows=[
 ['Claude Opus 5','87.50†','48.68†','54.89','69.50','82.02'],
 ['Kimi-K3','84.72','69.58','72.00','57.20','79.78'],
 ['GLM-5.2','87.50','49.47','55.55','51.20','78.65'],
 ['DeepSeek-V4-Pro','84.72','44.71','51.11','49.20','75.28'],
 ['GPT-5.6-Terra','83.33','45.50','51.55','33.80','68.54'],
 ['Gemini-3.7-Flash','90.28','53.70','59.55','57.90','77.53'],
 ['Gemini-3.6-Flash','91.67','41.01','49.12','43.70','79.78'],
 ['Qwen3.6-27B'],
 ['Base','84.72','26.46','35.78','38.50','70.79'],
 ['DataMind-5K','86.11','38.36','46.19','37.90','69.66'],
 ['DataPraxis-5K','83.33','49.74','55.11','51.90','74.16'],
 ['Qwen3.6-35B-A3B'],
 ['Base','81.94','27.78','36.45','31.30','59.55'],
 ['DataMind-5K','84.72','29.63','38.44','26.60','59.55'],
 ['DataPraxis-5K','81.94','47.09','52.67','41.00','71.91']
];
document.getElementById('results-table').innerHTML=resultRows.map(row=>row.length===1?`<tr class="row-group"><td colspan="6">${row[0]}</td></tr>`:`<tr class="${row[0]==='DataPraxis-5K'?'row-ours':''}">${row.map((cell,i)=>i===0?`<th scope="row">${cell}</th>`:`<td>${cell}</td>`).join('')}</tr>`).join('');
const tabs=[...document.querySelectorAll('[role=tab]')];
function selectTab(tab){tabs.forEach(t=>{const active=t===tab;t.setAttribute('aria-selected',String(active));t.tabIndex=active?0:-1;document.getElementById(t.getAttribute('aria-controls')).hidden=!active;});}
tabs.forEach((tab,i)=>{tab.addEventListener('click',()=>selectTab(tab));tab.addEventListener('keydown',e=>{let target;if(e.key==='ArrowRight')target=tabs[(i+1)%tabs.length];if(e.key==='ArrowLeft')target=tabs[(i+tabs.length-1)%tabs.length];if(e.key==='Home')target=tabs[0];if(e.key==='End')target=tabs[tabs.length-1];if(target){e.preventDefault();selectTab(target);target.focus();}});});
const menuButton=document.querySelector('.menu-toggle');const nav=document.getElementById('nav-links');
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open);});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false');}));
document.addEventListener('keydown',e=>{if(e.key==='Escape'){nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false');}});
document.getElementById('copy-citation').addEventListener('click',async()=>{const text=document.getElementById('bibtex').textContent;const status=document.getElementById('copy-status');try{await navigator.clipboard.writeText(text);status.textContent='BibTeX copied to clipboard.';}catch{const range=document.createRange();range.selectNodeContents(document.getElementById('bibtex'));const selection=window.getSelection();selection.removeAllRanges();selection.addRange(range);status.textContent='BibTeX selected. Press Ctrl+C or Command+C to copy.';}});
const sectionObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){nav.querySelectorAll('a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+entry.target.id));}});},{rootMargin:'-15% 0px -65% 0px'});
document.querySelectorAll('section[id]').forEach(s=>sectionObserver.observe(s));
