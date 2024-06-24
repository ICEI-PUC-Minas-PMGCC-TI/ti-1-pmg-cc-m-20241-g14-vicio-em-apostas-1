let saldo = 1000;
const simbolos = [
    { simbolo: '⚽', valor: 1000 },
    { simbolo: '🎰', valor: 200 },
    { simbolo: '🍒', valor: 100 },
    { simbolo: '🏆', valor: 10 },
    { simbolo: '🎖️', valor: 5 },
    { simbolo: '🏅', valor: 3 },
    { simbolo: '🥇', valor: 2 },
    { simbolo: '🥈', valor: 1 }
];

const valorTotal = simbolos.reduce((acc, simbolo) => acc + simbolo.valor, 0);
const probabilidades = simbolos.map(simbolo => simbolo.valor / valorTotal);

const probabilidadesInvertidas = probabilidades.slice().reverse();

const probabilidadesAcumuladas = [];
let probabilidadeAcumulada = 0;
for (let probabilidade of probabilidadesInvertidas) {
    probabilidadeAcumulada += probabilidade;
    probabilidadesAcumuladas.push(probabilidadeAcumulada);
}

function girar() {
    const slots = document.querySelectorAll('.slot');
    const simbolosExibidos = [];
    for (let i = 0; i < 3; i++) {
        const numeroAleatorio = Math.random();
        let indiceSimbolo = 0;
        for (let j = 0; j < probabilidadesAcumuladas.length; j++) {
            if (numeroAleatorio <= probabilidadesAcumuladas[j]) {
                indiceSimbolo = j;
                break;
            }
        }
        simbolosExibidos.push(simbolos[indiceSimbolo]);
    }
    slots.forEach((slot, index) => {
        const rotacao = Math.floor(Math.random() * 360);
        slot.textContent = simbolosExibidos[index].simbolo;
        slot.style.transform = `rotateX(${rotacao}deg)`;
    });

    setTimeout(() => {
        slots.forEach(slot => {
            slot.style.transform = 'rotateX(0deg)';
        });
        verificarResultado(simbolosExibidos);
    }, 1500);
}

function verificarResultado(simbolosExibidos) {
    const simbolosUnicos = new Set(simbolosExibidos.map(simbolo => simbolo.simbolo));

    if (simbolosUnicos.size === 1) {
        const simbolo = simbolosExibidos[0].simbolo;
        const multiplicadorPagamento = simbolos.find(s => s.simbolo === simbolo).valor;
        saldo += parseInt(document.getElementById("bet").value) * multiplicadorPagamento;
        document.getElementById("result").textContent = `Você ganhou ${multiplicadorPagamento}x sua aposta!`;
    } else {
        saldo -= parseInt(document.getElementById("bet").value);
        document.getElementById("result").textContent = 'Tente novamente!';
    }

    atualizarInterface();
}

function atualizarInterface() {
    document.getElementById("balance-amount").textContent = saldo;
}

function resetar() {
    saldo = 1000;
    atualizarInterface();
    document.getElementById("result").textContent = '';
}

window.onload = function() {
    atualizarInterface();
};