/**
 * Kulkas Personality & Response Logic
 * Mengelola respons sarkastik, receh, dan bernuansa anak kosan.
 * Dilengkapi dengan puluhan variasi jawaban agar interaksi terasa dinamis.
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
    "Tadi niatnya mau belajar buat UAS, tapi pas buka laptop malah nonton dokumentari cara pembuatan peniti selama 3 jam.",
    "Gw beli gantungan baju 12 biji, sekarang bajunya malah numpuk di atas kasur sedangkan gantungannya masih rapi di bungkus plastik.",
    "Tadi pas mau ngambil air minum dingin di dispenser kosan, gw malah gak sengaja naruh gelasnya kebalik. Basah semua.",
    "Tiap malam gw overthinking mikirin kenapa bumi itu bulat tapi mie instan bentuknya keriting."
  ],

  // Respons berdasarkan kata kunci (Kelompok Sinonim)
  KEYWORDS: [
    {
      keys: ["cinta", "mantan", "pacar", "gebetan", "jomblo", "diputusin", "sayang", "nikah", "jodoh", "ldr", "selingkuh", "tinder", "pdkt", "naksir"],
      responses: [
        "Cinta mulu dipikirin. Noh, pacar aja ga punya. Mending lu pikirin gimana cara bayar kosan bulan depan.",
        "Lu diputusin? Wajar sih. Muka lu aja mirip rendang sisa lebaran tahun lalu yang membeku di freezer gw.",
        "Mantan lu udah bahagia sama yang baru, sedangkan lu malah curhat sama kulkas pintu satu di kamar kos sempit. Sadar bro!",
        "Gebetan nge-read doang? Mungkin dia lagi sibuk chat sama 4 orang lainnya yang lebih spek dewa dari lu. Kasihan wkwk.",
        "Cinta itu butuh modal, minimal isi dompet lu ga lemes. Kalau dompet tipis, mending pacaran sama kipas angin biar adem.",
        "LDR-an? Halah, itu mah cuma pacaran sama HP. Ujung-ujungnya lu diselingkuhin pas dia bilang mau 'tidur dulu' jam 8 malam.",
        "Gebetan lu ngilang? Tenang, dia ga hilang kok, cuma lagi asyik dibonceng pake motor PCX baru sama cowok lain. Sadar diri lah, Supra lu berisik.",
        "Nikah muda? Duit beli beras aja masih minta transferan emak. Mending lu nikahin dulu tuh tugas kuliah yang terlantar.",
        "Selingkuh? Wah, lu emang selevel sama sayur bayam layu yang gw lupain di pojokan rak bawah selama 2 minggu. Busuk!",
        "Jomblo dari lahir itu bukan cobaan, bro. Itu adalah takdir alam semesta yang berusaha menyelamatkan orang lain dari lu."
      ],
      mood: "SARCAS"
    },
    {
      keys: ["duit", "miskin", "uang", "dompet", "kerja", "gaji", "token", "kosan", "bayar", "tagihan", "bokek", "hutang", "pinjol", "shopee", "tokped", "beli", "belanja", "rekening", "saldo"],
      responses: [
        "Uang memang bukan segalanya, tapi kalau ga ada uang, lu cuma bisa makan es batu dari freezer gw sambil nangis.",
        "Bokek? Makanya jangan dikit-dikit checkout shopee. Kerjaan lu scroll e-commerce mulu tapi saldo e-wallet sisa goceng.",
        "Token listrik lu udah bunyi tet-tet-tet kan? Buruan isi! Ntar gw mati, es batu gw mencair, kamar lu kebanjiran, baru tahu rasa.",
        "Duit habis tengah bulan? Solusinya gampang: tidur. Hemat energi, hemat kalori, ga usah sok-sokan pengen nongkrong di senopati.",
        "Kerja keras bagai kuda, tapi gaji langsung lewat kayak angin numpang lewat. Selamat menikmati siklus kehidupan sirkus lu!",
        "Punya utang? Buruan bayar, jangan malah pura-pura lupa pas ditagih tapi malemnya instastory lagi ngafe estetik.",
        "Gaji UMR tapi gaya hidup setara CEO startup. Siap-siap aja ntar malam makan mi instan dicampur angin sisa kipas kosan.",
        "Pinjol? Astaga... lu udah di tahap itu? Mending lu gadai aja dulu ginjal lu, daripada nomor kontak emak lu diteror debt collector.",
        "Kerja mulu tapi tabungan ga nambah. Coba cek, jangan-jangan lu bukan kerja, tapi cuma jadi donatur tetap cafe aesthetic.",
        "Dompet lu tipis banget, udah kayak lembaran tisu basah yang udah kering dijemur. Menyedihkan."
      ],
      mood: "NGEGAS"
    },
    {
      keys: ["skripsi", "kuliah", "tugas", "dosen", "uas", "uts", "sekolah", "lulus", "belajar", "pr", "magang", "laporan", "sidang", "sempro", "ipk", "dospem", "revisi"],
      responses: [
        "Skripsi baru bab 1 coret-coret malah curhat sama kulkas. Emang gw bisa bantu lu ACC dosen pembimbing?",
        "Dosen pembimbing killer? Masih mending daripada gw, tiap hari harus nampung air keran botol sirup bekas lu.",
        "Udah semester berapa lu? Kulkas tetangga aja udah ganti yang side-by-side, lah lu skripsi ga kelar-kelar.",
        "Revisi lagi revisi lagi. Coba lu masuk freezer gw bentar, biar otak lu yang panas itu agak bekuan dikit.",
        "IPK kecil ga usah sedih, yang penting... eh tapi emang sedih sih. Belajar makanya, jangan mabar mulu!",
        "Tugas numpuk malah ditontonin. Emang tugas lu bakal ngerjain dirinya sendiri kayak robot? Buruan buka laptop!",
        "Semester tua tapi kelakuan masih kayak maba yang kebingungan nyari gedung fakultas. Kapan lulusnya bro?",
        "Sidang skripsi ngeri? Lebih ngeri lagi masa depan lu kalau cuma bisa bengong depan pintu kulkas jam 3 pagi.",
        "Lulus cepat itu pilihan, tapi kalau lu mager terus kayak gini, lulus itu cuma sebatas mitos urban di kosan ini.",
        "Belajar sejam, main ML-nya 6 jam. Terus pas dapet nilai E malah nyalahin dosennya pelit. Logika lu di mana?"
      ],
      mood: "BIJAK"
    },
    {
      keys: ["lapar", "makan", "diet", "kenyang", "indomie", "mie", "es batu", "serakah", "isi", "pizza", "bakso", "ayam", "masak", "minum", "haus", "kopi", "teh", "ngemil", "es krim"],
      responses: [
        "Makan mulu. Noh liat di dalam gw cuma ada aer putih dingin, saos sachet sisa pizza hut 3 bulan lalu, ama telur sebutir.",
        "Indomie double pake telur setengah matang pas ujan memang enak, tapi inget ya bro, usus lu udah mulai melilit minta tolong.",
        "Diet? Halah, omong kosong. Baru kemarin lu masukin martabak manis ke perut jam 11 malam. Gw saksinya ya!",
        "Lapar tengah malam? Nih makan es batu gw. Nol kalori, dingin, menyegarkan, dan yang paling penting: GRATIS.",
        "Jangan rakus. Makanan di kulkas kosan jangan ditilep semua. Kasihan temen kos lu yang naruh susu UTD dari senin kemarin.",
        "Minum kopi mulu biar fokus begadang, padahal lu begadang cuma buat scroll reels instagram sampai matanya berair. Capek gw liatnya.",
        "Mie instan adalah penolong tanggal tua, tapi kalau dimakan tiap hari dari tanggal 15, usus lu bakal berubah jadi kabel fiber optik.",
        "Pengen makan enak tapi ga mau masak, maunya gofood terus. Saldo rekening lu nangis darah tuh liat kelakuan lu.",
        "Haus? Di dalam gw ada botol sirup Marjan isi air keran dingin. Segar, higienis (mungkin), dan sangat ekonomis.",
        "Di freezer ada es krim, tapi pas lu buka isinya bumbu dapur emak lu kan? Wkwkwk kena prank kulkas sendiri!"
      ],
      mood: "SARCAS"
    },
    {
      keys: ["capek", "lelah", "sedih", "nangis", "pusing", "stres", "depresi", "sakit", "galau", "kecewa", "kesel", "marah", "nangis", "bosen", "jenuh", "kesepian"],
      responses: [
        "Sedih kenapa lagi? Sini curhat, tapi bayar ya. Listrik gw mahal buat mendinginin curhatan lu yang ga ada habisnya.",
        "Nangis di pojokan kamar kos emang paling estetik, tapi ga bakal nambah saldo rekening lu. Mending cuci piring gih.",
        "Dunia ini memang keras, tapi kulkas ini lebih dingin. Masuk gih ke freezer biar lu mati rasa sekalian wkwk.",
        "Semua orang punya masalah, bro. Bedanya, masalah lu itu kebanyakan dibikin-bikin sendiri karena mager.",
        "Jangan sedih, hidup ini ibarat roda berputar. Kadang di bawah, kadang di bawah banget sampai kelindes. Tetap semangat!",
        "Lelah secara mental? Wajar, lu terlalu banyak overthinking tapi minim action. Pikirin mulu, gerak kagak.",
        "Stres gara-gara tekanan hidup? Coba deh matiin HP lu, rebahan, trus dengerin dengungan kompresor gw. Sangat menenangkan, kan?",
        "Nangis ga bakal nyelesaiin masalah. Tapi kalau mau nangis, air matanya tolong ditampung ya, lumayan buat ngisi botol sirup gw.",
        "Sakit hati? Sini gw dinginin pake es batu. Tapi hati-hati, bekuan es batu gw ga bisa nyembuhin trauma masa lalu lu.",
        "Galau mulu. Umur udah kepala dua tapi mentalitas masih kayak es lilin kena jemur: gampang meleleh."
      ],
      mood: "BIJAK"
    },
    {
      keys: ["game", "ml", "pubg", "gaming", "mabar", "genshin", "valorant", "ranked", "lose streak", "gameplay", "gacha", "ff", "nintendo", "playstation"],
      responses: [
        "Mabar terus sampai subuh. Pas dapet lose streak malah banting bantal kosan yang udah apek. Kapan dewasanya?",
        "Gacha ampas? Syukurin! Uang bulanan malah dibakar buat nyari waifu 2D gepeng virtual. Makan tuh gambar pixel!",
        "Rank lu apa sekarang? Masih Epic abadi? Hahaha, skill lu ternyata lebih rendah dibanding rak sayur terbawah gw.",
        "Katanya mau push rank sebentar, tau-tau ayam tetangga udah berkokok. Mata lu udah kayak mata ikan mas koki, bengkak.",
        "Nge-game mulu biar dibilang pro player, padahal tiap turnamen RT aja gugur di babak kualifikasi pertama.",
        "HP panas dipake ngegame, taruh di atas freezer gw gih biar adem. Tapi inget, otak lu juga perlu didinginin.",
        "Mending lu push skripsi daripada push rank. Di akhirat nanti lu ga bakal ditanya 'Rank ML lu apa tong?'",
        "Main Valorant tujuannya biar seneng, kok malah teriak-teriak toxic tengah malem? Kasihan tetangga sebelah lagi tidur.",
        "Genshin Impact udah update GB-an gede, memori HP penuh, tapi isi kepala lu masih kosong melompong.",
        "Kalah game langsung menyalahkan koneksi internet. Padahal emang mekanik jari lu aja yang kaku kayak es batu."
      ],
      mood: "NGEGAS"
    },
    {
      keys: ["hujan", "gerimis", "mendung", "dingin", "panas", "cuaca", "petir", "badai", "anget", "gerah", "keringat"],
      responses: [
        "Hujan gini paling enak galauin mantan, kan? Sambil dengerin lagu indie trus minum kopi sachet anget. Halah, klise!",
        "Gerimis di luar bikin mager, padahal tanpa gerimis pun lu emang udah mager dari lahir.",
        "Cuaca panas gini emang enaknya numpang ngadem depan pintu gw yang terbuka. Tapi bayar ya, AC aja bayar apalagi kulkas.",
        "Mendung di luar jangan bikin masa depan lu ikut mendung. Buruan angkat jemuran celana dalam lu, entar ilang dicolong orang.",
        "Petir menyambar-nyambar di luar, buruan cabut colokan gw! Kalau gw konslet, lu ga bakal dapet es batu gratis lagi.",
        "Panas parah hari ini. Otak lu pasti udah mendidih kayak mie instan yang dimasak kelamaan. Sini deketin freezer gw.",
        "Hujan-hujan gini emang syahdu, tapi inget ya, atap kamar kos lu yang bocor belum lu tambal dari bulan lalu.",
        "Cuaca ekstrim gini jangan lupa jaga kesehatan. Kalau lu sakit, ga ada yang curhat ke gw lagi. Ntar gw kesepian wkwk.",
        "Mendung di luar, tapi hati lu kok hujan badai terus? Lemah amat jadi manusia.",
        "Hujan bikin laper? Ya makan, jangan malah update status WhatsApp pake lagu sedih. Kulkas ga paham estetikamu."
      ],
      mood: "BIJAK"
    },
    {
      keys: ["setan", "hantu", "pocong", "kuntilanak", "takut", "horor", "angker", "indigo", "tuyul", "genderuwo", "seram", "gelap", "indigo"],
      responses: [
        "Takut setan? Padahal setan aslinya juga males liat muka lu pas bangun tidur jam 12 siang. Kusut banget.",
        "Di pojok kamar mandi kosan lu emang ada penunggunya, tapi mereka lebih takut sama bau kaos kaki lu yang ga dicuci sebulan.",
        "Horor itu bukan pas liat kuntilanak lewat, tapi pas lu buka dompet di tanggal 20 dan cuma nemu struk belanja indomaret.",
        "Indigo? Halah palingan lu cuma halusinasi gara-gara kebanyakan minum kopi sachet dingin pas perut kosong.",
        "Kamar kosan lu berasa angker? Coba deh bersihin tumpukan baju kotor di gantungan pintu. Itu sarang jin sebenernya.",
        "Malam-malam denger suara ketukan pintu kulkas? Tenang, itu cuma gw lagi kedinginan aja wkwkwk... atau bukan?",
        "Lu takut pocong? Pocong aja kalau ketemu lu bakal nanya: 'Bro, bagi duit dong buat bayar token, kasihan lu bokek terus.'",
        "Ada bayangan hitam di balik jendela? Mungkin itu bayangan masa depan lu yang suram kalau tetep mager.",
        "Setan kosan biasanya nongkrong di atas lemari pakaian. Coba tengok atas, siapa tahu dia lagi dadah-dadah ke lu.",
        "Nonton film horor malem-malem biar keliatan berani, ujung-ujungnya pas mau kencing harus nunggu subuh."
      ],
      mood: "SARCAS"
    },
    {
      keys: ["halo", "hai", "p", "woi", "permisi", "pagi", "siang", "malam", "oy", "hey", "test", "tes", "hello", "hi"],
      responses: [
        "Paan sih? Ketok-ketok pintu gw. Mau minta es batu ya lu?",
        "Halo juga manusia gabut. Tumben nyapa, biasanya langsung buka pintu nyari makanan gratisan.",
        "Woi. Curhat buruan, gw sibuk mendinginin air mineral botol sirup bekas lu nih.",
        "Yoo bro! Kenapa? Ada gosip apa di kosan hari ini?",
        "Permisi... Ada orangnya ga? Oh lu. Kirain setan penunggu kosan wkwk.",
        "Pagi-pagi udah nyapa kulkas. Emang ga punya temen manusia ya lu? Sedih banget hidupnya.",
        "Tesss tesss... Mic check. Kulkas aktif. Silakan masukkan curhatan bermutu Anda (kalau ada).",
        "Malam-malam gini ngetok pintu gw. Mau nyolong sosis temen kos lu ya? Ketahuan lu!",
        "Sapaan lu ga bakal menurunkan tarif dasar listrik kosan gw, langsung ke intinya aja bro.",
        "Oy! Masih hidup lu? Kirain udah membeku di dalam hati mantan wkwkwk."
      ],
      mood: "NGANTUK"
    }
  ],

  // Respons umum/fallback jika tidak ada kata kunci yang cocok (25 Variasi Jawaban)
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
    "Bro, dengerin gw. Hidup itu simpel: lu lapar ya makan, lu bokek ya kerja, lu ditolak ya sadar diri wkwk.",
    "Coba lu ketok kulkas sebelah, kali aja jawabannya lebih ramah dibanding gw yang udah mati rasa ini.",
    "Kenapa sih tiap kali sedih larinya ke gw? Kipas angin lu mana? Senter lu mana? Hargai mereka juga dong.",
    "Lu kalau bengong di depan gw kelamaan, tagihan listrik gw membengkak. Mending lu bengong depan cermin sambil merenungi nasib.",
    "Hari ini gw ngeliat cicak jatuh tepat di atas botol saos gw. Itu adalah tanda-tanda kalau lu bakal dapet sial hari ini wkwk.",
    "Curhatmu menarik sekali, mari kita bahas nanti setelah gw selesai mendinginin telur sebutir ini.",
    "Jangan sedih, es batu aja yang membeku bisa mencair. Apalagi hati lu yang udah beku gara-gara di-ghosting.",
    "Otak lu kayaknya perlu di-defrag deh. Banyak file corrupt kayaknya, isinya cuma mikirin hal-hal ga penting.",
    "Sebagai kulkas kosan, gw udah sering denger rahasia anak kos. Dan rahasia lu... adalah yang paling ngebosenin.",
    "Lu tahu ga kenapa kompresor gw bunyi kencang semalam? Itu karena gw lagi ngetawain keputusan hidup lu.",
    "Minimal mandi lah bro. Badan bau apek kayak cucian numpuk gitu malah curhat depan sensor pintu gw.",
    "Jangan terlalu banyak berharap sama dunia. Berharap itu cuma bikin kecewa. Kayak berharap nemu sosis di dalam gw padahal cuma ada cabe layu.",
    "Waduh... gw ga paham masalah gituan. Gw kan cuma lemari pendingin berlisensi SNI, bukan konselor berijazah psikologi.",
    "Mending lu beli boba gih, biar kadar gula darah lu naik dan bisa bikin lu senyum palsu lagi selama 2 jam.",
    "Jangan suka menunda pekerjaan. Noh, piring kotor bekas makan indomie kemarin sore masih setia nungguin lu di wastafel.",
    "Mending sekarang lu cuci kaki, sikat gigi, trus tidur. Jangan lupa berdoa biar besok pagi lu bangun-bangun udah jadi miliarder instan wkwk."
  ],

  // Fungsi untuk memetakan input user ke respons kulkas
  generateResponse: function(userMessage) {
    const msg = userMessage.toLowerCase().trim();
    
    // Default mood
    let chosenMood = this.MOODS.SARCAS;
    let chosenResponse = "";

    // 1. Cek kelompok kata kunci (Sinonim)
    let foundGroup = null;
    for (const group of this.KEYWORDS) {
      if (group.keys.some(key => msg.includes(key))) {
        foundGroup = group;
        break;
      }
    }

    if (foundGroup) {
      const responses = foundGroup.responses;
      chosenResponse = responses[Math.floor(Math.random() * responses.length)];
      
      // Tentukan mood berdasarkan kategori kelompok kata kunci
      if (foundGroup.mood === "NGEGAS") chosenMood = this.MOODS.NGEGAS;
      else if (foundGroup.mood === "BIJAK") chosenMood = this.MOODS.BIJAK;
      else if (foundGroup.mood === "NGANTUK") chosenMood = this.MOODS.NGANTUK;
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
