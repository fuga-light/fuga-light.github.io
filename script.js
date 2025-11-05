
// Theme toggle remembered in localStorage
function applyTheme(isDark){
  if(isDark) document.documentElement.classList.add('dark');
  else document.documentElement.classList.remove('dark');
  localStorage.setItem('fuga_theme_dark', isDark ? '1' : '0');
}
document.addEventListener('DOMContentLoaded', function(){
  const saved = localStorage.getItem('fuga_theme_dark') === '1';
  applyTheme(saved);

  document.querySelectorAll('#theme-toggle, #theme-toggle-2').forEach(btn=>{
    btn && btn.addEventListener('click', ()=>{
      const isDark = document.documentElement.classList.toggle('dark');
      localStorage.setItem('fuga_theme_dark', isDark ? '1' : '0');
    });
  });

  // Simple comment system stored in localStorage per-page
  const form = document.getElementById('comment-form');
  const list = document.getElementById('comments-list');
  if(form && list){
    const key = 'fuga_comments_ch1';
    function render(){
      list.innerHTML = '';
      const items = JSON.parse(localStorage.getItem(key) || '[]').reverse();
      for(const it of items){
        const div = document.createElement('div');
        div.className = 'comment';
        div.innerHTML = '<strong>'+ (it.name || 'Độc giả ẩn danh') +'</strong> <small style="color:#888"> - '+ it.time +'</small><p>'+ it.text +'</p>';
        list.appendChild(div);
      }
    }
    form.addEventListener('submit', e=>{
      e.preventDefault();
      const name = document.getElementById('comment-name').value.trim();
      const body = document.getElementById('comment-body').value.trim();
      if(!body) return;
      const arr = JSON.parse(localStorage.getItem(key) || '[]');
      arr.push({name:name, text:body, time: new Date().toLocaleString()});
      localStorage.setItem(key, JSON.stringify(arr));
      form.reset();
      render();
    });
    render();
  }
});
