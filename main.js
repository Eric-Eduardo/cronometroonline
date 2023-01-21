
var minutos = document.getElementById("minutos");
var segundos = document.getElementById("segundos");
var milissegundos = document.getElementById("milissegundos");
var botaoAcionar = document.getElementById("btn-acionar");
var botaoReiniciar = document.getElementById("btn-reiniciar");
var contMinutos = 0;
var contSegundos = 0;
var contMilissegundos = 0;
var id;
var dataInicial = 0;
var dataFinal = 0;
var dataAuxiliar = 0; // Utilizado quando o tempo é pausado
var contando = 0; //0: o cronômetro está zerado, 1: o cronômetro foi ativado
var cronometroPausado = 1; //0: o cronômetro está no estado "habilitado", 1: o cronômetro está no estado "desabilitado"



// const getTempo = () => localStorage.getItem("tempo@cronometroonline") || 0;
// const setTempo = (tempo) => localStorage.setItem("tempo@cronometroonline", tempo);

// console.log(getTempo());
// localStorage.setItem("tempo@cronometroonline", Date.now());
botaoAcionar.addEventListener("click", acionar);
botaoReiniciar.addEventListener("click", reiniciarContagem);

function contagem() {
    contMinutos = Math.floor((Date.now() - dataInicial)/60000);
    contSegundos = Math.floor((Date.now() - dataInicial)/1000)%60;
    contMilissegundos = Math.floor(((Date.now()-dataInicial)%1000)/10);
    minutos.innerHTML = `0${contMinutos}`.slice(-2);
    segundos.innerHTML = `0${contSegundos}`.slice(-2);
    milissegundos.innerHTML = `0${contMilissegundos}`.slice(-2);

}

function acionar() {

    if (cronometroPausado==1) {
        botaoAcionar.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-player-pause" width="50" height="50" viewBox="0 0 24 24" stroke-width="0.5" stroke="#ffffff" fill="#ffffff" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <rect x="6" y="5" width="4" height="14" rx="1" />
                                    <rect x="14" y="5" width="4" height="14" rx="1" />
                                </svg>`;

        botaoAcionar.classList.add("habilitado");
        botaoAcionar.classList.remove("desabilitado");
        iniciarContagem();
    } else {
        botaoAcionar.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-player-play" width="50" height="50" viewBox="0 0 24 24" stroke-width="0.5" stroke="#ffffff" fill="#ffffff" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M7 4v16l13 -8z" />
                                </svg>`;

        botaoAcionar.classList.remove("habilitado");
        botaoAcionar.classList.add("desabilitado");
        pararContagem();
    }
}


function iniciarContagem() {
    clearInterval(id);
    if (contando==1) {
        dataAuxiliar = Date.now();
        dataInicial = dataInicial+(dataAuxiliar-dataFinal);
    } else {
        dataInicial = Date.now();
        contando = 1;
    }

    cronometroPausado = 0;
    id = setInterval(contagem, 10);
}

function pararContagem() {
    dataFinal = Date.now();
    cronometroPausado = 1;
    clearInterval(id);
}

function reiniciarContagem() {
    dataFinal = Date.now();
    cronometroPausado = 1;
    clearInterval(id);
    contando = 0;
    minutos.innerHTML = "00";
    segundos.innerHTML = "00";
    milissegundos.innerHTML = "00";
}

window.addEventListener("keypress", (evento) => {
    if (evento.key == " ") acionar();
});
window.addEventListener("keypress", (evento) => {
    if (evento.key == "r") reiniciarContagem();
});

