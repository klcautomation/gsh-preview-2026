/* Menu button for phones */
(function(){var t=document.querySelector('.top'),b=document.querySelector('.menu-btn');if(!t||!b)return;
b.addEventListener('click',function(){var o=t.classList.toggle('open');b.setAttribute('aria-expanded',o?'true':'false');});})();
/* G's Home Service: request form (mailto). Builds a pre-filled email to data-to (sales@gshomeservice.com).
 * Nothing is sent automatically and nothing is booked: the visitor must press Send in their own email app. */
(function(){
  var f=document.getElementById('quote'); if(!f) return;
  var es=f.getAttribute('data-lang')==='es';
  var to=f.getAttribute('data-to')||'sales@gshomeservice.com';
  var T=es?{subj:'Solicitud de cotización',need:'Complete los campos obligatorios: ',
      labels:{name:'Nombre',phone:'Teléfono',town:'Ciudad o código postal',service:'Servicio',urgency:'¿Qué tan pronto?',callback:'Mejor hora para llamar',language:'Idioma preferido',details:'Detalles'},
      done:'Se abrió un correo ya llenado para '+to+'. Su solicitud TODAVÍA NO se ha enviado: presione Enviar en su aplicación de correo. Esto no es una cita reservada; Garrett le contactará para confirmar. Si no se abrió nada, llame al (502) 660-8352 o escriba a '+to+'.'}
    :{subj:'Quote request',need:'Please fill in: ',
      labels:{name:'Name',phone:'Phone',town:'Town or ZIP',service:'Service',urgency:'How soon',callback:'Best time to call',language:'Preferred language',details:'Details'},
      done:'A pre-filled email to '+to+' should now be open. Your request has NOT been sent yet: press Send in your email app. This is not a booked appointment; Garrett will contact you to confirm. If nothing opened, call (502) 660-8352 or email '+to+'.'};
  function go(e){
    if(e) e.preventDefault();
    var err=document.getElementById('f-err'), miss=[];
    ['name','phone','town','service'].forEach(function(n){var x=f.elements[n]; if(x&&!String(x.value).trim()) miss.push(T.labels[n]);});
    if(miss.length){ if(err){err.textContent=T.need+miss.join(', '); err.hidden=false;} return; }
    if(err) err.hidden=true;
    var lines=[]; Object.keys(T.labels).forEach(function(n){var x=f.elements[n]; if(x&&String(x.value).trim()) lines.push(T.labels[n]+': '+String(x.value).trim());});
    var subj=T.subj+' - '+f.elements.service.value+' - '+f.elements.town.value.trim();
    var href='mailto:'+to+'?subject='+encodeURIComponent(subj)+'&body='+encodeURIComponent(lines.join('\n'));
    var d=document.getElementById('f-done');
    if(d){ d.textContent=''; var p=document.createElement('p'); p.tabIndex=-1; p.textContent=T.done; d.appendChild(p); d.hidden=false; p.focus(); }
    window.location.href=href;
  }
  f.addEventListener('submit',go);
  var submit=f.querySelector('button[type="submit"]');
  if(submit) submit.disabled=false;
})();
