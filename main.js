const botaoIniciar = document.getElementById("iniciar");
const cenario = document.getElementById("cenario");
const nave = document.getElementById("nave");
const vida = document.getElementById("vida");
const pontos = document.getElementById("pontos");
const audioJogo = new Audio("missaoespaco.mp3");

const larguraCenario = cenario.offsetWidth;
const alturaCenario = cenario.offsetHeight;

const larguraNave = nave.offsetWidth;
const alturaNave = nave.offsetHeight;

const velocidadeNave = 15;
const velocidadeTiro = 20;
const velocidadeNaveInimigas = 6;

let estaAtirando = false;

let tiroAtual = 0;

let vidaAtual = 100;
let pontosAtual = 0;

let checaMoveNaveInimigas;
let checaNaveInimigas;
let checaMoveTiros;
let checaMoveNave;
let checaColisao;
let checaTiros;

let posicaoHorizontal = larguraCenario / 2 - 50;
let posicaoVertical = alturaCenario - alturaNave;
let direcaoHorizontal = 0;
let direcaoVetical = 0;

const teclaPressionada = (tecla) => {
    if (tecla.key === "ArrowRight") {
        direcaoHorizontal = 1;
    } else if (tecla.key === "ArrowLeft") {
        direcaoHorizontal = -1;
    } else if (tecla.key === "ArrowDown") {
        direcaoVetical = 1;
    } else if (tecla.key === "ArrowUp") {
        direcaoVetical = -1;
    }
}

const teclaSolta = (tecla) => {
    if (tecla.key === "ArrowRight" || tecla.key === "ArrowLeft") {
        direcaoHorizontal = 0;
    } else if (tecla.key === "ArrowDOwn" || tecla.key === "ArrowUp") {
        direcaoVetical = 0;
    }
}

const moveNave = () => {
    posicaoHorizontal += direcaoHorizontal * velocidadeNave;
    posicaoVetical += direcaoVetical * velocidadeNave;

    if(posicaoHorizontal < 0) {
        posicaoHorizontal = 0;
    } else if (posicaoHorizontal + larguraNave > larguraCenario) {
        posicaoHorizontal = larguraCenario - larguraNave;
    }

    nave.style.left = posicaoHorizontal + "px";
    nave.style.top = posicaoVertical + "px";
}

const atirar = () => {
    const delayTiro = Date.now();
    const atrasoTiro = delayTiro - tiroAtual;

    if (estaAtirando && atrasoTiro >= 100) {
        tiroAtual = Date.now();
        criaTiros(posicaoHorizontal + 45, posicaoVertical - 10);
    }
}

document.addEventListener("keydown", (tecla) => {
    if(tecla.key === " ") {
        estaAtirando = true;
    }
});

document.addEventListener("keyup", (tecla) => {
    if (tecla.ley === " ") {
        estaAtirando = false;
    }
})