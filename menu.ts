import prompt from "prompt-sync";
import { Musica, Playlist, App, Usuario, UsuarioFree, UsuarioPremium} from "./classfy";
import { FormatoInvalidoError, UsuarioNaoEncontradoError, MusicaNaoEncontradaError } from "./ErrosAplicacao";


let input = prompt();
let app: App= new App();

let opcao: String = '';

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
            break
        case "2":
            exibirUsuario();
            break
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

function get_number(msg: string): number{
    let valor = Number(input(msg))
    if (isNaN(valor)){
        throw new FormatoInvalidoError('Valor passado não numérico!')
    }
    return valor
}

function get_text(msg: string): string{
    const valor = input(msg)
    if (valor.length === 0){
        throw new FormatoInvalidoError('Valor vazio!')
    }
    return valor
}

function inserirUsuarioApp(): void {
    console.log("\nCadastrar Usuário\n");
    let id: string = get_text('Digite o seu id: ');
    let nome: string = get_text('Digite o seu nome: ')
    let usuario!: Usuario;

    let op: string = ''

    do {

        op = get_text('Você deseja criar uma Premium ou Free? (p/f) ').toLowerCase();
        
        if(op == "f"){
            usuario = new UsuarioFree(id,nome);
            break;
        } else if(op == "p"){
            usuario = new UsuarioPremium(id,nome);
            break;
        }
        
    } while (op != 'f' || 'p')

    app.inserirUsuario(usuario);
}

function exibirUsuario(): void {
    let id: string = get_text('Digite o id da sua conta: ');
    let usuario = app.consultarIdUsuario(id)
    if(usuario!= null) {
        console.log(`Id: ${app.consultarIdUsuario(id).id_usuario}\n` +
        `Nome: ${app.consultarIdUsuario(id).nome_usuario}\n`);
    } else {
        throw new UsuarioNaoEncontradoError("Usuário não encontrado")
    }
}

function alterarUsuarioApp() {
    console.log("\nAlterar Dados do Usuário\n")
    let id: string = get_text('Digite o id da sua conta: ');
    let usuario = app.consultarIdUsuario(id);
    if(usuario!= null ) {
        app.alterarUsuario(usuario, get_text("Novo nome: "))
    } else {
        throw new UsuarioNaoEncontradoError("Usuário não encontrado")
    }
}

function removerUsuarioApp() {
    console.log("\nRemover Usuário\n");
    let id: string = get_text('Digite o id da sua conta: ');
    app.excluirUsuario(id)
    console.log("\nUsuário Removido!")
}

function inserirMusicaApp(): void {
    console.log("\nCadastrar Música\n");
    let id: string = get_text('Digite o id da música: ');
    let nome: string = get_text('Digite o nome da música: ')
    let artista: string = get_text('Digite o nome do artista: ')
    let tempo: string = get_text('Digite o tempo da Música (mm:ss): ')
    let anoLancamento: string = get_text('Digite o ano de lançamento: ')
    let genero: string = get_text('Digite o gênero: ')
    let musica: Musica = new Musica(id, nome, artista, tempo, anoLancamento, genero);

    app.inserirMusica(musica);
}

function exibirMusica(): void {
    let id: string = get_text('Digite o id da musica: ');
    let musicaProcurada = app.consultarIdMusica(id)

    if(musicaProcurada!= null) {
        console.log(`Id: ${musicaProcurada.id_musica}\n` +
        `Nome: ${musicaProcurada.nome_musica}\n` +
        `Artista: ${musicaProcurada.nome_artista}\n` +
        `Tempo da Música: ${musicaProcurada.tempo_musica}\n` +
        `Ano Lançamento: ${musicaProcurada.anoLancamento}\n` +
        `Gênero: ${musicaProcurada.genero}\n`);
    } else {
        throw new MusicaNaoEncontradaError("Música não encontrada")
    }

    }


function removerMusicaApp() {
    console.log("\nRemover Música\n");
    let id: string = get_text('Digite o id da música: ');
    app.excluirMusica(id)
    console.log("\nMúsica Removida!")
}

function adicionarAosFavoritos() {
    console.log('\nAdicionar aos Favoritos\n')
    let idUsuario: string = get_text('Digite o id do usuário: ')
    let idMusica: string = get_text('Digite o id da música: ')
    app.inserirFavorito(idUsuario, idMusica)
    console.log('Música adicionada aos favoritos!')
}

function exibirFavoritos(): void {
    let id: string = get_text('Digite o id do usuário: \n')
    let usuario: Usuario = app.consultarIdUsuario(id)
    if(usuario!= null) {
        for(let f of usuario.favoritos) {
            console.log(`Nome: ${f.nome_musica}, Tempo: ${f.tempo_musica} , Artista: ${f.nome_artista}\n`)
        }
    } else {
        throw new UsuarioNaoEncontradoError("Usuário não encontrado")
    }
}

function removerDosFavoritos() {
    console.log('\nRemover dos Favoritos\n')
    let idUsuario: string = get_text('Digite o id do usuário: ')
    let idMusica: string = get_text('Digite o id da música: ')
    app.removerFavorito(idUsuario, idMusica)
    console.log("Música removida dos favoritos")
}