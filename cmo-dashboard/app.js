/* ==========================================================================
   MARKETING DASHBOARD LOGIC (JavaScript)
   Features: Navigation routing, custom menu creation, period metrics updates,
   interactive SVG charts, AI recommendation simulator, and SEO Auto-Fix diff approval.
   ========================================================================== */

// --- Global Application State ---
const state = {
    activeView: 'overview',
    currentTeam: 'Pure Glow',
    selectedPeriod: 'last-6-months',
    selectedSocialPlatform: 'instagram', // active tab inside social-media platform cards
    selectedTopContentPlatform: 'all',  // filter for top content grid
    selectedArticleId: null,             // currently selected article for SEO audit
    
    // SEO Articles Database
    articles: [
        {
            id: 1,
            title: "Tips Kulit Glowing Alami dengan Masker Buatan Rumah",
            views: "24,850",
            bounceRate: "45.2%",
            keyword: "kulit glowing alami",
            score: 58,
            isFixed: false,
            checklist: [
                { id: "c1", label: "Meta description tidak ditemukan", ok: false },
                { id: "c2", label: "Kerapatan keyword utama terlalu rendah (0.4%)", ok: false },
                { id: "c3", label: "3 dari 5 Gambar tidak memiliki Alt Tag", ok: false },
                { id: "c4", label: "Struktur heading (H1, H2) sudah tepat", ok: true },
                { id: "c5", label: "Artikel ramah untuk perangkat mobile", ok: true }
            ],
            codeBefore: `<html>
<head>
  <title>Tips Kulit Glowing</title>
</head>
<body>
  <h1>Tips Kulit Glowing</h1>
  <p>Memiliki wajah yang bersih adalah dambaan semua orang...</p>
  <img src="banner.jpg">
  <h3>Bahan alami masker wajah</h3>
  <p>Gunakan madu murni dan alpukat segar...</p>
</body>
</html>`,
            codeAfter: `<html>
<head>
  <title>Tips Kulit Glowing Alami dengan Masker Buatan Rumah</title>
  <meta name="description" content="Simak panduan mudah membuat masker wajah buatan rumah untuk mendapatkan kulit glowing alami secara sehat dan aman.">
</head>
<body>
  <h1>Tips Kulit Glowing Alami dengan Masker Buatan Rumah</h1>
  <p>Mendapatkan <strong>kulit glowing alami</strong> kini bisa Anda lakukan dari rumah. Memiliki wajah yang bersih dan bersinar adalah dambaan semua orang...</p>
  <img src="banner.jpg" alt="masker untuk kulit glowing alami">
  <h2>Bahan Alami Terbaik untuk Masker Wajah</h2>
  <p>Gunakan madu murni dan alpukat segar...</p>
</body>
</html>`
        },
        {
            id: 2,
            title: "5 Cara Mengatasi Jerawat Membandel pada Remaja",
            views: "18,920",
            bounceRate: "38.6%",
            keyword: "cara mengatasi jerawat",
            score: 72,
            isFixed: false,
            checklist: [
                { id: "c1", label: "Meta description sudah terpasang", ok: true },
                { id: "c2", label: "Kerapatan keyword (1.2%) sudah ideal", ok: true },
                { id: "c3", label: "Beberapa gambar utama tidak memiliki Alt Tag", ok: false },
                { id: "c4", label: "Hierarki tag heading perlu diperbaiki (H3 langsung setelah H1)", ok: false },
                { id: "c5", label: "Skor keterbacaan (readability) cukup baik", ok: true }
            ],
            codeBefore: `<html>
<head>
  <title>Cara Mengatasi Jerawat Remaja</title>
  <meta name="description" content="Tips ampuh mengatasi jerawat membandel untuk usia remaja.">
</head>
<body>
  <h1>Cara Mengatasi Jerawat</h1>
  <h3>Langkah pertama: cuci muka</h3>
  <p>Gunakan sabun pembersih yang mengandung salisilat...</p>
  <img src="jerawat-remaja.png">
</body>
</html>`,
            codeAfter: `<html>
<head>
  <title>5 Cara Mengatasi Jerawat Membandel pada Remaja</title>
  <meta name="description" content="Tips ampuh cara mengatasi jerawat membandel untuk usia remaja dengan skincare alami & pola hidup sehat.">
</head>
<body>
  <h1>5 Cara Mengatasi Jerawat Membandel pada Remaja</h1>
  <h2>Langkah Pertama: Rutin Membersihkan Wajah</h2>
  <p>Gunakan sabun pembersih yang mengandung salisilat sebagai <strong>cara mengatasi jerawat</strong> terbaik...</p>
  <img src="jerawat-remaja.png" alt="cara mengatasi jerawat pada remaja">
</body>
</html>`
        },
        {
            id: 3,
            title: "Panduan Memilih Sunscreen untuk Tipe Kulit Sensitif",
            views: "34,120",
            bounceRate: "34.1%",
            keyword: "sunscreen kulit sensitif",
            score: 92,
            isFixed: true,
            checklist: [
                { id: "c1", label: "Meta description optimal dengan keyword utama", ok: true },
                { id: "c2", label: "Kerapatan keyword (1.8%) terindeks sangat baik", ok: true },
                { id: "c3", label: "Seluruh gambar memiliki Alt Tag deskriptif", ok: true },
                { id: "c4", label: "Struktur artikel & Heading sangat rapi", ok: true },
                { id: "c5", label: "Kecepatan load halaman memenuhi standar Google Core Web Vitals", ok: true }
            ],
            codeBefore: `/* Artikel sudah dalam kondisi optimal */`,
            codeAfter: `/* Artikel sudah dalam kondisi optimal */`
        },
        {
            id: 4,
            title: "Mengapa Eksfoliasi Wajah Penting Dilakukan Mingguan?",
            views: "12,450",
            bounceRate: "52.4%",
            keyword: "eksfoliasi wajah penting",
            score: 45,
            isFixed: false,
            checklist: [
                { id: "c1", label: "Meta description terlalu pendek & tidak memuat keyword", ok: false },
                { id: "c2", label: "Keyword utama tidak ditemukan di paragraf pertama", ok: false },
                { id: "c3", label: "Semua gambar tidak memiliki Alt Tag", ok: false },
                { id: "c4", label: "Heading tidak memanfaatkan struktur H2/H3", ok: false },
                { id: "c5", label: "Tautan internal (internal links) kurang", ok: false }
            ],
            codeBefore: `<html>
<head>
  <title>Pentingnya Eksfoliasi</title>
  <meta name="description" content="Eksfoliasi wajah.">
</head>
<body>
  <h1>Pentingnya eksfoliasi wajah</h1>
  <p>Banyak sel kulit mati yang menumpuk...</p>
  <img src="scrub.jpg">
</body>
</html>`,
            codeAfter: `<html>
<head>
  <title>Mengapa Eksfoliasi Wajah Penting Dilakukan Mingguan?</title>
  <meta name="description" content="Temukan alasan mengapa eksfoliasi wajah penting dilakukan seminggu sekali untuk mengangkat sel kulit mati dan mencerahkan kulit kusam.">
</head>
<body>
  <h1>Mengapa Eksfoliasi Wajah Penting Dilakukan Mingguan?</h1>
  <p>Apakah Anda tahu mengapa <strong>eksfoliasi wajah penting</strong> untuk kesehatan kulit? Setiap hari sel kulit mati akan menumpuk di permukaan kulit...</p>
  <img src="scrub.jpg" alt="ilustrasi mengapa eksfoliasi wajah penting dilakukan mingguan">
  <h2>Manfaat Utama Eksfoliasi Wajah secara Teratur</h2>
  <p>Eksfoliasi membantu regenerasi sel kulit baru...</p>
</body>
</html>`
        }
    ],

    // Top Content Mock Database (Instagram, Facebook, LinkedIn)
    topPosts: [
        {
            id: "tp1",
            platform: "instagram",
            rank: 1,
            img: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=300&h=200",
            caption: "Tips Kulit Glowing Alami dalam 7 Hari! ✨ Cukup ikuti rutinitas skincare pagi sederhana ini dan rasakan perbedaannya. #skincare #glowingskin #pureglow",
            reach: "84.5K",
            views: "124.2K",
            likes: "12,450",
            comments: "842",
            shares: "1,209"
        },
        {
            id: "tp2",
            platform: "linkedin",
            rank: 2,
            img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=300&h=200",
            caption: "Bagaimana Pure Glow tumbuh sebesar 240% secara organik lewat edukasi sains dibalik kecantikan. Baca artikel lengkap dari CEO kami di Forbes. #BeautyTech #MarketingStrategy",
            reach: "32.1K",
            views: "54.8K",
            likes: "4,592",
            comments: "320",
            shares: "582"
        },
        {
            id: "tp3",
            platform: "facebook",
            rank: 3,
            img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=300&h=200",
            caption: "Kenapa Kulit Terasa Kering saat Masuk Usia 30-an? Simak penjelasan dermatolog kami beserta rekomendasi pelembab anti-aging terbaru Pure Glow. 💧",
            reach: "58.2K",
            views: "78.5K",
            likes: "3,820",
            comments: "250",
            shares: "124"
        },
        {
            id: "tp4",
            platform: "instagram",
            rank: 2,
            img: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=300&h=200",
            caption: "Kandungan Skincare yang Wajib Dihindari Kulit Sensitif! Simpan postingan ini untuk belanja berikutnya! 🏷️ #beautyhacks #antiaging #skincareroutine",
            reach: "62.4K",
            views: "92.0K",
            likes: "9,120",
            comments: "612",
            shares: "890"
        },
        {
            id: "tp5",
            platform: "instagram",
            rank: 3,
            img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=300&h=200",
            caption: "Behind the Scenes: Proses Produksi Skin Bliss yang Higienis & Eco-Friendly di Lab Pure Glow. 🌿 #gogreen #pureglow #behindthescenes",
            reach: "48.1K",
            views: "68.3K",
            likes: "7,340",
            comments: "430",
            shares: "322"
        },
        {
            id: "tp6",
            platform: "facebook",
            rank: 1,
            img: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&q=80&w=300&h=200",
            caption: "Promo Spesial Gajian: Diskon hingga 35% untuk semua paket perawatan wajah selama periode 25-28 Juli! Klaim voucher belanja sekarang di bio! 🛒🎉",
            reach: "74.8K",
            views: "110.2K",
            likes: "5,842",
            comments: "982",
            shares: "450"
        },
        {
            id: "tp7",
            platform: "facebook",
            rank: 2,
            img: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=300&h=200",
            caption: "Bagaimana Memilih Pelembab Sesuai Jenis Kulit Anda. Kuis interaktif gratis dari Pure Glow untuk temukan skin goal-mu! 📝✨",
            reach: "42.0K",
            views: "62.4K",
            likes: "2,410",
            comments: "189",
            shares: "95"
        },
        {
            id: "tp8",
            platform: "linkedin",
            rank: 1,
            img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=300&h=200",
            caption: "Tren Industri Skincare Lokal Indonesia di Tahun 2026: Mengapa bahan vegan organik mendominasi preferensi konsumen milenial dan gen Z? #GreenBeauty #MarketAnalysis",
            reach: "45.0K",
            views: "72.4K",
            likes: "5,120",
            comments: "412",
            shares: "910"
        },
        {
            id: "tp9",
            platform: "linkedin",
            rank: 3,
            img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=300&h=200",
            caption: "Pure Glow membuka kesempatan karir! Kami mencari 3 Marketing Associate berbakat untuk bergabung dengan tim kami di Jakarta. Daftar di sini. #LokerMarketing #Hiring",
            reach: "24.1K",
            views: "39.0K",
            likes: "3,109",
            comments: "298",
            shares: "129"
        }
    ],

    // Custom views added by user
    customMenus: []
};

