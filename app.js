(function(){
  var hd=document.getElementById('hd'),mbar=document.getElementById('mbar'),hero=document.querySelector('.hero');
  function onScroll(){var y=window.scrollY;hd.classList.toggle('on',y>40);if(mbar){var h=hero?hero.offsetHeight:600;var k=document.getElementById('kontakt');var kt=k?k.getBoundingClientRect().top:9e9;mbar.classList.toggle('on',y>h*.8&&kt>window.innerHeight*.6);}}
  window.addEventListener('scroll',onScroll,{passive:true});onScroll();
  // menu mobilne
  var mm=document.getElementById('mm'),mo=document.getElementById('mopen'),mc=document.getElementById('mclose');
  function setM(o){mm.classList.toggle('open',o);mo.setAttribute('aria-expanded',o);document.body.style.overflow=o?'hidden':'';if(o)mc.focus();else mo.focus();}
  mo.addEventListener('click',function(){setM(true)});mc.addEventListener('click',function(){setM(false)});
  mm.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){mm.classList.remove('open');document.body.style.overflow='';mo.setAttribute('aria-expanded',false)})});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&mm.classList.contains('open'))setM(false)});
  // karuzele: przyciski, kropki, przeciąganie myszą
  document.querySelectorAll('.rail').forEach(function(r){
    var id=r.id,nav=document.querySelector('.rail-nav[data-for="'+id+'"]'),dots=document.querySelector('.dots[data-for="'+id+'"]'),items=r.children;
    function step(){return items[0]?items[0].getBoundingClientRect().width+16:300}
    function upd(){var max=r.scrollWidth-r.clientWidth-2;if(nav){nav.querySelector('.prev').disabled=r.scrollLeft<=2;nav.querySelector('.next').disabled=r.scrollLeft>=max;}
      if(dots){var i=Math.round(r.scrollLeft/step());if(r.scrollLeft>=max)i=items.length-1;[].forEach.call(dots.children,function(d,j){d.classList.toggle('on',j===i)})}}
    if(nav){nav.querySelector('.prev').addEventListener('click',function(){r.scrollBy({left:-step(),behavior:'smooth'})});nav.querySelector('.next').addEventListener('click',function(){r.scrollBy({left:step(),behavior:'smooth'})});}
    if(dots){for(var i=0;i<items.length;i++){dots.appendChild(document.createElement('i'))}}
    r.addEventListener('scroll',function(){window.requestAnimationFrame(upd)},{passive:true});window.addEventListener('resize',upd);upd();
    var down=false,sx=0,sl=0,moved=false;
    r.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse')return;down=true;moved=false;sx=e.clientX;sl=r.scrollLeft;});
    window.addEventListener('pointermove',function(e){if(!down)return;var dx=e.clientX-sx;if(Math.abs(dx)>5){moved=true;r.classList.add('drag');}r.scrollLeft=sl-dx;});
    window.addEventListener('pointerup',function(){if(!down)return;down=false;if(moved){var s=step();var t=Math.round(r.scrollLeft/s)*s;r.classList.remove('drag');r.scrollTo({left:t,behavior:'smooth'});}});
    r.addEventListener('click',function(e){if(moved){e.preventDefault();e.stopPropagation();moved=false;}},true);
  });
  // pojawianie się sekcji
  if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px'});document.querySelectorAll('.rv').forEach(function(el){io.observe(el)});}
  else document.querySelectorAll('.rv').forEach(function(el){el.classList.add('in')});
  // formularz pokazowy
  var f=document.getElementById('form');if(f)f.addEventListener('submit',function(e){e.preventDefault();document.getElementById('fok').style.display='block';});
})();
