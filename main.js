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
    posicaoVertical += direcaoVertical * velocidadeNave;
    if(posicaoHorizontal < 0) {
        posicaoHorizontal = 0;
    } else if (posicaoHorizontal + larguraNave > larguraCenario) {
        posicaoHorizontal = larguraCenario - larguraNave;
    }
    if (posicaoVertical < 0) {
        posicaoVertical = 0;
    } else if (posicaoVertical + alturaNave > alturaCenario) {
        posicaoVertical = alturaCenario - alturaNave;
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
    if (tecla.key === " ") {
        estaAtirando = false;
    }
})

const criaTiros = (posicaoLeftTiro, posicaoTopTiro) => {
    const tiro = document.createElement("div");
    tiro.className = "tiro";
    tiro.style.position = "absolute";
    tiro.style.width = "10px";
    tiro.style.height = "10px";
    tiro.style.backgroundColor = "red";
    tiro.style.left = posicaoLeftTiro + "px";
    tiro.style.left = posicaoTopTiro + "px";
    cenario.appendChild(tiro);
    audioTiros();
}

const audioTiros = () => {
    const audioDoTiro = document.createElement("audio");
    audioDoTiro.className = "audioTiro";
    audioDoTiro.setAttribute("tiro.mp3");
    audioDoTiro.play();
    cenario.appendChild(audioDoTiro);
    audioDoTiro.addEventListener("ended", () => {
        audioDoTiro.remove();
    })
}

const moveTiros = () => {
    const tiros = document.querySelectorAll(".tiro");
    for (let i = 0; i < tiros.length; i++) {
        if (tiros[i]) {
            let posicaoTopTiro = tiros[i].offsetTop;
            posicaoTopTiro -= velocidadeTiro;
            tiros[i].style.top = posicaoTopTiro + "px";
            if (posicaoTopTiro < -10) {
                tiros[i].remove();
            }
        }
    }
}

const naveInimigas = () => {
    const inimigo = document.createElement("div");
    inimigo.className = "inimigo";
    inimigo.style.position = "absolute";
    inimigo.setAttribute("data-vida", 5);
    inimigo.style.width = "100px";
    inimigo.style.height = "100px";
    inimigo.style.backgroundImage = "enemy.gif";
    inimigo.style.backgroundPosition = "center";
    inimigo.style.bakgroundRepeat = "no-repeat";
    inimigo.style.backgroundSize = "contain";
    inimigo.style.left = Math.floor(Math.random() * (larguraCenario - larguraNave)) + "px";
    inimigo.style.top = "-100px";
    cenario.appendChild(inimigo);
}

const moveNaveInimigas = () => {
    const naveInimigas = document.querySelectorAll(".inimigo");
    for (let i = 0; i < naveInimigas.length; i++) {
        if (naveInimigas[i]) {
            let posicaoTopNaveInimiga = naveInimigas[i].offsetTop;
            let posicaoLeftNaveInimiga = naveInimigas[i].offsetLeft;
            posicaoTopNaveInimiga += velocidadeNaveInimigas;
            naveInimigas[i].style.top = posicaoTopNaveInimiga = posicaoTopNaveInimiga + "px";
            if (posicaoTopNaveInimiga > alturaCenario) {
                vaidaAtual -= 5;
                vida.textContent = `Vida: ${vidaAtual}`;
                explosaoNaveInimigaDestruida(posicaoLeftNaveInimiga);
                if (vidaAtual <= 0) {
                    gameOver();
                }
                naveInimigas[i].remove();
            }
        }
    }
}