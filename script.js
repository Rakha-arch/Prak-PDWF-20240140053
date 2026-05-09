/* ============================================================
   script.js — BrewCo Landing Page
   DOM Manipulation dengan JavaScript Vanilla
   ============================================================ */

/* ===== DATA MENU ===== */
const menus = [
  { name: 'Espresso Gayo',     cat: 'hot',     price: 'Rp 28.000', emoji: '☕', desc: 'Espresso pekat dari biji arabika Gayo, karakter fruity & bright.' },
  { name: 'Americano',         cat: 'hot',     price: 'Rp 25.000', emoji: '🖤', desc: 'Espresso diencerkan dengan air panas, rasa bersih dan ringan.' },
  { name: 'Kopi Susu Spesial', cat: 'hot',     price: 'Rp 32.000', emoji: '🥛', desc: 'Perpaduan espresso, susu segar, dan sedikit gula aren lokal.' },
  { name: 'Cold Brew Flores',  cat: 'cold',    price: 'Rp 35.000', emoji: '🧊', desc: 'Diseduh dingin 16 jam, smooth dan natural sweet.' },
  { name: 'Iced Latte',        cat: 'cold',    price: 'Rp 30.000', emoji: '🍦', desc: 'Espresso dingin dengan susu full cream yang creamy.' },
  { name: 'Caramel Macchiato', cat: 'cold',    price: 'Rp 37.000', emoji: '🍯', desc: 'Lapis vanila, susu dingin, espresso, dan siraman karamel.' },
  { name: 'Matcha Latte',      cat: 'nonkopi', price: 'Rp 30.000', emoji: '🍵', desc: 'Matcha grade ceremonial dengan susu oat yang creamy.' },
  { name: 'Coklat Panas',      cat: 'nonkopi', price: 'Rp 27.000', emoji: '🍫', desc: 'Dark chocolate premium, cocok untuk hari hujan.' },
  { name: 'Teh Lemon Soda',    cat: 'nonkopi', price: 'Rp 22.000', emoji: '🍋', desc: 'Segar, asam, dan berbuih. Pilihan non-kafein terbaik.' },
];

/* ===== RENDER MENU ===== */
function renderMenu(filter = 'semua') {
  const grid = document.getElementById('menuGrid');
  const filtered = filter === 'semua' ? menus : menus.filter(m => m.cat === filter);

  // Kosongkan grid dulu sebelum render ulang
  grid.innerHTML = '';

  filtered.forEach((item, i) => {
    const card = document.createElement('div');
    card.className = 'bg-cream dark:bg-espresso border border-latte/20 rounded-2xl p-6 card-hover cursor-pointer';
    card.style.animationDelay = `${i * 0.08}s`;
    card.innerHTML = `
      <div class="text-5xl mb-4">${item.emoji}</div>
      <h3 class="font-display font-bold text-xl mb-1">${item.name}</h3>
      <p class="text-sm text-espresso/60 dark:text-cream/60 mb-4 leading-relaxed">${item.desc}</p>
      <div class="flex items-center justify-between">
        <span class="font-semibold text-roast dark:text-latte">${item.price}</span>
        <button onclick="openModal()" class="text-xs bg-roast text-cream px-4 py-1.5 rounded-full hover:bg-espresso transition-colors dark:bg-latte dark:text-espresso">
          Pesan
        </button>
      </div>
    `;
    grid.appendChild(card);
  });
}

/* ===== FILTER MENU ===== */
function filterMenu(cat) {
  // Update tampilan tombol aktif
  document.querySelectorAll('.filter-btn').forEach(btn => {
    const isActive = btn.dataset.filter === cat;
    btn.className = isActive
      ? 'filter-btn px-5 py-2 rounded-full text-sm font-semibold border border-roast/30 bg-roast text-cream transition-colors'
      : 'filter-btn px-5 py-2 rounded-full text-sm font-semibold border border-roast/30 hover:bg-roast/10 transition-colors';
  });

  // Render ulang menu sesuai filter
  renderMenu(cat);
}

/* ===== DARK MODE TOGGLE ===== */
const html    = document.documentElement;
const darkBtn = document.getElementById('darkToggle');
let isDark    = false;

darkBtn.addEventListener('click', () => {
  isDark = !isDark;
  html.classList.toggle('dark', isDark);
  darkBtn.textContent = isDark ? '☀️' : '🌙';
});

/* ===== COUNTER ANIMASI ===== */
function animateCounters() {
  document.querySelectorAll('[data-target]').forEach(el => {
    const target   = parseInt(el.dataset.target);
    const duration = 1800;                      // ms
    const step     = target / (duration / 16);  // per frame (~60fps)
    let current    = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.round(current).toLocaleString('id-ID');
    }, 16);
  });
}

// Jalankan counter hanya saat section statistik masuk viewport
const statsSection = document.getElementById('stats');
let counterDone    = false;

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !counterDone) {
      counterDone = true;
      animateCounters();
    }
  });
}, { threshold: 0.4 });

counterObserver.observe(statsSection);

/* ===== MODAL PEMESANAN ===== */
function openModal() {
  const backdrop = document.getElementById('modal-backdrop');
  backdrop.classList.remove('hidden');
  backdrop.classList.add('flex');
}

