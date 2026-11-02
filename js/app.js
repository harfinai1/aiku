/**
 * Aplikasi Al-Qur'an Digital dengan Tajwid Berwarna & Murottal Syaikh Mishary Rashid Alafasy
 */

const App = {
  state: {
    currentSurahId: 1,
    currentSurahData: null,
    surahList: SURAH_LIST,
    filteredSurahs: SURAH_LIST,
    searchQuery: '',
    selectedCategory: 'all', // 'all', 'makkiyah', 'madaniyah', 'popular'
    popularSurahs: [1, 18, 36, 55, 56, 67, 78, 112, 113, 114],
    isLoading: false,
    activeTajweedFilter: null,
    settings: {
      showTajweed: true,
      showTranslation: true,
      showLatin: true,
      arabicFontSize: 28,
      transFontSize: 15,
      isDark: false
    },
    lastRead: null,
    bookmarks: []
  },

  init() {
    this.loadSettings();
    this.renderSurahList();
    this.initAudioPlayerSync();
    this.initEventListeners();
    this.renderTajweedLegend();

    // Muat surah awal (Al-Fatihah atau dari Last Read)
    const initialSurah = this.state.lastRead?.surah || 1;
    this.loadSurah(initialSurah);

    // Update UI last read jika ada
    this.updateLastReadUI();
  },

  /* ========================================================
     PENGATURAN & PENYIMPANAN LOKAL
     ======================================================== */
  loadSettings() {
    try {
      const savedSettings = localStorage.getItem('quran_settings');
      if (savedSettings) {
        this.state.settings = { ...this.state.settings, ...JSON.parse(savedSettings) };
      }
      const savedLastRead = localStorage.getItem('quran_last_read');
      if (savedLastRead) {
        this.state.lastRead = JSON.parse(savedLastRead);
      }
      const savedBookmarks = localStorage.getItem('quran_bookmarks');
      if (savedBookmarks) {
        this.state.bookmarks = JSON.parse(savedBookmarks);
      }
    } catch (e) {
      console.warn('Gagal memuat preferensi pengguna:', e);
    }

    // Terapkan Tema Gelap / Terang
    this.applyTheme(this.state.settings.isDark);
    this.applyFontSizes();
  },

  saveSettings() {
    try {
      localStorage.setItem('quran_settings', JSON.stringify(this.state.settings));
    } catch (e) {
      console.warn(e);
    }
  },

  applyTheme(isDark) {
    this.state.settings.isDark = isDark;
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    const themeIcon = document.getElementById('theme-toggle-icon');
    if (themeIcon) {
      themeIcon.innerHTML = isDark
        ? `<svg class="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd"></path></svg>`
        : `<svg class="w-5 h-5 text-slate-700" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>`;
    }
  },

  applyFontSizes() {
    document.documentElement.style.setProperty('--arabic-size', `${this.state.settings.arabicFontSize}px`);
    document.documentElement.style.setProperty('--trans-size', `${this.state.settings.transFontSize}px`);
  },

  /* ========================================================
     PENCARIAN & FILTER SURAH
     ======================================================== */
  renderSurahList() {
    const container = document.getElementById('surah-list-container');
    if (!container) return;

    const q = this.state.searchQuery.toLowerCase().trim();
    let list = this.state.surahList;

    if (this.state.selectedCategory === 'makkiyah') {
      list = list.filter(s => s.revelationType === 'Makkiyah');
    } else if (this.state.selectedCategory === 'madaniyah') {
      list = list.filter(s => s.revelationType === 'Madaniyah');
    } else if (this.state.selectedCategory === 'popular') {
      list = list.filter(s => this.state.popularSurahs.includes(s.number));
    }

    if (q) {
      list = list.filter(s =>
        s.name.toLowerCase().includes(q) ||
        s.meaning.toLowerCase().includes(q) ||
        String(s.number).includes(q) ||
        s.arabic.includes(q)
      );
    }

    this.state.filteredSurahs = list;

    if (list.length === 0) {
      container.innerHTML = `
        <div class="p-8 text-center text-slate-400">
          <svg class="w-10 h-10 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <p class="text-sm">Tidak ditemukan surah yang sesuai</p>
        </div>
      `;
      return;
    }

    container.innerHTML = list.map(s => {
      const isSelected = s.number === this.state.currentSurahId;
      return `
        <button
          onclick="App.selectSurah(${s.number})"
          class="w-full text-left p-3.5 rounded-xl transition flex items-center justify-between group ${isSelected
          ? 'bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300'
          : 'hover:bg-slate-100 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-200'
        }"
        >
          <div class="flex items-center space-x-3">
            <span class="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs ${isSelected
          ? 'bg-emerald-600 text-white shadow-sm'
          : 'bg-slate-200/70 dark:bg-slate-800 text-slate-600 dark:text-slate-400 group-hover:bg-emerald-500 group-hover:text-white transition'
        }">
              ${s.number}
            </span>
            <div>
              <h4 class="font-semibold text-sm group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition">${s.name}</h4>
              <p class="text-xs text-slate-400 dark:text-slate-500">${s.meaning} • ${s.numberOfAyahs} Ayat</p>
            </div>
          </div>
          <div class="text-right">
            <span class="font-arabic text-lg text-emerald-800 dark:text-emerald-400 group-hover:scale-105 transition inline-block">${s.arabic}</span>
            <span class="block text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider">${s.revelationType}</span>
          </div>
        </button>
      `;
    }).join('');
  },

  selectSurah(surahNumber) {
    this.loadSurah(surahNumber);
    // Tutup panel mobile jika di layar kecil
    const mobileSidebar = document.getElementById('sidebar-panel');
    if (mobileSidebar && window.innerWidth < 1024) {
      mobileSidebar.classList.add('hidden');
    }
  },

  /* ========================================================
     PEMUATAN SURAH & FETCH DATA
     ======================================================== */
  async loadSurah(surahNumber) {
    this.state.currentSurahId = surahNumber;
    this.renderSurahList(); // Update highlight pada daftar surah

    const mainContainer = document.getElementById('ayahs-container');
    const headerTitle = document.getElementById('active-surah-title');
    const headerInfo = document.getElementById('active-surah-info');

    // Tampilkan data metadata di header surah
    const meta = this.state.surahList.find(s => s.number === surahNumber);
    if (meta) {
      if (headerTitle) headerTitle.innerText = `${meta.number}. ${meta.name} (${meta.arabic})`;
      if (headerInfo) headerInfo.innerText = `${meta.meaning} • ${meta.numberOfAyahs} Ayat • Golongan ${meta.revelationType}`;
    }

    // Reset jump dropdown
    this.populateJumpDropdown(meta?.numberOfAyahs || 7);

    // Cek 1: Apakah ada di cache offline bawaan (PRECACHED_SURAHS)
    if (typeof PRECACHED_SURAHS !== 'undefined' && PRECACHED_SURAHS[surahNumber]) {
      this.state.currentSurahData = PRECACHED_SURAHS[surahNumber];
      this.renderAyahs();
      return;
    }

    // Cek 2: Apakah ada di IndexedDB / LocalStorage cache
    const cacheKey = `quran_cache_surah_${surahNumber}`;
    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        this.state.currentSurahData = JSON.parse(cached);
        this.renderAyahs();
        return;
      }
    } catch (e) {
      console.warn(e);
    }

    // Cek 3: Ambil dari API Al-Qur'an (api.alquran.cloud dengan 3 edisi: quran-tajweed, id.indonesian, ar.alafasy)
    this.renderLoadingState();

    try {
      const url = `https://api.alquran.cloud/v1/surah/${surahNumber}/editions/quran-tajweed,id.indonesian,ar.alafasy`;
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const json = await response.json();

      if (json.code === 200 && json.data && json.data.length >= 2) {
        const tajweedEd = json.data[0];
        const transEd = json.data[1];
        const audioEd = json.data[2] || null;

        const ayahs = tajweedEd.ayahs.map((ayah, idx) => {
          return {
            numberInSurah: ayah.numberInSurah,
            text: ayah.text,
            latin: '', // Latin akan dibuat fallback atau dibaca dari rasm
            translation: transEd.ayahs[idx] ? transEd.ayahs[idx].text : '',
            audio: audioEd && audioEd.ayahs[idx] ? audioEd.ayahs[idx].audio : quranAudio.getAudioUrl(surahNumber, ayah.numberInSurah)
          };
        });

        const surahData = {
          number: meta.number,
          name: meta.name,
          arabic: meta.arabic,
          meaning: meta.meaning,
          numberOfAyahs: meta.numberOfAyahs,
          revelationType: meta.revelationType,
          ayahs: ayahs
        };

        this.state.currentSurahData = surahData;

        // Simpan ke cache browser untuk pemuatan offline instan berikutnya
        try {
          localStorage.setItem(cacheKey, JSON.stringify(surahData));
        } catch (e) {
          // Abaikan jika kuota storage penuh
        }

        this.renderAyahs();
      } else {
        throw new Error('Format data tidak sesuai');
      }
    } catch (err) {
      console.error('Gagal mengambil data surah:', err);
      this.renderErrorState(surahNumber, err.message);
    }
  },

  renderLoadingState() {
    const container = document.getElementById('ayahs-container');
    if (!container) return;
    container.innerHTML = `
      <div class="py-20 text-center">
        <div class="inline-block animate-spin w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full mb-4"></div>
        <h3 class="text-base font-semibold text-slate-700 dark:text-slate-200">Memuat Teks & Tajwid Surah...</h3>
        <p class="text-sm text-slate-400 mt-1">Mengunduh mushaf tajwid berwarna dan audio Syaikh Misyari</p>
      </div>
    `;
  },

  renderErrorState(surahNumber, errMsg) {
    const container = document.getElementById('ayahs-container');
    if (!container) return;
    container.innerHTML = `
      <div class="py-16 text-center max-w-md mx-auto p-6 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 rounded-2xl">
        <svg class="w-12 h-12 text-red-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
        <h3 class="text-lg font-bold text-red-700 dark:text-red-300">Gagal Mengunduh Surah</h3>
        <p class="text-xs text-red-500 mt-1 mb-4">${errMsg}. Pastikan koneksi internet Anda aktif untuk mengunduh surah ini pertama kali.</p>
        <button
          onclick="App.loadSurah(${surahNumber})"
          class="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl text-sm transition shadow-sm"
        >
          Coba Muat Ulang
        </button>
      </div>
    `;
  },

  /* ========================================================
     RENDER AYAT-AYAT SURAH
     ======================================================== */
  renderAyahs() {
    const container = document.getElementById('ayahs-container');
    const data = this.state.currentSurahData;
    if (!container || !data) return;

    const surahId = data.number;
    const ayahs = data.ayahs;
    const showBismillah = surahId !== 1 && surahId !== 9;

    let html = '';

    // Bismillah Banner untuk setiap surah kecuali Al-Fatihah dan At-Taubah
    if (showBismillah) {
      const bismillahParsed = parseTajweed('بِسْمِ [h:1[ٱ][l[ل]َّهِ [h:2[ٱ][l[ل]رَّحْمَٰنِ [h:3[ٱ][l[ل]رَّحِيمِ', this.state.settings.showTajweed);
      html += `
        <div class="bismillah-card py-6 my-4 text-center rounded-2xl border border-emerald-500/20 bg-emerald-50/30 dark:bg-emerald-950/20">
          <p class="quran-arabic-text text-center text-3xl font-arabic text-emerald-950 dark:text-emerald-200">
            ${bismillahParsed}
          </p>
          <p class="text-xs text-slate-400 mt-2 font-light">Dengan nama Allah Yang Maha Pengasih, Maha Penyayang</p>
        </div>
      `;
    }

    // Render per-ayat card
    ayahs.forEach(ayah => {
      const ayahNum = ayah.numberInSurah;
      const parsedArabic = parseTajweed(ayah.text, this.state.settings.showTajweed);
      const isBookmarked = this.isAyahBookmarked(surahId, ayahNum);
      const isPlaying = quranAudio.currentSurah === surahId && quranAudio.currentAyah === ayahNum && quranAudio.isPlaying;

      html += `
        <div
          id="ayah-card-${surahId}-${ayahNum}"
          class="ayah-card p-5 md:p-6 mb-4 rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-slate-200/80 dark:border-slate-800 ${isPlaying ? 'playing-now' : ''
        }"
        >
          <!-- Header Bar Tiap Ayat: Nomor & Tombol Aksi -->
          <div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-100 dark:border-slate-800/80">
            <div class="flex items-center space-x-2">
              <span class="px-2.5 py-1 rounded-lg bg-emerald-100/70 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold text-xs">
                ${surahId}:${ayahNum}
              </span>
              <!-- Badge Status Sedang Diputar -->
              <span class="playing-badge ${isPlaying ? '' : 'hidden'} inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                <span class="flex items-center">
                  <span class="equalizer-bar"></span>
                  <span class="equalizer-bar"></span>
                  <span class="equalizer-bar"></span>
                </span>
                <span>Misyari Membaca</span>
              </span>
            </div>

            <!-- Tombol Aksi Ayat: Play, Hafalan, Salin, Bookmark -->
            <div class="flex items-center space-x-1">
              <button
                onclick="App.playAyah(${surahId}, ${ayahNum})"
                title="Putar ayat ini dengan suara Syaikh Misyari"
                class="p-2 rounded-xl text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-slate-800 transition"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </button>

              <button
                onclick="App.openTahfidzModal(${ayahNum})"
                title="Hafalkan ayat ini (Ulangi bacaan)"
                class="p-2 rounded-xl text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-slate-800 transition"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
              </button>

              <button
                onclick="App.saveLastRead(${surahId}, ${ayahNum})"
                title="Tandai sebagai Terakhir Dibaca"
                class="p-2 rounded-xl text-slate-500 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-slate-800 transition"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </button>

              <button
                onclick="App.toggleBookmark(${surahId}, ${ayahNum})"
                title="Simpan Bookmark"
                class="p-2 rounded-xl ${isBookmarked
          ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/40'
          : 'text-slate-500 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800'
        } transition"
              >
                <svg class="w-5 h-5" fill="${isBookmarked ? 'currentColor' : 'none'}" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path></svg>
              </button>

              <button
                onclick="App.copyAyah(${surahId}, ${ayahNum})"
                title="Salin Ayat & Terjemahan"
                class="p-2 rounded-xl text-slate-500 hover:text-emerald-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
              </button>
            </div>
          </div>

          <!-- Teks Arab dengan Tajwid Lengkap Berwarna -->
          <div class="my-4 text-right">
            <p class="quran-arabic-text text-slate-900 dark:text-slate-100 select-text">
              ${parsedArabic}
              <span class="ayah-end-ornament text-emerald-700 dark:text-emerald-400 border-emerald-500/40">
                ${ayahNum}
              </span>
            </p>
          </div>

          <!-- Transliterasi Latin (Opsional) -->
          ${this.state.settings.showLatin && ayah.latin
          ? `
              <div class="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/60">
                <p class="text-sm font-medium text-emerald-700 dark:text-emerald-400/90 leading-relaxed italic">
                  ${ayah.latin}
                </p>
              </div>
            `
          : ''
        }

          <!-- Terjemahan Bahasa Indonesia (Kemenag RI) -->
          ${this.state.settings.showTranslation && ayah.translation
          ? `
              <div class="mt-2 text-slate-600 dark:text-slate-300 leading-relaxed text-sm select-text">
                <p>${ayah.translation}</p>
              </div>
            `
          : ''
        }
        </div>
      `;
    });

    container.innerHTML = html;

    // Pasang listener klik tajwid token untuk menampilkan info kaidah hukum
    this.attachTajweedTokenListeners();
  },

  /* ========================================================
     TOOLTIP & MODAL TAJWID INTERAKTIF
     ======================================================== */
  attachTajweedTokenListeners() {
    const popover = document.getElementById('tajweed-popover');
    if (!popover) return;

    document.querySelectorAll('.tj-token').forEach(el => {
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        const code = el.getAttribute('data-code');
        const rule = getTajweedRule(code);
        if (!rule) return;

        const rect = el.getBoundingClientRect();
        popover.innerHTML = `
          <div class="flex items-center justify-between mb-2">
            <div class="flex items-center space-x-2">
              <span class="w-3.5 h-3.5 rounded-full" style="background-color: ${rule.color}"></span>
              <h4 class="font-bold text-sm text-slate-800 dark:text-white">${rule.name}</h4>
            </div>
            <span class="px-2 py-0.5 text-[11px] rounded-full font-semibold" style="background-color: ${rule.bg}; color: ${rule.color};">
              ${rule.badge}
            </span>
          </div>
          <p class="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
            ⏱️ Panjang Harakat: <span class="text-slate-800 dark:text-slate-200">${rule.harakat}</span>
          </p>
          <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-2.5">
            ${rule.desc}
          </p>
          <div class="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 text-center">
            <span class="text-xs text-slate-400 block mb-0.5">Contoh dalam Al-Qur'an:</span>
            <span class="font-arabic text-xl" style="color: ${rule.color}">${rule.example}</span>
          </div>
        `;

        // Posisikan tooltip
        let left = rect.left + window.scrollX - 120;
        let top = rect.top + window.scrollY - 160;

        if (left < 10) left = 10;
        if (left + 320 > window.innerWidth) left = window.innerWidth - 330;
        if (top < 10) top = rect.bottom + window.scrollY + 10;

        popover.style.left = `${left}px`;
        popover.style.top = `${top}px`;
        popover.classList.remove('hidden');
      });
    });

    // Sembunyikan popover saat klik di luar
    document.addEventListener('click', () => {
      popover.classList.add('hidden');
    });
  },

  /* ========================================================
     PANDUAN & LEGENDA WARNA TAJWID LENGKAP
     ======================================================== */
  renderTajweedLegend() {
    const container = document.getElementById('tajweed-legend-content');
    if (!container) return;

    const rules = Object.values(TAJWEED_RULES);
    // Kelompokkan berdasarkan kategori
    const categories = {};
    rules.forEach(r => {
      if (!categories[r.category]) categories[r.category] = [];
      categories[r.category].push(r);
    });

    let html = '';
    for (const [catName, catRules] of Object.entries(categories)) {
      html += `
        <div class="mb-5">
          <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5 flex items-center">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2"></span>
            ${catName}
          </h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            ${catRules.map(r => `
              <div class="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 hover:border-emerald-500/40 transition">
                <div class="flex items-center justify-between mb-1">
                  <div class="flex items-center space-x-2">
                    <span class="w-3.5 h-3.5 rounded-full flex-shrink-0" style="background-color: ${r.color}"></span>
                    <span class="font-bold text-xs text-slate-800 dark:text-slate-100">${r.name}</span>
                  </div>
                  <span class="text-[10px] px-2 py-0.5 rounded-full font-semibold" style="background-color: ${r.bg}; color: ${r.color}">
                    ${r.harakat}
                  </span>
                </div>
                <p class="text-[11px] text-slate-500 dark:text-slate-400 leading-normal mt-1">${r.desc}</p>
                <div class="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span class="text-[10px] text-slate-400">Contoh:</span>
                  <span class="font-arabic text-base" style="color: ${r.color}">${r.example}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    container.innerHTML = html;
  },

  /* ========================================================
     KONTROL MUROTTAL SYAIKH MISYARI & SINKRONISASI
     ======================================================== */
  initAudioPlayerSync() {
    quranAudio.onStateChange = (state) => {
      this.updatePlayerUI(state);
    };

    quranAudio.onTimeUpdate = (timeInfo) => {
      const progressBar = document.getElementById('audio-progress-bar');
      const timeDisplay = document.getElementById('audio-time-display');
      if (progressBar) progressBar.value = timeInfo.progress;
      if (timeDisplay) {
        timeDisplay.innerText = `${this.formatTime(timeInfo.currentTime)} / ${this.formatTime(timeInfo.duration)}`;
      }
    };

    quranAudio.onAyahChange = (surah, ayah) => {
      const title = document.getElementById('player-surah-title');
      const meta = this.state.surahList.find(s => s.number === surah);
      if (title && meta) {
        title.innerText = `${meta.name} : Ayat ${ayah}`;
      }
    };

    // Callback khusus mode pengulangan hafalan (Tahfidz)
    quranAudio.onTahfidzUpdate = (tahfidzState) => {
      this.updateTahfidzUI(tahfidzState);
    };
  },

  playSurahFromBeginning() {
    const surahId = this.state.currentSurahId;
    const total = this.state.currentSurahData?.numberOfAyahs || 7;
    const firstAyah = this.state.currentSurahData?.ayahs?.[0];
    quranAudio.playAyah(surahId, 1, total, firstAyah ? firstAyah.audio : null);
  },

  playAyah(surahId, ayahNum) {
    const total = this.state.currentSurahData?.numberOfAyahs || 7;
    const ayahObj = this.state.currentSurahData?.ayahs?.find(a => a.numberInSurah === ayahNum);
    quranAudio.playAyah(surahId, ayahNum, total, ayahObj ? ayahObj.audio : null);
  },

  updatePlayerUI(state) {
    const playPauseBtn = document.getElementById('player-play-btn');
    if (playPauseBtn) {
      playPauseBtn.innerHTML = state.isPlaying
        ? `<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>`
        : `<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"></path></svg>`;
    }

    const repeatBtn = document.getElementById('player-repeat-btn');
    if (repeatBtn) {
      if (state.repeatCurrentAyah) {
        repeatBtn.classList.add('text-emerald-500');
        repeatBtn.classList.remove('text-slate-400');
      } else {
        repeatBtn.classList.remove('text-emerald-500');
        repeatBtn.classList.add('text-slate-400');
      }
    }

    const autoScrollBtn = document.getElementById('player-autoscroll-btn');
    if (autoScrollBtn) {
      if (state.autoScroll) {
        autoScrollBtn.classList.add('text-emerald-500');
        autoScrollBtn.classList.remove('text-slate-400');
      } else {
        autoScrollBtn.classList.remove('text-emerald-500');
        autoScrollBtn.classList.add('text-slate-400');
      }
    }
  },

  formatTime(seconds) {
    if (isNaN(seconds) || seconds === 0) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  },

  /* ========================================================
     JUMP TO AYAH, BOOKMARKS & SALIN
     ======================================================== */
  populateJumpDropdown(totalAyahs) {
    const select = document.getElementById('jump-ayah-select');
    if (!select) return;
    let options = '<option value="">Lompat ke Ayat...</option>';
    for (let i = 1; i <= totalAyahs; i++) {
      options += `<option value="${i}">Ayat ${i}</option>`;
    }
    select.innerHTML = options;
  },

  jumpToAyah(ayahNumber) {
    if (!ayahNumber) return;
    const el = document.getElementById(`ayah-card-${this.state.currentSurahId}-${ayahNumber}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.classList.add('ring-2', 'ring-emerald-500');
      setTimeout(() => {
        el.classList.remove('ring-2', 'ring-emerald-500');
      }, 2000);
    }
  },

  /* ========================================================
     FITUR MODE HAFALAN & MUROJA'AH (TAHFIDZ)
     ======================================================== */
  openTahfidzModal(targetAyah = null) {
    const modal = document.getElementById('tahfidz-modal');
    if (!modal) return;

    const total = this.state.currentSurahData?.numberOfAyahs || 7;
    const startVal = targetAyah || quranAudio.currentAyah || 1;
    const endVal = targetAyah || quranAudio.currentAyah || 1;

    const startInput = document.getElementById('tahfidz-start-ayah');
    const endInput = document.getElementById('tahfidz-end-ayah');
    const maxHint = document.getElementById('tahfidz-total-ayahs-hint');
    const surahNameHint = document.getElementById('tahfidz-surah-name-hint');

    if (startInput) {
      startInput.value = startVal;
      startInput.max = total;
    }
    if (endInput) {
      endInput.value = endVal;
      endInput.max = total;
    }
    if (maxHint) maxHint.innerText = `Maks: ${total} Ayat`;
    if (surahNameHint) {
      const meta = this.state.surahList.find(s => s.number === this.state.currentSurahId);
      surahNameHint.innerText = meta ? `${meta.number}. ${meta.name}` : `Surah ${this.state.currentSurahId}`;
    }

    modal.classList.remove('hidden');
  },

  closeTahfidzModal() {
    const modal = document.getElementById('tahfidz-modal');
    if (modal) modal.classList.add('hidden');
  },

  setTahfidzQuickRange(type) {
    const total = this.state.currentSurahData?.numberOfAyahs || 7;
    const startInput = document.getElementById('tahfidz-start-ayah');
    const endInput = document.getElementById('tahfidz-end-ayah');
    if (!startInput || !endInput) return;

    let start = parseInt(startInput.value) || 1;
    if (type === 'single') {
      endInput.value = start;
    } else if (type === 'plus3') {
      endInput.value = Math.min(total, start + 2);
    } else if (type === 'plus5') {
      endInput.value = Math.min(total, start + 4);
    } else if (type === 'plus10') {
      endInput.value = Math.min(total, start + 9);
    } else if (type === 'full') {
      startInput.value = 1;
      endInput.value = total;
    }
  },

  setTahfidzQuickRepeat(val, targetField) {
    const field = document.getElementById(targetField);
    if (field) {
      field.value = val;
    }
  },

  startTahfidzFromModal() {
    const startInput = document.getElementById('tahfidz-start-ayah');
    const endInput = document.getElementById('tahfidz-end-ayah');
    const repAyahInput = document.getElementById('tahfidz-repeat-ayah');
    const repRangeInput = document.getElementById('tahfidz-repeat-range');
    const delayInput = document.getElementById('tahfidz-delay-select');

    const start = parseInt(startInput?.value) || 1;
    const end = parseInt(endInput?.value) || start;
    const repAyah = repAyahInput?.value || 3;
    const repRange = repRangeInput?.value || 1;
    const delay = parseInt(delayInput?.value) || 0;

    quranAudio.startTahfidz({
      startAyah: start,
      endAyah: end,
      repeatPerAyah: repAyah,
      repeatRange: repRange,
      delayBetweenAyahs: delay
    });

    this.closeTahfidzModal();
    this.showToast(`🎯 Mode Hafalan: Ayat ${start} s/d ${end}`, 'success');
  },

  stopTahfidz() {
    quranAudio.stopTahfidz();
    this.showToast('Mode Hafalan dihentikan', 'info');
  },

  updateTahfidzUI(tahfidzState) {
    const activeBar = document.getElementById('tahfidz-active-bar');
    if (!activeBar) return;

    if (!tahfidzState || !tahfidzState.active) {
      activeBar.classList.add('hidden');
      return;
    }

    activeBar.classList.remove('hidden');

    const rangeInfo = document.getElementById('tahfidz-status-range');
    const ayahRepeatInfo = document.getElementById('tahfidz-status-ayah-repeat');
    const rangeRepeatInfo = document.getElementById('tahfidz-status-range-repeat');

    if (rangeInfo) {
      rangeInfo.innerText = `Ayat ${tahfidzState.startAyah} - ${tahfidzState.endAyah}`;
    }
    if (ayahRepeatInfo) {
      const repAyahMax = tahfidzState.isPerAyahInfinite ? '∞' : `${tahfidzState.repeatPerAyah}x`;
      ayahRepeatInfo.innerText = `Ayat ${tahfidzState.currentAyah} (Putaran ${tahfidzState.currentAyahRepeatCount}/${repAyahMax})`;
    }
    if (rangeRepeatInfo) {
      const repRangeMax = tahfidzState.isRangeInfinite ? '∞' : `${tahfidzState.repeatRange}x`;
      rangeRepeatInfo.innerText = `Blok: (${tahfidzState.currentRangeRepeatCount}/${repRangeMax})`;
    }
  },

  saveLastRead(surahId, ayahNum) {
    const meta = this.state.surahList.find(s => s.number === surahId);
    this.state.lastRead = {
      surah: surahId,
      ayah: ayahNum,
      surahName: meta ? meta.name : `Surah ${surahId}`,
      timestamp: Date.now()
    };
    try {
      localStorage.setItem('quran_last_read', JSON.stringify(this.state.lastRead));
    } catch (e) {
      console.warn(e);
    }
    this.updateLastReadUI();
    this.showToast(`Ditandai Terakhir Dibaca: ${meta?.name} Ayat ${ayahNum}`, 'success');
  },

  updateLastReadUI() {
    const badge = document.getElementById('last-read-badge');
    if (!badge) return;
    if (this.state.lastRead) {
      badge.classList.remove('hidden');
      badge.innerHTML = `
        <button onclick="App.goToLastRead()" class="flex items-center space-x-2 text-xs text-emerald-800 dark:text-emerald-300 font-medium">
          <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Terakhir Dibaca: <strong>${this.state.lastRead.surahName} (${this.state.lastRead.ayah})</strong></span>
        </button>
      `;
    } else {
      badge.classList.add('hidden');
    }
  },

  goToLastRead() {
    if (!this.state.lastRead) return;
    const { surah, ayah } = this.state.lastRead;
    this.loadSurah(surah).then(() => {
      setTimeout(() => this.jumpToAyah(ayah), 400);
    });
  },

  isAyahBookmarked(surahId, ayahNum) {
    return this.state.bookmarks.some(b => b.surah === surahId && b.ayah === ayahNum);
  },

  toggleBookmark(surahId, ayahNum) {
    const index = this.state.bookmarks.findIndex(b => b.surah === surahId && b.ayah === ayahNum);
    const meta = this.state.surahList.find(s => s.number === surahId);
    if (index > -1) {
      this.state.bookmarks.splice(index, 1);
      this.showToast(`Bookmark dihapus`, 'info');
    } else {
      this.state.bookmarks.push({
        surah: surahId,
        ayah: ayahNum,
        surahName: meta ? meta.name : `Surah ${surahId}`,
        createdAt: Date.now()
      });
      this.showToast(`Disimpan ke Bookmark: ${meta?.name} (${ayahNum})`, 'success');
    }
    try {
      localStorage.setItem('quran_bookmarks', JSON.stringify(this.state.bookmarks));
    } catch (e) {
      console.warn(e);
    }
    this.renderAyahs();
  },

  copyAyah(surahId, ayahNum) {
    const ayah = this.state.currentSurahData?.ayahs.find(a => a.numberInSurah === ayahNum);
    const meta = this.state.surahList.find(s => s.number === surahId);
    if (!ayah) return;

    const plainArabic = stripTajweed(ayah.text);
    const copyText = `${plainArabic}\n\n"${ayah.translation}"\n(QS. ${meta?.name}: ${ayahNum})`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(copyText).then(() => {
        this.showToast(`Ayat ${ayahNum} berhasil disalin ke clipboard!`, 'success');
      });
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = copyText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      this.showToast(`Ayat ${ayahNum} berhasil disalin!`, 'success');
    }
  },

  showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    const colorClasses = type === 'success'
      ? 'bg-emerald-600 text-white'
      : type === 'error'
        ? 'bg-red-600 text-white'
        : 'bg-slate-800 text-white';

    toast.className = `toast px-4 py-2.5 rounded-xl shadow-lg text-xs font-semibold flex items-center space-x-2 ${colorClasses}`;
    toast.innerHTML = `
      <span>${type === 'success' ? '✓' : 'ℹ'}</span>
      <span>${message}</span>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 2800);
  },

  /* ========================================================
     INISIALISASI EVENT LISTENERS
     ======================================================== */
  initEventListeners() {
    // Pencarian Surah
    const searchInput = document.getElementById('surah-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.state.searchQuery = e.target.value;
        this.renderSurahList();
      });
    }

    // Filter Kategori Surah (Semua, Makkiyah, Madaniyah, Populer)
    document.querySelectorAll('.surah-filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.surah-filter-btn').forEach(b => {
          b.classList.remove('bg-emerald-600', 'text-white');
          b.classList.add('bg-slate-100', 'dark:bg-slate-800', 'text-slate-600', 'dark:text-slate-400');
        });
        btn.classList.add('bg-emerald-600', 'text-white');
        btn.classList.remove('bg-slate-100', 'dark:bg-slate-800', 'text-slate-600', 'dark:text-slate-400');

        this.state.selectedCategory = btn.getAttribute('data-category');
        this.renderSurahList();
      });
    });

    // Toggle Dark Mode
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        this.applyTheme(!this.state.settings.isDark);
        this.saveSettings();
      });
    }

    // Toggle Sakelar Tajwid
    const tajweedToggle = document.getElementById('tajweed-toggle');
    if (tajweedToggle) {
      tajweedToggle.checked = this.state.settings.showTajweed;
      tajweedToggle.addEventListener('change', (e) => {
        this.state.settings.showTajweed = e.target.checked;
        this.saveSettings();
        this.renderAyahs();
      });
    }

    // Toggle Terjemahan
    const transToggle = document.getElementById('translation-toggle');
    if (transToggle) {
      transToggle.checked = this.state.settings.showTranslation;
      transToggle.addEventListener('change', (e) => {
        this.state.settings.showTranslation = e.target.checked;
        this.saveSettings();
        this.renderAyahs();
      });
    }

    // Toggle Transliterasi Latin
    const latinToggle = document.getElementById('latin-toggle');
    if (latinToggle) {
      latinToggle.checked = this.state.settings.showLatin;
      latinToggle.addEventListener('change', (e) => {
        this.state.settings.showLatin = e.target.checked;
        this.saveSettings();
        this.renderAyahs();
      });
    }

    // Slider Ukuran Font Arab
    const arabicSlider = document.getElementById('arabic-font-slider');
    if (arabicSlider) {
      arabicSlider.value = this.state.settings.arabicFontSize;
      arabicSlider.addEventListener('input', (e) => {
        this.state.settings.arabicFontSize = e.target.value;
        this.applyFontSizes();
        this.saveSettings();
      });
    }

    // Jump to Ayah Select Dropdown
    const jumpSelect = document.getElementById('jump-ayah-select');
    if (jumpSelect) {
      jumpSelect.addEventListener('change', (e) => {
        this.jumpToAyah(e.target.value);
      });
    }

    // Audio Player Controls
    const playBtn = document.getElementById('player-play-btn');
    if (playBtn) playBtn.addEventListener('click', () => quranAudio.togglePlay());

    const nextBtn = document.getElementById('player-next-btn');
    if (nextBtn) nextBtn.addEventListener('click', () => quranAudio.nextAyah());

    const prevBtn = document.getElementById('player-prev-btn');
    if (prevBtn) prevBtn.addEventListener('click', () => quranAudio.prevAyah());

    const repeatBtn = document.getElementById('player-repeat-btn');
    if (repeatBtn) repeatBtn.addEventListener('click', () => quranAudio.toggleRepeat());

    const autoScrollBtn = document.getElementById('player-autoscroll-btn');
    if (autoScrollBtn) autoScrollBtn.addEventListener('click', () => quranAudio.toggleAutoScroll());

    const speedSelect = document.getElementById('player-speed-select');
    if (speedSelect) {
      speedSelect.addEventListener('change', (e) => {
        quranAudio.setPlaybackRate(e.target.value);
      });
    }

    const progressBar = document.getElementById('audio-progress-bar');
    if (progressBar) {
      progressBar.addEventListener('input', (e) => {
        quranAudio.seek(e.target.value);
      });
    }

    // Drawer Panduan Tajwid Modal
    const legendBtn = document.getElementById('open-tajweed-legend-btn');
    const legendDrawer = document.getElementById('tajweed-legend-drawer');
    const closeLegendBtn = document.getElementById('close-tajweed-legend-btn');
    if (legendBtn && legendDrawer) {
      legendBtn.addEventListener('click', () => {
        legendDrawer.classList.remove('hidden');
      });
    }
    if (closeLegendBtn && legendDrawer) {
      closeLegendBtn.addEventListener('click', () => {
        legendDrawer.classList.add('hidden');
      });
    }

    // Drawer Pengaturan
    const settingsBtn = document.getElementById('open-settings-btn');
    const settingsDrawer = document.getElementById('settings-drawer');
    const closeSettingsBtn = document.getElementById('close-settings-btn');
    if (settingsBtn && settingsDrawer) {
      settingsBtn.addEventListener('click', () => {
        settingsDrawer.classList.remove('hidden');
      });
    }
    if (closeSettingsBtn && settingsDrawer) {
      closeSettingsBtn.addEventListener('click', () => {
        settingsDrawer.classList.add('hidden');
      });
    }

    // Modal Mode Hafalan (Tahfidz)
    const tahfidzBtn = document.getElementById('open-tahfidz-btn');
    const closeTahfidzBtn = document.getElementById('close-tahfidz-btn');
    const startTahfidzBtn = document.getElementById('start-tahfidz-btn');
    const stopTahfidzBtn = document.getElementById('stop-tahfidz-btn');

    if (tahfidzBtn) {
      tahfidzBtn.addEventListener('click', () => {
        this.openTahfidzModal();
      });
    }
    if (closeTahfidzBtn) {
      closeTahfidzBtn.addEventListener('click', () => {
        this.closeTahfidzModal();
      });
    }
    if (startTahfidzBtn) {
      startTahfidzBtn.addEventListener('click', () => {
        this.startTahfidzFromModal();
      });
    }
    if (stopTahfidzBtn) {
      stopTahfidzBtn.addEventListener('click', () => {
        this.stopTahfidz();
      });
    }

    // Mobile Sidebar Toggle
    const mobileMenuBtn = document.getElementById('mobile-sidebar-toggle');
    const sidebarPanel = document.getElementById('sidebar-panel');
    const closeSidebarBtn = document.getElementById('close-sidebar-btn');
    if (mobileMenuBtn && sidebarPanel) {
      mobileMenuBtn.addEventListener('click', () => {
        sidebarPanel.classList.toggle('hidden');
      });
    }
    if (closeSidebarBtn && sidebarPanel) {
      closeSidebarBtn.addEventListener('click', () => {
        sidebarPanel.classList.add('hidden');
      });
    }
  }
};

// Pasang fungsi global showToast agar audio player bisa memanggilnya
window.showToast = (msg, type) => App.showToast(msg, type);

// Jalankan aplikasi saat DOM siap
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});