// --- Initialization Event ---
document.addEventListener("DOMContentLoaded", () => {
    // Initial UI Icons render
    lucide.createIcons();
    
    // Setup Navigation active link handler
    initNavListeners();

    // Render initial views
    renderOverviewCharts();
    renderSEOArticleList();
    renderTopContentGrid();
    
    // Fetch real-time Instagram data on load
    fetchRealInstagramData();
    
    // Close team dropdown clicking outside
    window.addEventListener('click', (e) => {
        const dropdownBtn = document.querySelector('.team-dropdown-btn');
        const dropdownList = document.getElementById('team-dropdown-list');
        if (dropdownList && !dropdownBtn.contains(e.target) && !dropdownList.contains(e.target)) {
            dropdownList.classList.remove('active');
        }
    });
});

// ==========================================================================
// CORE NAVIGATION & TEAM MANAGEMENT
// ==========================================================================

function toggleTeamDropdown() {
    const list = document.getElementById('team-dropdown-list');
    list.classList.toggle('active');
}

function selectTeam(teamName) {
    state.currentTeam = teamName;
    document.getElementById('current-team-name').textContent = teamName;
    document.getElementById('team-dropdown-list').classList.remove('active');
    showNotification("Tim Berubah", `Anda berpindah ke tim ${teamName}. Memuat analytics baru...`);
    refreshData();
}

function openAddTeamModal() {
    document.getElementById('team-dropdown-list').classList.remove('active');
    document.getElementById('add-team-modal').classList.add('active');
}

function closeAddTeamModal() {
    document.getElementById('add-team-modal').classList.remove('active');
    document.getElementById('new-team-name-input').value = '';
}

function submitAddTeam() {
    const nameInput = document.getElementById('new-team-name-input');
    const teamName = nameInput.value.trim();
    if (!teamName) {
        showNotification("Error", "Nama tim tidak boleh kosong!", "alert-triangle");
        return;
    }
    
    // Add to dropdown (simulated)
    const list = document.getElementById('team-dropdown-list');
    const divider = list.querySelector('.dropdown-divider');
    
    const newItem = document.createElement('div');
    newItem.className = 'team-item';
    newItem.onclick = () => selectTeam(teamName);
    newItem.innerHTML = `<span class="dot purple-dot"></span> ${teamName}`;
    list.insertBefore(newItem, divider);

    showNotification("Tim Ditambahkan", `Tim "${teamName}" berhasil dibuat.`);
    selectTeam(teamName);
    closeAddTeamModal();
}

function initNavListeners() {
    document.querySelectorAll('#main-nav-links .nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const view = item.getAttribute('data-view');
            switchView(view);
        });
    });
}

