/**
 * UI & Audio Controller
 * Mengelola efek suara sintetis (Web Audio API), partikel, animasi kulkas, dan riwayat chat.
 */

const KulkasUI = {
  // State suara
  audioCtx: null,
  isMuted: true,
  masterGain: null,
  humOsc1: null,
  humOsc2: null,
  humGain: null,
  lfo: null,

  // Elemen DOM (Akan di-bind di main.js)
  dom: {},

  // Inisialisasi Audio Context
  initAudio: function() {
    if (this.audioCtx) return;

    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContextClass();
      
      // Master Gain untuk Mute/Unmute
      this.masterGain = this.audioCtx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.15, this.audioCtx.currentTime);
      this.masterGain.connect(this.audioCtx.destination);

      // Mulai humming background
      this.setupHumming();
      
      console.log("Web Audio API berhasil diinisialisasi.");
    } catch (e) {
      console.error("Gagal menginisialisasi Web Audio API:", e);
    }
  },

  // Setup suara kompresor berdengung
  setupHumming: function() {
    if (!this.audioCtx) return;

    // 1. Oscillator 1 (Dengung Utama - Rendah)
    this.humOsc1 = this.audioCtx.createOscillator();
    this.humOsc1.type = 'sine';
    this.humOsc1.frequency.setValueAtTime(55, this.audioCtx.currentTime); // Nada A1 rendah

    // 2. Oscillator 2 (Harmonik Pertama - Triangle biar agak berderik)
    this.humOsc2 = this.audioCtx.createOscillator();
    this.humOsc2.type = 'triangle';
    this.humOsc2.frequency.setValueAtTime(110, this.audioCtx.currentTime); // Nada A2

    // 3. Low Pass Filter (Biar suara berat dan empuk)
    const filter = this.audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(120, this.audioCtx.currentTime);

    // 4. LFO (Low Frequency Oscillator) untuk memodulasi volume agar bergetar
    this.lfo = this.audioCtx.createOscillator();
    this.lfo.type = 'sine';
    this.lfo.frequency.setValueAtTime(0.4, this.audioCtx.currentTime); // Berdenyut lambat 0.4Hz

    const lfoGain = this.audioCtx.createGain();
    lfoGain.gain.setValueAtTime(0.02, this.audioCtx.currentTime);

    // 5. Gain Node Dengung
    this.humGain = this.audioCtx.createGain();
    this.humGain.gain.setValueAtTime(0.04, this.audioCtx.currentTime);

    // Hubungkan LFO ke Gain Dengung
    this.lfo.connect(lfoGain);
    lfoGain.connect(this.humGain.gain);

    // Hubungkan Jalur Audio Dengung
    this.humOsc1.connect(filter);
    this.humOsc2.connect(filter);
    filter.connect(this.humGain);
    this.humGain.connect(this.masterGain);

    // Jalankan Dengung
    this.humOsc1.start(0);
    this.humOsc2.start(0);
    this.lfo.start(0);
  },

  // Toggle Mute / Unmute
  toggleMute: function() {
    this.isMuted = !this.isMuted;
    
    // Inisialisasi audio jika belum pernah
    if (!this.audioCtx) {
      this.initAudio();
    }

    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }

    if (this.masterGain) {
      const targetGain = this.isMuted ? 0 : 0.18;
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.audioCtx.currentTime);
      this.masterGain.gain.exponentialRampToValueAtTime(targetGain === 0 ? 0.0001 : targetGain, this.audioCtx.currentTime + 0.3);
    }

    return this.isMuted;
  },

  // Efek Suara Psssst (Uap Dingin) menggunakan White Noise
  playSteamSound: function() {
    if (!this.audioCtx || this.isMuted) return;

    // Buat Buffer White Noise
    const bufferSize = this.audioCtx.sampleRate * 1.5; // Durasi 1.5 detik
    const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    
    // Isi buffer dengan noise acak
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noiseSource = this.audioCtx.createBufferSource();
    noiseSource.buffer = buffer;

    // Filter Uap (Highpass & Bandpass)
    const filter = this.audioCtx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(3200, this.audioCtx.currentTime);
    filter.Q.setValueAtTime(0.8, this.audioCtx.currentTime);

    // Gain Uap
    const steamGain = this.audioCtx.createGain();
    steamGain.gain.setValueAtTime(0.0001, this.audioCtx.currentTime);
    steamGain.gain.exponentialRampToValueAtTime(0.12, this.audioCtx.currentTime + 0.05); // Serangan cepat
    steamGain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 1.4); // Redup perlahan

    // Hubungkan
    noiseSource.connect(filter);
    filter.connect(steamGain);
    steamGain.connect(this.masterGain);

    noiseSource.start(0);
  },

  // Efek Suara Klik Pintu (Dua kali klik magnetik)
  playClickSound: function() {
    if (!this.audioCtx || this.isMuted) return;

    const playClick = (timeOffset) => {
      const time = this.audioCtx.currentTime + timeOffset;
      
      const osc = this.audioCtx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(180, time);
      osc.frequency.exponentialRampToValueAtTime(10, time + 0.06);

      const gain = this.audioCtx.createGain();
      gain.gain.setValueAtTime(0.3, time);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.05);

      osc.connect(gain);
      gain.connect(this.masterGain);
      
      osc.start(time);
      osc.stop(time + 0.07);
    };

    // Klik ganda cepat agar terdengar seperti kunci pintu kulkas asli
    playClick(0);
    playClick(0.08);
  },

  // Efek Suara Blip Ketikan Mulut Kulkas
  playTalkBlip: function() {
    if (!this.audioCtx || this.isMuted) return;

    const osc = this.audioCtx.createOscillator();
    osc.type = 'triangle';
    
    // Nada acak agar terdengar natural layaknya suku kata
    const baseFreq = 160 + Math.random() * 280; 
    osc.frequency.setValueAtTime(baseFreq, this.audioCtx.currentTime);
    
    const gain = this.audioCtx.createGain();
    gain.gain.setValueAtTime(0.08, this.audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(this.masterGain);
    
    osc.start();
    osc.stop(this.audioCtx.currentTime + 0.05);
  },

  // Ubah visual wajah kulkas berdasarkan Mood
  setFridgeEmotion: function(mood) {
    const eyes = document.querySelectorAll('.kulkas-eye');
    const pupils = document.querySelectorAll('.kulkas-pupil');
    const mouth = document.querySelector('.kulkas-mouth');
    
    // Reset kelas
    eyes.forEach(e => {
      e.classList.remove('eye-judgmental', 'eye-confused');
    });
    pupils.forEach(p => {
      p.classList.remove('pupil-judgmental');
    });
    mouth.classList.remove('mouth-judgmental', 'mouth-confused', 'mouth-smile');

    // Terapkan emosi baru
    if (mood.includes("Ngegas") || mood.includes("Sarkastik")) {
      eyes.forEach(e => e.classList.add('eye-judgmental'));
      pupils.forEach(p => p.classList.add('pupil-judgmental'));
      mouth.classList.add('mouth-judgmental');
    } else if (mood.includes("Ngantuk")) {
      // Wajah mager/mengantuk
      eyes.forEach(e => e.classList.add('eye-judgmental'));
      mouth.classList.add('mouth-judgmental');
    } else if (mood.includes("Bijak")) {
      // Wajah senyum tipis bijaksana
      mouth.classList.add('mouth-smile');
    } else {
      // Default / bingung jika tidak dikenal
      eyes.forEach(e => e.classList.add('eye-confused'));
      mouth.classList.add('mouth-confused');
    }
  },

  // Animasi Mengetik Teks Kulkas dengan sinkronisasi Mulut & Suara
  typeMessage: function(text, onComplete) {
    const mouth = document.querySelector('.kulkas-mouth');
    const body = document.querySelector('.kulkas-body');
    const chatContainer = this.dom.chatContainer;
    
    // Buat element bubble chat kulkas baru
    const chatBubbleWrapper = document.createElement('div');
    chatBubbleWrapper.className = 'flex justify-start mb-4';
    
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble bg-slate-800 text-slate-100 px-4 py-3 rounded-2xl rounded-tl-none border border-slate-700 shadow-md max-w-[85%]';
    
    // Indikator mood kulkas kecil di atas bubble
    const moodBadge = document.createElement('span');
    moodBadge.className = 'text-[9px] text-blue-400 font-mono block mb-1 uppercase tracking-wider';
    moodBadge.innerText = `[ Kulkas: ${this.currentMood || 'DINGIN'} ]`;
    
    const textNode = document.createElement('span');
    textNode.className = 'leading-relaxed text-sm';
    
    bubble.appendChild(moodBadge);
    bubble.appendChild(textNode);
    chatBubbleWrapper.appendChild(bubble);
    chatContainer.appendChild(chatBubbleWrapper);
    this.scrollToBottom();

    // Jalankan desisan uap dingin di awal merespons
    this.playSteamSound();
    this.triggerMistEffect();

    // Animasi wiggling/humming tubuh & mulut kulkas saat mengetik
    mouth.classList.add('mouth-talking');
    body.classList.add('kulkas-humming');

    let index = 0;
    const typingInterval = 35; // Kecepatan mengetik (ms)
    
    const type = () => {
      if (index < text.length) {
        textNode.innerHTML += text.charAt(index);
        
        // Picu suara blip ketikan di karakter tertentu saja (supaya tidak terlalu berisik)
        if (text.charAt(index) !== ' ' && index % 2 === 0) {
          this.playTalkBlip();
        }
        
        index++;
        this.scrollToBottom();
        setTimeout(type, typingInterval);
      } else {
        // Selesai mengetik
        mouth.classList.remove('mouth-talking');
        body.classList.remove('kulkas-humming');
        
        // Simpan ke riwayat
        this.saveChatToHistory('kulkas', text, this.currentMood);
        
        if (onComplete) onComplete();
      }
    };

    setTimeout(type, 500); // Tunda sebentar biar ada efek dramatis
  },

  // Buka/Tutup Pintu Kulkas
  toggleDoor: function() {
    const wrapper = document.querySelector('.kulkas-wrapper');
    const inside = document.querySelector('.kulkas-inside');
    const isOpening = !wrapper.classList.contains('door-open');

    // Putar suara klik
    this.playClickSound();

    if (isOpening) {
      wrapper.classList.add('door-open');
      this.playSteamSound();
      this.triggerMistEffect();
      
      // Acak isi makanan di dalam kulkas setiap kali dibuka biar seru
      this.randomizeInsideFood();
    } else {
      wrapper.classList.remove('door-open');
    }
  },

  // Acak isi barang dalam kulkas
  randomizeInsideFood: function() {
    const insideDiv = document.querySelector('.kulkas-inside');
    if (!insideDiv) return;

    // Reset isi rak
    insideDiv.innerHTML = `
      <div class="kulkas-shelf justify-around">
        <div class="food-item text-2xl filter drop-shadow flex items-center justify-center cursor-help select-none" data-tooltip="Token listrik tet-tet-tet">🚨</div>
        <div class="food-item text-2xl filter drop-shadow flex items-center justify-center cursor-help select-none" data-tooltip="Es batu abadi jaman dinasti Ming">🧊</div>
      </div>
      <div class="kulkas-shelf justify-around">
        <div class="food-item text-2xl filter drop-shadow flex items-center justify-center cursor-help select-none" data-tooltip="Air putih di botol sirup Marjan merah">🍾</div>
        <div class="food-item text-2xl filter drop-shadow flex items-center justify-center cursor-help select-none" data-tooltip="Telur sebutir, bertahan dari senin lalu">🥚</div>
      </div>
      <div class="kulkas-shelf justify-around">
        <div class="food-item text-2xl filter drop-shadow flex items-center justify-center cursor-help select-none" data-tooltip="Cabe keriting layu keriput">🌶️</div>
        <div class="food-item text-2xl filter drop-shadow flex items-center justify-center cursor-help select-none" data-tooltip="Harapan masa depan (kosong)">💨</div>
      </div>
    `;
  },

  // Efek Embun/Mist Mengambang keluar dari Kulkas
  triggerMistEffect: function() {
    const wrapper = document.querySelector('.kulkas-wrapper');
    const particleCount = 10;

    for (let i = 0; i < particleCount; i++) {
      setTimeout(() => {
        const particle = document.createElement('div');
        particle.className = 'mist-particle';
        
        // Posisikan partikel di area tengah kulkas
        const rect = wrapper.getBoundingClientRect();
        const startX = rect.left + rect.width / 2 + (Math.random() * 60 - 30);
        const startY = rect.top + rect.height / 2 + (Math.random() * 120 - 60);
        
        particle.style.left = `${startX}px`;
        particle.style.top = `${startY}px`;
        particle.style.width = `${40 + Math.random() * 50}px`;
        particle.style.height = particle.style.width;
        
        document.body.appendChild(particle);
        
        // Hapus partikel setelah animasi selesai
        setTimeout(() => {
          particle.remove();
        }, 1800);
      }, i * 100);
    }
  },

  // Scroll Chat History ke Paling Bawah
  scrollToBottom: function() {
    const container = this.dom.chatContainer;
    container.scrollTop = container.scrollHeight;
  },

  // Rendering Chat Bubble untuk User
  renderUserBubble: function(text) {
    const chatContainer = this.dom.chatContainer;
    
    const wrapper = document.createElement('div');
    wrapper.className = 'flex justify-end mb-4';
    
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble bg-amber-600 text-slate-100 px-4 py-3 rounded-2xl rounded-tr-none border border-amber-700 shadow-md max-w-[85%] text-sm leading-relaxed';
    bubble.innerText = text;
    
    wrapper.appendChild(bubble);
    chatContainer.appendChild(wrapper);
    this.scrollToBottom();

    // Simpan ke riwayat
    this.saveChatToHistory('user', text);
  },

  // Simpan riwayat chat ke LocalStorage
  saveChatToHistory: function(sender, text, mood = '') {
    let history = [];
    try {
      history = JSON.parse(localStorage.getItem('curhat_kulkas_history')) || [];
    } catch(e) {
      history = [];
    }

    history.push({
      sender: sender,
      text: text,
      mood: mood,
      timestamp: Date.now()
    });

    localStorage.setItem('curhat_kulkas_history', JSON.stringify(history));
  },

  // Load chat dari LocalStorage saat inisialisasi
  loadChatHistory: function() {
    let history = [];
    try {
      history = JSON.parse(localStorage.getItem('curhat_kulkas_history')) || [];
    } catch(e) {
      history = [];
    }

    const chatContainer = this.dom.chatContainer;
    chatContainer.innerHTML = ''; // Bersihkan loader jika ada

    if (history.length === 0) {
      // Sambutan default kulkas jika kosong
      this.renderKulkasBubbleDirect("Halo manusia gabut. Ada keluh kesah apa hari ini? Sok curhat sini, tapi jangan minta makanan di dalam gw ya, ga ada isinya.", "Dingin (Awal)");
      return;
    }

    history.forEach(item => {
      if (item.sender === 'user') {
        const wrapper = document.createElement('div');
        wrapper.className = 'flex justify-end mb-4';
        const bubble = document.createElement('div');
        bubble.className = 'chat-bubble bg-amber-600 text-slate-100 px-4 py-3 rounded-2xl rounded-tr-none border border-amber-700 shadow-md max-w-[85%] text-sm leading-relaxed';
        bubble.innerText = item.text;
        wrapper.appendChild(bubble);
        chatContainer.appendChild(wrapper);
      } else {
        const wrapper = document.createElement('div');
        wrapper.className = 'flex justify-start mb-4';
        const bubble = document.createElement('div');
        bubble.className = 'chat-bubble bg-slate-800 text-slate-100 px-4 py-3 rounded-2xl rounded-tl-none border border-slate-700 shadow-md max-w-[85%]';
        
        const moodBadge = document.createElement('span');
        moodBadge.className = 'text-[9px] text-blue-400 font-mono block mb-1 uppercase tracking-wider';
        moodBadge.innerText = `[ Kulkas: ${item.mood || 'SARKAS'} ]`;
        
        const textNode = document.createElement('span');
        textNode.className = 'leading-relaxed text-sm';
        textNode.innerText = item.text;
        
        bubble.appendChild(moodBadge);
        bubble.appendChild(textNode);
        wrapper.appendChild(bubble);
        chatContainer.appendChild(wrapper);
      }
    });

    this.scrollToBottom();
  },

  // Helper render bubble kulkas secara langsung tanpa animasi ngetik (untuk loading sejarah)
  renderKulkasBubbleDirect: function(text, mood) {
    const chatContainer = this.dom.chatContainer;
    const wrapper = document.createElement('div');
    wrapper.className = 'flex justify-start mb-4';
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble bg-slate-800 text-slate-100 px-4 py-3 rounded-2xl rounded-tl-none border border-slate-700 shadow-md max-w-[85%]';
    
    const moodBadge = document.createElement('span');
    moodBadge.className = 'text-[9px] text-blue-400 font-mono block mb-1 uppercase tracking-wider';
    moodBadge.innerText = `[ Kulkas: ${mood || 'DINGIN'} ]`;
    
    const textNode = document.createElement('span');
    textNode.className = 'leading-relaxed text-sm';
    textNode.innerText = text;
    
    bubble.appendChild(moodBadge);
    bubble.appendChild(textNode);
    wrapper.appendChild(bubble);
    chatContainer.appendChild(wrapper);
    this.scrollToBottom();
  },

  // Reset Chat History (Ganti Kulkas)
  resetExperience: function() {
    localStorage.removeItem('curhat_kulkas_history');
    const chatContainer = this.dom.chatContainer;
    chatContainer.innerHTML = '';
    
    // Suara klik
    this.playClickSound();
    
    // Kembali ke default mood visual
    this.setFridgeEmotion("Sarkastik (Default)");
    
    // Beri salam pembuka baru
    setTimeout(() => {
      this.typeMessage("Duh... kulkas diganti baru ya? Oke, sekarang gw kulkas versi upgrade. Tapi tetep aja isinya cuma es batu abadi. Mau curhat apa lu sekarang?");
    }, 400);
  }
};

// Export agar bisa diakses oleh module lain
if (typeof module !== 'undefined' && module.exports) {
  module.exports = KulkasUI;
} else {
  window.KulkasUI = KulkasUI;
}
