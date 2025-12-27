const frontPage = document.getElementById('front-page');
const loadingPage = document.getElementById('loading-page');
const mainPage = document.getElementById('main-page');
const flashbang = document.getElementById('flashbang');
const typingElement = document.getElementById('typing-text');
const audio = document.getElementById('hbd-audio');
const giftTrigger = document.getElementById('gift-trigger');

const message = "HEIII MUTIII, HARI INI HARI APA YAAA?? 🤔<br><br>YAPPP HARI INI HARI PALING SPESIAL BUAT MUTIII TERNYATA!!<br><br>Gimana kabar Muti hari ini?? Semoga Muti selalu sehat dan lagi seneng banget yaaa... Happy birthday ya Muti sayanggg 💗💗💗 Cieee udah resmi masuk kepala dua aja nih! Semoga di tahun ini kebaikan selalu datang ke Muti ya!<br><br>Jujur aku masih ga nyangka Muti, setelah beberapa tahun kita sempet asing, eh sekarang malah barengan lagi haha. Lucu deh kalau diinget-inget lagi gimana niatnya kita nyari satu sama lain lagi🤏<br><br>Oh iya Muti, maaf ya kalau websitenya agak telat... Jujur aku bener-bener usahain ini pas lagi diperjalanan dari Bogor ke Jakarta, bahkan tadi sampe ribet kontak-kontakan sama pihak hosting buat urusan VPS biar website ini bisa Muti buka tepat waktu. Maaf ya kalau masih ada yang kurang, yang penting Muti happy hari ini! I hope we can stay together for a long long time ya Muti! 🫶🥹";

let isTyping = false; 

function typeWriter(text, i) {
    if (i < text.length) {
        isTyping = true;
        let char = text.charAt(i);
        let currentDelay = 150; 

        if (char === char.toUpperCase() && char !== ' ' && !/[.,?!]/.test(char)) { currentDelay = 40; }
        else if (/[.?!]/.test(char)) { currentDelay = 800; }
        else if (char === ',') { currentDelay = 400; }

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

// LOGIKA TRANSISI FAILSAFE
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

// Modal Stars
const stars = document.querySelectorAll('.star');
stars.forEach(star => {
    star.addEventListener('click', () => {
        stars.forEach(s => s.classList.remove('active'));
        for(let j=0; j<star.dataset.value; j++) stars[j].classList.add('active');
    });
});

// Scene Final
document.getElementById('send-msg-btn').addEventListener('click', () => {
    document.getElementById('interaction-modal').classList.add('hidden');
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
});