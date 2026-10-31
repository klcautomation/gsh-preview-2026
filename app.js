/* Menu button for phones (same behavior as klcautomation.net) */
(function(){var t=document.querySelector('.top'),b=document.querySelector('.menu-btn');if(!t||!b)return;
b.addEventListener('click',function(){var o=t.classList.toggle('open');b.setAttribute('aria-expanded',o?'true':'false');});})();
/* G's Home Services: request form. No trackers, no outside scripts.
 *
 * HOW REQUESTS ARE SENT: change the ONE line below.
 *   "mailto"     (default) opens the visitor's email app with the request filled in, addressed to the
 *                form's data-to email (set in request.html / es/solicitar.html). Nothing is sent until they press Send.
 *   "formsubmit" posts the form to FormSubmit.co, which emails it to that address with no email app needed.
 *                The first request triggers a one-time "activate" email to that address; click it once.
 *   "demo"       sends nothing; the request is only shown on the page (for previews).
 */
var FORM_MODE = "demo";   // preview: nothing is sent. Change to "mailto" at launch.

(function(){
  var f=document.getElementById('quote'); if(!f) return;
  var es=f.getAttribute('data-lang')==='es', to=f.getAttribute('data-to');
  var T=es?{req:'Faltan campos obligatorios: ',subj:'Solicitud de cotización - ',
    mail:'Se abrió su aplicación de correo con la solicitud. Presione Enviar allí para mandarla. ¿No se abrió? Escriba a ',
    sent:'¡Gracias! Su solicitud fue enviada. Garrett se comunicará con usted.',demo:'Vista previa: esta solicitud no se envió.',
    fail:'No se pudo enviar. Llame o escriba a ',
    labels:{name:'Nombre',phone:'Teléfono',town:'Ciudad o código postal',service:'Servicio',urgency:'Para cuándo',callback:'Hora para llamar',language:'Idioma',details:'Detalles'}}
   :{req:'Please fill in: ',subj:'Quote request - ',
    mail:'Your email app opened with the request. Press Send there to send it. Didn\'t open? Email ',
    sent:'Thanks! Your request was sent. Garrett will get back to you.',demo:'Preview: this request was not sent.',
    fail:'Sorry, that didn\'t go through. Please call or email ',
    labels:{name:'Name',phone:'Phone',town:'Town or ZIP',service:'Service',urgency:'How soon',callback:'Callback time',language:'Language',details:'Details'}};
  function done(msg,withEmail){
    var d=document.getElementById('f-done'); d.innerHTML=''; var p=document.createElement('p'); p.tabIndex=-1;
    p.appendChild(document.createTextNode(msg));
    if(withEmail){var a=document.createElement('a');a.href='mailto:'+to;a.textContent=to;p.appendChild(a);p.appendChild(document.createTextNode('.'));}
    d.appendChild(p); d.hidden=false; p.focus();
  }
  f.addEventListener('submit',function(e){
    e.preventDefault();
    var err=document.getElementById('f-err'),miss=[],first=null;
    Array.prototype.forEach.call(f.querySelectorAll('[required]'),function(el){
      var bad=!el.value.trim(); el.setAttribute('aria-invalid',bad?'true':'false');
      if(bad){miss.push(T.labels[el.name]);first=first||el;}
    });
    if(miss.length){err.textContent=T.req+miss.join(', ');err.hidden=false;first.focus();return;}
    err.hidden=true;
    var lines=[],data={};
    Object.keys(T.labels).forEach(function(k){var v=(f.elements[k]&&f.elements[k].value||'').trim();if(v){lines.push(T.labels[k]+': '+v);data[T.labels[k]]=v;}});
    var subject=T.subj+f.elements.service.value+' ('+f.elements.town.value.trim()+')';
    if(FORM_MODE==='mailto'){
      window.location.href='mailto:'+to+'?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(lines.join('\n'));
      done(T.mail,true);
    } else if(FORM_MODE==='formsubmit'){
      data._subject=subject; data._template='table'; data._captcha='false';
      fetch('https://formsubmit.co/ajax/'+to,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(data)})
        .then(function(r){if(!r.ok)throw 0;done(T.sent);f.reset();}).catch(function(){done(T.fail,true);});
    } else {
      done(T.demo+' '+lines.join(' · '));
    }
  });
})();
