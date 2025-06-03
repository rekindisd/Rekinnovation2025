// Ganti dengan URL dan API KEY dari Supabase Anda
const SUPABASE_URL = 'https://mirzsfsctfylfmddwfgx.supabase.co';
const SUPABASE_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1pcnpzZnNjdGZ5bGZtZGR3Zmd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4NTM4NjAsImV4cCI6MjA2NDQyOTg2MH0.A8ssmtZ8eqFXdvcOs3wYxlZ0c-ZZdhYvo3noQnq1UzY';

// Fungsi untuk membuka modal pendaftaran
function openModal() {
  document.getElementById("modal").style.display = "block";
}

// Fungsi untuk menutup modal pendaftaran
function closeModal() {
  document.getElementById("modal").style.display = "none";
}

// Fungsi untuk proses registrasi
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

  // Kirim data ke Supabase
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
    alert("Registrasi gagal. Email atau No HP mungkin sudah terdaftar.");
  }
}

// Fungsi untuk proses login
async function handleLogin() {
  const identifier = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  if (!identifier || !password) {
    alert("Isi email/nomor HP dan password.");
    return;
  }

  // Cari user berdasarkan email atau no_hp yang cocok, serta password
  const query = encodeURIComponent(`or=(email.eq.${identifier},no_hp.eq.${identifier})&password=eq.${password}`);
  const url = `${SUPABASE_URL}/rest/v1/users?${query}`;

  const res = await fetch(url, {
    headers: {
      'apikey': SUPABASE_API_KEY,
      'Authorization': `Bearer ${SUPABASE_API_KEY}`
    }
  });

  const data = await res.json();

  if (data.length > 0) {
    alert("Login berhasil! Mengarahkan...");
    // ✅ Redirect ke Google Site Anda
    window.location.href = "https://s.id/rekinnovation2025";
  } else {
    alert("Login gagal. Cek kembali email/nomor HP dan password.");
  }
}

