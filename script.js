const frontPage = document.getElementById('front-page');
const loadingPage = document.getElementById('loading-page');
const mainPage = document.getElementById('main-page');
const flashbang = document.getElementById('flashbang');
const typingElement = document.getElementById('typing-text');
const audio = document.getElementById('hbd-audio');
const giftTrigger = document.getElementById('gift-trigger');

// DEKLARASI VARIABEL RATING (PENTING!)
let userRating = 0; 

const message = "HEIII MUTIII, HARI INI HARI APA YAAA?? 🤔<br><br>YAPPP HARI INI HARI PALING SPESIAL BUAT MUTIII TERNYATA!!<br><br>Gimana kabar Muti hari ini?? Semoga Muti selalu sehat dan lagi seneng banget yaaa... Happy birthday ya Muti sayanggg 💗💗💗 Cieee udah resmi masuk kepala dua aja nih! Semoga kuliahnya Muti lancar terus, panjang umur, sehat selalu, makin banyak rezekinya, dan makin sayang sama orang tua Muti yaaw. Jangan lupa Muti make a wish ya, pokoknya aku bantu amin-in semua doa Muti hari ini dan seterusnya, semoga tahun depan cuma hal-hal baik yang dateng ke Muti!<br><br>Muti harus jadi pribadi yang lebih happy lagi ya, sukses terus pokoknya! Soalnya aku tau makin dewasa tuh Muti pasti makin banyak pikiran, tapi aku yakin banget! Orang hebat kayak Muti mah bisa naklukin semuanyaaaaa!! Jangan lupa semangat ibadahnya sama yang rajin belajarnya ya Muti. Pokoknya Muti harus happy terus di sana, jangan sedih-sedih nanti aku ikutan sedih juga tauuu.<br><br>Jujur aku masih ga nyangka Muti, setelah beberapa tahun kita sempet asing, eh sekarang malah barengan lagi haha. Lucu deh kalau diinget-inget lagi gimana niatnya kita nyari satu sama lain lagi🤏<br><br>Oh iya Muti, maaf ya kalau websitenya agak telat... Jujur aku bener-bener usahain ini pas lagi diperjalanan dari Bogor ke Jakarta, bahkan tadi sampe ribet kontak-kontakan sama pihak hosting buat urusan VPS biar website ini bisa Muti buka tepat waktu. Maaf ya kalau masih ada yang kurang, yang penting Muti happy hari ini! I hope we can stay together for a long long time ya Muti! 🫶🥹";

let isTyping = false; 

function typeWriter(text, i) {
    if (i < text.length) {
        isTyping = true;
        let char = text.charAt(i);
        let currentDelay = 150; 

        if (char === char.toUpperCase() && char !== ' ' && !/[.,?!]/.test(char)) { currentDelay = 40; }
        else if (/[.?!]/.test(char)) { currentDelay = 80; }
        else if (char === ',') { currentDelay = 40; }

        if (text.substring(i).startsWith('<br>')) { typingElement.innerHTML += '<br>'; i += 3; }
        else { typingElement.innerHTML += char; }

        typingElement.innerHTML = typingElement.innerHTML.replace('<span class="cursor">|</span>', '') + '<span class="cursor">|</span>';
        setTimeout(() => typeWriter(text, i + 1), currentDelay);
    } else {
        isTyping = false;
        setTimeout(() => { 
            const modal = document.getElementById('interaction-modal');
            modal.classList.remove('hidden'); 
            setTimeout(() => modal.style.opacity = '1', 50);
        }, 3000);
    }
}

// TRANSISI SAAT KADO DIKLIK
giftTrigger.addEventListener('click', () => {
    if (audio.paused) { audio.play(); }
    flashbang.classList.add('flash-active');
    setTimeout(() => {
        frontPage.classList.add('hidden');
        loadingPage.classList.remove('hidden');
        loadingPage.style.opacity = '1';
        flashbang.classList.remove('flash-active');
        setTimeout(() => {
            loadingPage.style.opacity = '0';
            setTimeout(() => {
                loadingPage.classList.add('hidden');
                mainPage.classList.remove('hidden');
                mainPage.style.opacity = '1';
                confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
                if (!isTyping) typeWriter(message, 0); 
            }, 800);
        }, 3000); 
    }, 600);
});

// LOGIKA RATING BINTANG
const stars = document.querySelectorAll('.star');
stars.forEach(star => {
    star.addEventListener('click', () => {
        userRating = star.dataset.value; // ISI NILAI RATING DI SINI
        stars.forEach(s => s.classList.remove('active'));
        for(let j=0; j<userRating; j++) stars[j].classList.add('active');
    });
});

// KIRIM KE GMAIL
document.getElementById('send-msg-btn').addEventListener('click', () => {
    const feedback = document.getElementById('feeling-response').value;
    const sendBtn = document.getElementById('send-msg-btn');
    
    sendBtn.disabled = true;
    sendBtn.innerText = "Mengirim... 🕊️";

    const templateParams = {
        rating: userRating, 
        message: feedback
    };

    emailjs.send('service_m4gca77', 'template_s0nf06d', templateParams)
        .then(function(response) {
           console.log('SUCCESS!', response.status, response.text);
        }, function(error) {
           console.log('FAILED...', error);
        })
        .finally(() => {
            document.getElementById('interaction-modal').classList.add('hidden');
            setTimeout(() => {
                mainPage.style.opacity = '0';
                setTimeout(() => {
                    mainPage.classList.add('hidden');
                    const final = document.getElementById('final-scene');
                    final.classList.remove('hidden');
                    setTimeout(() => { 
                        final.style.opacity = '1'; 
                        setTimeout(() => { 
                            document.querySelector('.received-letter').classList.remove('hidden'); 
                            document.querySelector('.final-text').style.opacity = '1'; 
                        }, 1500);
                    }, 50);
                }, 800);
            }, 1000);
        });
});