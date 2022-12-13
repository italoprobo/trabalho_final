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
        '10 - Remover Favoritos        11 - Criar Playlist        12 - Inserir Música na Playlist\n' +
        '13 - Exibir Playlist        14 - Modo Aleatório Playlist        15 - Remover Música da Playlist\n' +
        '16 - Remover Playlist        17 - Virar Premium        18- Virar Free\n' +
        '0 - Sair\n');
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
        case "11":
            criarPlaylist();
            break;
        case "12":
            inserir_musica_na_playlistApp();
            break;
        case "13":
            exibirPlaylist();
            break;
        case "14":
            ordemAleatoriaApp();
            break;
        case "15":
            remover_musica_da_playlistApp();
            break;
        case "16":
            removerPlaylistApp();
            break;
        case "17":
            virarPremium();
            break;
        case "18":
            virarFree();
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
    let usuarioProcurado = app.consultarIdUsuario(id);
    if (usuarioProcurado == null) {
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
    else {
        throw new ErrosAplicacao_1.UsuarioJaCadastradoError('Usuário já cadastrado!');
    }
}
function exibirUsuario() {
    let id = get_text('Digite o id da sua conta: ');
    let usuario = app.consultarIdUsuario(id);
    if (usuario != null) {
        console.log(`Id: ${app.consultarIdUsuario(id).id_usuario}\n` +
            `Nome: ${app.consultarIdUsuario(id).nome_usuario}\n`);
        if (usuario instanceof classfy_1.UsuarioPremium) {
            console.log("Playlists:");
            for (let p of usuario.playlists) {
                console.log(`Nome: ${p.nome_playlist}, Quantidade de músicas: ${p.qtd_musicas}`);
            }
        }
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
    if (Number(tempo.split(":")[0]) >= 60 || Number(tempo.split(":")[1]) >= 60) {
        throw new ErrosAplicacao_1.FormatoInvalidoError("Formato inválido!");
    }
    let anoLancamento = get_text('Digite o ano de lançamento: ');
    let genero = get_text('Digite o gênero: ');
    let musica = new classfy_1.Musica(id, nome, artista, tempo, anoLancamento, genero);
    let musicaProcurada = app.consultarIdMusica(id);
    if (musicaProcurada == null) {
        app.inserirMusica(musica);
    }
    else {
        throw new ErrosAplicacao_1.MusicaJaCadastradaError('Musica já cadastrada!');
    }
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
function criarPlaylist() {
    let idPlaylist = get_text('Digite o id da playlist: ');
    let nome = get_text('Digite o nome da Playlist: ');
    let idUsuario = get_text('Digite o id do usuário: ');
    let usuario = app.consultarIdUsuario(idUsuario);
    let playlist = new classfy_1.Playlist(idPlaylist, nome);
    if (usuario instanceof classfy_1.UsuarioPremium) {
        usuario.inserirPlaylist(playlist);
    }
    else {
        console.log("Você não possui uma conta Premium");
    }
}
function inserir_musica_na_playlistApp() {
    let idMusica = get_text('Digite o id da música: ');
    let idUsuario = get_text('Digite o id do usuário: ');
    let idPlaylist = get_text('Digite o id da Playlist: ');
    let usuario = app.consultarIdUsuario(idUsuario);
    if (usuario != null) {
        if (usuario instanceof classfy_1.UsuarioPremium) {
            let indexofPlaylist = usuario.consultarIndexPlaylist(idPlaylist);
            if (indexofPlaylist != -1) {
                let musica = app.consultarIdMusica(idMusica);
                if (musica != null) {
                    let playlist = usuario.playlists[indexofPlaylist];
                    let musicaProcurada = playlist.consultarIdMusicaPlaylist(idMusica);
                    if (musicaProcurada != null) {
                        usuario.playlists[indexofPlaylist].inserir_musica_na_playlist(musica);
                    }
                    else {
                        throw new ErrosAplicacao_1.MusicaJaCadastradaError("Música já cadastrada!");
                    }
                }
                else {
                    throw new ErrosAplicacao_1.MusicaNaoEncontradaError("Música não encontrada!");
                }
            }
            else {
                throw new ErrosAplicacao_1.PlaylistNaoEncontradaError("Playlist não encontrada");
            }
        }
        else {
            console.log("Você não possui uma conta Premium");
        }
    }
    else {
        throw new ErrosAplicacao_1.UsuarioNaoEncontradoError("Usuário não encontrado");
    }
}
function exibirPlaylist() {
    let idUsuario = get_text('Digite o id do usuário: ');
    let idPlaylist = get_text('Digite o id do playlist: ');
    console.log("\n");
    let usuario = app.consultarIdUsuario(idUsuario);
    if (usuario != null) {
        if (usuario instanceof classfy_1.UsuarioPremium) {
            let playlist = usuario.consultarIdPlaylist(idPlaylist);
            if (playlist != null) {
                console.log(`Nome Playlist: ${playlist.nome_playlist}`);
                console.log(`Quantidade de músicas na playlist: ${playlist.qtd_musicas}`);
                if (playlist.qtd_musicas > 0) {
                    for (let m of playlist.musicas) {
                        console.log(`Nome: ${m.nome_musica}, Artista: ${m.nome_artista}\n`);
                    }
                }
                else {
                    console.log("Playlist vazia!");
                }
            }
            else {
                throw new ErrosAplicacao_1.PlaylistNaoEncontradaError('Playlist não encontrada');
            }
        }
        else {
            console.log("Você não possui uma conta Premium");
        }
    }
    else {
        throw new ErrosAplicacao_1.UsuarioNaoEncontradoError("Usuário não encontrado");
    }
}
function ordemAleatoriaApp() {
    let idUsuario = get_text('Digite o id do usuário: ');
    let idPlaylist = get_text('Digite o id do playlist: ');
    let usuario = app.consultarIdUsuario(idUsuario);
    if (usuario != null) {
        if (usuario instanceof classfy_1.UsuarioPremium) {
            let playlist = usuario.consultarIdPlaylist(idPlaylist);
            if (playlist != null) {
                playlist.ordemAleatoria();
            }
        }
        else {
            console.log("Você não possui uma conta Premium");
        }
    }
    else {
        throw new ErrosAplicacao_1.UsuarioNaoEncontradoError("Usuário não encontrado");
    }
}
function removerPlaylistApp() {
    let idUsuario = get_text('Digite o id do usuário: ');
    let idPlaylist = get_text('Digite o id do playlist: ');
    let usuario = app.consultarIdUsuario(idUsuario);
    if (usuario != null) {
        if (usuario instanceof classfy_1.UsuarioPremium) {
            let playlist = usuario.consultarIdPlaylist(idPlaylist);
            if (playlist != null) {
                usuario.excluirPlaylist(idPlaylist);
            }
        }
        else {
            console.log("Você não possui uma conta Premium");
        }
    }
    else {
        throw new ErrosAplicacao_1.UsuarioNaoEncontradoError("Usuário não encontrado");
    }
}
function remover_musica_da_playlistApp() {
    let idMusica = get_text('Digite o id da música: ');
    let idUsuario = get_text('Digite o id do usuário: ');
    let idPlaylist = get_text('Digite o id da Playlist: ');
    let usuario = app.consultarIdUsuario(idUsuario);
    if (usuario instanceof classfy_1.UsuarioPremium) {
        let indexofPlaylist = usuario.consultarIndexPlaylist(idPlaylist);
        let musica = app.consultarIdMusica(idMusica);
        usuario.playlists[indexofPlaylist].remover_musica_da_playlist(musica);
    }
    else {
        console.log("Você não possui uma conta Premium");
    }
}
function virarPremium() {
    let id = get_text('Digite o id do usuário: ');
    let usuario = app.consultarIdUsuario(id);
    let nome = app.consultarIdUsuario(id).nome_usuario;
    if (usuario != null) {
        if (usuario instanceof classfy_1.UsuarioFree) {
            app.excluirUsuario(id);
            let novoUsuario = new classfy_1.UsuarioPremium(id, nome);
            app.inserirUsuario(novoUsuario);
        }
        else {
            console.log("Usuário já é Premium!");
        }
    }
    else {
        throw new ErrosAplicacao_1.UsuarioNaoEncontradoError("Usuário não encontrado");
    }
}
function virarFree() {
    let id = get_text('Digite o id do usuário: ');
    let usuario = app.consultarIdUsuario(id);
    let nome = app.consultarIdUsuario(id).nome_usuario;
    if (usuario != null) {
        if (usuario instanceof classfy_1.UsuarioPremium) {
            app.excluirUsuario(id);
            let novoUsuario = new classfy_1.UsuarioFree(id, nome);
            app.inserirUsuario(novoUsuario);
        }
        else {
            console.log("Usuário já é Free!");
        }
    }
    else {
        throw new ErrosAplicacao_1.UsuarioNaoEncontradoError("Usuário não encontrado");
    }
}
