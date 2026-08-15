const feladat = document.getElementById("feladat");
const audioContext = new AudioContext();
const tema = document.getElementById("tema");
let index;
let hangkozIndex;
let megoldasHang;
let hangkozFeladat;
let kezdoHang;
let celIndex;
let harmasIndex;
let terc;
let kvint;
let harmashangzatNev;
let aktualisTema = tema.value;

tema.onchange = function() {
    aktualisTema = tema.value;
};


function hangLejatszas(frekvencia) {
    console.log("frekvencia=",frekvencia);
    console.log("tipus=",typeof frekvencia);

    const oszcillator = audioContext.createOscillator();

    oszcillator.type = "sine";
    oszcillator.frequency.value = frekvencia;

    oszcillator.connect(audioContext.destination);

    oszcillator.start();

    oszcillator.stop(audioContext.currentTime + 1);
};

function hangkozLejatszas(hang1,hang2) {

    console.log("hang1: ", hang1.frekvencia);
    console.log("hang2: ", hang2.frekvencia);

    const most = audioContext.currentTime;

    const osc1 = audioContext.createOscillator();
    const osc2 = audioContext.createOscillator();
    
    osc1.frequency.value = hang1.frekvencia;
    osc2.frequency.value = hang2.frekvencia;

    osc1.connect(audioContext.destination);
    osc2.connect(audioContext.destination);

    
    osc1.start(most);
    osc2.start(most);

    osc1.stop(most +1);
    osc2.stop(most +1);
};

function harmashangzatLejatszas(hang1,hang2,hang3) {
    const most = audioContext.currentTime;

    const osc1 = audioContext.createOscillator();
    const osc2 = audioContext.createOscillator();
    const osc3 = audioContext.createOscillator();

    osc1.frequency.value = hang1.frekvencia;
    osc2.frequency.value = hang2.frekvencia;
    osc3.frequency.value = hang3.frekvencia;

    osc1.start(most);
    osc2.start(most);
    osc3.start(most);
};

document.getElementById("ujFeladat").onclick = function(){
    ujFeladat();
};

function ujFeladat() {

    if (aktualisTema === "hangkoz") {
        ujHangkozFeladat();
    }

    if (aktualisTema === "harmashangzat") {
        ujHarmashangzatFeladat();
    }
    // body...
};

function ujHangkozFeladat() {

    hangkozIndex = Math.floor(Math.random() * hangkozok.length);

    index = Math.floor(
        Math.random() * (hangok.length - hangkozIndex)
    );

    kezdoHang = hangok[index];

    hangLejatszas(kezdoHang.frekvencia);

    celIndex = index + hangkozIndex;

    hangkozFeladat = hangkozok[hangkozIndex];

    megoldasHang = hangok[celIndex];

    feladat.innerHTML =
        "Feladat: " +
        hangkozFeladat.hangkozNev +
        " " +
        kezdoHang.abszolutNev +
        " hangról";
};

function ujHarmashangzatFeladat() {
    index = Math.floor(
        Math.random() * (hangok.length - 5));

    kezdoHang = hangok[index];
    harmasIndex = Math.floor(
        Math.random() * (harmashangzatok.length));
    harmashangzatNev = harmashangzatok[harmasIndex].minoseg;
    let elso = harmashangzatok[harmasIndex].szerkezet[0];
    terc = hangok[index+hangkozLepes(elso)];
    let masodik = harmashangzatok[harmasIndex].szerkezet[1];
    kvint = hangok[index+hangkozLepes(elso)+hangkozLepes(masodik)]
    console.log("Szerkezet: "+ masodik);
    console.log(harmasIndex);
    hangLejatszas(kezdoHang.frekvencia);

    feladat.innerHTML = 
        "Feladat: " +
        kezdoHang.abszolutNev +"-re "+ harmashangzatNev + " hármas";
        //hangLejatszas(60);
    };
        
