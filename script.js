/* ============================================================
   script.js — BrewCo Landing Page
   DOM Manipulation dengan JavaScript Vanilla
   ============================================================ */

/* ===== DATA MENU ===== */
const menus = [
  // Hot Coffee
  { name: 'Espresso Gayo',        cat: 'hot',       price: 'Rp 28.000', tag: 'Best Seller', desc: 'Arabika Gayo, karakter fruity & bright, body medium.' },
  { name: 'Americano',            cat: 'hot',       price: 'Rp 25.000', tag: '',            desc: 'Espresso diencerkan air panas, bersih dan ringan.' },
  { name: 'Flat White',           cat: 'hot',       price: 'Rp 32.000', tag: 'New',         desc: 'Espresso ristretto dengan microfoam susu segar, creamy.' },
  { name: 'Kopi Susu Spesial',    cat: 'hot',       price: 'Rp 32.000', tag: '',            desc: 'Perpaduan espresso, susu segar, dan gula aren lokal.' },
  { name: 'Pour Over Toraja',     cat: 'hot',       price: 'Rp 38.000', tag: 'New',         desc: 'Manual brew biji Toraja, earthy, chocolatey, low acid.' },

  // Cold Brew
  { name: 'Cold Brew Flores',     cat: 'cold',      price: 'Rp 35.000', tag: 'Best Seller', desc: 'Diseduh dingin 16 jam, smooth dan natural sweet.' },
  { name: 'Iced Latte',           cat: 'cold',      price: 'Rp 30.000', tag: '',            desc: 'Espresso dingin dengan susu full cream yang creamy.' },
  { name: 'Caramel Macchiato',    cat: 'cold',      price: 'Rp 37.000', tag: '',            desc: 'Lapis vanila, susu dingin, espresso, dan siraman karamel.' },
  { name: 'Nitro Cold Brew',      cat: 'cold',      price: 'Rp 42.000', tag: 'New',         desc: 'Cold brew diinfus nitrogen, tekstur creamy seperti bir gelap.' },

  // Signature
  { name: 'BrewCo Special Blend', cat: 'signature', price: 'Rp 45.000', tag: 'Signature',   desc: 'Blend eksklusif tiga origin, kompleks dan balance sempurna.' },
  { name: 'Kopi Gula Aren',       cat: 'signature', price: 'Rp 38.000', tag: 'Signature',   desc: 'Espresso iced dengan gula aren asli Pangandaran.' },
  { name: 'Dirty Matcha',         cat: 'signature', price: 'Rp 40.000', tag: 'New',         desc: 'Shot espresso dituang di atas matcha latte dingin.' },
  { name: 'Brown Sugar Oat Latte',cat: 'signature', price: 'Rp 42.000', tag: 'New',         desc: 'Espresso, oat milk, brown sugar syrup, dan cinnamon.' },

  // Non-Kopi
  { name: 'Matcha Latte',         cat: 'nonkopi',   price: 'Rp 30.000', tag: 'Best Seller', desc: 'Matcha ceremonial grade dengan susu oat yang creamy.' },
  { name: 'Coklat Panas',         cat: 'nonkopi',   price: 'Rp 27.000', tag: '',            desc: 'Dark chocolate premium, cocok untuk hari hujan.' },
  { name: 'Teh Lemon Soda',       cat: 'nonkopi',   price: 'Rp 22.000', tag: '',            desc: 'Segar, asam, dan berbuih. Pilihan non-kafein terbaik.' },
  { name: 'Strawberry Yakult',    cat: 'nonkopi',   price: 'Rp 25.000', tag: 'New',         desc: 'Strawberry, yakult, dan soda water. Favorit pelanggan muda.' },
];

