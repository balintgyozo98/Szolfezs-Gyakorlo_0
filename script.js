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
}
