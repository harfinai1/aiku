/**
 * Tajweed Rules Engine & HTML Parser
 * Mengonversi format anotasi tajwid Al-Qur'an ke elemen HTML interaktif berwarna lengkap.
 */

const TAJWEED_RULES = {
  h: {
    code: 'ham_wasl',
    name: 'Hamzah Wasal',
    badge: 'Wasal',
    color: '#94a3b8',
    bg: '#f1f5f9',
    category: 'Waqaf & Wasal',
    harakat: 'Gugur / Dileburkan',
    desc: 'Alif Wasal di awal kata yang dibaca jika memulai bacaan, namun dileburkan (tidak dilafalkan) jika disambung dari kata sebelumnya.',
    example: 'ٱلْحَمْدُ'
  },
  s: {
    code: 'silent',
    name: 'Huruf Gugur (Silent)',
    badge: 'Tidak Dibaca',
    color: '#94a3b8',
    bg: '#f1f5f9',
    category: 'Gugur / Ziyadah',
    harakat: 'Tidak Dilafalkan',
    desc: 'Huruf yang tertulis dalam rasm Utsmani tetapi tidak dilafalkan dalam qira\'ah (misal: Alif setelah Wawu jama\'ah).',
    example: 'قَالُوا۟'
  },
  l: {
    code: 'lam_shamsiyah',
    name: 'Alif Lam Syamsiyah',
    badge: 'Idgham Syamsiyah',
    color: '#94a3b8',
    bg: '#f1f5f9',
    category: 'Hukum Lam',
    harakat: 'Melebur ke Huruf Syamsiyah',
    desc: 'Huruf Alif Lam bertemu salah satu dari 14 huruf syamsiyah. Huruf Lam dileburkan langsung ke huruf berikutnya yang bertasydid.',
    example: 'ٱلرَّحْمَٰنِ'
  },
  n: {
    code: 'madda_normal',
    name: "Mad Thobi'i (Mad Asli)",
    badge: 'Mad Asli',
    color: '#0284c7', // Sky Blue
    bg: '#e0f2fe',
    category: 'Hukum Mad',
    harakat: '2 Harakat (1 Alif)',
    desc: "Huruf Mad (Alif setelah Fathah, Ya sukun setelah Kasrah, Wawu sukun setelah Dhammah) tanpa ada sebab Hamzah atau Sukun. Dipanjangkan stabil 2 harakat.",
    example: 'نُوحِيهَا'
  },
  p: {
    code: 'madda_permissible',
    name: 'Mad Jaiz Munfashil / \'Aridh Lissukun',
    badge: 'Mad Jaiz',
    color: '#ea580c', // Warm Orange
    bg: '#ffedd5',
    category: 'Hukum Mad',
    harakat: '2, 4, atau 5 Harakat',
    desc: 'Huruf mad bertemu huruf Hamzah pada kata yang terpisah (Mad Jaiz), atau huruf mad bertemu huruf hidup yang dibaca sukun karena berhenti/waqaf (Mad \'Aridh).',
    example: 'إِنَّآ أَعْطَيْنَٰكَ'
  },
  m: {
    code: 'madda_necessary',
    name: 'Mad Lazim (Kilmi / Harfi)',
    badge: 'Mad Lazim (6 Harakat)',
    color: '#991b1b', // Deep Burgundy Red
    bg: '#fee2e2',
    category: 'Hukum Mad',
    harakat: '6 Harakat Penuh (3 Alif)',
    desc: 'Huruf mad bertemu huruf berharakat tasydid atau sukun asli dalam satu kata/huruf fawatihussuwar. Wajib dipanjangkan 6 ketukan penuh.',
    example: 'وَلَا ٱلضَّآلِّينَ'
  },
  o: {
    code: 'madda_obligatory',
    name: 'Mad Wajib Muttashil',
    badge: 'Mad Wajib (4-5 Harakat)',
    color: '#dc2626', // Bright Crimson Red
    bg: '#fee2e2',
    category: 'Hukum Mad',
    harakat: '4 atau 5 Harakat',
    desc: 'Huruf mad bertemu dengan huruf Hamzah dalam satu kata bersambung. Wajib dipanjangkan 4 atau 5 harakat.',
    example: 'إِذَا جَآءَ نَصْرُ اللَّهِ'
  },
  q: {
    code: 'qalqalah',
    name: 'Qalqalah (Memantul)',
    badge: 'Qalqalah',
    color: '#2563eb', // Royal Blue
    bg: '#dbeafe',
    category: 'Sifat Huruf',
    harakat: 'Pantulan Getar Makhraj',
    desc: 'Huruf Ba, Jim, Dal, Tha, Qaf (ب ج د ط ق - Baju Di Toko) yang bersukun asli (Sughra) atau disukunkan karena waqaf (Kubra). Dibaca memantul dengan jelas.',
    example: 'قُلْ أَعُوذُ بِرَبِّ ٱلْفَلَقِ'
  },
  c: {
    code: 'ikhfa_shafawi',
    name: 'Ikhfa Syafawi',
    badge: 'Ikhfa Syafawi',
    color: '#db2777', // Rose Pink
    bg: '#fce7f3',
    category: 'Hukum Mim Sukun',
    harakat: '2 Harakat (Dengung Samar)',
    desc: 'Mim sukun (مْ) bertemu huruf Ba (ب). Dibaca samar di kedua bibir dengan sedikit renggang disertai dengung (ghunnah) 2 harakat.',
    example: 'تَرْمِيهِم بِحِجَارَةٍ'
  },
  f: {
    code: 'ikhfa',
    name: 'Ikhfa Haqiqi',
    badge: 'Ikhfa Haqiqi',
    color: '#9333ea', // Royal Purple
    bg: '#f3e8ff',
    category: 'Hukum Nun Sukun & Tanwin',
    harakat: '2 Harakat (Samar Dengung)',
    desc: 'Nun sukun (نْ) atau Tanwin bertemu salah satu dari 15 huruf ikhfa (ت ث ج د ذ ز س ش ص ض ط ظ ف ق ك). Dibaca samar condong ke makhraj huruf berikutnya disertai dengung.',
    example: 'مِن شَرِّ'
  },
  w: {
    code: 'idgham_shafawi',
    name: 'Idgham Syafawi / Mimi',
    badge: 'Idgham Mimi',
    color: '#16a34a', // Fresh Green
    bg: '#dcfce7',
    category: 'Hukum Mim Sukun',
    harakat: '2 Harakat (Melebur Dengung)',
    desc: 'Mim sukun (مْ) bertemu huruf Mim (م). Huruf pertama dileburkan sepenuhnya ke huruf kedua dengan tasydid disertai dengung 2 harakat.',
    example: 'لَهُم مَّا يَشَآءُونَ'
  },
  i: {
    code: 'iqlab',
    name: 'Iqlab',
    badge: 'Iqlab',
    color: '#0891b2', // Cyan / Tosca
    bg: '#cffafe',
    category: 'Hukum Nun Sukun & Tanwin',
    harakat: '2 Harakat (Tukar Bunyi Mim)',
    desc: 'Nun sukun (نْ) atau Tanwin bertemu huruf Ba (ب). Bunyi nun/tanwin diganti menjadi bunyi Mim (م) di bibir disertai dengung 2 harakat.',
    example: 'مِنۢ بَعْدِ'
  },
  a: {
    code: 'idgham_ghunnah',
    name: 'Idgham Bighunnah',
    badge: 'Idgham Bighunnah',
    color: '#0d9488', // Teal
    bg: '#ccfbf1',
    category: 'Hukum Nun Sukun & Tanwin',
    harakat: '2 Harakat (Melebur Dengung)',
    desc: 'Nun sukun (نْ) atau Tanwin bertemu salah satu dari huruf Yanmu (ي ن م و). Bunyi dileburkan ke huruf berikutnya disertai dengung 2 harakat.',
    example: 'مَن يَقُولُ'
  },
  u: {
    code: 'idgham_no_ghunnah',
    name: 'Idgham Bilaghunnah',
    badge: 'Idgham Bilaghunnah',
    color: '#65a30d', // Olive Lime
    bg: '#ecfccb',
    category: 'Hukum Nun Sukun & Tanwin',
    harakat: 'Tanpa Dengung (0 Harakat)',
    desc: 'Nun sukun (نْ) atau Tanwin bertemu huruf Lam (ل) atau Ra (ر). Bunyi nun/tanwin dimasukkan lebur seutuhnya tanpa dengung sama sekali.',
    example: 'مِّن رَّبِّهِمْ'
  },
  d: {
    code: 'idgham_mutajanisayn',
    name: 'Idgham Mutajanisain / Mutaqaribain',
    badge: 'Mutajanisain',
    color: '#475569', // Slate Gray
    bg: '#f1f5f9',
    category: 'Hukum Idgham Khusus',
    harakat: 'Melebur Makhraj Sejenis',
    desc: 'Pertemuan dua huruf yang sama makhraj tetapi berlainan sifat (Mutajanisain) atau berdekatan makhraj dan sifatnya (Mutaqaribain).',
    example: 'يَلْهَث ذَّٰلِكَ'
  },
  g: {
    code: 'ghunnah',
    name: 'Ghunnah Musyaddadah',
    badge: 'Ghunnah',
    color: '#059669', // Emerald Green
    bg: '#d1fae5',
    category: 'Ghunnah (Dengung)',
    harakat: '2 Harakat Penuh',
    desc: 'Huruf Nun bertasydid (نّ) atau Mim bertasydid (مّ). Wajib dibunyikan dengung dari pangkal hidung (khaisyum) selama 2 harakat penuh.',
    example: 'إِنَّ اللَّهَ'
  }
};