function switchView(viewName) {
    state.activeView = viewName;
    
    // Update active nav link style
    document.querySelectorAll('.nav-links .nav-item').forEach(item => {
        if (item.getAttribute('data-view') === viewName) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    // Update Page Header Content
    const pageTitle = document.getElementById('page-title');
    const pageSubtitle = document.getElementById('page-subtitle');
    const platformSelector = document.getElementById('platform-selector-container');

    // Default subtitle updates
    platformSelector.style.display = "none";

    // Toggle View Panels
    document.querySelectorAll('.view-panel').forEach(panel => {
        panel.classList.remove('active');
    });

    // Custom view checks
    const isCustom = state.customMenus.some(m => m.id === viewName);

    if (isCustom) {
        const customObj = state.customMenus.find(m => m.id === viewName);
        document.getElementById('custom-view').classList.add('active');
        pageTitle.textContent = customObj.name;
        pageSubtitle.textContent = `Analisis Data ${customObj.name}`;
        
        document.getElementById('custom-menu-title').textContent = customObj.name;
        document.getElementById('custom-menu-desc').textContent = customObj.desc || `Ini adalah halaman baru yang dibuat secara dinamis. Anda dapat mendesain konten menu ${customObj.name} sesuai dengan kebutuhan marketing Anda.`;
    } else {
        const targetView = document.getElementById(`${viewName}-view`);
        if (targetView) targetView.classList.add('active');
        
        if (viewName === 'overview') {
            pageTitle.textContent = "Overview";
            pageSubtitle.textContent = "Sales Analysis Dashboard";
            renderOverviewCharts();
        } else if (viewName === 'social-media') {
            pageTitle.textContent = "Social Media";
            pageSubtitle.textContent = "Social Media Engagement & Content Performance";
            platformSelector.style.display = "flex";
            renderSocialMediaCharts();
            renderTopContentGrid();
            fetchRealInstagramData(); // Refresh Instagram data when switching to this view
        } else if (viewName === 'seo') {
            pageTitle.textContent = "SEO";
            pageSubtitle.textContent = "Article Performance & SEO Agentic Audit";
            renderSEOArticleList();
        } else if (viewName === 'ads') {
            pageTitle.textContent = "Ads";
            pageSubtitle.textContent = "Paid Advertising Campaigns Analytics";
            renderAdsCharts();
        } else if (viewName === 'crm') {
            pageTitle.textContent = "CRM";
            pageSubtitle.textContent = "Customer Leads & Relationship Management";
            renderCRMCharts();
        }
    }
    
    // Re-create icons for newly added HTML if any
    lucide.createIcons();
}

// ==========================================================================
// CUSTOM MENU CREATOR MODAL
// ==========================================================================

function openAddMenuModal() {
    document.getElementById('add-menu-modal').classList.add('active');
}

function closeAddMenuModal() {
    document.getElementById('add-menu-modal').classList.remove('active');
    document.getElementById('new-menu-name').value = '';
    document.getElementById('new-menu-desc').value = '';
}

function submitAddMenu() {
    const nameInput = document.getElementById('new-menu-name');
    const descInput = document.getElementById('new-menu-desc');
    const iconSelect = document.getElementById('new-menu-icon');

    const name = nameInput.value.trim();
    const desc = descInput.value.trim();
    const icon = iconSelect.value;

    if (!name) {
        showNotification("Warning", "Nama menu tidak boleh kosong!", "alert-triangle");
        return;
    }

    const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    // Check if duplicate ID
    if (document.querySelector(`[data-view="${id}"]`) || state.customMenus.some(m => m.id === id)) {
        showNotification("Warning", "Menu dengan nama tersebut sudah ada!", "alert-triangle");
        return;
    }

    const menuObj = { id, name, icon, desc };
    state.customMenus.push(menuObj);

    // Create Sidebar item
    const navLinks = document.getElementById('main-nav-links');
    const newItem = document.createElement('a');
    newItem.href = '#';
    newItem.className = 'nav-item';
    newItem.setAttribute('data-view', id);
    newItem.onclick = (e) => {
        e.preventDefault();
        switchView(id);
    };
    newItem.innerHTML = `
        <i data-lucide="${icon}"></i>
        <span>${name}</span>
        <i data-lucide="chevron-right" class="active-indicator"></i>
    `;

    navLinks.appendChild(newItem);
    
    // Close modal
    closeAddMenuModal();
    
    // Refresh icons
    lucide.createIcons();
    
    // Show Toast
    showNotification("Menu Baru Dibuat", `Menu "${name}" berhasil ditambahkan ke dashboard.`);
    
    // Switch to newly created view
    switchView(id);
}

// ==========================================================================
// METRICS CONTROLS & REFRESH LOGIC
// ==========================================================================

function handlePeriodChange(period) {
    state.selectedPeriod = period;
    showNotification("Periode Diubah", `Memuat data dashboard untuk periode: ${period.replace(/-/g, ' ')}`);
    refreshData();
}

function handlePlatformChange(platform) {
    state.selectedSocialPlatform = platform;
    showNotification("Platform Diubah", `Memfilter performa social media: ${platform}`);
    
    // Toggle active state on platform cards
    document.querySelectorAll('.social-platform-card').forEach(card => {
        card.classList.remove('active-platform');
    });
    
    let cardId = '';
    if (platform === 'instagram') cardId = 'ig-platform-card';
    else if (platform === 'facebook') cardId = 'fb-platform-card';
    else if (platform === 'linkedin') cardId = 'li-platform-card';
    
    const targetCard = document.getElementById(cardId);
    if (targetCard) targetCard.classList.add('active-platform');

    // Update social engagement chart title & stats
    const title = document.getElementById('engagement-chart-title');
    title.textContent = `Engagement Trend - ${platform.charAt(0).toUpperCase() + platform.slice(1)}`;
    
    // Update summary stats numbers based on platform
    updateSocialSummaryStats(platform);
    renderSocialMediaCharts();
}

function updateSocialSummaryStats(platform) {
    const likes = document.getElementById('total-likes');
    const comments = document.getElementById('total-comments');
    const shares = document.getElementById('total-shares');
    
    if (platform === 'instagram') {
        likes.textContent = "16,420";
        comments.textContent = "3,212";
        shares.textContent = "1,452";
    } else if (platform === 'facebook') {
        likes.textContent = "5,320";
        comments.textContent = "1,120";
        shares.textContent = "410";
    } else if (platform === 'linkedin') {
        likes.textContent = "2,852";
        comments.textContent = "480";
        shares.textContent = "247";
    } else {
        likes.textContent = "24,592";
        comments.textContent = "4,812";
        shares.textContent = "2,109";
    }
}

function filterSocialPlatform(platform) {
    // Sync with selector dropdown
    const selector = document.getElementById('platform-selector');
    if (selector) {
        selector.value = platform;
        handlePlatformChange(platform);
    }
}

function refreshData() {
    // Spin refresh icons briefly
    const btn = document.querySelector('.btn-secondary i[data-lucide="refresh-cw"]');
    if (btn) {
        btn.style.transition = 'transform 0.8s ease';
        btn.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            btn.style.transition = 'none';
            btn.style.transform = 'rotate(0deg)';
        }, 800);
    }
    
    // Re-render currently active view graphs
    switchView(state.activeView);
    showNotification("Data Diperbarui", "Seluruh metrik dan visualisasi grafik telah diperbarui dengan data terkini.");
}

function customizeDashboard() {
    showNotification("Kustomisasi Dashboard", "Memuat panel kustomisasi widget... (Hanya prototipe visual)");
}

function downloadReport() {
    showNotification("Unduh Laporan", "Laporan marketing PDF sedang diekspor. Proses unduh akan segera berjalan...", "download");
}

