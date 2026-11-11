// ========================================
// CONFIGURAÇÃO DA API
// ========================================

const API_URL = "/api/chamados";

// ========================================
// ELEMENTOS DA INTERFACE
// ========================================

const listaChamados = document.getElementById("listaChamados");
const totalChamados = document.getElementById("totalChamados");
const chamadosAbertos = document.getElementById("chamadosAbertos");
const chamadosAndamento = document.getElementById("chamadosAndamento");
const chamadosFechados = document.getElementById("chamadosFechados");
const pesquisaChamados = document.getElementById("pesquisaChamados");
const filtroStatus = document.getElementById("filtroStatus");
const mensagem = document.getElementById("mensagem");
const modalChamado = document.getElementById("modalChamado");
const formChamado = document.getElementById("formChamado");
const btnNovoChamado = document.getElementById("btnNovoChamado");
const btnFecharModal = document.getElementById("btnFecharModal");
const btnCancelar = document.getElementById("btnCancelar");
const btnSalvar = document.getElementById("btnSalvar");
const tituloModal = document.getElementById("tituloModal");
const erroFormulario = document.getElementById("erroFormulario");

// ========================================
// ESTADO DA APLICAÇÃO
// ========================================

let chamados = [];
let salvando = false;

// ========================================
// MENSAGENS
// ========================================

function mostrarMensagem(texto, tipo = "info") {
    mensagem.textContent = texto;
    mensagem.className = `mensagem ${tipo}`;
}

function ocultarMensagem() {
    mensagem.textContent = "";
    mensagem.className = "mensagem";
}

// ========================================
// CONVERSÃO E FORMATAÇÃO
// ========================================

function formatarStatus(status) {
    const nomes = {
        ABERTO: "Aberto",
        EM_ANDAMENTO: "Em andamento",
        FECHADO: "Fechado"
    };

    return nomes[status] || status || "Não informado";
}

function formatarPrioridade(prioridade) {
    const nomes = {
        BAIXA: "Baixa",
        MEDIA: "Média",
        ALTA: "Alta"
    };

    return nomes[prioridade] || prioridade || "Não informada";
}

function formatarData(data) {
    if (!data) {
        return "Não informada";
    }

    const dataConvertida = new Date(data);

    if (Number.isNaN(dataConvertida.getTime())) {
        return "Não informada";
    }

    return dataConvertida.toLocaleString("pt-BR");
}

function classeStatus(status) {
    const classes = {
        ABERTO: "status-aberto",
        EM_ANDAMENTO: "status-andamento",
        FECHADO: "status-fechado"
    };

    return classes[status] || "";
}

function classePrioridade(prioridade) {
    const classes = {
        BAIXA: "prioridade-baixa",
        MEDIA: "prioridade-media",
        ALTA: "prioridade-alta"
    };

    return classes[prioridade] || "";
}

function escaparHTML(valor) {
    return String(valor ?? "").replace(/[&<>"']/g, caractere => {
        const caracteres = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return caracteres[caractere];
    });
}

// ========================================
// TRATAMENTO DE RESPOSTAS DA API
// ========================================

async function obterMensagemErro(resposta) {
    const texto = await resposta.text();

    if (!texto) {
        return `Erro HTTP ${resposta.status}.`;
    }

    try {
        const dados = JSON.parse(texto);

        if (dados.message) {
            return dados.message;
        }

        if (dados.detail) {
            return dados.detail;
        }

        if (dados.errors) {
            return Object.values(dados.errors).join(" ");
        }

        if (dados.error) {
            return dados.error;
        }
    } catch {
        // A resposta não era JSON.
    }

    return texto;
}

// ========================================
// CARREGAR CHAMADOS
// ========================================

async function carregarChamados() {
    listaChamados.innerHTML = `
        <tr>
            <td colspan="7" class="carregando">
                Carregando chamados...
            </td>
        </tr>
    `;

    try {
        const resposta = await fetch(API_URL);

        if (!resposta.ok) {
            throw new Error(`Erro HTTP ${resposta.status}`);
        }

        chamados = await resposta.json();

        renderizarChamados();
        await atualizarIndicadores();
        ocultarMensagem();

    } catch (erro) {
        console.error("Erro ao carregar chamados:", erro);

        listaChamados.innerHTML = `
            <tr>
                <td colspan="7" class="carregando">
                    Não foi possível carregar os chamados.
                </td>
            </tr>
        `;

        mostrarMensagem(
            "Não foi possível carregar os chamados. Verifique a API.",
            "erro"
        );
    }
}

