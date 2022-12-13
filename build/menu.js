"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const classfy_1 = require("./classfy");
const ErrosAplicacao_1 = require("./ErrosAplicacao");
let input = (0, prompt_sync_1.default)();
let app = new classfy_1.App();
let opcao = '';
do {
    console.log('\nBem vindo ao CLASSFY\nDigite uma opção:');
    console.log('1 - Adicionar Usuário      2 - Exibir Dados Usuário     3 - Alterar Usuário\n' +
        '4 - Remover Usuário       5 - Adicionar Música       6 - Exibir Dados Música\n' +
        '7 - Remover Musica       8 - Adicionar Favoritos        9 - Exibir Favoritos\n' +
        '10 - Remover Favoritos         0 - Sair\n');
    opcao = get_text("Opção: ");
    switch (opcao) {
        case "1":
            inserirUsuarioApp();
            break;
        case "2":
            exibirUsuario();
            break;
        case "3":
            alterarUsuarioApp();
            break;
        case "4":
            removerUsuarioApp();
            break;
        case "5":
            inserirMusicaApp();
            break;
        case "6":
            exibirMusica();
            break;
        case "7":
            removerMusicaApp();
            break;
        case "8":
            adicionarAosFavoritos();
            break;
        case "9":
            exibirFavoritos();
            break;
        case "10":
            removerDosFavoritos();
            break;
    }
    input('Operação finalizada. Pressione <enter>');
    console.clear();
} while (opcao != "0");
console.log("Aplicação encerrada");
function get_number(msg) {
    let valor = Number(input(msg));
    if (isNaN(valor)) {
        throw new ErrosAplicacao_1.FormatoInvalidoError('Valor passado não numérico!');
    }
    return valor;
}
function get_text(msg) {
    const valor = input(msg);
    if (valor.length === 0) {
        throw new ErrosAplicacao_1.FormatoInvalidoError('Valor vazio!');
    }
    return valor;
}
function inserirUsuarioApp() {
    console.log("\nCadastrar Usuário\n");
    let id = get_text('Digite o seu id: ');
    let nome = get_text('Digite o seu nome: ');
    let usuario;
    let op = '';
    do {
        op = get_text('Você deseja criar uma Premium ou Free? (p/f) ').toLowerCase();
        if (op == "f") {
            usuario = new classfy_1.UsuarioFree(id, nome);
            break;
        }
        else if (op == "p") {
            usuario = new classfy_1.UsuarioPremium(id, nome);
            break;
        }
    } while (op != 'f' || 'p');
    app.inserirUsuario(usuario);
}
function exibirUsuario() {
    let id = get_text('Digite o id da sua conta: ');
    let usuario = app.consultarIdUsuario(id);
    if (usuario != null) {
        console.log(`Id: ${app.consultarIdUsuario(id).id_usuario}\n` +
            `Nome: ${app.consultarIdUsuario(id).nome_usuario}\n`);
    }
    else {
        throw new ErrosAplicacao_1.UsuarioNaoEncontradoError("Usuário não encontrado");
    }
}
function alterarUsuarioApp() {
    console.log("\nAlterar Dados do Usuário\n");
    let id = get_text('Digite o id da sua conta: ');
    let usuario = app.consultarIdUsuario(id);
    if (usuario != null) {
        app.alterarUsuario(usuario, get_text("Novo nome: "));
    }
    else {
        throw new ErrosAplicacao_1.UsuarioNaoEncontradoError("Usuário não encontrado");
    }
}
function removerUsuarioApp() {
    console.log("\nRemover Usuário\n");
    let id = get_text('Digite o id da sua conta: ');
    app.excluirUsuario(id);
    console.log("\nUsuário Removido!");
}
function inserirMusicaApp() {
    console.log("\nCadastrar Música\n");
    let id = get_text('Digite o id da música: ');
    let nome = get_text('Digite o nome da música: ');
    let artista = get_text('Digite o nome do artista: ');
    let tempo = get_text('Digite o tempo da Música (mm:ss): ');
    let anoLancamento = get_text('Digite o ano de lançamento: ');
    let genero = get_text('Digite o gênero: ');
    let musica = new classfy_1.Musica(id, nome, artista, tempo, anoLancamento, genero);
    app.inserirMusica(musica);
}
function exibirMusica() {
    let id = get_text('Digite o id da musica: ');
    let musicaProcurada = app.consultarIdMusica(id);
    if (musicaProcurada != null) {
        console.log(`Id: ${musicaProcurada.id_musica}\n` +
            `Nome: ${musicaProcurada.nome_musica}\n` +
            `Artista: ${musicaProcurada.nome_artista}\n` +
            `Tempo da Música: ${musicaProcurada.tempo_musica}\n` +
            `Ano Lançamento: ${musicaProcurada.anoLancamento}\n` +
            `Gênero: ${musicaProcurada.genero}\n`);
    }
    else {
        throw new ErrosAplicacao_1.MusicaNaoEncontradaError("Música não encontrada");
    }
}
function removerMusicaApp() {
    console.log("\nRemover Música\n");
    let id = get_text('Digite o id da música: ');
    app.excluirMusica(id);
    console.log("\nMúsica Removida!");
}
function adicionarAosFavoritos() {
    console.log('\nAdicionar aos Favoritos\n');
    let idUsuario = get_text('Digite o id do usuário: ');
    let idMusica = get_text('Digite o id da música: ');
    app.inserirFavorito(idUsuario, idMusica);
    console.log('Música adicionada aos favoritos!');
}
function exibirFavoritos() {
    let id = get_text('Digite o id do usuário: ');
    let usuario = app.consultarIdUsuario(id);
    if (usuario != null) {
        for (let f of usuario.favoritos) {
            console.log(`Nome: ${f.nome_musica}, Tempo: ${f.tempo_musica} , Artista: ${f.nome_artista}\n`);
        }
    }
    else {
        throw new ErrosAplicacao_1.UsuarioNaoEncontradoError("Usuário não encontrado");
    }
}
function removerDosFavoritos() {
    console.log('\nRemover dos Favoritos\n');
    let idUsuario = get_text('Digite o id do usuário: ');
    let idMusica = get_text('Digite o id da música: ');
    app.removerFavorito(idUsuario, idMusica);
    console.log("Música removida dos favoritos");
}