/* ===== RENDER MENU — gaya list elegan ===== */
function renderMenu(filter) {
  if (filter === undefined) filter = 'semua';
  const grid     = document.getElementById('menuGrid');
  const filtered = filter === 'semua' ? menus : menus.filter(function(m) { return m.cat === filter; });

  grid.innerHTML = '';

  filtered.forEach(function(item) {
    const row = document.createElement('div');
    row.className = 'menu-card flex items-center justify-between gap-6 py-5 px-2';

    let badgeHTML = '';
    if (item.tag === 'Best Seller') {
      badgeHTML = '<span class="text-[9px] font-semibold tracking-widest uppercase px-2 py-0.5 bg-amber/15 text-amber">' + item.tag + '</span>';
    } else if (item.tag === 'New') {
      badgeHTML = '<span class="text-[9px] font-semibold tracking-widest uppercase px-2 py-0.5 bg-bark/10 text-bark dark:bg-stone/10 dark:text-stone">' + item.tag + '</span>';
    } else if (item.tag === 'Signature') {
      badgeHTML = '<span class="text-[9px] font-semibold tracking-widest uppercase px-2 py-0.5 bg-bark/15 text-bark dark:text-amber">' + item.tag + '</span>';
    }

    row.innerHTML =
      '<div class="flex-1 min-w-0">' +
        '<div class="flex items-center gap-3 mb-1">' +
          '<h3 class="font-display text-lg font-semibold text-ink dark:text-stone">' + item.name + '</h3>' +
          badgeHTML +
        '</div>' +
        '<p class="text-xs text-ink/40 dark:text-stone/40 leading-relaxed">' + item.desc + '</p>' +
      '</div>' +
      '<div class="flex items-center gap-6 shrink-0">' +
        '<span class="font-semibold text-sm text-bark dark:text-amber whitespace-nowrap">' + item.price + '</span>' +
        '<button onclick="openModal()" class="text-[10px] font-semibold tracking-widest uppercase border border-bark/30 dark:border-stone/20 px-4 py-2 hover:bg-bark hover:text-stone dark:hover:bg-amber dark:hover:text-ink transition-colors">' +
          'Pesan' +
        '</button>' +
      '</div>';

    grid.appendChild(row);
  });
}

/* ===== FILTER MENU ===== */
function filterMenu(cat) {
  document.querySelectorAll('.filter-btn').forEach(function(btn) {
    var isActive = btn.dataset.filter === cat;
    btn.className = isActive
      ? 'filter-btn pb-2 transition-colors filter-active'
      : 'filter-btn pb-2 transition-colors filter-inactive';
  });
  renderMenu(cat);
}

/* ===== DARK MODE ===== */
var html    = document.documentElement;
var darkBtn = document.getElementById('darkToggle');
var isDark  = false;

darkBtn.addEventListener('click', function() {
  isDark = !isDark;
  html.classList.toggle('dark', isDark);
  darkBtn.textContent = isDark ? '☀️' : '🌙';
});

/* ===== COUNTER ANIMASI ===== */
function animateCounters() {
  document.querySelectorAll('[data-target]').forEach(function(el) {
    var target   = parseInt(el.dataset.target);
    var duration = 1800;
    var step     = target / (duration / 16);
    var current  = 0;

    var timer = setInterval(function() {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = Math.round(current).toLocaleString('id-ID');
    }, 16);
  });
}

var statsSection = document.getElementById('stats');
var counterDone  = false;

var counterObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting && !counterDone) {
      counterDone = true;
      animateCounters();
    }
  });
}, { threshold: 0.4 });

counterObserver.observe(statsSection);

/* ===== MODAL ===== */
function openModal() {
  var backdrop = document.getElementById('modal-backdrop');
  backdrop.classList.remove('hidden');
  backdrop.classList.add('flex');
}

function closeModal() {
  var backdrop = document.getElementById('modal-backdrop');
  backdrop.classList.add('hidden');
  backdrop.classList.remove('flex');
  var msg = document.getElementById('orderMsg');
  if (msg) msg.classList.add('hidden');
}

document.getElementById('modal-backdrop').addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});

/* ===== SUBMIT ORDER → WhatsApp ===== */
function submitOrder() {
  var name  = document.getElementById('orderName').value.trim();
  var phone = document.getElementById('orderPhone').value.trim();
  var menu  = document.getElementById('orderMenu').value;
  var msg   = document.getElementById('orderMsg');

  if (!name || !phone || !menu) {
    msg.textContent = '⚠️ Mohon lengkapi semua kolom.';
    msg.classList.remove('hidden');
    return;
  }

  var waNumber = '6289525553632';
  var waText   = encodeURIComponent(
    'Halo BrewCo! Saya ingin memesan:\n\n' +
    '👤 Nama  : ' + name + '\n' +
    '☕ Menu  : ' + menu + '\n' +
    '📱 HP    : ' + phone + '\n\n' +
    'Mohon konfirmasi pesanan dan info pembayarannya ya. Terima kasih!'
  );
  var waURL = 'https://wa.me/' + waNumber + '?text=' + waText;

  var modalBox = document.getElementById('modal-box');
  modalBox.innerHTML =
    '<div class="text-center py-6">' +
      '<p class="text-4xl mb-6">🎉</p>' +
      '<p class="text-amber text-xs font-semibold tracking-[0.2em] uppercase mb-3">Pesanan Diterima</p>' +
      '<h3 class="font-display text-3xl font-bold mb-3 text-ink dark:text-stone">Terima Kasih, ' + name + '!</h3>' +
      '<p class="text-ink/50 dark:text-stone/50 text-sm leading-relaxed mb-8">Pesanan <strong class="text-ink dark:text-stone">' + menu + '</strong> sudah kami catat.<br/>Lanjutkan ke WhatsApp untuk konfirmasi & pembayaran.</p>' +
      '<a href="' + waURL + '" target="_blank" class="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-3 text-xs font-semibold tracking-widest uppercase hover:bg-green-700 transition-colors mb-5">' +
        '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.549 4.107 1.51 5.842L.057 23.215a.75.75 0 0 0 .928.928l5.373-1.453A11.953 11.953 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.694-.502-5.241-1.38l-.375-.214-3.886 1.052 1.052-3.886-.214-.375A9.953 9.953 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>' +
        'Lanjut ke WhatsApp' +
      '</a><br/>' +
      '<button onclick="resetModal()" class="text-[10px] tracking-widest uppercase text-ink/25 dark:text-stone/25 hover:text-ink dark:hover:text-stone transition-colors mt-2">Tutup</button>' +
    '</div>';
}