// ========================================
// ATUALIZAR INDICADORES
// ========================================

async function atualizarIndicadores() {
    chamadosAbertos.textContent = chamados.filter(
        chamado => chamado.status === "ABERTO"
    ).length;

    chamadosAndamento.textContent = chamados.filter(
        chamado => chamado.status === "EM_ANDAMENTO"
    ).length;

    chamadosFechados.textContent = chamados.filter(
        chamado => chamado.status === "FECHADO"
    ).length;

    try {
        const resposta = await fetch(`${API_URL}/total`);

        if (!resposta.ok) {
            throw new Error(`Erro HTTP ${resposta.status}`);
        }

        const dados = await resposta.json();
        totalChamados.textContent = dados.totalChamados;

    } catch (erro) {
        console.error("Erro ao consultar o total:", erro);
        totalChamados.textContent = chamados.length;
    }
}

// ========================================
// RENDERIZAR TABELA
// ========================================

function renderizarChamados() {
    const termo = pesquisaChamados.value.trim().toLowerCase();
    const statusSelecionado = filtroStatus.value;

    const chamadosFiltrados = chamados.filter(chamado => {
        const titulo = (chamado.titulo || "").toLowerCase();
        const categoria = (chamado.categoria || "").toLowerCase();

        const correspondePesquisa =
            titulo.includes(termo) || categoria.includes(termo);

        const correspondeStatus =
            statusSelecionado === "" ||
            chamado.status === statusSelecionado;

        return correspondePesquisa && correspondeStatus;
    });

    if (chamadosFiltrados.length === 0) {
        listaChamados.innerHTML = `
            <tr>
                <td colspan="7" class="carregando">
                    Nenhum chamado encontrado.
                </td>
            </tr>
        `;

        return;
    }

    listaChamados.innerHTML = chamadosFiltrados.map(chamado => `
        <tr>
            <td>${escaparHTML(chamado.id)}</td>
            <td>${escaparHTML(chamado.titulo)}</td>
            <td>${escaparHTML(chamado.categoria)}</td>
            <td>
                <span class="${classePrioridade(chamado.prioridade)}">
                    ${escaparHTML(formatarPrioridade(chamado.prioridade))}
                </span>
            </td>
            <td>
                <span class="etiqueta ${classeStatus(chamado.status)}">
                    ${escaparHTML(formatarStatus(chamado.status))}
                </span>
            </td>
            <td>${escaparHTML(formatarData(chamado.dataAbertura))}</td>
            <td>
                <div class="acoes">
                    <button
                        type="button"
                        class="botao-acao"
                        data-acao="editar"
                        data-id="${escaparHTML(chamado.id)}"
                    >
                        Editar
                    </button>

                    <button
                        type="button"
                        class="botao-acao botao-excluir"
                        data-acao="excluir"
                        data-id="${escaparHTML(chamado.id)}"
                    >
                        Excluir
                    </button>
                </div>
            </td>
        </tr>
    `).join("");
}

// ========================================
// ABRIR E FECHAR FORMULÁRIO
// ========================================

function abrirFormulario() {
    formChamado.reset();

    document.getElementById("chamadoId").value = "";

    tituloModal.textContent = "Novo chamado";
    erroFormulario.textContent = "";

    document.getElementById("prioridade").value = "MEDIA";
    document.getElementById("status").value = "ABERTO";

    btnSalvar.disabled = false;
    btnSalvar.textContent = "Salvar chamado";

    modalChamado.showModal();
}

function fecharFormulario() {
    if (salvando) {
        return;
    }

    modalChamado.close();
    erroFormulario.textContent = "";
}

btnNovoChamado.addEventListener("click", abrirFormulario);
btnFecharModal.addEventListener("click", fecharFormulario);
btnCancelar.addEventListener("click", fecharFormulario);

