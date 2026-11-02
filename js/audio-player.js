/**
 * Audio Player Engine - Murottal Syaikh Mishary Rashid Alafasy
 * Dilengkapi sinkronisasi highlight ayat yang aktif ("mengikuti bacaannya") dan auto-scroll.
 */

class QuranAudioPlayer {
  constructor() {
    this.audio = new Audio();
    this.currentSurah = null;
    this.currentAyah = null;
    this.totalAyahs = 0;
    this.isPlaying = false;
    this.playbackRate = 1.0;
    this.repeatCurrentAyah = false;
    this.autoPlayNext = true;
    this.autoScroll = true;
    this.volume = 1.0;
    this.isMuted = false;

    // Callbacks untuk UI update
    this.onStateChange = null;
    this.onTimeUpdate = null;
    this.onAyahChange = null;

    this.initAudioListeners();
  }

  initAudioListeners() {
    this.audio.addEventListener('play', () => {
      this.isPlaying = true;
      if (this.onStateChange) this.onStateChange(this.getState());
      this.highlightCurrentAyah(true);
    });

    this.audio.addEventListener('pause', () => {
      this.isPlaying = false;
      if (this.onStateChange) this.onStateChange(this.getState());
    });

    this.audio.addEventListener('timeupdate', () => {
      if (this.onTimeUpdate) {
        this.onTimeUpdate({
          currentTime: this.audio.currentTime,
          duration: this.audio.duration || 0,
          progress: this.audio.duration ? (this.audio.currentTime / this.audio.duration) * 100 : 0
        });
      }
    });

    this.audio.addEventListener('ended', () => {
      this.handleAyahEnded();
    });

    this.audio.addEventListener('error', (e) => {
      console.warn('Audio playback error, mencoba fallback alternatif...', e);
      this.handlePlaybackFallback();
    });
  }

  /**
   * Format nomor 3 digit (e.g. 1 -> 001)
   */
  pad3(num) {
    return String(num).padStart(3, '0');
  }

  /**
   * Mendapatkan URL audio Syaikh Misyari Rasyid
   */
  getAudioUrl(surah, ayah) {
    if (typeof App !== 'undefined' && App.state?.currentSurahData?.number === surah) {
      const ayahItem = App.state.currentSurahData.ayahs?.find(a => a.numberInSurah === ayah);
      if (ayahItem && ayahItem.audio) return ayahItem.audio;
    }
    const sStr = this.pad3(surah);
    const aStr = this.pad3(ayah);
    return `https://everyayah.com/data/Alafasy_128kbps/${sStr}${aStr}.mp3`;
  }

  /**
   * URL Fallback jika server pertama terkendala
   */
  getFallbackAudioUrl(surah, ayah) {
    // Alafasy alternate mirror
    const sStr = this.pad3(surah);
    const aStr = this.pad3(ayah);
    return `https://verses.quran.com/Alafasy/mp3/${sStr}${aStr}.mp3`;
  }