/**
 * Mengubah string teks beranotasi tajwid menjadi string HTML ber-styling CSS tajwid.
 * @param {string} rawText
 * @param {boolean} enableTajweed
 * @returns {string} HTML string
 */
function parseTajweed(rawText, enableTajweed = true) {
  if (!rawText) return '';
  if (!enableTajweed) {
    return stripTajweed(rawText);
  }

  // Pola regex mencocokkan [kode:id[teks] atau [kode[teks]
  const pattern = /\[([a-zA-Z]+)(?::\d+)?\[([^\[\]]*)\]/g;
  let text = rawText;
  let hasMatch = true;
  let safetyLoop = 0;

  // Lakukan penggantian berulang untuk menangani nesting
  while (hasMatch && safetyLoop < 10) {
    safetyLoop++;
    const prev = text;
    text = text.replace(pattern, (match, ruleCode, innerContent) => {
      const code = ruleCode.toLowerCase();
      const rule = TAJWEED_RULES[code];
      if (!rule) {
        return innerContent;
      }
      return `<span class="tj-token tj-${rule.code}" data-code="${code}" title="${rule.name} - ${rule.harakat}">${innerContent}</span>`;
    });
    hasMatch = text !== prev && /\[([a-zA-Z]+)(?::\d+)?\[([^\[\]]*)\]/.test(text);
  }

  // Bersihkan sisa kurung jika ada kesalahan format rasm
  text = text.replace(/\[\/?(?:[a-zA-Z]+(?::\d+)?)?\]?/g, '');

  return text;
}

/**
 * Menghapus seluruh tag kurung tajwid sehingga menghasilkan teks Arab polos murni
 * @param {string} rawText
 * @returns {string}
 */
function stripTajweed(rawText) {
  if (!rawText) return '';
  let text = rawText;
  // Hapus pola pembuka [kode:id[ atau [kode[
  text = text.replace(/\[[a-zA-Z]+(?::\d+)?\[/g, '');
  // Hapus kurung penutup ]
  text = text.replace(/\]/g, '');
  return text;
}

/**
 * Mengembalikan informasi detail hukum tajwid berdasarkan kodenya
 * @param {string} code
 */
function getTajweedRule(code) {
  return TAJWEED_RULES[code.toLowerCase()] || null;
}

