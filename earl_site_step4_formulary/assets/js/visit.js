(function(){
'use strict';

var CONCERNS=[
  ["acne","Acne"],["rosacea","Rosacea & redness"],["melasma","Melasma"],["dark-spots","Dark spots / PIH"],["aging","Fine lines & aging"],["hairloss","Hair loss"],
  ["eczema","Eczema"],["seb-derm","Dandruff / seborrheic dermatitis"],["sweating","Excessive sweating"],["warts","Warts"],["molluscum","Molluscum"],["herpes","Cold sores & herpes"],
  ["perioral-dermatitis","Perioral dermatitis"],["folliculitis","Folliculitis / ingrown hairs"],["fungal-infections","Fungal rash"],["intertrigo","Intertrigo / yeast rash"],["impetigo","Impetigo"],
  ["scabies","Scabies"],["genital-warts","Genital warts"],["nail-fungus","Nail fungus"],["aphthous-ulcers","Aphthous ulcers / canker sores"],["hs","Hidradenitis suppurativa"],
  ["keratosis-pilaris","Keratosis pilaris"],["eyelash","Eyelash growth"],["other","Something else"]
];
var CONCERN_LABELS=CONCERNS.reduce(function(acc,item){acc[item[0]]=item[1];return acc;},{});
var US_STATES=["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY","DC"];
// TODO: replace with Dr. Eckert's actual licensed states before production.
var LICENSED=["AL","AZ","CA","CO","CT","FL","GA","IL","IN","MA","MD","MI","MN","NC","NV","NY","OH","OR","PA","TN","TX","UT","VA","WA","WI"];

var UNIVERSAL_FLAGS=[
  "Fever, chills, feeling very ill, or rapidly spreading redness",
  "Severe pain, red streaking, drainage, or concern for a serious infection",
  "Rash or symptoms involving the eye, eyelid, vision, lips/tongue swelling, or trouble breathing",
  "A new, changing, bleeding, painful, or irregular mole/spot that could need skin-cancer evaluation",
  "Large open wound, burn, severe injury, or abscess that may need drainage",
  "Immunosuppressed, transplant medication, chemotherapy, uncontrolled diabetes, or similar high-risk condition"
];
var RED_FLAGS={
  "sweating":["New whole-body sweating with chest pain, shortness of breath, fainting, fever, night sweats, or unexplained weight loss"],
  "hairloss":["Sudden painful hair loss, scarring, open sores, or rapidly expanding patches"],
  "eyelash":["Eye pain, vision change, eye infection, glaucoma history, or recent eye surgery"],
  "herpes":["Eye symptoms, severe headache/neck stiffness, widespread blisters, or inability to urinate"],
  "aphthous-ulcers":["Mouth ulcers lasting more than 2 weeks, trouble swallowing, dehydration, eye/genital sores, or unexplained weight loss"],
  "impetigo":["Fever, spreading warmth/redness, rapidly worsening pain, or infection around the eye"],
  "scabies":["Crusted/thick widespread scaling, nursing-home/institutional outbreak, or immunosuppression"],
  "genital-warts":["Painful ulcers, pelvic/testicular pain, pregnancy, sexual assault concern, or possible STI exposure needing testing"],
  "nail-fungus":["Diabetes with foot wound, severe nail pain, pus, spreading redness, or circulation problems"],
  "eczema":["Widespread painful rash, fever, honey-colored crusting, blisters, or concern for eczema herpeticum"],
  "fungal-infections":["Rapidly spreading painful rash, fever, groin/genital severe pain, or immunosuppression"],
  "intertrigo":["Open sores, severe pain, fever, spreading redness, or diabetes/immunosuppression"],
  "warts":["Genital/anal wart concern, eye involvement, severe pain, or immunosuppression"],
  "molluscum":["Eye involvement, widespread eruption in an immunosuppressed patient, or genital lesions in a child"],
  "hs":["Fever, severe pain, rapidly enlarging abscess, or need for drainage today"],
  "dark-spots":["A spot that is changing in size/shape/color, bleeding, painful, or not clearly pigmentation"],
  "melasma":["A spot that is changing in size/shape/color, bleeding, painful, or not clearly pigmentation"],
  "rosacea":["Eye pain, light sensitivity, vision change, or severe facial swelling"],
  "perioral-dermatitis":["Eye involvement, severe facial swelling, fever, or rapidly spreading infection"],
  "aging":["A lesion or spot you are worried could be skin cancer"]
};

var uploadedPhotos=[];

function $(id){return document.getElementById(id);}
function selectedConcern(){var c=document.querySelector('input[name=concern]:checked'); return c ? c.value : '';}
function labelForConcern(key){return CONCERN_LABELS[key] || key || '—';}
function fieldValue(id){var el=$(id); return el ? (el.value || '').trim() : '';}
function showError(key, show){var el=document.querySelector('[data-err="'+key+'"]'); if(el) el.classList.toggle('show', !!show);}
function escapeHtml(str){return String(str||'').replace(/[&<>"]/g,function(ch){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[ch];});}

// Concern cards
var grid=$('concernGrid');
CONCERNS.forEach(function(c){
  var l=document.createElement('label'); l.className='optcard';
  l.innerHTML='<input type="radio" name="concern" value="'+c[0]+'"><span>'+c[1]+'</span>';
  l.querySelector('input').addEventListener('change',function(){
    document.querySelectorAll('.optcard').forEach(function(o){o.classList.remove('sel');});
    l.classList.add('sel');
    renderRedFlags();
  });
  grid.appendChild(l);
});
var params=new URLSearchParams(location.search), pc=params.get('c');
if(pc){var r=document.querySelector('input[name=concern][value="'+pc+'"]'); if(r){r.checked=true; r.dispatchEvent(new Event('change'));}}

// State select
var stateSel=$('state'), gate=$('stateGate');
US_STATES.forEach(function(s){var o=document.createElement('option');o.value=s;o.textContent=s;stateSel.appendChild(o);});
stateSel.addEventListener('change',function(){gate.classList.toggle('show', stateSel.value && LICENSED.indexOf(stateSel.value)===-1);});

// Photos
var pin=$('photoInput'), prev=$('previews'), dz=$('dropzone'), photoCount=$('photoCount');
function updatePhotoCount(){
  photoCount.textContent=uploadedPhotos.length + (uploadedPhotos.length===1 ? ' photo added' : ' photos added');
  photoCount.classList.toggle('ok', uploadedPhotos.length>=3);
}
function addFiles(files){
  Array.prototype.slice.call(files).forEach(function(f){
    if(!f.type || !f.type.match('image')) return;
    if(uploadedPhotos.length>=8) return;
    var rd=new FileReader();
    rd.onload=function(e){
      var url=e.target.result;
      uploadedPhotos.push(url);
      var wrap=document.createElement('div'); wrap.className='thumb';
      var im=new Image(); im.src=url; im.alt='uploaded dermatology photo';
      var btn=document.createElement('button'); btn.type='button'; btn.textContent='×'; btn.setAttribute('aria-label','Remove photo');
      btn.addEventListener('click',function(){
        var idx=Array.prototype.indexOf.call(prev.children, wrap);
        if(idx>-1) uploadedPhotos.splice(idx,1);
        wrap.remove(); updatePhotoCount();
      });
      wrap.appendChild(im); wrap.appendChild(btn); prev.appendChild(wrap); updatePhotoCount();
      showError('photos', false);
    };
    rd.readAsDataURL(f);
  });
}
pin.addEventListener('change',function(){addFiles(pin.files); pin.value='';});
dz.addEventListener('dragover',function(e){e.preventDefault();dz.classList.add('drag');});
dz.addEventListener('dragleave',function(){dz.classList.remove('drag');});
dz.addEventListener('drop',function(e){e.preventDefault();dz.classList.remove('drag');addFiles(e.dataTransfer.files);});
updatePhotoCount();

// Red flags
function currentFlags(){
  var concern=selectedConcern();
  return UNIVERSAL_FLAGS.concat(RED_FLAGS[concern] || []);
}
function renderRedFlags(){
  var box=$('redFlagBox');
  box.innerHTML='';
  currentFlags().forEach(function(txt, idx){
    var id='flag_'+idx;
    var label=document.createElement('label'); label.className='flagitem';
    label.innerHTML='<input type="checkbox" name="redflag" value="'+escapeHtml(txt)+'" id="'+id+'"><span>'+escapeHtml(txt)+'</span>';
    label.querySelector('input').addEventListener('change',function(){
      if(this.checked){$('noRedFlags').checked=false;}
      updateTriage();
    });
    box.appendChild(label);
  });
  updateTriage();
}
$('noRedFlags').addEventListener('change',function(){
  if(this.checked){document.querySelectorAll('input[name=redflag]').forEach(function(cb){cb.checked=false;});}
  updateTriage();
});
function selectedFlags(){return Array.prototype.slice.call(document.querySelectorAll('input[name=redflag]:checked')).map(function(cb){return cb.value;});}
function updateTriage(){
  var has=selectedFlags().length>0;
  $('triageAlert').classList.toggle('hidden', !has);
  var fta=$('finalTriageAlert'); if(fta) fta.classList.toggle('hidden', !has);
  var pay=$('paymentCard'); if(pay) pay.classList.toggle('disabled', has);
}
renderRedFlags();

// Wizard
var steps=Array.prototype.slice.call(document.querySelectorAll('[data-step]'));
var i=0,total=steps.length,nextBtn=$('nextBtn'),backBtn=$('backBtn'),bar=$('barfill'),prog=$('progress');
function show(){
  steps.forEach(function(s,n){s.classList.toggle('active',n===i);});
  bar.style.width=Math.round((i+1)/total*100)+'%';
  prog.textContent='Step '+(i+1)+' of '+total;
  backBtn.style.visibility=i===0?'hidden':'visible';
  nextBtn.textContent=i===total-1?(selectedFlags().length?'Send triage note':'Submit demo visit'):'Continue';
  if(i===total-1) buildReview();
  window.scrollTo({top:0,behavior:'smooth'});
}
function requireField(id, key){var ok=!!fieldValue(id); showError(key || id, !ok); return ok;}
function valid(){
  var step=steps[i].getAttribute('data-step');
  if(step==='concern'){
    var okConcern=!!selectedConcern(); showError('concern', !okConcern);
    return okConcern && requireField('chiefConcern','chiefConcern') && requireField('duration','duration');
  }
  if(step==='photos'){
    var ok=uploadedPhotos.length>=3 || ($('photoOverride') && $('photoOverride').checked);
    showError('photos', !ok);
    return ok;
  }
  if(step==='medical'){
    return requireField('medicalSnapshot','medicalSnapshot') && requireField('pregnancy','pregnancy');
  }
  if(step==='safety'){
    var ok=$('noRedFlags').checked || selectedFlags().length>0;
    showError('redflags', !ok);
    return ok;
  }
  if(step==='identity'){
    var ok=['first','last','dob','state','email'].every(function(id){return !!fieldValue(id);});
    showError('identity', !ok);
    return ok;
  }
  if(step==='consent-payment'){
    var ok=['consentTelehealth','consentRx','consentCash','consentPrivacy'].every(function(id){return $(id).checked;});
    showError('consent', !ok);
    return ok;
  }
  return true;
}
function buildSubmission(){
  var flags=selectedFlags();
  var c=selectedConcern();
  return {
    createdAt:new Date().toISOString(),
    status:flags.length?'triage_gate':'ready_for_review',
    concernKey:c,
    concern:labelForConcern(c),
    chiefConcern:fieldValue('chiefConcern'),
    duration:fieldValue('duration'),
    severity:fieldValue('severity'),
    tried:fieldValue('tried'),
    photos:uploadedPhotos.slice(0,8),
    photoCount:uploadedPhotos.length,
    photoOverride:!!($('photoOverride') && $('photoOverride').checked),
    medicalSnapshot:fieldValue('medicalSnapshot'),
    pregnancy:fieldValue('pregnancy'),
    ageGroup:fieldValue('ageGroup'),
    redFlags:flags,
    noRedFlags:$('noRedFlags').checked,
    first:fieldValue('first'),
    last:fieldValue('last'),
    dob:fieldValue('dob'),
    state:fieldValue('state'),
    email:fieldValue('email'),
    licensed:LICENSED.indexOf(fieldValue('state'))!==-1,
    payment:{prototype:true,amount:75,currency:'USD',sequence:flags.length?'skip_payment_triage':'consent_then_payment_then_create_consult'}
  };
}
function buildReview(){
  var s=buildSubmission();
  var rows=[
    ['Concern',s.concern],['Description',s.chiefConcern],['Duration',s.duration],['Severity',s.severity||'—'],['Already tried',s.tried||'—'],
    ['Photos',s.photoCount+' added'+(s.photoOverride?' · override acknowledged':'')],['Medical snapshot',s.medicalSnapshot],['Pregnancy/breastfeeding',s.pregnancy],['Patient',((s.first+' '+s.last).trim()||'—')],['DOB',s.dob||'—'],['State',s.state||'—'],['Safety gate',s.redFlags.length?s.redFlags.length+' item(s) selected':'None selected']
  ];
  $('reviewBox').innerHTML=rows.map(function(r){return '<div class="r"><span class="k">'+escapeHtml(r[0])+'</span><span class="v">'+escapeHtml(r[1])+'</span></div>';}).join('');
  updateTriage();
}
function saveSubmission(){
  var s=buildSubmission();
  try{localStorage.setItem('earlDemoLatestVisit', JSON.stringify(s));}catch(e){console.warn('Could not save demo visit', e);}
  return s;
}
nextBtn.addEventListener('click',function(){
  if(!valid()) return;
  if(i===total-1){
    var s=saveSubmission();
    $('visitForm').classList.add('hidden');
    prog.classList.add('hidden');
    document.querySelector('.bar').classList.add('hidden');
    $('confirmName').textContent=s.redFlags.length?'Triage note saved':'Visit saved';
    $('confirmCopy').textContent=s.redFlags.length?'Safety-gate answers were selected. In production, this should route to triage/in-person guidance and avoid normal payment collection.':'Prototype submission saved locally for provider-dashboard review. In production, this would be sent to the secure clinical backend after payment success.';
    $('confirm').classList.remove('hidden');
    window.scrollTo({top:0,behavior:'smooth'});
    return;
  }
  i++; show();
});
backBtn.addEventListener('click',function(){if(i>0){i--;show();}});
show();
})();
