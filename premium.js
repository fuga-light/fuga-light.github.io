// ====== Theme Toggle (Dark / Light Mode) ======
function setTheme(isDark) {
  // Gắn hoặc bỏ class "dark" cho BODY (đúng với CSS hiện tại)
  if (isDark) document.body.classList.add('dark');
  else document.body.classList.remove('dark');

  // Lưu trạng thái vào localStorage
  localStorage.setItem('fuga_theme_dark', isDark ? '1' : '0');

  // Reload lại Disqus (nếu đang dùng)
  if (window.DISQUS) {
    try {
      DISQUS.reset({ reload: true });
    } catch (e) {
      console.warn("Không thể reload Disqus:", e);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Lấy theme đã lưu
  const saved = localStorage.getItem('fuga_theme_dark') === '1';
  setTheme(saved);

  // Nút chuyển đổi theme
  const toggle1 = document.getElementById('theme-toggle');
  const toggle2 = document.getElementById('theme-toggle-2');
  [toggle1, toggle2].forEach(btn => {
    if (btn) {
      btn.addEventListener('click', () =>
        setTheme(!document.body.classList.contains('dark'))
      );
    }
  });

  // ====== Lightbox cho ảnh minh họa ======
  document.querySelectorAll('.illustration img, article img').forEach(img => {
    img.addEventListener('click', () => {
      const lb = document.getElementById('lightbox');
      if (!lb) return;
      lb.querySelector('img').src = img.src;
      lb.style.display = 'flex';
      lb.setAttribute('aria-hidden', 'false');
    });
  });

  const lbClose = document.getElementById('lb-close');
  if (lbClose) {
    lbClose.addEventListener('click', () => {
      const lb = document.getElementById('lightbox');
      lb.style.display = 'none';
      lb.setAttribute('aria-hidden', 'true');
    });
  }

  // ====== Nút trở về đầu trang ======
  const b2t = document.getElementById('backToTop');
  if (b2t) {
    window.addEventListener('scroll', () => {
      b2t.style.display = window.scrollY > 400 ? 'block' : 'none';
    });
    b2t.addEventListener('click', e => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ====== Reactions (LocalStorage) ======
  const types = ['like', 'love', 'wow'];
  types.forEach(t => {
    const el = document.getElementById('count-' + t);
    const key = 'fuga_react_' + t;
    const val = parseInt(localStorage.getItem(key) || '0', 10);
    if (el) el.textContent = val;

    document.querySelectorAll('.react[data-type="' + t + '"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const v = parseInt(localStorage.getItem(key) || '0', 10) + 1;
        localStorage.setItem(key, v);
        if (el) el.textContent = v;
      });
    });
  });

  // ====== Bình luận (LocalStorage) ======
  const form = document.getElementById('comment-form');
  const list = document.getElementById('comments-list');
  if (form && list) {
    const key = 'fuga_comments_ch1_premium';

    function render() {
      list.innerHTML = '';
      const arr = JSON.parse(localStorage.getItem(key) || '[]').reverse();
      for (const it of arr) {
        const d = document.createElement('div');
        d.className = 'comment';
        d.innerHTML = `
          <strong>${it.name || 'Độc giả ẩn danh'}</strong>
          <small style="color:#888"> - ${it.time}</small>
          <p>${it.text}</p>`;
        list.appendChild(d);
      }
    }

    form.addEventListener('submit', e => {
      e.preventDefault();
      const nameInput = document.getElementById('comment-name');
      const bodyInput = document.getElementById('comment-body');
      const name = nameInput ? nameInput.value.trim() : '';
      const body = bodyInput ? bodyInput.value.trim() : '';
      if (!body) return;

      const arr = JSON.parse(localStorage.getItem(key) || '[]');
      arr.push({
        name,
        text: body,
        time: new Date().toLocaleString('vi-VN')
      });
      localStorage.setItem(key, JSON.stringify(arr));
      if (nameInput) nameInput.value = '';
      if (bodyInput) bodyInput.value = '';
      render();
    });

    render();
  }
});
