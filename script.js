const kromatikusHangok = [
    "C",
    "Cisz",
    "D",
    "Disz",
    "E",
    "F",
    "Fisz",
    "G",
   "Gisz",
    "A",
    "B",
    "H"
];
/*const hangkozok = {
    "prím": 0,
    "kis szekund": 1,
    "nagy szekund": 2,
    "kis terc": 3,
    "nagy terc": 4,
    "tiszta kvart": 5,
    "tritónusz": 6,
    "tiszta kvint": 7,
    "kis szext": 8,
    "nagy szext": 9,
    "kis szeptim": 10,
    "nagy szeptim": 11,
    "oktáv": 12
}; */
const feladat = document.getElementById("feladat");


/*const hangok = {
    C3: 130.81,
    Cs3: 138.59,
    D3: 146.83,
    Esz3: 155.56,
    E3: 164.81,
    F3: 174.61,
    Fisz3: 185.00,
    G3: 196.00,
    Asz3: 207.65,
    A3: 220.00,
    B3: 233.08,
    H3: 246.94,

    C4: 261.63,
    Cs4: 277.18,
    D4: 293.66,
    Esz4: 311.13,
    E4: 329.63,
    F4: 349.23,
    Fisz4: 369.99,
    G4: 392.00,
    Asz4: 415.30,
    A4: 440.00,
    B4: 466.16,
    H4: 493.88,

    C5: 523.25,
    Cs5: 554.37,
    D5: 587.33,
    Esz5: 622.25,
    E5: 659.25,
    F5: 698.46,
    Fisz5: 739.99,
    G5: 783.99,
    Asz5: 830.61,
    A5: 880.00,
    B5: 932.33,
    H5: 987.77
};*/ 

/*const hangNevek = [
    /*"C3","Cs3","D3","Esz3","E3","F3",
    "Fisz3","G3","Asz3","A3","B3","H3",
    

    "C4","Cs4","D4","Esz4","E4","F4",
    "Fisz4","G4","Asz4","A4","B4","H4",

    "C5","Cs5","D5","Esz5","E5","F5",
    "Fisz5","G5","Asz5","A5","B5","H5"
];*/

/*function hangkozSzamitas(kezdoHang, hangkoz) {

    let kezdIndex = kromatikusHangok.indexOf(kezdoHang);

    let lepes = hangkozok[hangkoz];

    let celIndex = kezdIndex + lepes;

    // ha túllépjük az oktávot
    if (celIndex >= kromatikusHangok.length) {
        celIndex = celIndex - kromatikusHangok.length;
    }

    return kromatikusHangok[celIndex];
}*/

function hangLejatszas(frekvencia) {
    console.log("frekvencia=",frekvencia);
    console.log("tipus=",typeof frekvencia);

    const audioContext = new AudioContext();

    const oszcillator = audioContext.createOscillator();

    oszcillator.type = "sine";
    oszcillator.frequency.value = frekvencia;

    oszcillator.connect(audioContext.destination);

    oszcillator.start();

    oszcillator.stop(audioContext.currentTime + 1);
}
function javit(hangkozIndex) {
    hangkozIndex -=1;
    return hangkozIndex;
};




document.getElementById("ujFeladat").onclick = function(){

    hangkozIndex = Math.floor(Math.random() * hangkozok.length);
    index = Math.floor(Math.random() * (hangok.length-hangkozIndex)); //index = egy szám
    //alert("Hangnak az indexe: "+index);
    kezdoHang = hangok[index];       //a hangok lista egyik objektuma 
    hangLejatszas(kezdoHang.frekvencia);
    
    celIndex = index + hangkozIndex;
    hangkozFeladat = hangkozok[hangkozIndex];
    megoldasHang = hangok[celIndex];
    
    feladat.innerHTML =
        "Feladat: "+ hangkozFeladat.hangkozNev +" "+ kezdoHang.abszolutNev + " hangról";
    
};
let index;
let hangkozIndex;
let megoldasHang;
let hangkozFeladat;
let kezdoHang;
let celIndex;

document.getElementById("megoldas").onclick = function(){

    feladat.innerHTML =
        "Megoldás: " + kezdoHang.abszolutNev +"-re "+ hangkozFeladat.hangkozNev + " → " + megoldasHang.abszolutNev;


    hangLejatszas(megoldasHang.frekvencia);
};

document.getElementById("segítség").onclick = function(){

    feladat.innerHTML =
        "Segítség: " + hangkozFeladat.szolmizalva;
};