/* ===== RESET MODAL ===== */
function resetModal() {
  var modalBox = document.getElementById('modal-box');
  modalBox.innerHTML =
    '<button onclick="closeModal()" class="absolute top-5 right-5 text-xs text-ink/30 dark:text-stone/30 hover:text-ink dark:hover:text-stone transition-colors tracking-widest uppercase">✕ Tutup</button>' +
    '<p class="text-amber text-xs font-semibold tracking-[0.2em] uppercase mb-4">Pemesanan</p>' +
    '<h3 class="font-display text-3xl font-bold mb-6 text-ink dark:text-stone">Pesan Sekarang</h3>' +
    '<div class="space-y-3">' +
      '<input type="text" id="orderName" placeholder="Nama lengkap" class="w-full px-4 py-3 border border-mist dark:border-bark/30 bg-transparent text-sm focus:outline-none focus:border-amber transition-colors text-ink dark:text-stone placeholder:text-ink/25 dark:placeholder:text-stone/25" />' +
      '<input type="tel" id="orderPhone" placeholder="Nomor WhatsApp" class="w-full px-4 py-3 border border-mist dark:border-bark/30 bg-transparent text-sm focus:outline-none focus:border-amber transition-colors text-ink dark:text-stone placeholder:text-ink/25 dark:placeholder:text-stone/25" />' +
      '<select id="orderMenu" class="w-full px-4 py-3 border border-mist dark:border-bark/30 bg-stone dark:bg-ink text-sm focus:outline-none focus:border-amber transition-colors text-ink dark:text-stone">' +
        '<option value="">— Pilih Menu —</option>' +
        '<optgroup label="Hot Coffee"><option>Espresso Gayo</option><option>Americano</option><option>Flat White</option><option>Kopi Susu Spesial</option><option>Pour Over Toraja</option></optgroup>' +
        '<optgroup label="Cold Brew"><option>Cold Brew Flores</option><option>Iced Latte</option><option>Caramel Macchiato</option><option>Nitro Cold Brew</option></optgroup>' +
        '<optgroup label="Signature"><option>BrewCo Special Blend</option><option>Kopi Gula Aren</option><option>Dirty Matcha</option><option>Brown Sugar Oat Latte</option></optgroup>' +
        '<optgroup label="Non-Kopi"><option>Matcha Latte</option><option>Coklat Panas</option><option>Teh Lemon Soda</option><option>Strawberry Yakult</option></optgroup>' +
      '</select>' +
      '<button onclick="submitOrder()" class="w-full bg-bark text-stone py-3 text-xs font-semibold tracking-widest uppercase hover:bg-ink dark:bg-amber dark:text-ink dark:hover:bg-amber/80 transition-colors">Kirim Pesanan</button>' +
      '<p id="orderMsg" class="text-center text-xs text-bark dark:text-amber font-medium hidden pt-1"></p>' +
    '</div>';
  closeModal();
}

/* ===== EMAIL SUBSCRIBE ===== */
function submitEmail() {
  var email = document.getElementById('emailInput').value.trim();
  var msg   = document.getElementById('emailMsg');

  if (!email || !email.includes('@')) {
    msg.textContent = '⚠️ Masukkan email yang valid.';
    msg.classList.remove('hidden');
    return;
  }

  msg.textContent = '✓ Berhasil! Kode diskon sudah dikirim ke ' + email;
  msg.classList.remove('hidden');
  document.getElementById('emailInput').value = '';
}

/* ===== INIT ===== */
renderMenu();