function closeModal() {
  const backdrop = document.getElementById('modal-backdrop');
  backdrop.classList.add('hidden');
  backdrop.classList.remove('flex');
  document.getElementById('orderMsg').classList.add('hidden');
}

// Tutup modal jika klik di luar kotak
document.getElementById('modal-backdrop').addEventListener('click', function (e) {
  if (e.target === this) closeModal();
});

function submitOrder() {
  const name  = document.getElementById('orderName').value.trim();
  const phone = document.getElementById('orderPhone').value.trim();
  const menu  = document.getElementById('orderMenu').value;
  const msg   = document.getElementById('orderMsg');

  if (!name || !phone || !menu) {
    msg.textContent = '⚠️ Mohon lengkapi semua kolom.';
    msg.classList.remove('hidden');
    return;
  }

  // Buat pesan WhatsApp otomatis
  const waNumber  = '6289525553632';
  const waText    = encodeURIComponent(
    `Halo BrewCo! Saya ingin memesan:\n\n` +
    `👤 Nama  : ${name}\n` +
    `☕ Menu  : ${menu}\n` +
    `📱 HP    : ${phone}\n\n` +
    `Mohon konfirmasi pesanan dan info pembayarannya ya. Terima kasih!`
  );
  const waURL = `https://wa.me/${waNumber}?text=${waText}`;

  // Ganti isi modal jadi tampilan sukses
  const modalBox = document.getElementById('modal-box');
  modalBox.innerHTML = `
    <div class="text-center py-4">
      <div class="text-6xl mb-4">🎉</div>
      <h3 class="font-display text-3xl font-black mb-2">Pesanan Diterima!</h3>
      <p class="text-espresso/60 dark:text-cream/60 text-sm mb-2">
        Hei <strong>${name}</strong>, pesanan <strong>${menu}</strong> kamu sudah kami catat.
      </p>
      <p class="text-espresso/60 dark:text-cream/60 text-sm mb-8">
        Lanjutkan ke WhatsApp untuk konfirmasi & info pembayaran.
      </p>
      <a href="${waURL}" target="_blank"
        class="inline-flex items-center gap-2 bg-green-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-600 transition-colors text-sm mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.549 4.107 1.51 5.842L.057 23.215a.75.75 0 0 0 .928.928l5.373-1.453A11.953 11.953 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.694-.502-5.241-1.38l-.375-.214-3.886 1.052 1.052-3.886-.214-.375A9.953 9.953 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
        </svg>
        Lanjut ke WhatsApp
      </a>
      <br/>
      <button onclick="resetModal()"
        class="text-sm text-espresso/40 dark:text-cream/40 hover:text-espresso dark:hover:text-cream transition-colors mt-2">
        Tutup
      </button>
    </div>
  `;
}

// Reset modal ke form awal
function resetModal() {
  const modalBox = document.getElementById('modal-box');
  modalBox.innerHTML = `
    <button onclick="closeModal()"
      class="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-latte/20 transition-colors text-xl">
      ✕
    </button>
    <h3 class="font-display text-3xl font-black mb-2">Pesan Sekarang</h3>
    <p class="text-espresso/60 dark:text-cream/60 text-sm mb-6">Isi form berikut, kami akan hubungi kamu segera.</p>
    <div class="space-y-4">
      <input type="text" id="orderName" placeholder="Nama lengkap"
        class="w-full px-5 py-3 rounded-xl border border-latte/30 bg-cream dark:bg-espresso/50 focus:outline-none focus:ring-2 focus:ring-roast dark:focus:ring-latte text-sm" />
      <input type="tel" id="orderPhone" placeholder="Nomor WhatsApp"
        class="w-full px-5 py-3 rounded-xl border border-latte/30 bg-cream dark:bg-espresso/50 focus:outline-none focus:ring-2 focus:ring-roast dark:focus:ring-latte text-sm" />
      <select id="orderMenu"
        class="w-full px-5 py-3 rounded-xl border border-latte/30 bg-cream dark:bg-espresso/50 focus:outline-none focus:ring-2 focus:ring-roast dark:focus:ring-latte text-sm">
        <option value="">-- Pilih Menu --</option>
        <option>Espresso Gayo</option>
        <option>Cold Brew Flores</option>
        <option>Kopi Susu Spesial</option>
        <option>Matcha Latte</option>
        <option>Americano</option>
        <option>Caramel Macchiato</option>
      </select>
      <button onclick="submitOrder()"
        class="w-full bg-roast text-cream py-3 rounded-xl font-semibold hover:bg-espresso transition-colors dark:bg-latte dark:text-espresso dark:hover:bg-amber-400">
        Kirim Pesanan
      </button>
      <p id="orderMsg" class="text-center text-sm text-roast dark:text-latte font-medium hidden"></p>
    </div>
  `;
  closeModal();
}

/* ===== EMAIL SUBSCRIBE ===== */
function submitEmail() {
  const email = document.getElementById('emailInput').value.trim();
  const msg   = document.getElementById('emailMsg');

  if (!email || !email.includes('@')) {
    msg.textContent = '⚠️ Masukkan email yang valid.';
    msg.classList.remove('hidden');
    return;
  }

  msg.textContent = `🎉 Berhasil! Kode diskon 20% sudah dikirim ke ${email}`;
  msg.classList.remove('hidden');
  document.getElementById('emailInput').value = '';
}

/* ===== INIT ===== */
renderMenu();