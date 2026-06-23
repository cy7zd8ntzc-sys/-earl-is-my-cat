(function(){
'use strict';
var CONCERNS=[["acne","Acne"],["rosacea","Rosacea & redness"],["melasma","Melasma"],["dark-spots","Dark spots / PIH"],["aging","Fine lines & aging"],["hairloss","Hair loss"],["eczema","Eczema"],["seb-derm","Dandruff / seborrheic dermatitis"],["sweating","Excessive sweating"],["warts","Warts"],["molluscum","Molluscum"],["herpes","Cold sores & herpes"],["perioral-dermatitis","Perioral dermatitis"],["folliculitis","Folliculitis / ingrown hairs"],["fungal-infections","Fungal rash"],["intertrigo","Intertrigo / yeast rash"],["impetigo","Impetigo"],["scabies","Scabies"],["genital-warts","Genital warts"],["nail-fungus","Nail fungus"],["aphthous-ulcers","Aphthous ulcers / canker sores"],["hs","Hidradenitis suppurativa"],["keratosis-pilaris","Keratosis pilaris"],["eyelash","Eyelash growth"],["other","Something else"]];
  var US_STATES=["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY","DC"];
  // TODO: replace with Dr. Eckert's actual 25 licensed states.
  var LICENSED=["AL","AZ","CA","CO","CT","FL","GA","IL","IN","MA","MD","MI","MN","NC","NV","NY","OH","OR","PA","TN","TX","UT","VA","WA","WI"];

  // build concern cards
  var grid=document.getElementById('concernGrid');
  CONCERNS.forEach(function(c){
    var l=document.createElement('label'); l.className='optcard';
    l.innerHTML='<input type="radio" name="concern" value="'+c[0]+'">'+c[1];
    l.querySelector('input').addEventListener('change',function(){
      document.querySelectorAll('.optcard').forEach(function(o){o.classList.remove('sel');});
      l.classList.add('sel');
    });
    grid.appendChild(l);
  });
  // prefill from ?c=
  var params=new URLSearchParams(location.search), pc=params.get('c');
  if(pc){var r=document.querySelector('input[name=concern][value="'+pc+'"]'); if(r){r.checked=true; r.dispatchEvent(new Event('change'));}}

  // build state select
  var sel=document.getElementById('state');
  US_STATES.forEach(function(s){var o=document.createElement('option');o.value=s;o.textContent=s;sel.appendChild(o);});
  var gate=document.getElementById('stateGate');
  sel.addEventListener('change',function(){
    if(sel.value && LICENSED.indexOf(sel.value)===-1){gate.classList.add('show');} else {gate.classList.remove('show');}
  });

  // photo previews
  var pin=document.getElementById('photoInput'), prev=document.getElementById('previews'), dz=document.querySelector('.dropzone');
  function addFiles(files){
    [].slice.call(files).slice(0,5).forEach(function(f){
      if(!f.type.match('image')) return;
      var rd=new FileReader(); rd.onload=function(e){var im=new Image();im.src=e.target.result;im.alt='uploaded photo';prev.appendChild(im);}; rd.readAsDataURL(f);
    });
  }
  pin.addEventListener('change',function(){addFiles(pin.files);});
  dz.addEventListener('dragover',function(e){e.preventDefault();dz.style.background='var(--aqua-soft)';});
  dz.addEventListener('dragleave',function(){dz.style.background='';});
  dz.addEventListener('drop',function(e){e.preventDefault();dz.style.background='';addFiles(e.dataTransfer.files);});

  // wizard
  var steps=[].slice.call(document.querySelectorAll('[data-step]'));
  var i=0, total=steps.length;
  var nextBtn=document.getElementById('nextBtn'), backBtn=document.getElementById('backBtn');
  var bar=document.getElementById('barfill'), prog=document.getElementById('progress');
  function show(){
    steps.forEach(function(s,n){s.classList.toggle('active',n===i);});
    bar.style.width=Math.round((i+1)/total*100)+'%';
    prog.textContent='Step '+(i+1)+' of '+total;
    backBtn.style.visibility = i===0 ? 'hidden':'visible';
    nextBtn.textContent = i===total-1 ? 'Send to Dr. Eckert' : 'Continue';
    window.scrollTo({top:0,behavior:'smooth'});
  }
  function valid(){
    if(i===0){
      var c=document.querySelector('input[name=concern]:checked');
      var e=steps[0].querySelector('[data-err]');
      if(!c){e.classList.add('show');return false;} e.classList.remove('show');
    }
    if(i===4 && sel.value && LICENSED.indexOf(sel.value)===-1){ return true; } // allowed to proceed to waitlist note; keep simple
    if(i===5){
      var ce=document.getElementById('consentErr');
      if(!document.getElementById('consent').checked){ce.classList.add('show');return false;} ce.classList.remove('show');
    }
    return true;
  }
  function buildReview(){
    var c=document.querySelector('input[name=concern]:checked');
    var clabel=c?(CONCERNS.filter(function(x){return x[0]===c.value;})[0]||['',''])[1]:'—';
    var rows=[
      ['Concern',clabel],
      ['Details',document.getElementById('concernMore').value||'—'],
      ['Duration',document.getElementById('duration').value||'—'],
      ['Photos',document.getElementById('previews').children.length+' added'],
      ['Name',(document.getElementById('first').value+' '+document.getElementById('last').value).trim()||'—'],
      ['State',sel.value||'—'],
      ['Email',document.getElementById('email').value||'—']
    ];
    document.getElementById('reviewBox').innerHTML=rows.map(function(r){return '<div class="r"><span class="k">'+r[0]+'</span><span class="v">'+(r[1]||'—')+'</span></div>';}).join('');
  }
  nextBtn.addEventListener('click',function(){
    if(!valid())return;
    if(i===total-1){
      var fn=document.getElementById('first').value.trim();
      document.getElementById('visitForm').style.display='none';
      document.querySelector('.progress').style.display='none';
      document.querySelector('.bar').style.display='none';
      document.getElementById('confirmName').textContent = fn ? ('Thanks, '+fn+'!') : 'Thanks!';
      document.getElementById('confirm').style.display='block';
      window.scrollTo({top:0,behavior:'smooth'});
      return;
    }
    i++; if(i===5) buildReview(); show();
  });
  backBtn.addEventListener('click',function(){if(i>0){i--;show();}});
  show();
})();