  /**
   * Putar ayat tertentu
   */
  playAyah(surah, ayah, totalAyahs = null, customAudioUrl = null) {
    if (totalAyahs) this.totalAyahs = totalAyahs;

    // Bersihkan highlight ayat lama
    this.highlightCurrentAyah(false);

    this.currentSurah = surah;
    this.currentAyah = ayah;

    const audioUrl = customAudioUrl || this.getAudioUrl(surah, ayah);
    this.audio.src = audioUrl;
    this.audio.playbackRate = this.playbackRate;
    this.audio.volume = this.volume;

    const playPromise = this.audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          this.isPlaying = true;
          this.highlightCurrentAyah(true);
          if (this.onAyahChange) this.onAyahChange(this.currentSurah, this.currentAyah);
          if (this.onStateChange) this.onStateChange(this.getState());
        })
        .catch((err) => {
          console.warn('Audio play request interrupted or prevented by browser:', err);
        });
    }
  }

  /**
   * Handle jika audio error atau terblokir
   */
  handlePlaybackFallback() {
    if (!this.currentSurah || !this.currentAyah) return;
    const fallbackUrl = this.getFallbackAudioUrl(this.currentSurah, this.currentAyah);
    if (this.audio.src !== fallbackUrl) {
      console.log('Switching to fallback audio URL:', fallbackUrl);
      this.audio.src = fallbackUrl;
      this.audio.play().catch(e => console.error('Fallback failed:', e));
    }
  }

  /**
   * Toggle Play / Pause
   */
  togglePlay() {
    if (!this.audio.src) {
      // Jika belum ada audio dipilih, mulai dari ayat 1 surah aktif
      if (this.currentSurah) {
        this.playAyah(this.currentSurah, 1, this.totalAyahs);
      }
      return;
    }

    if (this.isPlaying) {
      this.audio.pause();
    } else {
      this.audio.play().catch(e => console.warn('Could not resume audio:', e));
    }
  }

  /**
   * Lanjut ke ayat berikutnya
   */
  nextAyah() {
    if (!this.currentSurah || !this.currentAyah) return;
    if (this.currentAyah < this.totalAyahs) {
      this.playAyah(this.currentSurah, this.currentAyah + 1, this.totalAyahs);
    } else {
      // Sudah sampai akhir surah
      this.stop();
      if (typeof window.showToast === 'function') {
        window.showToast(`Selesai membaca Surah ke-${this.currentSurah}. Maa syaa Allah!`, 'success');
      }
    }
  }

  /**
   * Kembali ke ayat sebelumnya
   */
  prevAyah() {
    if (!this.currentSurah || !this.currentAyah) return;
    if (this.audio.currentTime > 2) {
      // Jika sudah berjalan lebih dari 2 detik, ulangi dari awal ayat ini
      this.audio.currentTime = 0;
      this.audio.play().catch(e => console.warn(e));
    } else if (this.currentAyah > 1) {
      this.playAyah(this.currentSurah, this.currentAyah - 1, this.totalAyahs);
    } else {
      this.audio.currentTime = 0;
    }
  }

  /**
   * Penanganan saat satu ayat selesai berbunyi
   */
  handleAyahEnded() {
    if (this.repeatCurrentAyah) {
      // Ulangi ayat yang sama
      this.audio.currentTime = 0;
      this.audio.play().catch(e => console.warn(e));
      return;
    }

    if (this.autoPlayNext) {
      this.nextAyah();
    } else {
      this.isPlaying = false;
      this.highlightCurrentAyah(false);
      if (this.onStateChange) this.onStateChange(this.getState());
    }
  }

  /**
   * Sorot (Highlight) kartu ayat di layar dan lakukan auto-scroll
   */
  highlightCurrentAyah(isActive) {
    if (!this.currentSurah || !this.currentAyah) return;

    // Hapus kelas aktif dari semua ayat yang mungkin masih menempel
    document.querySelectorAll('.ayah-card.playing-now').forEach(card => {
      card.classList.remove('playing-now');
      const badge = card.querySelector('.playing-badge');
      if (badge) badge.classList.add('hidden');
    });

    if (isActive) {
      const cardId = `ayah-card-${this.currentSurah}-${this.currentAyah}`;
      const activeCard = document.getElementById(cardId);
      if (activeCard) {
        activeCard.classList.add('playing-now');
        const badge = activeCard.querySelector('.playing-badge');
        if (badge) badge.classList.remove('hidden');

        // Fitur Auto Scroll halus mengikuti ayat yang sedang dibaca
        if (this.autoScroll) {
          activeCard.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }
      }
    }
  }

  /**
   * Setel kecepatan audio (0.75x, 1x, 1.25x, 1.5x)
   */
  setPlaybackRate(rate) {
    this.playbackRate = parseFloat(rate);
    this.audio.playbackRate = this.playbackRate;
    if (this.onStateChange) this.onStateChange(this.getState());
  }

  /**
   * Sakelar Ulangi Ayat (Repeat Ayah)
   */
  toggleRepeat() {
    this.repeatCurrentAyah = !this.repeatCurrentAyah;
    if (this.onStateChange) this.onStateChange(this.getState());
    return this.repeatCurrentAyah;
  }

  /**
   * Sakelar Auto Play Next
   */
  toggleAutoPlayNext() {
    this.autoPlayNext = !this.autoPlayNext;
    if (this.onStateChange) this.onStateChange(this.getState());
    return this.autoPlayNext;
  }

  /**
   * Sakelar Auto Scroll ke ayat yang berbunyi
   */
  toggleAutoScroll() {
    this.autoScroll = !this.autoScroll;
    if (this.onStateChange) this.onStateChange(this.getState());
    return this.autoScroll;
  }

  /**
   * Atur posisi pemutaran detik audio
   */
  seek(progressPercent) {
    if (this.audio.duration) {
      this.audio.currentTime = (progressPercent / 100) * this.audio.duration;
    }
  }

  /**
   * Atur Volume
   */
  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, parseFloat(val)));
    this.audio.volume = this.volume;
    this.isMuted = this.volume === 0;
    if (this.onStateChange) this.onStateChange(this.getState());
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    this.audio.muted = this.isMuted;
    if (this.onStateChange) this.onStateChange(this.getState());
  }

  /**
   * Hentikan audio sepenuhnya
   */
  stop() {
    this.audio.pause();
    this.audio.currentTime = 0;
    this.isPlaying = false;
    this.highlightCurrentAyah(false);
    if (this.onStateChange) this.onStateChange(this.getState());
  }

  getState() {
    return {
      surah: this.currentSurah,
      ayah: this.currentAyah,
      totalAyahs: this.totalAyahs,
      isPlaying: this.isPlaying,
      playbackRate: this.playbackRate,
      repeatCurrentAyah: this.repeatCurrentAyah,
      autoPlayNext: this.autoPlayNext,
      autoScroll: this.autoScroll,
      volume: this.volume,
      isMuted: this.isMuted
    };
  }
}

// Instance global
const quranAudio = new QuranAudioPlayer();
