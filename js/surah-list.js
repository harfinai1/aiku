/**
 * Daftar 114 Surah Al-Qur'an lengkap dengan nama Latin, Arab, arti, jumlah ayat, dan jenis wahyu.
 */
const SURAH_LIST = [
  {
    "number": 1,
    "name": "Al-Fatihah",
    "arabic": "الفَاتِحَة",
    "meaning": "Pembukaan",
    "numberOfAyahs": 7,
    "revelationType": "Makkiyah"
  },
  {
    "number": 2,
    "name": "Al-Baqarah",
    "arabic": "البَقَرَة",
    "meaning": "Sapi Betina",
    "numberOfAyahs": 286,
    "revelationType": "Madaniyah"
  },
  {
    "number": 3,
    "name": "Ali 'Imran",
    "arabic": "آل عِمْرَان",
    "meaning": "Keluarga Imran",
    "numberOfAyahs": 200,
    "revelationType": "Madaniyah"
  },
  {
    "number": 4,
    "name": "An-Nisa'",
    "arabic": "النِّسَاء",
    "meaning": "Wanita",
    "numberOfAyahs": 176,
    "revelationType": "Madaniyah"
  },
  {
    "number": 5,
    "name": "Al-Ma'idah",
    "arabic": "المَائِدَة",
    "meaning": "Jamuan",
    "numberOfAyahs": 120,
    "revelationType": "Madaniyah"
  },
  {
    "number": 6,
    "name": "Al-An'am",
    "arabic": "الأَنْعَام",
    "meaning": "Hewan Ternak",
    "numberOfAyahs": 165,
    "revelationType": "Makkiyah"
  },
  {
    "number": 7,
    "name": "Al-A'raf",
    "arabic": "الأَعْرَاف",
    "meaning": "Tempat Tertinggi",
    "numberOfAyahs": 206,
    "revelationType": "Makkiyah"
  },
  {
    "number": 8,
    "name": "Al-Anfal",
    "arabic": "الأَنْفَال",
    "meaning": "Rampasan Perang",
    "numberOfAyahs": 75,
    "revelationType": "Madaniyah"
  },
  {
    "number": 9,
    "name": "At-Taubah",
    "arabic": "التَّوْبَة",
    "meaning": "Pengampunan",
    "numberOfAyahs": 129,
    "revelationType": "Madaniyah"
  },
  {
    "number": 10,
    "name": "Yunus",
    "arabic": "يُونُس",
    "meaning": "Nabi Yunus",
    "numberOfAyahs": 109,
    "revelationType": "Makkiyah"
  },
  {
    "number": 11,
    "name": "Hud",
    "arabic": "هُود",
    "meaning": "Nabi Hud",
    "numberOfAyahs": 123,
    "revelationType": "Makkiyah"
  },
  {
    "number": 12,
    "name": "Yusuf",
    "arabic": "يُوسُف",
    "meaning": "Nabi Yusuf",
    "numberOfAyahs": 111,
    "revelationType": "Makkiyah"
  },
  {
    "number": 13,
    "name": "Ar-Ra'd",
    "arabic": "الرَّعْد",
    "meaning": "Guruh",
    "numberOfAyahs": 43,
    "revelationType": "Madaniyah"
  },
  {
    "number": 14,
    "name": "Ibrahim",
    "arabic": "إِبْرَاهِيم",
    "meaning": "Nabi Ibrahim",
    "numberOfAyahs": 52,
    "revelationType": "Makkiyah"
  },
  {
    "number": 15,
    "name": "Al-Hijr",
    "arabic": "الحِجْر",
    "meaning": "Negeri Kaum Tsamud",
    "numberOfAyahs": 99,
    "revelationType": "Makkiyah"
  },
  {
    "number": 16,
    "name": "An-Nahl",
    "arabic": "النَّحْل",
    "meaning": "Lebah",
    "numberOfAyahs": 128,
    "revelationType": "Makkiyah"
  },
  {
    "number": 17,
    "name": "Al-Isra'",
    "arabic": "الإِسْرَاء",
    "meaning": "Memperjalankan Malam",
    "numberOfAyahs": 111,
    "revelationType": "Makkiyah"
  },
  {
    "number": 18,
    "name": "Al-Kahf",
    "arabic": "الكَهْف",
    "meaning": "Gua",
    "numberOfAyahs": 110,
    "revelationType": "Makkiyah"
  },
  {
    "number": 19,
    "name": "Maryam",
    "arabic": "مَرْيَم",
    "meaning": "Maryam",
    "numberOfAyahs": 98,
    "revelationType": "Makkiyah"
  },
  {
    "number": 20,
    "name": "Taha",
    "arabic": "طه",
    "meaning": "Taha",
    "numberOfAyahs": 135,
    "revelationType": "Makkiyah"
  },
  {
    "number": 21,
    "name": "Al-Anbiya'",
    "arabic": "الأَنْبِيَاء",
    "meaning": "Para Nabi",
    "numberOfAyahs": 112,
    "revelationType": "Makkiyah"
  },
  {
    "number": 22,
    "name": "Al-Hajj",
    "arabic": "الحَجّ",
    "meaning": "Haji",
    "numberOfAyahs": 78,
    "revelationType": "Madaniyah"
  },
  {
    "number": 23,
    "name": "Al-Mu'minun",
    "arabic": "المُؤْمِنُون",
    "meaning": "Orang-Orang Mukmin",
    "numberOfAyahs": 118,
    "revelationType": "Makkiyah"
  },
  {
    "number": 24,
    "name": "An-Nur",
    "arabic": "النُّور",
    "meaning": "Cahaya",
    "numberOfAyahs": 64,
    "revelationType": "Madaniyah"
  },
  {
    "number": 25,
    "name": "Al-Furqan",
    "arabic": "الفُرْقَان",
    "meaning": "Pembeda",
    "numberOfAyahs": 77,
    "revelationType": "Makkiyah"
  },
  {
    "number": 26,
    "name": "Asy-Syu'ara'",
    "arabic": "الشُّعَرَاء",
    "meaning": "Para Penyair",
    "numberOfAyahs": 227,
    "revelationType": "Makkiyah"
  },
  {
    "number": 27,
    "name": "An-Naml",
    "arabic": "النَّمْل",
    "meaning": "Semut",
    "numberOfAyahs": 93,
    "revelationType": "Makkiyah"
  },
  {
    "number": 28,
    "name": "Al-Qasas",
    "arabic": "القَصَص",
    "meaning": "Kisah-Kisah",
    "numberOfAyahs": 88,
    "revelationType": "Makkiyah"
  },
  {
    "number": 29,
    "name": "Al-'Ankabut",
    "arabic": "العَنْكَبُوت",
    "meaning": "Laba-Laba",
    "numberOfAyahs": 69,
    "revelationType": "Makkiyah"
  },
  {
    "number": 30,
    "name": "Ar-Rum",
    "arabic": "الرُّوم",
    "meaning": "Bangsa Romawi",
    "numberOfAyahs": 60,
    "revelationType": "Makkiyah"
  },
  {
    "number": 31,
    "name": "Luqman",
    "arabic": "لُقْمَان",
    "meaning": "Luqman",
    "numberOfAyahs": 34,
    "revelationType": "Makkiyah"
  },
  {
    "number": 32,
    "name": "As-Sajdah",
    "arabic": "السَّجْدَة",
    "meaning": "Sujud",
    "numberOfAyahs": 30,
    "revelationType": "Makkiyah"
  },
  {
    "number": 33,
    "name": "Al-Ahzab",
    "arabic": "الأَحْزَاب",
    "meaning": "Golongan Bersekutu",
    "numberOfAyahs": 73,
    "revelationType": "Madaniyah"
  },
  {
    "number": 34,
    "name": "Saba'",
    "arabic": "سَبَإ",
    "meaning": "Kaum Saba'",
    "numberOfAyahs": 54,
    "revelationType": "Makkiyah"
  },
  {
    "number": 35,
    "name": "Fatir",
    "arabic": "فَاطِر",
    "meaning": "Pencipta",
    "numberOfAyahs": 45,
    "revelationType": "Makkiyah"
  },
  {
    "number": 36,
    "name": "Yasin",
    "arabic": "يس",
    "meaning": "Yasin",
    "numberOfAyahs": 83,
    "revelationType": "Makkiyah"
  },
  {
    "number": 37,
    "name": "As-Saffat",
    "arabic": "الصَّافَّات",
    "meaning": "Barisan-Barisan",
    "numberOfAyahs": 182,
    "revelationType": "Makkiyah"
  },
  {
    "number": 38,
    "name": "Sad",
    "arabic": "ص",
    "meaning": "Sad",
    "numberOfAyahs": 88,
    "revelationType": "Makkiyah"
  },
  {
    "number": 39,
    "name": "Az-Zumar",
    "arabic": "الزُّمَر",
    "meaning": "Rombongan",
    "numberOfAyahs": 75,
    "revelationType": "Makkiyah"
  },
  {
    "number": 40,
    "name": "Ghafir",
    "arabic": "غَافِر",
    "meaning": "Maha Pengampun",
    "numberOfAyahs": 85,
    "revelationType": "Makkiyah"
  },
  {
    "number": 41,
    "name": "Fussilat",
    "arabic": "فُصِّلَت",
    "meaning": "Dijelaskan",
    "numberOfAyahs": 54,
    "revelationType": "Makkiyah"
  },
  {
    "number": 42,
    "name": "Asy-Syura",
    "arabic": "الشُّورَى",
    "meaning": "Musyawarah",
    "numberOfAyahs": 53,
    "revelationType": "Makkiyah"
  },
  {
    "number": 43,
    "name": "Az-Zukhruf",
    "arabic": "الزُّخْرُف",
    "meaning": "Perhiasan",
    "numberOfAyahs": 89,
    "revelationType": "Makkiyah"
  },
  {
    "number": 44,
    "name": "Ad-Dukhan",
    "arabic": "الدُّخَان",
    "meaning": "Kabut",
    "numberOfAyahs": 59,
    "revelationType": "Makkiyah"
  },
  {
    "number": 45,
    "name": "Al-Jasiyah",
    "arabic": "الجَاثِيَة",
    "meaning": "Berlutut",
    "numberOfAyahs": 37,
    "revelationType": "Makkiyah"
  },
  {
    "number": 46,
    "name": "Al-Ahqaf",
    "arabic": "الأَحْقَاف",
    "meaning": "Bukit Pasir",
    "numberOfAyahs": 35,
    "revelationType": "Makkiyah"
  },
  {
    "number": 47,
    "name": "Muhammad",
    "arabic": "مُحَمَّد",
    "meaning": "Nabi Muhammad",
    "numberOfAyahs": 38,
    "revelationType": "Madaniyah"
  },
  {
    "number": 48,
    "name": "Al-Fath",
    "arabic": "الفَتْح",
    "meaning": "Kemenangan",
    "numberOfAyahs": 29,
    "revelationType": "Madaniyah"
  },
  {
    "number": 49,
    "name": "Al-Hujurat",
    "arabic": "الحُجُرَات",
    "meaning": "Kamar-Kamar",
    "numberOfAyahs": 18,
    "revelationType": "Madaniyah"
  },
  {
    "number": 50,
    "name": "Qaf",
    "arabic": "ق",
    "meaning": "Qaf",
    "numberOfAyahs": 45,
    "revelationType": "Makkiyah"
  },
  {
    "number": 51,
    "name": "Az-Zariyat",
    "arabic": "الذَّارِيَات",
    "meaning": "Angin Menerbangkan",
    "numberOfAyahs": 60,
    "revelationType": "Makkiyah"
  },
  {
    "number": 52,
    "name": "At-Tur",
    "arabic": "الطُّور",
    "meaning": "Bukit Tursina",
    "numberOfAyahs": 49,
    "revelationType": "Makkiyah"
  },
  {
    "number": 53,
    "name": "An-Najm",
    "arabic": "النَّجْم",
    "meaning": "Bintang",
    "numberOfAyahs": 62,
    "revelationType": "Makkiyah"
  },
  {
    "number": 54,
    "name": "Al-Qamar",
    "arabic": "القَمَر",
    "meaning": "Bulan",
    "numberOfAyahs": 55,
    "revelationType": "Makkiyah"
  },
  {
    "number": 55,
    "name": "Ar-Rahman",
    "arabic": "الرَّحْمَٰن",
    "meaning": "Maha Pengasih",
    "numberOfAyahs": 78,
    "revelationType": "Madaniyah"
  },
  {
    "number": 56,
    "name": "Al-Waqi'ah",
    "arabic": "الووَاقِعَة",
    "meaning": "Hari Kiamat",
    "numberOfAyahs": 96,
    "revelationType": "Makkiyah"
  },
  {
    "number": 57,
    "name": "Al-Hadid",
    "arabic": "الحَدِيد",
    "meaning": "Besi",
    "numberOfAyahs": 29,
    "revelationType": "Madaniyah"
  },
  {
    "number": 58,
    "name": "Al-Mujadilah",
    "arabic": "المُجَادَلَة",
    "meaning": "Gugatan",
    "numberOfAyahs": 22,
    "revelationType": "Madaniyah"
  },
  {
    "number": 59,
    "name": "Al-Hasyr",
    "arabic": "الحَشْر",
    "meaning": "Pengusiran",
    "numberOfAyahs": 24,
    "revelationType": "Madaniyah"
  },
  {
    "number": 60,
    "name": "Al-Mumtahanah",
    "arabic": "المُمْتَحَنَة",
    "meaning": "Wanita Diuji",
    "numberOfAyahs": 13,
    "revelationType": "Madaniyah"
  },
  {
    "number": 61,
    "name": "As-Saff",
    "arabic": "الصَّفّ",
    "meaning": "Barisan",
    "numberOfAyahs": 14,
    "revelationType": "Madaniyah"
  },
  {
    "number": 62,
    "name": "Al-Jumu'ah",
    "arabic": "الجُمُعَة",
    "meaning": "Hari Jumat",
    "numberOfAyahs": 11,
    "revelationType": "Madaniyah"
  },
  {
    "number": 63,
    "name": "Al-Munafiqun",
    "arabic": "المُنَافِقُون",
    "meaning": "Orang Munafik",
    "numberOfAyahs": 11,
    "revelationType": "Madaniyah"
  },
  {
    "number": 64,
    "name": "At-Tagabun",
    "arabic": "التَّغَابُن",
    "meaning": "Hari Pengungkapan Kesalahan",
    "numberOfAyahs": 18,
    "revelationType": "Madaniyah"
  },
  {
    "number": 65,
    "name": "At-Talaq",
    "arabic": "الطَّلَاق",
    "meaning": "Perceraian",
    "numberOfAyahs": 12,
    "revelationType": "Madaniyah"
  },
  {
    "number": 66,
    "name": "At-Tahrim",
    "arabic": "التَّحْرِيم",
    "meaning": "Pengharaman",
    "numberOfAyahs": 12,
    "revelationType": "Madaniyah"
  },
  {
    "number": 67,
    "name": "Al-Mulk",
    "arabic": "المُلْك",
    "meaning": "Kerajaan",
    "numberOfAyahs": 30,
    "revelationType": "Makkiyah"
  },
  {
    "number": 68,
    "name": "Al-Qalam",
    "arabic": "القَلَم",
    "meaning": "Pena",
    "numberOfAyahs": 52,
    "revelationType": "Makkiyah"
  },
  {
    "number": 69,
    "name": "Al-Haqqah",
    "arabic": "الحَاقَّة",
    "meaning": "Hari Kiamat Pasti",
    "numberOfAyahs": 52,
    "revelationType": "Makkiyah"
  },
  {
    "number": 70,
    "name": "Al-Ma'arij",
    "arabic": "المَعَارِج",
    "meaning": "Tempat Naik",
    "numberOfAyahs": 44,
    "revelationType": "Makkiyah"
  },
  {
    "number": 71,
    "name": "Nuh",
    "arabic": "نُوح",
    "meaning": "Nabi Nuh",
    "numberOfAyahs": 28,
    "revelationType": "Makkiyah"
  },
  {
    "number": 72,
    "name": "Al-Jinn",
    "arabic": "الجِنّ",
    "meaning": "Jin",
    "numberOfAyahs": 28,
    "revelationType": "Makkiyah"
  },
  {
    "number": 73,
    "name": "Al-Muzzammil",
    "arabic": "المُزَّمِّل",
    "meaning": "Orang Berselimut",
    "numberOfAyahs": 20,
    "revelationType": "Makkiyah"
  },
  {
    "number": 74,
    "name": "Al-Muddassir",
    "arabic": "المُدَّثِّر",
    "meaning": "Orang Berkemul",
    "numberOfAyahs": 56,
    "revelationType": "Makkiyah"
  },
  {
    "number": 75,
    "name": "Al-Qiyamah",
    "arabic": "القِيَامَة",
    "meaning": "Hari Kiamat",
    "numberOfAyahs": 40,
    "revelationType": "Makkiyah"
  },
  {
    "number": 76,
    "name": "Al-Insan",
    "arabic": "الإِنْسَان",
    "meaning": "Manusia",
    "numberOfAyahs": 31,
    "revelationType": "Madaniyah"
  },
  {
    "number": 77,
    "name": "Al-Mursalat",
    "arabic": "المُرْسَلَات",
    "meaning": "Malaikat Diutus",
    "numberOfAyahs": 50,
    "revelationType": "Makkiyah"
  },
  {
    "number": 78,
    "name": "An-Naba'",
    "arabic": "النَّبَإ",
    "meaning": "Berita Besar",
    "numberOfAyahs": 40,
    "revelationType": "Makkiyah"
  },
  {
    "number": 79,
    "name": "An-Nazi'at",
    "arabic": "النَّازِعَات",
    "meaning": "Malaikat Mencabut",
    "numberOfAyahs": 46,
    "revelationType": "Makkiyah"
  },
  {
    "number": 80,
    "name": "'Abasa",
    "arabic": "عَبَسَ",
    "meaning": "Bermuka Masam",
    "numberOfAyahs": 42,
    "revelationType": "Makkiyah"
  },
  {
    "number": 81,
    "name": "At-Takwir",
    "arabic": "التَّكْوِير",
    "meaning": "Menggulung",
    "numberOfAyahs": 29,
    "revelationType": "Makkiyah"
  },
  {
    "number": 82,
    "name": "Al-Infitar",
    "arabic": "الانْفِطَار",
    "meaning": "Terbelah",
    "numberOfAyahs": 19,
    "revelationType": "Makkiyah"
  },
  {
    "number": 83,
    "name": "Al-Mutaffifin",
    "arabic": "المُطَفِّفِين",
    "meaning": "Orang Curang",
    "numberOfAyahs": 36,
    "revelationType": "Makkiyah"
  },
  {
    "number": 84,
    "name": "Al-Insyiqaq",
    "arabic": "الانْشِقَاق",
    "meaning": "Terbelah",
    "numberOfAyahs": 25,
    "revelationType": "Makkiyah"
  },
  {
    "number": 85,
    "name": "Al-Buruj",
    "arabic": "البُرُوج",
    "meaning": "Gugusan Bintang",
    "numberOfAyahs": 22,
    "revelationType": "Makkiyah"
  },
  {
    "number": 86,
    "name": "At-Tariq",
    "arabic": "الطَّارِق",
    "meaning": "Yang Datang Malam Hari",
    "numberOfAyahs": 17,
    "revelationType": "Makkiyah"
  },
  {
    "number": 87,
    "name": "Al-A'la",
    "arabic": "الأَعْلَى",
    "meaning": "Maha Tinggi",
    "numberOfAyahs": 19,
    "revelationType": "Makkiyah"
  },
  {
    "number": 88,
    "name": "Al-Ghasyiyah",
    "arabic": "الغَاشِيَة",
    "meaning": "Hari Pembalasan",
    "numberOfAyahs": 26,
    "revelationType": "Makkiyah"
  },
  {
    "number": 89,
    "name": "Al-Fajr",
    "arabic": "الفَجْر",
    "meaning": "Fajar",
    "numberOfAyahs": 30,
    "revelationType": "Makkiyah"
  },
  {
    "number": 90,
    "name": "Al-Balad",
    "arabic": "البَلَد",
    "meaning": "Negeri",
    "numberOfAyahs": 20,
    "revelationType": "Makkiyah"
  },
  {
    "number": 91,
    "name": "Asy-Syams",
    "arabic": "الشَّمْس",
    "meaning": "Matahari",
    "numberOfAyahs": 15,
    "revelationType": "Makkiyah"
  },
  {
    "number": 92,
    "name": "Al-Lail",
    "arabic": "اللَّيْل",
    "meaning": "Malam",
    "numberOfAyahs": 21,
    "revelationType": "Makkiyah"
  },
  {
    "number": 93,
    "name": "Ad-Duha",
    "arabic": "الضُّحَى",
    "meaning": "Waktu Dhuha",
    "numberOfAyahs": 11,
    "revelationType": "Makkiyah"
  },
  {
    "number": 94,
    "name": "Asy-Syarh",
    "arabic": "الشَّرْح",
    "meaning": "Kelapangan",
    "numberOfAyahs": 8,
    "revelationType": "Makkiyah"
  },
  {
    "number": 95,
    "name": "At-Tin",
    "arabic": "التِّين",
    "meaning": "Buah Tin",
    "numberOfAyahs": 8,
    "revelationType": "Makkiyah"
  },
  {
    "number": 96,
    "name": "Al-'Alaq",
    "arabic": "العَلَق",
    "meaning": "Segumpal Darah",
    "numberOfAyahs": 19,
    "revelationType": "Makkiyah"
  },
  {
    "number": 97,
    "name": "Al-Qadr",
    "arabic": "القَدْر",
    "meaning": "Kemuliaan",
    "numberOfAyahs": 5,
    "revelationType": "Makkiyah"
  },
  {
    "number": 98,
    "name": "Al-Bayyinah",
    "arabic": "البَيِّنَة",
    "meaning": "Bukti Nyata",
    "numberOfAyahs": 8,
    "revelationType": "Madaniyah"
  },
  {
    "number": 99,
    "name": "Az-Zalzalah",
    "arabic": "الزَّلْزَلَة",
    "meaning": "Keguncangan",
    "numberOfAyahs": 8,
    "revelationType": "Madaniyah"
  },
  {
    "number": 100,
    "name": "Al-'Adiyat",
    "arabic": "العَادِيَات",
    "meaning": "Kuda Perang Cepat",
    "numberOfAyahs": 11,
    "revelationType": "Makkiyah"
  },
  {
    "number": 101,
    "name": "Al-Qari'ah",
    "arabic": "القَارِعَة",
    "meaning": "Hari Kiamat Menggetarkan",
    "numberOfAyahs": 11,
    "revelationType": "Makkiyah"
  },
  {
    "number": 102,
    "name": "At-Takasur",
    "arabic": "التَّكَاثُر",
    "meaning": "Bermegah-Megahan",
    "numberOfAyahs": 8,
    "revelationType": "Makkiyah"
  },
  {
    "number": 103,
    "name": "Al-'Asr",
    "arabic": "العَصْر",
    "meaning": "Masa/Waktu",
    "numberOfAyahs": 3,
    "revelationType": "Makkiyah"
  },
  {
    "number": 104,
    "name": "Al-Humazah",
    "arabic": "الهُمَزَة",
    "meaning": "Pengumpat",
    "numberOfAyahs": 9,
    "revelationType": "Makkiyah"
  },
  {
    "number": 105,
    "name": "Al-Fil",
    "arabic": "الفِيل",
    "meaning": "Gajah",
    "numberOfAyahs": 5,
    "revelationType": "Makkiyah"
  },
  {
    "number": 106,
    "name": "Quraisy",
    "arabic": "قُرَيْش",
    "meaning": "Suku Quraisy",
    "numberOfAyahs": 4,
    "revelationType": "Makkiyah"
  },
  {
    "number": 107,
    "name": "Al-Ma'un",
    "arabic": "المَاعُون",
    "meaning": "Barang Berguna",
    "numberOfAyahs": 7,
    "revelationType": "Makkiyah"
  },
  {
    "number": 108,
    "name": "Al-Kautsar",
    "arabic": "الكَوْثَر",
    "meaning": "Nikmat Berlimpah",
    "numberOfAyahs": 3,
    "revelationType": "Makkiyah"
  },
  {
    "number": 109,
    "name": "Al-Kafirun",
    "arabic": "الكَافِرُون",
    "meaning": "Orang Kafir",
    "numberOfAyahs": 6,
    "revelationType": "Makkiyah"
  },
  {
    "number": 110,
    "name": "An-Nasr",
    "arabic": "النَّصْر",
    "meaning": "Pertolongan",
    "numberOfAyahs": 3,
    "revelationType": "Madaniyah"
  },
  {
    "number": 111,
    "name": "Al-Lahab",
    "arabic": "اللَّهَب",
    "meaning": "Gejolak Api",
    "numberOfAyahs": 5,
    "revelationType": "Makkiyah"
  },
  {
    "number": 112,
    "name": "Al-Ikhlas",
    "arabic": "الإِخْلَاص",
    "meaning": "Ikhlas/Keesaan Allah",
    "numberOfAyahs": 4,
    "revelationType": "Makkiyah"
  },
  {
    "number": 113,
    "name": "Al-Falaq",
    "arabic": "الفَلَق",
    "meaning": "Waktu Subuh",
    "numberOfAyahs": 5,
    "revelationType": "Makkiyah"
  },
  {
    "number": 114,
    "name": "An-Nas",
    "arabic": "النَّاس",
    "meaning": "Manusia",
    "numberOfAyahs": 6,
    "revelationType": "Makkiyah"
  }
];
