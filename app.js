const menu=document.querySelector('.menu');const nav=document.querySelector('#nav');menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open))});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}));
const cards=[...document.querySelectorAll('.products article')];const filters=[...document.querySelectorAll('[data-filter]')];const search=document.querySelector('#product-search');const empty=document.querySelector('.no-results');let category='all';
function applyFilters(){const query=search.value.trim().toLowerCase();let shown=0;cards.forEach(card=>{const matchesCategory=category==='all'||card.dataset.category===category;const matchesText=card.dataset.name.toLowerCase().includes(query)||card.textContent.toLowerCase().includes(query);const show=matchesCategory&&matchesText;card.classList.toggle('hidden',!show);if(show)shown++});empty.hidden=shown>0}
filters.forEach(button=>button.addEventListener('click',()=>{category=button.dataset.filter;filters.forEach(b=>b.classList.toggle('active',b===button));applyFilters()}));search.addEventListener('input',applyFilters);
document.querySelectorAll('[data-category-link]').forEach(link=>link.addEventListener('click',()=>{category=link.dataset.categoryLink;filters.forEach(b=>b.classList.toggle('active',b.dataset.filter===category));applyFilters()}));
document.querySelectorAll('.product-wa').forEach(link=>{const message=`Hello Mboky Holdings, I would like the current sizes, price and availability for ${link.dataset.product}.`;link.href=`https://wa.me/254731780253?text=${encodeURIComponent(message)}`;link.target='_blank';link.rel='noopener'});
document.querySelector('#quote-form').addEventListener('submit',event=>{event.preventDefault();const data=new FormData(event.currentTarget);const message=`Hello Mboky Holdings, my name is ${data.get('name')}. My phone number is ${data.get('phone')}. I am interested in ${data.get('product')}. Details: ${data.get('details')||'Please share current prices and availability.'}`;window.open(`https://wa.me/254731780253?text=${encodeURIComponent(message)}`,'_blank','noopener')});

const copyrightYear=document.querySelector('#copyright-year');if(copyrightYear)copyrightYear.textContent=String(new Date().getFullYear());


document.querySelectorAll('.product-gallery').forEach(gallery=>{
  const images=[...gallery.querySelectorAll('img')];
  const count=gallery.querySelector('.gallery-count');
  let current=0;
  let touchStart=0;
  const show=index=>{
    current=(index+images.length)%images.length;
    images.forEach((img,i)=>img.classList.toggle('active',i===current));
    count.textContent=`${current+1} / ${images.length}`;
  };
  gallery.querySelector('.gallery-prev').addEventListener('click',event=>{event.stopPropagation();show(current-1)});
  gallery.querySelector('.gallery-next').addEventListener('click',event=>{event.stopPropagation();show(current+1)});
  gallery.addEventListener('click',event=>{if(!event.target.closest('button'))show(current+1)});
  gallery.addEventListener('keydown',event=>{if(event.key==='ArrowLeft')show(current-1);if(event.key==='ArrowRight')show(current+1)});
  gallery.addEventListener('touchstart',event=>{touchStart=event.changedTouches[0].clientX},{passive:true});
  gallery.addEventListener('touchend',event=>{const distance=event.changedTouches[0].clientX-touchStart;if(Math.abs(distance)>35)show(current+(distance<0?1:-1))},{passive:true});
});
