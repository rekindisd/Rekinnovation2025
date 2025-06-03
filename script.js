// Ganti dengan URL dan API KEY dari Supabase Anda
const SUPABASE_URL = 'https://mirzsfsctfylfmddwfgx.supabase.co';
const SUPABASE_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1pcnpzZnNjdGZ5bGZtZGR3Zmd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4NTM4NjAsImV4cCI6MjA2NDQyOTg2MH0.A8ssmtZ8eqFXdvcOs3wYxlZ0c-ZZdhYvo3noQnq1UzY';

// Fungsi untuk toggle show/hide password
function togglePassword(inputId, toggleIcon) {
  const passwordInput = document.getElementById(inputId);
  const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordInput.setAttribute('type', type);
  toggleIcon.textContent = type === 'password' ? '👁️' : '🙈';
}

// Buka modal registrasi
function openModal() {
  document.getElementById("modal").style.display = "block";
}

// Tutup modal registrasi
function closeModal() {
  document.getElementById("modal").style.display = "none";
}

// Fungsi untuk mendaftarkan user baru
async function handleRegister() {
  const name = document.getElementById("reg-name").value;
  const no_hp = document.getElementById("reg-nohp").value;
  const email = document.getElementById("reg-email").value;
  const password = document.getElementById("reg-password").value;
  const company = document.getElementById("reg-company").value;

  if (!name || !no_hp || !email || !password || !company) {
    alert("Semua kolom wajib diisi!");
    return;
  }

  const res = await fetch(`${SUPABASE_URL}/rest/v1/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_API_KEY,
      'Authorization': `Bearer ${SUPABASE_API_KEY}`,
      'Prefer': 'return=minimal'
    },
    body: JSON.stringify({ name, no_hp, email, password, company })
  });

  if (res.ok) {
    alert("Registrasi berhasil!");
    closeModal();
  } else {
    alert("Gagal mendaftar. Mungkin email atau no HP sudah terdaftar.");
  }
}

// Fungsi untuk login user
async function handleLogin() {
  const identifier = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  if (!identifier || !password) {
    alert("Isi email/nomor HP dan password.");
    return;
  }

  const res = await fetch(`${SUPABASE_URL}/rest/v1/users?or=(email.eq.${identifier},no_hp.eq.${identifier})&password=eq.${password}`, {
    headers: {
      'apikey': SUPABASE_API_KEY,
      'Authorization': `Bearer ${SUPABASE_API_KEY}`
    }
  });

  const data = await res.json();

  if (data.length > 0) {
    alert("Login berhasil!");
    // ✅ Redirect ke Google Site: gunakan window.open agar bisa terbuka dari iframe Google Sites
    window.open("https://s.id/rekinnovation2025", "_blank");
  } else {
    alert("Login gagal. Cek email/nomor HP dan password.");
  }
}