// ========================================
// CADASTRAR E ATUALIZAR CHAMADOS
// ========================================

formChamado.addEventListener("submit", async evento => {
    evento.preventDefault();

    if (salvando) {
        return;
    }

    erroFormulario.textContent = "";

    const id = document.getElementById("chamadoId").value.trim();

    const dadosChamado = {
        titulo: document.getElementById("titulo").value.trim(),
        descricao: document.getElementById("descricao").value.trim(),
        categoria: document.getElementById("categoria").value.trim(),
        prioridade: document.getElementById("prioridade").value,
        status: document.getElementById("status").value
    };

    if (
        !dadosChamado.titulo ||
        !dadosChamado.descricao ||
        !dadosChamado.categoria
    ) {
        erroFormulario.textContent =
            "Preencha o título, a descrição e a categoria.";

        return;
    }

    const editando = id !== "";

    const url = editando
        ? `${API_URL}/${encodeURIComponent(id)}`
        : API_URL;

    const metodo = editando ? "PUT" : "POST";

    salvando = true;
    btnSalvar.disabled = true;
    btnSalvar.textContent = editando ? "Atualizando..." : "Salvando...";

    try {
        const resposta = await fetch(url, {
            method: metodo,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dadosChamado)
        });

        if (!resposta.ok) {
            throw new Error(await obterMensagemErro(resposta));
        }

        modalChamado.close();
        await carregarChamados();

        mostrarMensagem(
            editando
                ? "Chamado atualizado com sucesso!"
                : "Chamado cadastrado com sucesso!",
            "sucesso"
        );

    } catch (erro) {
        console.error("Erro ao salvar chamado:", erro);

        erroFormulario.textContent =
            erro.message || "Não foi possível salvar o chamado.";

    } finally {
        salvando = false;
        btnSalvar.disabled = false;
        btnSalvar.textContent = "Salvar chamado";
    }
});

// ========================================
// EDITAR E EXCLUIR CHAMADOS
// ========================================

listaChamados.addEventListener("click", async evento => {
    const botao = evento.target.closest("button[data-acao]");

    if (!botao) {
        return;
    }

    const id = botao.dataset.id;
    const acao = botao.dataset.acao;

    const chamado = chamados.find(
        item => String(item.id) === String(id)
    );

    if (!chamado) {
        mostrarMensagem("Chamado não encontrado na lista.", "erro");
        return;
    }

    if (acao === "editar") {
        formChamado.reset();

        document.getElementById("chamadoId").value = chamado.id;
        document.getElementById("titulo").value = chamado.titulo || "";
        document.getElementById("descricao").value = chamado.descricao || "";
        document.getElementById("categoria").value = chamado.categoria || "";
        document.getElementById("prioridade").value = chamado.prioridade || "MEDIA";
        document.getElementById("status").value = chamado.status || "ABERTO";

        tituloModal.textContent = "Editar chamado";
        erroFormulario.textContent = "";

        btnSalvar.disabled = false;
        btnSalvar.textContent = "Salvar alterações";

        modalChamado.showModal();
        return;
    }

    if (acao === "excluir") {
        const confirmar = window.confirm(
            `Deseja realmente excluir o chamado "${chamado.titulo}"?`
        );

        if (!confirmar) {
            return;
        }

        botao.disabled = true;

        try {
            const resposta = await fetch(
                `${API_URL}/${encodeURIComponent(id)}`,
                { method: "DELETE" }
            );

            if (!resposta.ok) {
                throw new Error(await obterMensagemErro(resposta));
            }

            await carregarChamados();

            mostrarMensagem(
                "Chamado excluído com sucesso!",
                "sucesso"
            );

        } catch (erro) {
            console.error("Erro ao excluir chamado:", erro);

            mostrarMensagem(
                erro.message || "Não foi possível excluir o chamado.",
                "erro"
            );

            botao.disabled = false;
        }
    }
});

// ========================================
// PESQUISA E FILTRO
// ========================================

pesquisaChamados.addEventListener("input", renderizarChamados);
filtroStatus.addEventListener("change", renderizarChamados);

// ========================================
// INICIALIZAÇÃO
// ========================================

carregarChamados();