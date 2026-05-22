/**
 * Kulkas Personality & Response Logic
 * Mengelola respons sarkastik, receh, dan bernuansa anak kosan.
 */

const KulkasPersonality = {
  // Daftar mood kulkas
  MOODS: {
    SARCAS: "Sarkastik (Default)",
    NGEGAS: "Ngegas/Judul",
    BIJAK: "Bijak ala Om Kos",
    NGANTUK: "Ngantuk/Mager"
  },

  // Database Curhat Random (Input otomatis dari user)
  RANDOM_CONFESSIONS: [
    "Duit tinggal ceban di dompet, tapi pengen makan steak Wagyu. Solusinya apa las?",
    "Token listrik kosan gw bunyi tet-tet-tet dari kemarin, tapi gw diemin aja biar jadi backsound estetik.",
    "Piring kotor di wastafel kosan udah numpuk seminggu, sekarang kayaknya jamurnya udah mulai bikin KTP sendiri.",
    "Kemarin gebetan gw cuma nge-read chat gw doang, padahal gw cuma ngirim stiker Patrick Star lagi kayang.",
    "Gw pengen kaya raya lewat jalur cepat tapi mager parah, ada info lowongan kerja jadi tuyul part-time ga?",
    "Nasi sisa kemarin di rice cooker warnanya mulai kuning kunyit, aman ga ya kalau gw eliminasi pake kecap?",
    "Indomie soto gw campur kecap manis, saos sambal, bubuk cabe, plus keju cheddar. Kenapa ginjal gw berdenyut ya?",
    "Mandi jam 2 pagi gara-gara kalah ranked Mobile Legends berturut-turut, trus di pojokan kamar mandi kayak ada yang ikutan nyanyi.",
    "Gw naksir sama anak kosan sebelah, tapi dia kalau keluar kamar selalu pake helm fullface. Cara pdkt-nya gimana?",
    "Tadi niatnya mau belajar buat UAS, tapi pas buka laptop malah nonton dokumentari cara pembuatan peniti selama 3 jam."
  ],

  // Respons berdasarkan kata kunci
  KEYWORDS: {
    cinta: {
      responses: [
        "Cinta mulu dipikirin. Noh, pacar aja ga punya. Mending lu pikirin gimana cara bayar kosan bulan depan.",
        "Lu diputusin? Wajar sih. Muka lu aja mirip rendang sisa lebaran tahun lalu yang membeku di freezer gw.",
        "Mantan lu udah bahagia sama yang baru, sedangkan lu malah curhat sama kulkas pintu satu di kamar kos sempit. Sadar bro!",
        "Gebetan nge-read doang? Mungkin dia lagi sibuk chat sama 4 orang lainnya yang lebih spek dewa dari lu. Kasihan wkwk.",
        "Cinta itu butuh modal, minimal isi dompet lu ga lemes. Kalau dompet tipis, mending pacaran sama kipas angin biar adem."
      ],
      mood: "SARCAS"
    },
    duit: {
      responses: [
        "Uang memang bukan segalanya, tapi kalau ga ada uang, lu cuma bisa makan es batu dari freezer gw sambil nangis.",
        "Bokek? Makanya jangan dikit-dikit checkout shopee. Kerjaan lu scroll e-commerce mulu tapi saldo e-wallet sisa goceng.",
        "Token listrik lu udah bunyi tet-tet-tet kan? Buruan isi! Ntar gw mati, es batu gw mencair, kamar lu kebanjiran, baru tahu rasa.",
        "Duit habis tengah bulan? Solusinya gampang: tidur. Hemat energi, hemat kalori, ga usah sok-sokan pengen nongkrong di senopati.",
        "Kerja keras bagai kuda, tapi gaji langsung lewat kayak angin numpang lewat. Selamat menikmati siklus kehidupan sirkus lu!"
      ],
      mood: "NGEGAS"
    },
    skripsi: {
      responses: [
        "Skripsi baru bab 1 coret-coret malah curhat sama kulkas. Emang gw bisa bantu lu ACC dosen pembimbing?",
        "Dosen pembimbing killer? Masih mending daripada gw, tiap hari harus nampung air keran botol sirup bekas lu.",
        "Udah semester berapa lu? Kulkas tetangga aja udah ganti yang side-by-side, lah lu skripsi ga kelar-kelar.",
        "Revisi lagi revisi lagi. Coba lu masuk freezer gw bentar, biar otak lu yang panas itu agak bekuan dikit.",
        "IPK kecil ga usah sedih, yang penting... eh tapi emang sedih sih. Belajar makanya, jangan mabar mulu!"
      ],
      mood: "BIJAK"
    },
    makan: {
      responses: [
        "Makan mulu. Noh liat di dalam gw cuma ada aer putih dingin, saos sachet sisa pizza hut 3 bulan lalu, ama telur sebutir.",
        "Indomie double pake telur setengah matang pas ujan memang enak, tapi inget ya bro, usus lu udah mulai melilit minta tolong.",
        "Diet? Halah, omong kosong. Baru kemarin lu masukin martabak manis ke perut jam 11 malam. Gw saksinya ya!",
        "Lapar tengah malam? Nih makan es batu gw. Nol kalori, dingin, menyegarkan, dan yang paling penting: GRATIS.",
        "Jangan rakus. Makanan di kulkas kosan jangan ditilep semua. Kasihan temen kos lu yang naruh susu UTD dari senin kemarin."
      ],
      mood: "SARCAS"
    },
    sedih: {
      responses: [
        "Sedih kenapa lagi? Sini curhat, tapi bayar ya. Listrik gw mahal buat mendinginin curhatan lu yang ga ada habisnya.",
        "Nangis di pojokan kamar kos emang paling estetik, tapi ga bakal nambah saldo rekening lu. Mending cuci piring gih.",
        "Dunia ini memang keras, tapi kulkas ini lebih dingin. Masuk gih ke freezer biar lu mati rasa sekalian wkwk.",
        "Semua orang punya masalah, bro. Bedanya, masalah lu itu kebanyakan dibikin-bikin sendiri karena mager.",
        "Jangan sedih, hidup ini ibarat roda berputar. Kadang di bawah, kadang di bawah banget sampai kelindes. Tetap semangat!"
      ],
      mood: "BIJAK"
    },
    halo: {
      responses: [
        "Paan sih? Ketok-ketok pintu gw. Mau minta es batu ya lu?",
        "Halo juga manusia gabut. Tumben nyapa, biasanya langsung buka pintu nyari makanan gratisan.",
        "Woi. Curhat buruan, gw sibuk mendinginin air mineral botol sirup bekas lu nih.",
        "Yoo bro! Kenapa? Ada gosip apa di kosan hari ini?",
        "Permisi... Ada orangnya ga? Oh lu. Kirain setan penunggu kosan wkwk."
      ],
      mood: "NGANTUK"
    }
  },

  // Respons umum/fallback jika tidak ada kata kunci yang cocok
  FALLBACK_RESPONSES: [
    "Lu nanya ke gw? Gw cuma kulkas pintu satu yang berisik kompresornya kalau malam. Tanya gugel sana!",
    "Anjir, curhatan lu berat amat. Sampai kompresor gw agak nge-lag nih mikirin jawaban yang pas.",
    "Wkwkwk kasihan banget lu. Tapi jujur, gw ga peduli sih. Gw cuma peduli token listrik lu diisi apa kagak.",
    "Sebagai kulkas senior yang udah ngeliat 5 generasi anak kosan pindah, gw cuma mau bilang: Lu kurang ibadah bro.",
    "Mending lu tidur gih. Udah jam segini masih aja ngobrol sama barang elektronik. Agak laen emang lu.",
    "Ntar dulu, gw lagi proses defrosting es batu. Curhatan lu gw taruh di antrean ya.",
    "Bicara sama kulkas ga bakal menyelesaikan masalah hidup lu, tapi minimal bisa bikin lu keliatan makin mengenaskan.",
    "Jangan curhat mulu, noh jemuran lu di luar kehujanan dari siang belum lu angkat kan? Pikun kok dipiara.",
    "Lu tahu ga? Di dalam freezer gw ada sisa nasi yang udah membatu. Kayaknya masa depannya lebih jelas daripada lu.",
    "Bro, dengerin gw. Hidup itu simpel: lu lapar ya makan, lu bokek ya kerja, lu ditolak ya sadar diri wkwk."
  ],

  // Fungsi untuk memetakan input user ke respons kulkas
  generateResponse: function(userMessage) {
    const msg = userMessage.toLowerCase().trim();
    
    // Default mood
    let chosenMood = this.MOODS.SARCAS;
    let chosenResponse = "";

    // 1. Cek kata kunci
    let foundKeyword = null;
    for (const key in this.KEYWORDS) {
      if (msg.includes(key)) {
        foundKeyword = key;
        break;
      }
    }

    if (foundKeyword) {
      const keywordData = this.KEYWORDS[foundKeyword];
      const responses = keywordData.responses;
      chosenResponse = responses[Math.floor(Math.random() * responses.length)];
      
      // Tentukan mood berdasarkan kategori kata kunci
      if (keywordData.mood === "NGEGAS") chosenMood = this.MOODS.NGEGAS;
      else if (keywordData.mood === "BIJAK") chosenMood = this.MOODS.BIJAK;
      else if (keywordData.mood === "NGANTUK") chosenMood = this.MOODS.NGANTUK;
    } else {
      // 2. Jika tidak ada kata kunci, gunakan fallback responses
      chosenResponse = this.FALLBACK_RESPONSES[Math.floor(Math.random() * this.FALLBACK_RESPONSES.length)];
      
      // Randomize mood untuk fallback
      const moodsKeys = Object.keys(this.MOODS);
      const randomMoodKey = moodsKeys[Math.floor(Math.random() * moodsKeys.length)];
      chosenMood = this.MOODS[randomMoodKey];
    }

    // 3. Modifikasi teks berdasarkan Mood saat ini
    if (chosenMood === this.MOODS.NGEGAS) {
      // Ngegas: uppercase sebagian atau tambahkan tanda seru / kata ngegas
      const gasWords = ["ANJIR! ", "HEH! ", "LU DENGER YA! ", "ASTAGA... "];
      chosenResponse = gasWords[Math.floor(Math.random() * gasWords.length)] + chosenResponse.toUpperCase();
    } else if (chosenMood === this.MOODS.NGANTUK) {
      // Ngantuk: lambat, banyak tanda baca jeda, zzz
      chosenResponse = "Hoaaamm... bentar... " + chosenResponse.replace(/ /g, "... ") + "... zzz.";
    } else if (chosenMood === this.MOODS.BIJAK) {
      // Bijak: tambahkan sapaan khas om-om
      const wiseWords = ["Dengar ya anak muda... ", "Dari kacamata kulkas tua... ", "Sabar bro, dengerin om kulkas... "];
      chosenResponse = wiseWords[Math.floor(Math.random() * wiseWords.length)] + chosenResponse;
    }

    return {
      text: chosenResponse,
      mood: chosenMood
    };
  },

  // Mendapatkan curhatan user acak untuk diinput
  getRandomConfession: function() {
    return this.RANDOM_CONFESSIONS[Math.floor(Math.random() * this.RANDOM_CONFESSIONS.length)];
  }
};

// Export agar bisa diakses oleh module lain
if (typeof module !== 'undefined' && module.exports) {
  module.exports = KulkasPersonality;
} else {
  window.KulkasPersonality = KulkasPersonality;
}
