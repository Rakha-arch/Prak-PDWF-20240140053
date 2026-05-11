/* ===== DATA MENU ===== */
const menus = [
  { name: 'Espresso Gayo', cat: 'hot', price: 'Rp 28.000', tag: 'Best Seller', desc: 'Arabika Gayo, karakter fruity & bright, body medium.', img: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=120&h=120&fit=crop' },
  { name: 'Americano', cat: 'hot', price: 'Rp 25.000', tag: '', desc: 'Espresso diencerkan air panas, bersih dan ringan.', img: 'https://images.unsplash.com/photo-1551030173-122aabc4489c?w=120&h=120&fit=crop' },
  { name: 'Flat White', cat: 'hot', price: 'Rp 32.000', tag: 'New', desc: 'Espresso ristretto dengan microfoam susu segar.', img: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=120&h=120&fit=crop' },
  { name: 'Cold Brew Flores', cat: 'cold', price: 'Rp 35.000', tag: 'Best Seller', desc: 'Diseduh dingin 16 jam, smooth dan natural sweet.', img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=120&h=120&fit=crop' },
  { name: 'Iced Latte', cat: 'cold', price: 'Rp 30.000', tag: '', desc: 'Espresso dingin dengan susu full cream yang creamy.', img: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=120&h=120&fit=crop' },
  { name: 'BrewCo Special Blend', cat: 'signature', price: 'Rp 45.000', tag: 'Signature', desc: 'Blend eksklusif tiga origin, kompleks dan balance.', img: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=120&h=120&fit=crop' },
  { name: 'Dirty Matcha', cat: 'signature', price: 'Rp 40.000', tag: 'New', desc: 'Shot espresso dituang di atas matcha latte dingin.', img: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=120&h=120&fit=crop' },
  { name: 'Matcha Latte', cat: 'nonkopi', price: 'Rp 30.000', tag: 'Best Seller', desc: 'Matcha ceremonial grade dengan susu oat creamy.', img: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=120&h=120&fit=crop' },
  { name: 'Strawberry Yakult', cat: 'nonkopi', price: 'Rp 25.000', tag: 'New', desc: 'Strawberry, yakult, dan soda water. Segar!', img: 'https://images.unsplash.com/photo-1497534446932-c925b458314e?w=120&h=120&fit=crop' },
];

/* ===== RENDER MENU ===== */
function renderMenu(filter = 'semua') {
  const grid = document.getElementById('menuGrid');
  const filtered = filter === 'semua' ? menus : menus.filter(m => m.cat === filter);
  grid.innerHTML = '';

  filtered.forEach(item => {
    const row = document.createElement('div');
    row.className = 'menu-card flex items-center justify-between gap-6 py-6 px-2';
    
    let badge = '';
    if(item.tag === 'Best Seller') badge = `<span class="text-[9px] font-semibold tracking-widest uppercase px-2 py-0.5 bg-amber/15 text-amber">${item.tag}</span>`;
    if(item.tag === 'New') badge = `<span class="text-[9px] font-semibold tracking-widest uppercase px-2 py-0.5 bg-bark/10 text-bark dark:bg-stone/10 dark:text-stone">${item.tag}</span>`;
    if(item.tag === 'Signature') badge = `<span class="text-[9px] font-semibold tracking-widest uppercase px-2 py-0.5 bg-bark/15 text-bark dark:text-amber">${item.tag}</span>`;

    row.innerHTML = `
      <img src="${item.img}" class="w-16 h-16 object-cover grayscale hover:grayscale-0 transition-all duration-500 shrink-0" />
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-3 mb-1">
          <h3 class="font-display text-lg font-semibold">${item.name}</h3>
          ${badge}
        </div>
        <p class="text-xs text-ink/40 dark:text-stone/50 leading-relaxed truncate">${item.desc}</p>
      </div>
      <div class="flex items-center gap-6">
        <span class="font-semibold text-sm text-bark dark:text-amber">${item.price}</span>
        <button onclick="openModal('${item.name}')" class="text-[10px] font-semibold tracking-widest uppercase border border-bark/30 dark:border-stone/20 px-4 py-2 hover:bg-bark hover:text-stone dark:hover:bg-amber dark:hover:text-ink transition-all">Pesan</button>
      </div>`;
    grid.appendChild(row);
  });
}

/* ===== FILTER LOGIC ===== */
function filterMenu(cat) {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.className = btn.dataset.filter === cat ? 'filter-btn pb-2 filter-active' : 'filter-btn pb-2 filter-inactive';
  });
  renderMenu(cat);
}

/* ===== DARK MODE ===== */
const darkBtn = document.getElementById('darkToggle');
darkBtn.addEventListener('click', () => {
  const isDark = document.documentElement.classList.toggle('dark');
  darkBtn.textContent = isDark ? '☀️' : '🌙';
});

/* ===== DROPDOWN AUTO-POPULATE ===== */
function populateSelectMenu() {
    const select = document.getElementById('orderMenu');
    const categories = { 'hot': 'Hot Coffee', 'cold': 'Cold Brew', 'signature': 'Signature', 'nonkopi': 'Non-Kopi' };
    select.innerHTML = '<option value="">— Pilih Menu —</option>';
    
    Object.entries(categories).forEach(([key, label]) => {
        const group = document.createElement('optgroup');
        group.label = label;
        menus.filter(m => m.cat === key).forEach(item => {
            const opt = document.createElement('option');
            opt.value = item.name;
            opt.textContent = item.name;
            group.appendChild(opt);
        });
        select.appendChild(group);
    });
}

/* ===== MODAL LOGIC ===== */
function openModal(selectedMenu = '') {
  document.getElementById('modal-form-content').classList.remove('hidden');
  document.getElementById('modal-success-content').classList.add('hidden');
  document.getElementById('modal-backdrop').classList.replace('hidden', 'flex');
  if(selectedMenu) document.getElementById('orderMenu').value = selectedMenu;
}

function closeModal() {
  document.getElementById('modal-backdrop').classList.replace('flex', 'hidden');
}

/* ===== SUBMIT KE WHATSAPP ===== */
function submitOrder() {
  const name = document.getElementById('orderName').value.trim();
  const phone = document.getElementById('orderPhone').value.trim();
  const menu = document.getElementById('orderMenu').value;
  const msg = document.getElementById('orderMsg');

  if (!name || !phone || !menu) {
    msg.textContent = '⚠️ Mohon lengkapi semua kolom.';
    msg.classList.remove('hidden');
    return;
  }

  const cleanPhone = phone.replace(/\D/g, '');
  const waURL = `https://wa.me/6289525553632?text=${encodeURIComponent(`Halo BrewCo!\n\nSaya ingin memesan:\n👤 Nama: ${name}\n☕ Menu: ${menu}\n📱 HP: ${phone}\n\nMohon konfirmasinya.`)}`;

  // UI Feedback
  document.getElementById('modal-form-content').classList.add('hidden');
  document.getElementById('modal-success-content').classList.remove('hidden');
  document.getElementById('successDesc').innerHTML = `Pesanan <strong>${menu}</strong> sudah kami catat.`;
  document.getElementById('waFinalBtn').href = waURL;
}

/* ===== COUNTER ANIMATION ===== */
const animateCounters = () => {
    document.querySelectorAll('[data-target]').forEach(el => {
        const target = +el.dataset.target;
        const step = target / 100;
        let curr = 0;
        const t = setInterval(() => {
            curr += step;
            if(curr >= target) { el.innerText = target.toLocaleString('id-ID'); clearInterval(t); }
            else el.innerText = Math.round(curr).toLocaleString('id-ID');
        }, 20);
    });
};

const obs = new IntersectionObserver(entries => {
    if(entries[0].isIntersecting) { animateCounters(); obs.disconnect(); }
}, { threshold: 0.5 });

/* ===== INIT ===== */
document.addEventListener('DOMContentLoaded', () => {
    renderMenu();
    populateSelectMenu();
    obs.observe(document.getElementById('stats'));
});

function submitEmail() {
    const input = document.getElementById('emailInput');
    const msg = document.getElementById('emailMsg');
    if(input.value.includes('@')) {
        msg.textContent = '✓ Berhasil! Cek email kamu.';
        msg.classList.remove('hidden');
        input.value = '';
    }
}