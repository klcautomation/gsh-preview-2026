/* Menu button for phones */
(function(){var t=document.querySelector('.top'),b=document.querySelector('.menu-btn');if(!t||!b)return;
b.addEventListener('click',function(){var o=t.classList.toggle('open');b.setAttribute('aria-expanded',o?'true':'false');});})();
/* G's Home Services: request form. PREVIEW BUILD: this form sends nothing.
 * No mailto, no form action, no network request. The button is type="button" and only shows the preview note.
 * A real send method gets wired in at launch, after the business details are confirmed. */
(function(){
  var f=document.getElementById('quote'); if(!f) return;
  var es=f.getAttribute('data-lang')==='es';
  var msg=es?'Vista previa: este formulario no envía nada.':'Preview: this form does not send.';
  function show(e){
    if(e) e.preventDefault();
    var d=document.getElementById('f-done'); if(!d) return;
    d.textContent=''; var p=document.createElement('p'); p.tabIndex=-1; p.textContent=msg;
    d.appendChild(p); d.hidden=false; p.focus();
  }
  f.addEventListener('submit',show);
  var b=f.querySelector('button'); if(b) b.addEventListener('click',show);
})();
