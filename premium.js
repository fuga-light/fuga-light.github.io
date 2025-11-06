
// theme toggle
function setTheme(isDark){
  if(isDark) document.body.classList.add('dark');
else document.body.classList.remove('dark');

  localStorage.setItem('fuga_theme_dark', isDark? '1' : '0');
}
document.addEventListener('DOMContentLoaded', ()=>{
  const saved = localStorage.getItem('fuga_theme_dark') === '1';
  setTheme(saved);
  document.getElementById('theme-toggle').addEventListener('click', ()=> setTheme(!document.document.documentElement.classList.contains('dark')));
  document.getElementById('theme-toggle-2').addEventListener('click', ()=> setTheme(!document.document.documentElement.classList.contains('dark')));

  // lightbox
  document.querySelectorAll('.illustration img').forEach(img=>{
    img.addEventListener('click', ()=>{
      const lb = document.getElementById('lightbox');
      lb.querySelector('img').src = img.src;
      lb.style.display='flex';
      lb.setAttribute('aria-hidden','false');
    });
  });
  document.getElementById('lb-close').addEventListener('click', ()=>{
    const lb = document.getElementById('lightbox');
    lb.style.display='none';
    lb.setAttribute('aria-hidden','true');
  });

  // back to top
  const b2t = document.getElementById('backToTop');
  window.addEventListener('scroll', ()=>{
    if(window.scrollY > 400) b2t.style.display='block'; else b2t.style.display='none';
  });

  // reactions simple (localStorage)
  const types = ['like','love','wow'];
  types.forEach(t=>{
    const el = document.getElementById('count-'+t);
    const key = 'fuga_react_'+t;
    const val = parseInt(localStorage.getItem(key) || '0',10);
    if(el) el.textContent = val;
    document.querySelectorAll('.react[data-type="'+t+'"]').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        let v = parseInt(localStorage.getItem(key) || '0',10) + 1;
        localStorage.setItem(key, v);
        if(el) el.textContent = v;
      });
    });
  });

  // comments (localStorage)
  const form = document.getElementById('comment-form');
  const list = document.getElementById('comments-list');
  if(form && list){
    const key = 'fuga_comments_ch1_premium';
    function render(){
      list.innerHTML='';
      const arr = JSON.parse(localStorage.getItem(key) || '[]').reverse();
      for(const it of arr){
        const d = document.createElement('div');
        d.className='comment';
        d.innerHTML = '<strong>'+ (it.name || 'Độc giả ẩn danh') +'</strong> <small style="color:#888"> - '+it.time+'</small><p>'+it.text+'</p>';
        list.appendChild(d);
      }
    }
    form.addEventListener('submit', e=>{
      e.preventDefault();
      const name = document.getElementById('comment-name')?document.getElementById('comment-name').value.trim():'';
      const body = document.getElementById('comment-body')?document.getElementById('comment-body').value.trim():document.getElementById('comment-body')?document.getElementById('comment-body').value.trim():'';
      const bodyInput = document.getElementById('comment-body') || document.querySelector('textarea');
      const nameInput = document.getElementById('comment-name') || document.querySelector('input');
      const b = bodyInput.value.trim();
      if(!b) return;
      const arr = JSON.parse(localStorage.getItem(key) || '[]');
      arr.push({name:nameInput.value.trim(), text:b, time: new Date().toLocaleString()});
      localStorage.setItem(key, JSON.stringify(arr));
      nameInput.value=''; bodyInput.value='';
      render();
    });
    render();
  }
});