document.getElementById("megoldas").onclick = function(){

    if (aktualisTema === "hangkoz") {
        feladat.innerHTML = 
            "Feladat: " + kezdoHang.abszolutNev + "-re " + hangkozFeladat.hangkozNev;
        hangLejatszas(megoldasHang.frekvencia);
    } 


    if (aktualisTema === "harmashangzat") {
        feladat.innerHTML =
            "Feladat: " + kezdoHang.abszolutNev +"-re "+ harmashangzatok[harmasIndex].minoseg;
        hangLejatszas(kezdoHang.frekvencia);
        setTimeout(() => {
            hangLejatszas(terc.frekvencia)},1000);
        setTimeout(() => {
            hangLejatszas(kvint.frekvencia)},2000);
    }

};

document.getElementById("segítség").onclick = function(){
    if (aktualisTema === "hangkoz") {
        feladat.innerHTML =
        "Segítség: " + hangkozFeladat.szolmizalva;
    }

    if (aktualisTema === "harmashangzat") {
        feladat.innerHTML = 
        "Segítség: " + harmas_epito(harmashangzatNev);
    }
};

document.getElementById("egyszerre").onclick = function(){
    if (aktualisTema === "hangkoz") {
        feladat.innerHTML =
        "Harmonia: " + hangkozFeladat.hangkozNev + " "+ kezdoHang.abszolutNev + " re";
        const zongora = new Audio("hangok/C4v11.ogg");
        zongora.play();
        hangkozLejatszas(kezdoHang,megoldasHang);
    }

    if (aktualisTema === "harmashangzat") {
        feladat.innerHTML = 
        "Segítség: " + harmas_epito(harmashangzatNev);
        //audiohangLejatszas(60);
        console.log("KKKK"+kezdoHang.midi);
        audioHarmashangzatLejatszas(kezdoHang.midi,terc.midi,kvint.midi);
    }
};

function hangkozLepes(nev){
    const hangkoz = hangkozok.find(
        h => h.hangkozNev === nev
    );
    return hangkoz.lepes;
};
function harmas_epito(nev) {
    if(nev === "Dúr") {
        return szolmizacio[0].szolmizacio + " - " + szolmizacio[2].szolmizacio + " - " + szolmizacio[4].szolmizacio;
    }
    if(nev === "Moll") {
        return szolmizacio[5].szolmizacio + " - " + szolmizacio[7].szolmizacio + " - " + szolmizacio[9].szolmizacio;
    }
    if(nev === "Szűkített") {
        return szolmizacio[6].szolmizacio + " - " + szolmizacio[8].szolmizacio + " - " + szolmizacio[10].szolmizacio;
    }
    if(nev === "Bővített") {
        return szolmizacio[0].szolmizacio + " - " + szolmizacio[2].szolmizacio + " - " + szolmizacio[4].szolmizacio;
    }
};


function legkozelebbiMinta(midi) {

    let minta = hangMintak[0];

    for (let i = 1; i < hangMintak.length; i++) {

        if(
            Math.abs(hangMintak[i].midi -midi) <
            Math.abs(minta.midi -midi)
            ) { minta = hangMintak[i]; }
    }
    
    return minta;
};

async function audiohangLejatszas(midi) {
    const minta = legkozelebbiMinta(midi);

    console.log("MIDI:", midi);
    console.log("Minta:", minta);

    const fajl = minta.fajl;

    console.log("Betöltendő fájl: ", fajl);    

    const response = await fetch(minta.fajl);

    if(!response.ok){
        throw new Error(
            `Nem található a hangminta: ${minta.fajl}`
        );
    }

    const arrayBuffer = await response.arrayBuffer();

    const audioBuffer =
        await audioContext.decodeAudioData(arrayBuffer);

    const source = audioContext.createBufferSource();

    source.buffer = audioBuffer;

    source.playbackRate.value = 
        Math.pow(2,(midi - minta.midi)/12);

    source.connect(audioContext.destination);

    source.start();

    source.stop(audioContext.currentTime + 1);
};

async function audioHangkozLejatszas(midi1,midi2) {
    await Promise.all([
        audiohangLejatszas(midi1),
        audiohangLejatszas(midi2)
    ]);
};

async function audioHarmashangzatLejatszas(midi1, midi2,midi3) {
    await Promise.all([
        audiohangLejatszas(midi1),
        audiohangLejatszas(midi2),
        audiohangLejatszas(midi3)
    ]);
};

