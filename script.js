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

// Fungsi untuk menampilkan popup toast
function showToast(message, isSuccess = false) {
  const toast = document.createElement("div");
  toast.textContent = message;
  toast.style.position = "fixed";
  toast.style.top = "84px";
  toast.style.left = "50%";
  toast.style.transform = "translateX(-50%)";
  toast.style.background = isSuccess ? "#4CAF50" : "#f44336";
  toast.style.color = "white";
  toast.style.padding = "12px 24px";
  toast.style.borderRadius = "8px";
  toast.style.fontSize = "14px";
  toast.style.zIndex = "9999";
  toast.style.boxShadow = "0 2px 6px rgba(0,0,0,0.3)";
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// Fungsi untuk mendaftarkan user baru
async function handleRegister() {
  const name = document.getElementById("reg-name").value;
  const no_hp = document.getElementById("reg-nohp").value;
  const email = document.getElementById("reg-email").value;
  const password = document.getElementById("reg-password").value;
  const company = document.getElementById("reg-company").value;

  if (!name || !no_hp || !email || !password || !company) {
    showToast("Semua kolom wajib diisi!");
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
    showToast("Registrasi berhasil!", true);
    closeModal();
  } else {
    showToast("Gagal mendaftar. Mungkin email atau no HP sudah terdaftar.");
  }
}

// Fungsi untuk login user
async function handleLogin() {
  const identifier = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value.trim();

  if (!identifier || !password) {
    showToast("Isi email/nomor HP dan password.");
    return;
  }

  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/users?or=(email.eq.${encodeURIComponent(identifier)},no_hp.eq.${encodeURIComponent(identifier)})&password=eq.${encodeURIComponent(password)}`,
    {
      headers: {
        'apikey': SUPABASE_API_KEY,
        'Authorization': `Bearer ${SUPABASE_API_KEY}`
      }
    }
  );

  const data = await res.json();

  if (data.length > 0) {
    showToast("Login berhasil!", true);
    setTimeout(() => {
     window.open("https://s.id/rekinnovation2025", "_blank");
    window.close(); // hanya akan berhasil jika halaman ini dibuka via window.open
    }, 1000);
  } else {
    showToast("Login gagal. Cek email/nomor HP dan password.");
  }
}
