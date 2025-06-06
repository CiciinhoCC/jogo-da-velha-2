function criarElem(tag, classe = null, atrib = null) {
    let elem = document.createElement(tag);
    if (classe != null) {
        elem.setAttribute("class", classe)
    }
    if (atrib != null) {
        for (j = 0; j < atrib.length; j++) {
            elem.setAttribute(atrib[j][0], atrib[j][1]);
        }
    }

    return elem;
}

// CRIANDO O TABULEIRO (seria um saco se fosse no html nmrl)

let tabuleiro = document.getElementById("tabuleiro");
let linha1 = document.getElementById("linha1");
let linha2 = document.getElementById("linha2");
let linha3 = document.getElementById("linha3");

function linha(id, linha, elem) {
    for (i = 1; i <= 3; i++) {
        td = criarElem("td", "quadrado", [["id", id + "_" + ((linha * 3) + i)]]);
        td.coord = [id, (linha * 3) + i];
        elem.appendChild(td);
    }
}

function criarJogo(id) {
    let jogo = criarElem("table", "jogo highlight", [["id", id]]);

    let tr = criarElem("tr");
    linha(id, 0, tr);
    let tr2 = criarElem("tr");
    linha(id, 1, tr2);
    let tr3 = criarElem("tr");
    linha(id, 2, tr3);

    // n deu pra fazer com loop por algum motivo

    jogo.appendChild(tr);
    jogo.appendChild(tr2);
    jogo.appendChild(tr3);

    jogo.id = id;

    return jogo;
}

linha1.appendChild(criarJogo(1));
linha1.appendChild(criarJogo(2));
linha1.appendChild(criarJogo(3));

linha2.appendChild(criarJogo(4));
linha2.appendChild(criarJogo(5));
linha2.appendChild(criarJogo(6));

linha3.appendChild(criarJogo(7));
linha3.appendChild(criarJogo(8));
linha3.appendChild(criarJogo(9));

// TABULEIRO SEM O HTML

let table = [
    " ",
    [" ", "", "", "", "", "", "", "", "", "",],
    [" ", "", "", "", "", "", "", "", "", "",],
    [" ", "", "", "", "", "", "", "", "", "",],
    [" ", "", "", "", "", "", "", "", "", "",],
    [" ", "", "", "", "", "", "", "", "", "",],
    [" ", "", "", "", "", "", "", "", "", "",],
    [" ", "", "", "", "", "", "", "", "", "",],
    [" ", "", "", "", "", "", "", "", "", "",],
    [" ", "", "", "", "", "", "", "", "", "",],
];

// REGRINHA

let jogador = "X";
let jogo = "sim";

function trocaPlayer() {
    if (jogador === "X") {
        jogador = "O"
    }
    else {
        jogador = "X"
    }
}

function possibilidades(jogo) {
    let vazios = [];
    for (let index = 1; index < jogo.length; index++) {
        const elem = jogo[index];
        if (elem === "") {
            vazios.push(index);
        }
    }

    return vazios;
}

function highlight(id, jogadas = []) {
    document.querySelectorAll(".jogo").forEach(elem => {
        elem.classList.remove("highlight");
        elem.classList.remove("possivel");
    });

    jogadas.forEach(elem => {
        document.getElementById(String(elem)).classList.add("possivel");
    });

    document.getElementById(String(id)).classList.add("highlight");
    jogo = id;
}

function pintar(player, id) {
    document.getElementById(String(id)).classList.add(player);
}

const vitoria = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [7, 5, 3]];

function checarVitoria(jogo) {
    let checagem = [];
    vitoria.forEach(elem => {
        let linha = jogo[elem[0]] + jogo[elem[1]] + jogo[elem[2]];
        checagem.push(linha);
    })

    // ["X", "X", "X"]
    // ["O", "O", "O"]

    if (checagem.includes("XXX")) {
        return "X";
    }
    else if (checagem.includes("OOO")) {
        return "O";
    }
    else {
        return " ";
    }
}

// O JOGO EM SI

let acabou = false

document.querySelectorAll(".quadrado").forEach(elem => {
    elem.innerHTML = ""

    elem.addEventListener("click", el => {
        if ((elem.innerHTML === "" && (jogo === "sim" || jogo == elem.coord[0])) && !acabou) {

            elem.innerHTML = jogador;
            table[elem.coord[0]][elem.coord[1]] = jogador;
            highlight(elem.coord[1], possibilidades(table[elem.coord[1]]));

            trocaPlayer();

            let vitorioso = checarVitoria(table[elem.coord[0]]);

            if (vitorioso !== " " && table[elem.coord[0]] == " ") {
                table[elem.coord[0]][0] = vitorioso;
                pintar(vitorioso, elem.coord[0]);
            }

            let ganhador = checarVitoria(table.map(function (x) { return x[0]; }));
            if (ganhador !== " ") {
                alert(ganhador + " ganhou, yippie!");
                acabou = true;
            }
            //eu tô c preguiça de checar se isso aq funciona, só vou publicar logo
        }
    })
})

