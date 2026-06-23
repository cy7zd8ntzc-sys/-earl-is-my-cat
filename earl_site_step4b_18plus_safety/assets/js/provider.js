(function(){
'use strict';
function $(id){return document.getElementById(id);}function esc(s){return String(s||'').replace(/[&<>"]/g,function(ch){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[ch];});}
function norm(s){return String(s||'').toLowerCase().replace(/&/g,'and').replace(/[^a-z0-9]+/g,' ').trim();}
var fallback={createdAt:new Date().toISOString(),status:'ready_for_review',concern:'Perioral dermatitis',chiefConcern:'Red bumps around my mouth for 3 months, worse after steroid cream. I want to know if prescription treatment makes sense.',duration:'1–6 months',severity:'Moderate',tried:'Hydrocortisone, gentle cleanser, moisturizer.',photoCount:0,photos:[],medicalSnapshot:'No drug allergies. No current meds. No major conditions.',pregnancy:'No',ageConfirmed:true,redFlags:[],first:'Demo',last:'Patient',dob:'1990-01-01',state:'TX',email:'demo@example.com',licensed:true,payment:{amount:75,currency:'USD',sequence:'consent_then_payment_then_create_consult'}};
var formulary=window.EARL_FORMULARY||{globalHoldRules:[],conditions:[]};
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
  var rows=[['Concern',visit.concern],['Description',visit.chiefConcern],['Duration',visit.duration],['Severity',visit.severity||'—'],['Tried',visit.tried||'—'],['Medical',visit.medicalSnapshot],['Pregnancy',visit.pregnancy],['Adult eligibility',visit.ageConfirmed?'Confirmed 18+':'Not confirmed'],['Email',visit.email],['Payment',visit.payment&&visit.payment.sequence?String(visit.payment.sequence).replace(/_/g,' '):'—']];
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
function matchedCondition(){
  var target=norm(visit.concern||'');
  var conditions=formulary.conditions||[];
  for(var i=0;i<conditions.length;i++){
    var c=conditions[i], names=[c.id,c.label].concat(c.aliases||[]);
    for(var j=0;j<names.length;j++){if(norm(names[j])===target||target.indexOf(norm(names[j]))>-1||norm(names[j]).indexOf(target)>-1){return c;}}
  }
  return conditions.find(function(c){return c.id==='other';})||null;
}
function clinicalRxFlags(){
  var flags=[];
  if(visit.redFlags&&visit.redFlags.length)flags.push('Safety gate active: hold Rx or document override.');
  if(!visit.licensed)flags.push('State/licensure flag in prototype: do not prescribe until state is confirmed.');
  var pc=(visit.photoCount||((visit.photos||[]).length));
  if(pc<3)flags.push('Fewer than 3 photo views: consider requesting more photos if image quality is diagnosis-critical.');
  var preg=norm(visit.pregnancy); if(preg&&preg!=='no'&&preg!=='not applicable'&&preg!=='na')flags.push('Pregnancy/breastfeeding/trying flag: avoid pregnancy-sensitive templates until reviewed.');
  if(visit.ageConfirmed!==true)flags.push('Adult eligibility not confirmed: do not prescribe until 18+ status is verified.');
  return flags;
}
function renderFormulary(){
  var c=matchedCondition();
  var summary=$('formularySummary'), opts=$('formularyOptions'), rules=$('formularyGuardrails'), flags=$('rxFlags');
  if(!c){summary.textContent='No formulary match. Request more information or choose manually.';opts.innerHTML='';rules.innerHTML='';return;}
  $('formularySource').textContent='Draft protocol · '+(formulary.version||'');
  summary.textContent=c.summary||'Draft condition protocol.';
  var rxFlags=clinicalRxFlags();
  flags.innerHTML=rxFlags.length?rxFlags.map(function(f){return '<div class="rx-flag">'+esc(f)+'</div>';}).join(''):'<div class="rx-ok">No automatic Rx hold flags from intake metadata.</div>';
  rules.innerHTML=(c.guardrails||[]).concat(formulary.globalHoldRules||[]).slice(0,10).map(function(r){return '<li>'+esc(r)+'</li>';}).join('');
  opts.innerHTML=(c.rxFamilies||[]).map(function(o){return '<article class="rx-option" data-rxid="'+esc(o.id)+'"><div><span class="chip">'+esc(o.mode||'Option')+'</span><h4>'+esc(o.title)+'</h4><p>'+esc(o.fit||'')+'</p></div><div class="rx-meta"><b>Requires</b><span>'+esc((o.requires||[]).join('; ')||'Clinician review')+'</span></div><div class="rx-meta"><b>Avoid / hold</b><span>'+esc((o.avoid||[]).join('; ')||'None listed')+'</span></div><button type="button" data-apply-rx="'+esc(o.id)+'">Use template</button></article>';}).join('')||'<div class="rx-empty">No options configured for this concern.</div>';
  opts.querySelectorAll('[data-apply-rx]').forEach(function(btn){btn.addEventListener('click',function(){applyRxTemplate(c,btn.getAttribute('data-apply-rx'));});});
}
function applyRxTemplate(condition,optId){
  var opt=(condition.rxFamilies||[]).find(function(o){return o.id===optId;}); if(!opt)return;
  $('dx').value=condition.defaultDx||condition.label||visit.concern||'';
  $('decision').value=opt.disposition||'Ready to treat';
  $('rxAction').value=opt.rxAction||'Hold pending more information';
  $('plan').value=[opt.plan,opt.followUp?'Follow-up: '+opt.followUp:''].filter(Boolean).join('\n\n');
  $('rxText').value=opt.rxTemplate||'';
  $('patientMessage').value=opt.message||'';
  $('result').textContent='Formulary template applied — clinician must edit and verify before sending.';
}
function setTemplates(){
  var dx=$('dx'), plan=$('plan'), rx=$('rxText'), msg=$('patientMessage'), dec=$('decision'), action=$('rxAction');
  var c=matchedCondition();
  dx.value=(c&&c.defaultDx)||visit.concern||'';
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
  return ['Patient: '+fullName(),'DOB/state: '+(visit.dob||'—')+' / '+(visit.state||'—'),'Concern: '+(visit.concern||'—'),'Description: '+(visit.chiefConcern||'—'),'Duration/severity: '+(visit.duration||'—')+' / '+(visit.severity||'—'),'Tried: '+(visit.tried||'—'),'Medical: '+(visit.medicalSnapshot||'—'),'Pregnancy: '+(visit.pregnancy||'—'),'Adult eligibility: '+(visit.ageConfirmed?'18+ confirmed':'not confirmed'),'Photos: '+(visit.photoCount||0),'Red flags: '+((visit.redFlags&&visit.redFlags.length)?visit.redFlags.join('; '):'none')].join('\n');
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
renderTop();renderFacts();renderFlags();renderPhotos();renderFormulary();setTemplates();wireActions();
})();
