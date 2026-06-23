(function(){
'use strict';
function $(id){return document.getElementById(id);}function esc(s){return String(s||'').replace(/[&<>"]/g,function(ch){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[ch];});}
var fallback={createdAt:new Date().toISOString(),status:'ready_for_review',concern:'Perioral dermatitis',chiefConcern:'Red bumps around my mouth for 3 months, worse after steroid cream. I want to know if prescription treatment makes sense.',duration:'1–6 months',severity:'Moderate',tried:'Hydrocortisone, gentle cleanser, moisturizer.',photoCount:0,photos:[],medicalSnapshot:'No drug allergies. No current meds. No major conditions.',pregnancy:'No',ageGroup:'No',redFlags:[],first:'Demo',last:'Patient',dob:'1990-01-01',state:'TX',email:'demo@example.com',licensed:true,payment:{amount:75,currency:'USD',sequence:'consent_then_payment_then_create_consult'}};
function loadVisit(){try{var raw=localStorage.getItem('earlDemoLatestVisit');return raw?JSON.parse(raw):fallback;}catch(e){return fallback;}}
var visit=loadVisit();
function fullName(){return ((visit.first||'')+' '+(visit.last||'')).trim()||'Patient';}
function renderTop(){
  $('caseTitle').textContent=fullName()+' — '+(visit.concern||'Dermatology concern');
  $('caseSub').textContent=[visit.state||'No state',visit.dob?'DOB '+visit.dob:'No DOB',(visit.photoCount||0)+' photo(s)',visit.duration||'No duration'].join(' · ');
  var status=$('statusBadge');
  if(visit.redFlags&&visit.redFlags.length){status.textContent='Safety gate active';status.classList.add('warn');}else{status.textContent='Ready for review';status.classList.remove('warn');}
  var lic=$('licenseBadge');lic.textContent=visit.licensed?'Licensed state in prototype':'Unlicensed state in prototype';lic.classList.toggle('warn',!visit.licensed);
}
function renderFacts(){
  var rows=[['Concern',visit.concern],['Description',visit.chiefConcern],['Duration',visit.duration],['Severity',visit.severity||'—'],['Tried',visit.tried||'—'],['Medical',visit.medicalSnapshot],['Pregnancy',visit.pregnancy],['Under 18',visit.ageGroup||'—'],['Email',visit.email],['Payment',visit.payment&&visit.payment.sequence?visit.payment.sequence.replaceAll('_',' '):'—']];
  $('facts').innerHTML=rows.map(function(r){return '<dt>'+esc(r[0])+'</dt><dd>'+esc(r[1]||'—')+'</dd>';}).join('');
}
function renderFlags(){
  var box=$('redFlags'), card=$('redFlagCard');
  if(visit.redFlags&&visit.redFlags.length){
    card.classList.add('has-flags');
    box.innerHTML='<div class="flag-list">'+visit.redFlags.map(function(f){return '<div class="flag">'+esc(f)+'</div>';}).join('')+'</div>';
  } else {
    card.classList.remove('has-flags');
    box.innerHTML='<div class="okbox">No safety-gate items selected.</div>';
  }
}
function renderPhotos(){
  var photos=visit.photos||[], main=$('mainPhoto'), strip=$('photoStrip');
  $('photoMeta').textContent=(visit.photoCount||photos.length||0)+' submitted';
  if(!photos.length){main.textContent='No photos available in this demo record';strip.innerHTML='';return;}
  function show(idx){main.innerHTML='<img src="'+photos[idx]+'" alt="Patient submitted photo '+(idx+1)+'">';Array.prototype.forEach.call(strip.children,function(b,n){b.classList.toggle('active',n===idx);});}
  strip.innerHTML='';photos.forEach(function(url,idx){var b=document.createElement('button');b.type='button';b.innerHTML='<img src="'+url+'" alt="Thumbnail '+(idx+1)+'">';b.addEventListener('click',function(){show(idx);});strip.appendChild(b);});show(0);
}
function setTemplates(){
  var dx=$('dx'), plan=$('plan'), rx=$('rxText'), msg=$('patientMessage'), dec=$('decision'), action=$('rxAction');
  dx.value=visit.concern||'';
  if(visit.redFlags&&visit.redFlags.length){dec.value='Needs in-person care';action.value='No prescription';plan.value='Safety-gate item(s) selected. Online prescribing may not be appropriate without additional evaluation.';msg.value='Based on your answers, this may be better handled with in-person or urgent evaluation. Please seek local care if symptoms are severe, rapidly worsening, involve the eye, or you feel ill.';}
  document.querySelectorAll('[data-template]').forEach(function(btn){btn.addEventListener('click',function(){
    var t=btn.getAttribute('data-template');
    if(t==='treat'){dec.value='Ready to treat';action.value='Send compounded prescription';plan.value='History and photos reviewed. Findings are consistent with the working diagnosis above. Prescription treatment is reasonable if no contraindications are present.';rx.value='Compound: [medication/active(s)] [strength] in [vehicle]. Sig: Apply [frequency] for [duration]. Qty: [amount]. Refills: [#].';msg.value='I reviewed your intake and photos. The plan below is meant to be simple: use the prescription as directed, keep the rest of the routine gentle, and stop if irritation or concerning symptoms occur.';}
    if(t==='more'){dec.value='Request more info/photos';action.value='No prescription';plan.value='Need additional information or clearer photos before deciding on diagnosis/prescription.';msg.value='I need a little more information before prescribing. Please send clearer photos in natural light: one overview, one medium-distance photo, and one close-up.';}
    if(t==='inperson'){dec.value='Needs in-person care';action.value='No prescription';plan.value='Online care is not the best fit based on the submitted concern/photos/safety screen.';msg.value='This should be evaluated in person. Please schedule local dermatology or urgent care depending on severity.';}
    if(t==='norx'){dec.value='No prescription needed';action.value='OTC/supportive care only';plan.value='No prescription indicated based on submitted history/photos.';msg.value='A prescription does not look necessary based on what was submitted. I recommend supportive care and monitoring, with in-person evaluation if symptoms worsen or fail to improve.';}
  });});
}
function summaryText(){
  return ['Patient: '+fullName(),'DOB/state: '+(visit.dob||'—')+' / '+(visit.state||'—'),'Concern: '+(visit.concern||'—'),'Description: '+(visit.chiefConcern||'—'),'Duration/severity: '+(visit.duration||'—')+' / '+(visit.severity||'—'),'Tried: '+(visit.tried||'—'),'Medical: '+(visit.medicalSnapshot||'—'),'Pregnancy: '+(visit.pregnancy||'—'),'Photos: '+(visit.photoCount||0),'Red flags: '+((visit.redFlags&&visit.redFlags.length)?visit.redFlags.join('; '):'none')].join('\n');
}
function wireActions(){
  $('copySummary').addEventListener('click',function(){navigator.clipboard&&navigator.clipboard.writeText(summaryText());this.textContent='Copied';var self=this;setTimeout(function(){self.textContent='Copy summary';},1400);});
  function action(label){$('result').textContent=label+' — prototype action logged locally.';}
  $('saveDraft').addEventListener('click',function(){action('Draft saved');});
  $('requestInfo').addEventListener('click',function(){action('Request for more information queued');});
  $('closeConsult').addEventListener('click',function(){
    var missing=[]; if(!$('reviewedSafety').checked)missing.push('safety'); if(!$('reviewedPhotos').checked)missing.push('photos'); if(!$('reviewedConsent').checked)missing.push('consent/payment');
    if(missing.length){$('result').textContent='Check '+missing.join(', ')+' before closing.';return;}
    action('Plan sent and consult closed');
  });
}
renderTop();renderFacts();renderFlags();renderPhotos();setTemplates();wireActions();
})();
