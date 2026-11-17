(() => {
  const root = document.documentElement;
  const toggle = document.querySelector('.theme-toggle');
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');

  try {
    const saved = localStorage.getItem('gozjaro-theme');
    if (saved === 'dark' || saved === 'light') root.dataset.theme = saved;
  } catch {
    // The system theme remains available when storage is blocked.
  }

  const isDark = () => root.dataset.theme ? root.dataset.theme === 'dark' : systemTheme.matches;
  const updateToggle = () => {
    toggle.setAttribute('aria-pressed', String(isDark()));
    toggle.title = isDark() ? '切换到浅色模式' : '切换到深色模式';
  };

  updateToggle();
  toggle.hidden = false;
  systemTheme.addEventListener('change', updateToggle);
  toggle.addEventListener('click', () => {
    const theme = isDark() ? 'light' : 'dark';
    root.dataset.theme = theme;
    updateToggle();
    try {
      localStorage.setItem('gozjaro-theme', theme);
    } catch {
      // The toggle still works for this visit without storage.
    }
  });

  if (navigator.clipboard && window.isSecureContext) {
    document.querySelectorAll('[data-copy]').forEach((button) => {
      button.hidden = false;
      button.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(document.getElementById(button.dataset.copy).textContent);
          button.textContent = '已复制';
        } catch {
          button.textContent = '请手动复制';
        }
        window.setTimeout(() => { button.textContent = '复制'; }, 2000);
      });
    });
  }
})();