// ==========================================================================
// SOCIAL MEDIA TOP CONTENT GRID & AI
// ==========================================================================

function filterTopContent(platform) {
    state.selectedTopContentPlatform = platform;
    
    // Toggle active pill button
    const pills = document.querySelectorAll('#post-filter-pills .pill');
    pills.forEach(pill => {
        const text = pill.textContent.toLowerCase();
        if ((platform === 'all' && text === 'semua') || text === platform) {
            pill.classList.add('active');
        } else {
            pill.classList.remove('active');
        }
    });

    renderTopContentGrid();
}

function renderTopContentGrid() {
    const container = document.getElementById('top-content-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    // Filter top posts based on selected platform
    const filtered = state.topPosts.filter(post => {
        if (state.selectedTopContentPlatform === 'all') return true;
        return post.platform === state.selectedTopContentPlatform;
    }).slice(0, 3); // Take top 3 as requested
    
    filtered.forEach(post => {
        // Platform background colors & icons
        let iconClass = 'instagram';
        let bgClass = 'instagram-bg';
        if (post.platform === 'facebook') {
            iconClass = 'facebook';
            bgClass = 'facebook-bg';
        } else if (post.platform === 'linkedin') {
            iconClass = 'linkedin';
            bgClass = 'linkedin-bg';
        }
        
        const card = document.createElement('div');
        card.className = 'top-post-card';
        card.innerHTML = `
            <div class="post-media-wrapper">
                <img src="${post.img}" alt="post thumbnail" class="post-img">
                <div class="post-platform-badge ${bgClass}">
                    <i data-lucide="${iconClass}"></i>
                </div>
                <div class="post-rank-badge">#${post.rank}</div>
            </div>
            <div class="post-info-pane">
                <p class="post-caption">${post.caption}</p>
                <div class="post-engagement-stats">
                    <div class="stat-group">
                        <span class="stat-lbl">Views</span>
                        <span class="stat-val">${post.views}</span>
                    </div>
                    <div class="stat-group">
                        <span class="stat-lbl">Reach</span>
                        <span class="stat-val">${post.reach}</span>
                    </div>
                    <div class="stat-group">
                        <span class="stat-lbl">Likes</span>
                        <span class="stat-val">${post.likes}</span>
                    </div>
                    <div class="stat-group">
                        <span class="stat-lbl">Comments</span>
                        <span class="stat-val">${post.comments}</span>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
    
    lucide.createIcons();
}

function generateSocialRecommendations() {
    const placeholder = document.getElementById('socmed-ai-placeholder');
    const loading = document.getElementById('socmed-ai-loading');
    const results = document.getElementById('socmed-ai-results');
    const btn = document.getElementById('generate-socmed-rec-btn');
    
    // Toggle layout
    placeholder.style.display = "none";
    loading.style.display = "flex";
    results.style.display = "none";
    btn.disabled = true;
    
    // Simulate thinking process
    setTimeout(() => {
        loading.style.display = "none";
        results.style.display = "flex";
        btn.disabled = false;
        
        // Dynamically adjust text based on team or platform
        const platform = state.selectedSocialPlatform.toUpperCase();
        document.getElementById('ai-rec-time').innerHTML = `Posting di <strong>${platform}</strong> pada pukul 18:00 - 20:00 WIB di hari Rabu dapat meningkatkan engagement sebesar 22% berdasarkan histori data reach terakhir tim <strong>${state.currentTeam}</strong>.`;
        document.getElementById('ai-rec-format').innerHTML = `Konten berformat <strong>Carousel (Slide)</strong> di ${platform} mendapatkan share 3x lebih banyak dibandingkan postingan single image. Prioritaskan format ini untuk panduan produk.`;
        document.getElementById('ai-rec-hashtag').innerHTML = `Kurangi jumlah hashtag di ${platform} menjadi 5-8 tag relevan. Tulis kalimat pembuka (Hook) yang menggugah rasa ingin tahu pada 125 karakter pertama.`;
        
        showNotification("AI Berhasil", "Agentic AI selesai merumuskan rekomendasi optimasi media sosial.");
    }, 1800);
}

// ==========================================================================
// SEO ARTICLES PERFORMANCE, AUDIT & AUTO-FIX (WITH DIFF VIEWER)
// ==========================================================================

function renderSEOArticleList() {
    const tbody = document.getElementById('seo-article-tbody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    // Calculate average score
    let totalScore = 0;
    state.articles.forEach(art => totalScore += art.score);
    const avgScore = (totalScore / state.articles.length).toFixed(1);
    const avgScoreDisplay = document.getElementById('avg-seo-score');
    if (avgScoreDisplay) avgScoreDisplay.textContent = `${avgScore}/100`;

    state.articles.forEach(art => {
        // Score badge class
        let scoreClass = 'score-red';
        if (art.score >= 80) scoreClass = 'score-green';
        else if (art.score >= 60) scoreClass = 'score-yellow';
        
        const tr = document.createElement('tr');
        if (state.selectedArticleId === art.id) {
            tr.className = 'selected-row';
        }
        
        tr.onclick = () => selectArticleForAudit(art.id);
        
        tr.innerHTML = `
            <td class="seo-art-title-cell" title="${art.title}">${art.title}</td>
            <td>${art.views}</td>
            <td>${art.bounceRate}</td>
            <td><code>${art.keyword}</code></td>
            <td><span class="score-badge ${scoreClass}">${art.score}</span></td>
            <td>
                <button class="btn btn-secondary btn-sm" style="padding: 4px 10px; font-size: 11px;">
                    <i data-lucide="file-search" style="width:12px;height:12px;margin-right:4px;"></i> Audit
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
    
    lucide.createIcons();
}

function selectArticleForAudit(id) {
    state.selectedArticleId = id;
    
    // Highlight table row
    renderSEOArticleList();
    
    const art = state.articles.find(a => a.id === id);
    if (!art) return;
    
    // Hide empty panel, show loaded
    document.getElementById('audit-sidebar-empty-state').style.display = "none";
    document.getElementById('audit-sidebar-loaded-state').style.display = "flex";
    
    // Load Details
    document.getElementById('audit-art-keyword').textContent = `Keyword: ${art.keyword}`;
    document.getElementById('audit-art-title').textContent = art.title;
    document.getElementById('audit-score-num').textContent = art.score;
    
    // Setup score colors
    const ring = document.getElementById('audit-score-ring');
    const statusText = document.getElementById('audit-score-status');
    ring.className = 'score-ring';
    
    if (art.score >= 80) {
        ring.classList.add('score-green');
        statusText.textContent = "Sangat Baik (Optimized)";
        statusText.style.color = "var(--color-green)";
    } else if (art.score >= 60) {
        ring.classList.add('score-yellow');
        statusText.textContent = "Perlu Optimasi Ringan";
        statusText.style.color = "var(--color-orange)";
    } else {
        ring.classList.add('score-red');
        statusText.textContent = "Sangat Kritis (Butuh Fix)";
        statusText.style.color = "var(--color-red)";
    }

    // Populate checklist
    const checklistUl = document.getElementById('audit-checklist-list');
    checklistUl.innerHTML = '';
    
    art.checklist.forEach(item => {
        const li = document.createElement('li');
        li.className = 'audit-checklist-item';
        
        if (item.ok) {
            li.innerHTML = `<i data-lucide="check-circle-2" class="check-ok"></i> <span>${item.label}</span>`;
        } else {
            li.innerHTML = `<i data-lucide="alert-circle" class="check-warn"></i> <span><strong>Rekomendasi:</strong> ${item.label}</span>`;
        }
        checklistUl.appendChild(li);
    });
    
    // Show/hide AI fix box based on fixed state
    const fixBox = document.querySelector('.audit-ai-action-box');
    if (art.isFixed) {
        fixBox.style.display = "none";
    } else {
        fixBox.style.display = "block";
    }
    
    lucide.createIcons();
}

function openAutoFixModal() {
    const art = state.articles.find(a => a.id === state.selectedArticleId);
    if (!art) return;
    
    // Format diff layout
    const beforePane = document.getElementById('diff-pane-before');
    const afterPane = document.getElementById('diff-pane-after');
    
    // Format visual highlighting
    beforePane.innerHTML = escapeHTML(art.codeBefore)
        .replace(/&lt;head&gt;/g, '<span class="del-line">&lt;head&gt;</span>')
        .replace(/&lt;title&gt;(.*?)&lt;\/title&gt;/g, '<span class="del-line">&lt;title&gt;$1&lt;/title&gt;</span>')
        .replace(/&lt;h1&gt;Tips Kulit Glowing&lt;\/h1&gt;/g, '<span class="del-line">&lt;h1&gt;Tips Kulit Glowing&lt;/h1&gt;</span>')
        .replace(/&lt;img src="banner.jpg"&gt;/g, '<span class="del-line">&lt;img src="banner.jpg"&gt;</span>')
        .replace(/&lt;h3&gt;Bahan alami masker wajah&lt;\/h3&gt;/g, '<span class="del-line">&lt;h3&gt;Bahan alami masker wajah&lt;/h3&gt;</span>')
        .replace(/&lt;h3&gt;Langkah pertama: cuci muka&lt;\/h3&gt;/g, '<span class="del-line">&lt;h3&gt;Langkah pertama: cuci muka&lt;/h3&gt;</span>')
        .replace(/&lt;img src="jerawat-remaja.png"&gt;/g, '<span class="del-line">&lt;img src="jerawat-remaja.png"&gt;</span>')
        .replace(/&lt;meta name="description" content="Eksfoliasi wajah."&gt;/g, '<span class="del-line">&lt;meta name="description" content="Eksfoliasi wajah."&gt;</span>');
        
    afterPane.innerHTML = escapeHTML(art.codeAfter)
        .replace(/&lt;meta name="description" (.*?)&gt;/g, '<span class="add-line">&lt;meta name="description" $1&gt;</span>')
        .replace(/&lt;title&gt;(.*?)&lt;\/title&gt;/g, '<span class="add-line">&lt;title&gt;$1&lt;/title&gt;</span>')
        .replace(/&lt;h1&gt;(.*?)&lt;\/h1&gt;/g, '<span class="add-line">&lt;h1&gt;$1&lt;/h1&gt;</span>')
        .replace(/&lt;h2&gt;(.*?)&lt;\/h2&gt;/g, '<span class="add-line">&lt;h2&gt;$1&lt;/h2&gt;</span>')
        .replace(/&lt;img (.*?)alt="(.*?)"&gt;/g, '<span class="add-line">&lt;img $1alt="$2"&gt;</span>')
        .replace(/&lt;strong&gt;(.*?)&lt;\/strong&gt;/g, '<span class="add-line">&lt;strong&gt;$1&lt;/strong&gt;</span>');
        
    // Reset Checkbox & Button
    document.getElementById('ai-approve-checkbox').checked = false;
    document.getElementById('apply-ai-fix-btn').disabled = true;
    
    // Open modal
    document.getElementById('seo-autofix-modal').classList.add('active');
}

function closeAutoFixModal() {
    document.getElementById('seo-autofix-modal').classList.remove('active');
}

function toggleApprovalSubmit(checked) {
    document.getElementById('apply-ai-fix-btn').disabled = !checked;
}

function applyAIFix() {
    const art = state.articles.find(a => a.id === state.selectedArticleId);
    if (!art) return;
    
    // Apply changes
    art.score = 96; // Set to optimum score
    art.isFixed = true;
    
    // Update checklist to all green
    art.checklist = art.checklist.map(item => {
        return { ...item, ok: true, label: item.label.replace("tidak ditemukan", "sudah dioptimasi").replace("terlalu rendah", "optimal").replace("tidak memiliki Alt Tag", "berhasil disematkan Alt Tag") };
    });
    
    // Re-render SEO Views
    renderSEOArticleList();
    selectArticleForAudit(art.id);
    
    // Close modal
    closeAutoFixModal();
    
    // Show toast Success
    showNotification("AI Perbaikan Sukses", `Artikel "${art.title}" berhasil dioptimalkan dan dideploy ke server produksi. Skor SEO naik ke 96/100!`);
}

function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
}

// ==========================================================================
// TOAST NOTIFICATIONS BANNER
// ==========================================================================

function showNotification(title, message, iconName = "info") {
    const toast = document.getElementById('toast-notification');
    const toastTitle = document.getElementById('toast-title');
    const toastDesc = document.getElementById('toast-desc');
    const toastIcon = document.getElementById('toast-icon');
    
    toastTitle.textContent = title;
    toastDesc.textContent = message;
    toastIcon.setAttribute('data-lucide', iconName);
    
    lucide.createIcons();
    
    toast.classList.add('active');
    
    // Auto remove after 4.5 seconds
    setTimeout(() => {
        closeToast();
    }, 4500);
}

function closeToast() {
    const toast = document.getElementById('toast-notification');
    toast.classList.remove('active');
}

// ==========================================================================
// CUSTOM SVG CHARTS DRAWING ENGINE
// ==========================================================================

function renderOverviewCharts() {
    drawProfitLossChart();
    drawProductSaleChart();
    drawInfluencerChart();
    drawSalesTargetChart();
}

function renderSocialMediaCharts() {
    drawSocialEngagementChart();
}

function renderAdsCharts() {
    drawAdsPerformanceChart();
}

function renderCRMCharts() {
    drawCRMPipelineChart();
}

// Helper to clean container
function clearAndGetSVG(containerId, viewBoxWidth = 500, viewBoxHeight = 220) {
    const container = document.getElementById(containerId);
    if (!container) return null;
    container.innerHTML = '';
    
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", `0 0 ${viewBoxWidth} ${viewBoxHeight}`);
    svg.setAttribute("class", "chart-svg");
    container.appendChild(svg);
    return svg;
}

/* 1. Profit and Loss Bar Chart */
function drawProfitLossChart() {
    const svg = clearAndGetSVG("profit-loss-chart", 500, 220);
    if (!svg) return;
    
    const months = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    // Multipliers based on period for variability
    let mult = 1.0;
    if (state.selectedPeriod === 'last-7-days') mult = 0.2;
    else if (state.selectedPeriod === 'last-30-days') mult = 0.5;
    
    const revenue = [45, 30, 55, 35, 60, 48].map(v => v * mult);
    const expense = [25, 20, 28, 18, 30, 26].map(v => v * mult);
    
    // Draw Y grid lines
    for (let i = 0; i <= 4; i++) {
        const y = 30 + i * 35;
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", "40");
        line.setAttribute("y1", y);
        line.setAttribute("x2", "480");
        line.setAttribute("y2", y);
        line.setAttribute("class", "grid-line");
        svg.appendChild(line);
    }
    
    // Draw bars
    const colWidth = 70;
    const barWidth = 14;
    
    months.forEach((month, idx) => {
        const xCenter = 65 + idx * colWidth;
        
        // Rev Bar (Blue)
        const revHeight = revenue[idx] * 2.2;
        const revY = 170 - revHeight;
        const rectRev = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rectRev.setAttribute("x", xCenter - barWidth - 2);
        rectRev.setAttribute("y", revY);
        rectRev.setAttribute("width", barWidth);
        rectRev.setAttribute("height", Math.max(revHeight, 2));
        rectRev.setAttribute("class", "chart-bar-blue");
        svg.appendChild(rectRev);
        
        // Exp Bar (Orange)
        const expHeight = expense[idx] * 2.2;
        const expY = 170 - expHeight;
        const rectExp = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rectExp.setAttribute("x", xCenter + 2);
        rectExp.setAttribute("y", expY);
        rectExp.setAttribute("width", barWidth);
        rectExp.setAttribute("height", Math.max(expHeight, 2));
        rectExp.setAttribute("class", "chart-bar-orange");
        svg.appendChild(rectExp);
        
        // Label X
        const textX = document.createElementNS("http://www.w3.org/2000/svg", "text");
        textX.setAttribute("x", xCenter);
        textX.setAttribute("y", "190");
        textX.setAttribute("class", "chart-label-x");
        textX.textContent = month;
        svg.appendChild(textX);
    });
}

/* 2. Product Sale Stacked/Simple Comparison Card */
function drawProductSaleChart() {
    const svg = clearAndGetSVG("product-sale-chart", 280, 220);
    if (!svg) return;
    
    const branches = ['Store A', 'Store B', 'Store C'];
    const values = [1560, 2420, 1080];
    const colors = ['var(--color-blue)', 'var(--color-purple)', 'var(--color-orange)'];
    const colorBg = ['var(--color-blue-light)', 'var(--color-purple-light)', 'var(--color-orange-light)'];
    
    branches.forEach((b, idx) => {
        const x = 20 + idx * 85;
        const height = (values[idx] / 2500) * 120;
        const y = 150 - height;
        
        // Background track
        const track = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        track.setAttribute("x", x);
        track.setAttribute("y", "30");
        track.setAttribute("width", "55");
        track.setAttribute("height", "120");
        track.setAttribute("fill", "#f8fafc");
        track.setAttribute("rx", "8");
        svg.appendChild(track);
        
        // Fill bar
        const fill = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        fill.setAttribute("x", x);
        fill.setAttribute("y", y);
        fill.setAttribute("width", "55");
        fill.setAttribute("height", height);
        fill.setAttribute("fill", colors[idx]);
        fill.setAttribute("rx", "8");
        svg.appendChild(fill);
        
        // Number tag
        const numTag = document.createElementNS("http://www.w3.org/2000/svg", "text");
        numTag.setAttribute("x", x + 27.5);
        numTag.setAttribute("y", y + height/2 + 5);
        numTag.setAttribute("class", "chart-label-x");
        numTag.setAttribute("fill", "white");
        numTag.setAttribute("style", "font-weight: 700; font-size:10px;");
        numTag.textContent = values[idx].toLocaleString();
        svg.appendChild(numTag);
        
        // Bottom Text label
        const lbl = document.createElementNS("http://www.w3.org/2000/svg", "text");
        lbl.setAttribute("x", x + 27.5);
        lbl.setAttribute("y", "185");
        lbl.setAttribute("class", "chart-label-x");
        lbl.setAttribute("style", "font-weight:600; fill:var(--text-secondary);");
        lbl.textContent = b;
        svg.appendChild(lbl);
    });
}

/* 3. Influencer Performance Insights Line */
function drawInfluencerChart() {
    const svg = clearAndGetSVG("influencer-chart", 280, 220);
    if (!svg) return;
    
    // Draw vertical bars/columns for influencers
    const count = 5;
    const heights = [90, 110, 130, 85, 105];
    
    for (let i = 0; i < count; i++) {
        const x = 36 + i * 48;
        const h = heights[i];
        
        // Line track
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", x);
        line.setAttribute("y1", "160");
        line.setAttribute("x2", x);
        line.setAttribute("y2", 160 - h);
        line.setAttribute("stroke", "#e2e8f0");
        line.setAttribute("stroke-width", "6");
        line.setAttribute("stroke-linecap", "round");
        svg.appendChild(line);
        
        // Highlight indicator at top
        const head = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        head.setAttribute("cx", x);
        head.setAttribute("cy", 160 - h);
        head.setAttribute("r", "5");
        head.setAttribute("fill", i === 2 ? "var(--color-orange)" : "var(--color-blue)");
        svg.appendChild(head);
        
        // Avatar mock
        const avatar = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        avatar.setAttribute("cx", x);
        avatar.setAttribute("cy", "185");
        avatar.setAttribute("r", "12");
        avatar.setAttribute("fill", "#cbd5e1");
        svg.appendChild(avatar);
    }
}

/* 4. Sales & Target Overtime Chart */
function drawSalesTargetChart() {
    const svg = clearAndGetSVG("sales-target-chart", 500, 220);
    if (!svg) return;
    
    // Add linear gradients definitions
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    
    const blueGrad = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
    blueGrad.setAttribute("id", "blue-gradient");
    blueGrad.setAttribute("x1", "0");
    blueGrad.setAttribute("y1", "0");
    blueGrad.setAttribute("x2", "0");
    blueGrad.setAttribute("y2", "1");
    blueGrad.innerHTML = `<stop offset="0%" stop-color="var(--color-blue)" stop-opacity="0.3"/><stop offset="100%" stop-color="var(--color-blue)" stop-opacity="0.0"/>`;
    defs.appendChild(blueGrad);
    
    const orangeGrad = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
    orangeGrad.setAttribute("id", "orange-gradient");
    orangeGrad.setAttribute("x1", "0");
    orangeGrad.setAttribute("y1", "0");
    orangeGrad.setAttribute("x2", "0");
    orangeGrad.setAttribute("y2", "1");
    orangeGrad.innerHTML = `<stop offset="0%" stop-color="var(--color-orange)" stop-opacity="0.2"/><stop offset="100%" stop-color="var(--color-orange)" stop-opacity="0.0"/>`;
    defs.appendChild(orangeGrad);
    
    svg.appendChild(defs);

    const months = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // Multipliers for period
    let mult = 1.0;
    if (state.selectedPeriod === 'last-7-days') mult = 0.2;
    else if (state.selectedPeriod === 'last-30-days') mult = 0.5;

    const salesData = [32000, 30000, 48000, 42000, 31000, 54000].map(v => v * mult);
    const targetData = [28000, 29000, 25000, 34000, 32000, 45000].map(v => v * mult);
    
    // Draw Y grid lines & Labels
    const maxVal = 60000;
    for (let i = 0; i <= 3; i++) {
        const y = 30 + i * 45;
        const val = maxVal - i * 20000;
        
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", "50");
        line.setAttribute("y1", y);
        line.setAttribute("x2", "480");
        line.setAttribute("y2", y);
        line.setAttribute("class", "grid-line");
        svg.appendChild(line);
        
        const labelY = document.createElementNS("http://www.w3.org/2000/svg", "text");
        labelY.setAttribute("x", "40");
        labelY.setAttribute("y", y + 4);
        labelY.setAttribute("class", "chart-label-y");
        labelY.textContent = (val / 1000) + 'K';
        svg.appendChild(labelY);
    }
    
    // Scale helper
    const getX = idx => 70 + idx * 78;
    const getY = val => 165 - (val / maxVal) * 120;
    
    // Construct Path strings
    let salesPath = `M ${getX(0)} ${getY(salesData[0])}`;
    let targetPath = `M ${getX(0)} ${getY(targetData[0])}`;
    
    let salesAreaPath = `M ${getX(0)} ${getY(salesData[0])}`;
    let targetAreaPath = `M ${getX(0)} ${getY(targetData[0])}`;
    
    for(let i = 1; i < months.length; i++) {
        salesPath += ` L ${getX(i)} ${getY(salesData[i])}`;
        targetPath += ` L ${getX(i)} ${getY(targetData[i])}`;
        
        salesAreaPath += ` L ${getX(i)} ${getY(salesData[i])}`;
        targetAreaPath += ` L ${getX(i)} ${getY(targetData[i])}`;
    }
    
    salesAreaPath += ` L ${getX(months.length - 1)} 165 L ${getX(0)} 165 Z`;
    targetAreaPath += ` L ${getX(months.length - 1)} 165 L ${getX(0)} 165 Z`;
    
    // Draw Area fills
    const areaBlue = document.createElementNS("http://www.w3.org/2000/svg", "path");
    areaBlue.setAttribute("d", salesAreaPath);
    areaBlue.setAttribute("class", "chart-area-blue");
    svg.appendChild(areaBlue);
    
    const areaOrange = document.createElementNS("http://www.w3.org/2000/svg", "path");
    areaOrange.setAttribute("d", targetAreaPath);
    areaOrange.setAttribute("class", "chart-area-orange");
    svg.appendChild(areaOrange);

    // Draw Line Paths
    const lineBlue = document.createElementNS("http://www.w3.org/2000/svg", "path");
    lineBlue.setAttribute("d", salesPath);
    lineBlue.setAttribute("class", "chart-line-blue");
    svg.appendChild(lineBlue);
    
    const lineOrange = document.createElementNS("http://www.w3.org/2000/svg", "path");
    lineOrange.setAttribute("d", targetPath);
    lineOrange.setAttribute("class", "chart-line-orange");
    svg.appendChild(lineOrange);
    
    // Draw dots and Label X
    months.forEach((month, idx) => {
        const cx = getX(idx);
        
        // Label X
        const lblX = document.createElementNS("http://www.w3.org/2000/svg", "text");
        lblX.setAttribute("x", cx);
        lblX.setAttribute("y", "188");
        lblX.setAttribute("class", "chart-label-x");
        lblX.textContent = month;
        svg.appendChild(lblX);
        
        // Sales Node Dot
        const nodeSales = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        nodeSales.setAttribute("cx", cx);
        nodeSales.setAttribute("cy", getY(salesData[idx]));
        nodeSales.setAttribute("r", "4");
        nodeSales.setAttribute("class", "chart-node node-blue");
        nodeSales.setAttribute("title", `$${salesData[idx].toLocaleString()}`);
        svg.appendChild(nodeSales);
        
        // Target Node Dot
        const nodeTarget = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        nodeTarget.setAttribute("cx", cx);
        nodeTarget.setAttribute("cy", getY(targetData[idx]));
        nodeTarget.setAttribute("r", "4");
        nodeTarget.setAttribute("class", "chart-node node-orange");
        nodeTarget.setAttribute("title", `$${targetData[idx].toLocaleString()}`);
        svg.appendChild(nodeTarget);
    });

    // Update legend values dynamically
    const legSales = document.getElementById('legend-sales-val');
    const legTarget = document.getElementById('legend-target-val');
    if (legSales && legTarget) {
        legSales.textContent = `$${salesData.reduce((a,b)=>a+b, 0).toLocaleString()}`;
        legTarget.textContent = `$${targetData.reduce((a,b)=>a+b, 0).toLocaleString()}`;
    }
}

/* 5. Social Media Engagement Trend Chart */
function drawSocialEngagementChart() {
    const svg = clearAndGetSVG("social-engagement-chart", 500, 220);
    if (!svg) return;
    
    const weeks = ['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4', 'Minggu 5', 'Minggu 6'];
    
    let likesData = [3400, 2800, 4900, 4100, 5200, 6800];
    let commentsData = [800, 520, 940, 1100, 1400, 1700];
    
    if (state.selectedSocialPlatform === 'instagram') {
        likesData = [2400, 2100, 3900, 3100, 4200, 5100];
        commentsData = [600, 420, 740, 900, 1100, 1300];
    } else if (state.selectedSocialPlatform === 'facebook') {
        likesData = [800, 600, 900, 750, 850, 1100];
        commentsData = [150, 90, 160, 180, 210, 280];
    } else if (state.selectedSocialPlatform === 'linkedin') {
        likesData = [200, 100, 150, 250, 180, 600];
        commentsData = [50, 10, 40, 60, 90, 120];
    }

    const maxVal = 8000;
    
    // Draw Y grid
    for (let i = 0; i <= 4; i++) {
        const y = 30 + i * 35;
        const val = maxVal - i * 2000;
        
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", "50");
        line.setAttribute("y1", y);
        line.setAttribute("x2", "480");
        line.setAttribute("y2", y);
        line.setAttribute("class", "grid-line");
        svg.appendChild(line);
        
        const labelY = document.createElementNS("http://www.w3.org/2000/svg", "text");
        labelY.setAttribute("x", "40");
        labelY.setAttribute("y", y + 4);
        labelY.setAttribute("class", "chart-label-y");
        labelY.textContent = val.toString();
        svg.appendChild(labelY);
    }
    
    const getX = idx => 80 + idx * 75;
    const getY = val => 170 - (val / maxVal) * 130;
    
    let likesPath = `M ${getX(0)} ${getY(likesData[0])}`;
    let commentsPath = `M ${getX(0)} ${getY(commentsData[0])}`;
    
    for (let i = 1; i < weeks.length; i++) {
        likesPath += ` L ${getX(i)} ${getY(likesData[i])}`;
        commentsPath += ` L ${getX(i)} ${getY(commentsData[i])}`;
    }
    
    // Draw Likes Line (Blue)
    const lineLikes = document.createElementNS("http://www.w3.org/2000/svg", "path");
    lineLikes.setAttribute("d", likesPath);
    lineLikes.setAttribute("class", "chart-line-blue");
    svg.appendChild(lineLikes);
    
    // Draw Comments Line (Orange)
    const lineComments = document.createElementNS("http://www.w3.org/2000/svg", "path");
    lineComments.setAttribute("d", commentsPath);
    lineComments.setAttribute("class", "chart-line-orange");
    svg.appendChild(lineComments);
    
    // Nodes & Labels
    weeks.forEach((w, idx) => {
        const cx = getX(idx);
        
        const lblX = document.createElementNS("http://www.w3.org/2000/svg", "text");
        lblX.setAttribute("x", cx);
        lblX.setAttribute("y", "190");
        lblX.setAttribute("class", "chart-label-x");
        lblX.textContent = w;
        svg.appendChild(lblX);
        
        // Likes dot
        const dLikes = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        dLikes.setAttribute("cx", cx);
        dLikes.setAttribute("cy", getY(likesData[idx]));
        dLikes.setAttribute("r", "3.5");
        dLikes.setAttribute("class", "chart-node node-blue");
        svg.appendChild(dLikes);
        
        // Comments dot
        const dComm = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        dComm.setAttribute("cx", cx);
        dComm.setAttribute("cy", getY(commentsData[idx]));
        dComm.setAttribute("r", "3.5");
        dComm.setAttribute("class", "chart-node node-orange");
        svg.appendChild(dComm);
    });
}

/* 6. Ads Performance Trend */
function drawAdsPerformanceChart() {
    const svg = clearAndGetSVG("ads-performance-chart", 500, 220);
    if (!svg) return;
    
    const months = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const ctrData = [1.8, 2.1, 3.4, 2.8, 3.1, 4.2]; // Clicks through rate %
    
    const maxVal = 5.0;
    
    for (let i = 0; i <= 4; i++) {
        const y = 30 + i * 35;
        const val = (maxVal - i * 1.25).toFixed(2);
        
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", "50");
        line.setAttribute("y1", y);
        line.setAttribute("x2", "480");
        line.setAttribute("y2", y);
        line.setAttribute("class", "grid-line");
        svg.appendChild(line);
        
        const labelY = document.createElementNS("http://www.w3.org/2000/svg", "text");
        labelY.setAttribute("x", "40");
        labelY.setAttribute("y", y + 4);
        labelY.setAttribute("class", "chart-label-y");
        labelY.textContent = val + '%';
        svg.appendChild(labelY);
    }
    
    const getX = idx => 70 + idx * 78;
    const getY = val => 170 - (val / maxVal) * 130;
    
    let path = `M ${getX(0)} ${getY(ctrData[0])}`;
    for (let i = 1; i < months.length; i++) {
        path += ` L ${getX(i)} ${getY(ctrData[i])}`;
    }
    
    const line = document.createElementNS("http://www.w3.org/2000/svg", "path");
    line.setAttribute("d", path);
    line.setAttribute("class", "chart-line-blue");
    svg.appendChild(line);
    
    months.forEach((m, idx) => {
        const cx = getX(idx);
        
        const lbl = document.createElementNS("http://www.w3.org/2000/svg", "text");
        lbl.setAttribute("x", cx);
        lbl.setAttribute("y", "190");
        lbl.setAttribute("class", "chart-label-x");
        lbl.textContent = m;
        svg.appendChild(lbl);
        
        const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        dot.setAttribute("cx", cx);
        dot.setAttribute("cy", getY(ctrData[idx]));
        dot.setAttribute("r", "4");
        dot.setAttribute("class", "chart-node node-blue");
        svg.appendChild(dot);
    });
}

/* 7. CRM Sales Funnel Pipeline Stage */
function drawCRMPipelineChart() {
    const svg = clearAndGetSVG("crm-pipeline-chart", 380, 220);
    if (!svg) return;
    
    // Funnel bars: Lead -> MQL -> SQL -> Opp -> Win
    const stages = ['New Lead', 'MQL', 'SQL', 'Opportunity', 'Won Deal'];
    const widths = [320, 260, 180, 120, 60];
    const colors = ['#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#ec4899'];
    
    stages.forEach((s, idx) => {
        const w = widths[idx];
        const x = (380 - w) / 2;
        const y = 20 + idx * 36;
        
        // Bar
        const bar = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        bar.setAttribute("x", x);
        bar.setAttribute("y", y);
        bar.setAttribute("width", w);
        bar.setAttribute("height", "24");
        bar.setAttribute("fill", colors[idx]);
        bar.setAttribute("rx", "6");
        svg.appendChild(bar);
        
        // Text Stage
        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", "190");
        text.setAttribute("y", y + 16);
        text.setAttribute("class", "chart-label-x");
        text.setAttribute("fill", "white");
        text.setAttribute("style", "font-weight:700; font-size:11px;");
        text.textContent = s;
        svg.appendChild(text);
    });
}

// ==========================================================================
// REAL-TIME INSTAGRAM INTEGRATION
// ==========================================================================

let realInstagramData = null;

async function fetchRealInstagramData() {
    try {
        const response = await fetch('/api/instagram');
        if (!response.ok) throw new Error('API request failed');
        const data = await response.json();
        realInstagramData = data;
        
        // 1. Update Instagram Reach Metrics on UI
        if (data.account && !data.account.error && data.account.followers_count !== undefined) {
            const igReach = document.getElementById('ig-reach');
            if (igReach) igReach.textContent = formatCompact(data.account.followers_count);
            
            // Update reach in platform metrics cards
            const platformCards = document.querySelectorAll('.social-platform-card');
            platformCards.forEach(card => {
                const title = card.querySelector('h3');
                if (title && title.textContent.includes('Instagram')) {
                    const reachSpan = card.querySelector('.platform-metrics .p-metric:last-child .p-val');
                    if (reachSpan) reachSpan.textContent = formatCompact(data.account.followers_count);
                }
            });

            // Update Social Distribution Followers list
            document.querySelectorAll('.social-dist-item').forEach(item => {
                const platformName = item.querySelector('.social-platform-name');
                if (platformName && platformName.textContent === 'Instagram') {
                    const followersVal = item.querySelector('.social-platform-followers');
                    if (followersVal) followersVal.textContent = `+${formatCompact(data.account.followers_count)} Followers`;
                }
            });
        }
        
        // 2. Parse & Update Instagram Posts list
        if (data.media && data.media.data && !data.media.error) {
            let totalLikes = 0;
            let totalComments = 0;

            const igPosts = data.media.data.map((post, idx) => {
                const likes = post.like_count || 0;
                const comments = post.comments_count || 0;
                totalLikes += likes;
                totalComments += comments;

                // Approximate views/reach based on engagement
                const mockViews = Math.round(likes * 14.2 + comments * 6.5);
                const mockReach = Math.round(likes * 9.5 + comments * 4.2);
                
                return {
                    id: post.id,
                    platform: 'instagram',
                    rank: 1, // Will be set after sorting
                    img: post.media_url || 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=300&h=200',
                    caption: post.caption || 'Postingan Instagram sinergi Proxsis Academy Group.',
                    reach: formatCompact(mockReach),
                    views: formatCompact(mockViews),
                    likes: likes.toLocaleString(),
                    comments: comments.toLocaleString(),
                    shares: Math.round(likes * 0.08).toLocaleString(),
                    engagement_score: likes + comments
                };
            });
            
            // Sort by engagement score and assign ranks
            igPosts.sort((a, b) => b.engagement_score - a.engagement_score);
            igPosts.forEach((post, idx) => post.rank = idx + 1);

            // Replace old mock Instagram posts with real ones in global state
            state.topPosts = state.topPosts.filter(p => p.platform !== 'instagram');
            state.topPosts = [...state.topPosts, ...igPosts];

            // Update Total likes / comments if Instagram is the selected view
            if (state.selectedSocialPlatform === 'instagram') {
                const domLikes = document.getElementById('total-likes');
                const domComments = document.getElementById('total-comments');
                const domShares = document.getElementById('total-shares');
                if (domLikes) domLikes.textContent = totalLikes.toLocaleString();
                if (domComments) domComments.textContent = totalComments.toLocaleString();
                if (domShares) domShares.textContent = Math.round(totalLikes * 0.08).toLocaleString();
            }
        }
        
        // Re-render components with new state
        renderTopContentGrid();
        
        console.log("Real-time Instagram data loaded successfully!");
    } catch (err) {
        console.warn("Failed to load real-time Instagram data, fallback to mock data:", err);
    }
}

// Simple compact number formatter helper
function formatCompact(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
}

