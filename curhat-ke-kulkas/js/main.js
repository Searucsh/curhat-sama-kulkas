/**
 * Entry Point / Main Controller
 * Menghubungkan interaksi pengguna dengan logika kepribadian dan efek UI.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Bind elemen DOM ke KulkasUI
  KulkasUI.dom = {
    chatContainer: document.getElementById('chat-container'),
    chatForm: document.getElementById('chat-form'),
    chatInput: document.getElementById('chat-input'),
    btnSend: document.getElementById('btn-send'),
    btnRandom: document.getElementById('btn-random'),
    btnReset: document.getElementById('btn-reset'),
    btnToggleDoor: document.getElementById('btn-toggle-door-manual'),
    doorBtnText: document.getElementById('door-btn-text'),
    btnSoundHeader: document.getElementById('btn-sound-header'),
    soundIconHeader: document.getElementById('sound-icon-header'),
    soundStatusText: document.getElementById('sound-status-text'),
    ledTemp: document.getElementById('led-temp'),
    ledMood: document.getElementById('led-mood'),
    ledCompressor: document.getElementById('led-compressor'),
    kulkasWrapper: document.getElementById('interactive-kulkas')
  };

  // Referensi singkat DOM
  const dom = KulkasUI.dom;

  // 2. Aktifkan input setelah inisialisasi selesai
  dom.chatInput.removeAttribute('disabled');
  dom.btnSend.removeAttribute('disabled');
  dom.btnRandom.removeAttribute('disabled');
  dom.btnReset.removeAttribute('disabled');

  // Load chat dari localStorage
  KulkasUI.loadChatHistory();

  // 3. Event Listener: Submit Chat
  dom.chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const messageText = dom.chatInput.value.trim();
    if (!messageText) return;

    // Pastikan audio terinisialisasi pada klik pertama pengguna
    KulkasUI.initAudio();

    // Jalankan siklus audio resume jika dalam keadaan tertunda
    if (KulkasUI.audioCtx && KulkasUI.audioCtx.state === 'suspended') {
      KulkasUI.audioCtx.resume();
    }

    // Render bubble user & simpan
    KulkasUI.renderUserBubble(messageText);
    
    // Kosongkan input
    dom.chatInput.value = '';

    // Kunci tombol input saat kulkas membalas
    toggleChatLock(true);

    // Dapatkan respons kulkas berdasarkan teks
    const response = KulkasPersonality.generateResponse(messageText);
    
    // Set mood saat ini di UI
    KulkasUI.currentMood = response.mood;
    dom.ledMood.innerText = response.mood;
    
    // Update ekspresi wajah kulkas
    KulkasUI.setFridgeEmotion(response.mood);

    // Animasi mengetik respons kulkas
    KulkasUI.typeMessage(response.text, () => {
      // Callback ketika selesai mengetik: Lepas kunci input
      toggleChatLock(false);
      dom.chatInput.focus();
    });
  });

  // 4. Event Listener: Curhat Random (Otomatis Kirim)
  dom.btnRandom.addEventListener('click', () => {
    KulkasUI.initAudio();
    if (KulkasUI.audioCtx && KulkasUI.audioCtx.state === 'suspended') {
      KulkasUI.audioCtx.resume();
    }

    const randomMessage = KulkasPersonality.getRandomConfession();
    dom.chatInput.value = randomMessage;
    
    // Trigger submit form
    dom.chatForm.dispatchEvent(new Event('submit'));
  });

  // 5. Event Listener: Reset / Ganti Kulkas
  dom.btnReset.addEventListener('click', () => {
    KulkasUI.initAudio();
    if (KulkasUI.audioCtx && KulkasUI.audioCtx.state === 'suspended') {
      KulkasUI.audioCtx.resume();
    }

    if (confirm("Yakin mau ganti kulkas? Riwayat curhat lu yang mengharukan bakal hilang selamanya.")) {
      KulkasUI.resetExperience();
      dom.ledMood.innerText = "SARKAS (DEFAULT)";
    }
  });

  // 6. Event Listener: Buka/Tutup Pintu Kulkas (Tombol Manual)
  dom.btnToggleDoor.addEventListener('click', () => {
    KulkasUI.initAudio();
    if (KulkasUI.audioCtx && KulkasUI.audioCtx.state === 'suspended') {
      KulkasUI.audioCtx.resume();
    }
    
    KulkasUI.toggleDoor();
    updateDoorButtonVisual();
  });

  // Klik langsung pada body Kulkas untuk membuka/tutup pintu
  dom.kulkasWrapper.addEventListener('click', (e) => {
    // Abaikan jika mengklik stiker atau item makanan agar interaksi stiker/tooltip tetap jalan
    if (e.target.classList.contains('fridge-sticker') || e.target.classList.contains('food-item')) {
      return;
    }

    KulkasUI.initAudio();
    if (KulkasUI.audioCtx && KulkasUI.audioCtx.state === 'suspended') {
      KulkasUI.audioCtx.resume();
    }

    KulkasUI.toggleDoor();
    updateDoorButtonVisual();
  });

  // 7. Event Listener: Kontrol Suara (Mute/Unmute)
  dom.btnSoundHeader.addEventListener('click', () => {
    const isMuted = KulkasUI.toggleMute();
    
    if (isMuted) {
      dom.soundIconHeader.className = "fa-solid fa-volume-xmark";
      dom.soundStatusText.innerText = "MUTED (KLIK SINI)";
      dom.btnSoundHeader.classList.remove('bg-green-950/40', 'text-green-400', 'border-green-800/80');
      dom.btnSoundHeader.classList.add('text-amber-500', 'border-slate-800');
    } else {
      dom.soundIconHeader.className = "fa-solid fa-volume-high animate-bounce";
      dom.soundStatusText.innerText = "UNMUTED (HUMMING)";
      dom.btnSoundHeader.classList.remove('text-amber-500', 'border-slate-800');
      dom.btnSoundHeader.classList.add('bg-green-950/40', 'text-green-400', 'border-green-800/80');
      
      // Beri efek bunyi klik pintu sebagai konfirmasi suara nyala
      KulkasUI.playClickSound();
    }
  });

  // Helper: Lock / Unlock Chat Interface
  function toggleChatLock(lock) {
    if (lock) {
      dom.chatInput.setAttribute('disabled', 'true');
      dom.btnSend.setAttribute('disabled', 'true');
      dom.btnRandom.setAttribute('disabled', 'true');
      dom.btnReset.setAttribute('disabled', 'true');
    } else {
      dom.chatInput.removeAttribute('disabled');
      dom.btnSend.removeAttribute('disabled');
      dom.btnRandom.removeAttribute('disabled');
      dom.btnReset.removeAttribute('disabled');
    }
  }

  // Helper: Update Teks Tombol Buka Pintu
  function updateDoorButtonVisual() {
    const isOpen = dom.kulkasWrapper.classList.contains('door-open');
    if (isOpen) {
      dom.doorBtnText.innerText = "TUTUP PINTU KULKAS";
      dom.btnToggleDoor.classList.replace('bg-slate-800', 'bg-blue-900/50');
      dom.btnToggleDoor.classList.add('text-blue-300', 'border-blue-800');
    } else {
      dom.doorBtnText.innerText = "BUKA PINTU KULKAS";
      dom.btnToggleDoor.className = "mt-3 w-full py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-lg text-[11px] transition-all cursor-pointer border border-slate-700 flex items-center justify-center gap-1.5";
    }
  }

  // 8. Sistem LED Monitor Dinamis (Simulasi Sensor Suhu & Compressor Cycles)
  let currentTemp = -18.4;
  setInterval(() => {
    // Suhu berfluktuasi kecil +- 0.2 derajat
    const change = (Math.random() - 0.5) * 0.15;
    currentTemp = Math.min(-18.0, Math.max(-19.0, currentTemp + change));
    dom.ledTemp.innerText = `${currentTemp.toFixed(1)}°C`;
    
    // 5% kesempatan untuk simulasi defrosting singkat demi kelucuan
    if (Math.random() < 0.03) {
      dom.ledCompressor.innerHTML = `<i class="fa-solid fa-snowflake animate-spin text-blue-400"></i> DEFROST`;
      dom.ledCompressor.className = "text-blue-400 flex items-center gap-1";
      
      // Kurangi sedikit volume dengung kompresor
      if (KulkasUI.humGain) {
        KulkasUI.humGain.gain.setValueAtTime(0.015, KulkasUI.audioCtx.currentTime);
      }
    } else if (Math.random() < 0.05) {
      dom.ledCompressor.innerHTML = `<i class="fa-solid fa-circle-xmark text-red-500"></i> SIAGA`;
      dom.ledCompressor.className = "text-red-500 flex items-center gap-1";
      
      // Matikan dengung kompresor sementara
      if (KulkasUI.humGain) {
        KulkasUI.humGain.gain.setValueAtTime(0.001, KulkasUI.audioCtx.currentTime);
      }
    } else {
      dom.ledCompressor.innerHTML = `<i class="fa-solid fa-circle-nodes animate-pulse text-green-500"></i> AKTIF`;
      dom.ledCompressor.className = "text-green-500 flex items-center gap-1";
      
      // Kembalikan ke dengung normal
      if (KulkasUI.humGain) {
        KulkasUI.humGain.gain.setValueAtTime(0.04, KulkasUI.audioCtx.currentTime);
      }
    }
  }, 4000);

  // Buat stiker magnet bisa digeser-geser sedikit (drag and drop sederhana)
  setupDragStickers();
});

// Helper: Penata Magnet / Stiker agar bisa digeser lucu
function setupDragStickers() {
  const stickers = document.querySelectorAll('.fridge-sticker');
  
  stickers.forEach(sticker => {
    sticker.addEventListener('mousedown', (e) => {
      e.stopPropagation(); // Mencegah pintu kulkas tertutup ketika mengklik stiker
      
      const rect = sticker.getBoundingClientRect();
      const parentRect = sticker.parentElement.getBoundingClientRect();
      
      let shiftX = e.clientX - rect.left;
      let shiftY = e.clientY - rect.top;
      
      function moveAt(clientX, clientY) {
        let left = clientX - parentRect.left - shiftX;
        let top = clientY - parentRect.top - shiftY;
        
        // Batasi geseran stiker dalam area pintu kulkas
        left = Math.max(5, Math.min(parentRect.width - rect.width - 5, left));
        top = Math.max(5, Math.min(parentRect.height - rect.height - 5, top));
        
        sticker.style.left = left + 'px';
        sticker.style.top = top + 'px';
      }
      
      function onMouseMove(e) {
        moveAt(e.clientX, e.clientY);
      }
      
      document.addEventListener('mousemove', onMouseMove);
      
      document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', onMouseMove);
      }, { once: true });
    });
    
    // Untuk Mobile Touch
    sticker.addEventListener('touchstart', (e) => {
      e.stopPropagation();
      const touch = e.touches[0];
      const rect = sticker.getBoundingClientRect();
      const parentRect = sticker.parentElement.getBoundingClientRect();
      
      let shiftX = touch.clientX - rect.left;
      let shiftY = touch.clientY - rect.top;
      
      function moveAt(clientX, clientY) {
        let left = clientX - parentRect.left - shiftX;
        let top = clientY - parentRect.top - shiftY;
        
        left = Math.max(5, Math.min(parentRect.width - rect.width - 5, left));
        top = Math.max(5, Math.min(parentRect.height - rect.height - 5, top));
        
        sticker.style.left = left + 'px';
        sticker.style.top = top + 'px';
      }
      
      function onTouchMove(e) {
        const touchMove = e.touches[0];
        moveAt(touchMove.clientX, touchMove.clientY);
      }
      
      sticker.addEventListener('touchmove', onTouchMove);
      
      sticker.addEventListener('touchend', () => {
        sticker.removeEventListener('touchmove', onTouchMove);
      }, { once: true });
    });
  });
}
