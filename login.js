const API_BASE_URL = 'https://feed-back-server.onrender.com';

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('loginForm');
  const statusEl = document.getElementById('loginStatus');

  // Kiểm tra nếu đã đăng nhập rồi, redirect tới dashboard
  if (localStorage.getItem('token')) {
    window.location.href = 'dash-board.html';
    return;
  }

  form.addEventListener('submit', async function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!username || !password) {
      statusEl.textContent = 'Vui lòng nhập đầy đủ tài khoản và mật khẩu.';
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/404admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (res.ok) {
        const token = await res.text();
        localStorage.setItem('token', token);
        statusEl.textContent = '';
        window.location.href = 'dash-board.html';
      } else {
        statusEl.textContent = 'Sai tài khoản hoặc mật khẩu.';
      }

    } catch (error) {
      console.error('Login error:', error);
      statusEl.textContent = 'Không thể kết nối đến máy chủ.';
    }
  });
});