const formulario = document.getElementById("form-tarefa");
const entrada = document.getElementById("entrada-tarefa");
const lista = document.getElementById("lista-tarefas");
const contador = document.getElementById("contador");

let tarefas = [];

function atualizarContador() {
    const pendentes = tarefas.filter(
        tarefa => !tarefa.concluida
    ).length;

    contador.textContent =
        `${pendentes} tarefa${pendentes !== 1 ? "s" : ""} pendente${pendentes !== 1 ? "s" : ""}`;
}

function renderizarTarefas() {
    lista.replaceChildren();

    tarefas.forEach(tarefa => {
        const item = document.createElement("li");

        if (tarefa.concluida) {
            item.classList.add("concluida");
        }

        const texto = document.createElement("span");
        texto.textContent = tarefa.texto;

        const botaoConcluir = document.createElement("button");
        botaoConcluir.textContent = tarefa.concluida ? "Desfazer" : "Concluir";
        botaoConcluir.className = "botao-concluir";

        botaoConcluir.addEventListener("click", () => {
            tarefa.concluida = !tarefa.concluida;
            renderizarTarefas();
        });

        const botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = "Excluir";
        botaoExcluir.className = "botao-excluir";

        botaoExcluir.addEventListener("click", () => {
            tarefas = tarefas.filter(t => t.id !== tarefa.id);
            renderizarTarefas();
        });

        item.append(texto, botaoConcluir, botaoExcluir);
        lista.appendChild(item);
    });

    atualizarContador();
}

formulario.addEventListener("submit", evento => {
    evento.preventDefault();

    const texto = entrada.value.trim();

    if (texto === "") {
        return;
    }

    tarefas.push({
        id: Date.now() + Math.random(),
        texto: texto,
        concluida: false
    });

    entrada.value = "";
    entrada.focus();

    renderizarTarefas();
});

renderizarTarefas();
