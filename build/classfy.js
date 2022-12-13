"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = exports.Playlist = exports.Musica = exports.UsuarioFree = exports.UsuarioPremium = exports.Usuario = void 0;
const ErrosAplicacao_1 = require("./ErrosAplicacao");
class Usuario {
    id_usuario;
    nome_usuario;
    favoritos = [];
    qtd_Favoritos = this.favoritos.length;
    constructor(id_usuario, nome_usuario) {
        this.id_usuario = id_usuario;
        this.nome_usuario = nome_usuario;
    }
    consultarFavorito(musica) {
        for (let f of this.favoritos) {
            if (f.id_musica === f.id_musica) {
                return f.id_musica;
            }
            break;
        }
        throw new ErrosAplicacao_1.MusicaNaoEncontradaError("Música não encontrada");
    }
    consultarIndexFavorito(id) {
        let indiceProcurado = -1;
        for (let i = 0; i < this.favoritos.length; i++) {
            if (this.favoritos[i].id_musica == id) {
                indiceProcurado = i;
            }
        }
        return indiceProcurado;
    }
}
exports.Usuario = Usuario;
class UsuarioPremium extends Usuario {
    playlists = [];
    qtd_Playlists = this.playlists.length;
    constructor(id_usuario, nome_usuario) {
        super(id_usuario, nome_usuario);
    }
    consultarPlaylist(playlist) {
        for (let p of this.playlists) {
            if (p.id_playlist === playlist.id_playlist) {
                return p.id_playlist;
            }
            break;
        }
        throw new ErrosAplicacao_1.PlaylistNaoEncontradaError("Playlist não encontrada");
    }
    consultarIndexPlaylist(id) {
        let indiceProcurado = -1;
        for (let i = 0; i < this.playlists.length; i++) {
            if (this.playlists[i].id_playlist == id) {
                indiceProcurado = i;
            }
        }
        return indiceProcurado;
    }
    consultarIdPlaylist(id) {
        let playlistProcurada;
        for (let i = 0; i < this.playlists.length; i++) {
            if (this.playlists[i].id_playlist == id) {
                playlistProcurada = this.playlists[i];
            }
        }
        return playlistProcurada;
    }
    alterarPlaylist(playlist, nome) {
        try {
            this.consultarPlaylist(playlist);
            playlist.nome_playlist = nome;
        }
        catch (PlaylistNaoEncontrada) {
            throw new ErrosAplicacao_1.PlaylistNaoEncontradaError("Playlist não encontrada");
        }
    }
    inserirPlaylist(playlist) {
        this.playlists.push(playlist);
    }
    excluirPlaylist(id) {
        let indice = this.consultarIndexPlaylist(id);
        if (indice != -1) {
            for (let i = indice; i < this.playlists.length; i++) {
                this.playlists[i] = this.playlists[i + 1];
            }
            this.playlists.pop();
        }
        else {
            throw new ErrosAplicacao_1.PlaylistNaoEncontradaError("Playlist não encontrada");
        }
    }
}
exports.UsuarioPremium = UsuarioPremium;
class UsuarioFree extends Usuario {
    constructor(id_usuario, nome_usuario) {
        super(id_usuario, nome_usuario);
    }
}
exports.UsuarioFree = UsuarioFree;
class Musica {
    id_musica;
    nome_musica;
    nome_artista;
    tempo_musica;
    anoLancamento;
    genero;
    constructor(id_musica, nome_musica, nome_artista, tempo_musica, anoLancamento, genero) {
        this.id_musica = id_musica;
        this.nome_musica = nome_musica;
        this.nome_artista = nome_artista;
        this.tempo_musica = tempo_musica;
        this.anoLancamento = anoLancamento;
        this.genero = genero;
    }
}
exports.Musica = Musica;
class Playlist {
    id_playlist;
    nome_playlist;
    tempo_playlist = 0;
    musicas = [];
    qtd_musicas = this.musicas.length;
    constructor(id_playlist, nome_playlist) {
        this.id_playlist = id_playlist;
        this.nome_playlist = nome_playlist;
    }
    inserir_musica_na_playlist(musica) {
        this.musicas.push(musica);
        let tempo_minutos = Number(musica.tempo_musica.split(":")[0]);
        let tempo_segundos = Number(musica.tempo_musica.split(":")[1]) + tempo_minutos * 60;
        this.tempo_playlist += tempo_segundos;
    }
    remover_musica_da_playlist(musica) {
        for (let m of this.musicas) {
            if (musica.id_musica == m.id_musica) {
                this.musicas.pop();
                let tempo_minutos = Number(musica.tempo_musica.split(":")[0]);
                let tempo_segundos = Number(musica.tempo_musica.split(":")[1]) + tempo_minutos * 60;
                this.tempo_playlist -= tempo_segundos;
            }
        }
    }
    ordemAleatoria() {
        for (let i = this.musicas.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.musicas[i], this.musicas[j]] = [this.musicas[j], this.musicas[i]];
        }
        return this.musicas;
    }
}
exports.Playlist = Playlist;
class App {
    repUsuario = [];
    repMusica = [];
    consultarUsuario(usuario) {
        for (let u of this.repUsuario) {
            if (u.id_usuario === usuario.id_usuario) {
                return u.id_usuario;
            }
            break;
        }
        throw new ErrosAplicacao_1.UsuarioNaoEncontradoError("Usuário não encontrado");
    }
    consultarMusica(musica) {
        for (let m of this.repMusica) {
            if (m.id_musica === musica.id_musica) {
                return m.id_musica;
            }
            break;
        }
        throw new ErrosAplicacao_1.MusicaNaoEncontradaError("Música não encontrada");
    }
    consultarIndexUsuario(id) {
        let indiceProcurado = -1;
        for (let i = 0; i < this.repUsuario.length; i++) {
            if (this.repUsuario[i].id_usuario == id) {
                indiceProcurado = i;
            }
        }
        return indiceProcurado;
    }
    consultarIndexMusica(id) {
        let indiceProcurado = -1;
        for (let i = 0; i < this.repMusica.length; i++) {
            if (this.repMusica[i].id_musica == id) {
                indiceProcurado = i;
            }
        }
        return indiceProcurado;
    }
    alterarUsuario(usuario, nome) {
        try {
            this.consultarUsuario(usuario);
            usuario.nome_usuario = nome;
        }
        catch (UsuarioNaoEncontrado) {
            throw new ErrosAplicacao_1.UsuarioNaoEncontradoError("Usuário não encontrado");
        }
    }
    alterarMusica(musica, nome) {
        try {
            this.consultarMusica(musica);
            musica.nome_musica = nome;
        }
        catch (MusicaNaoEncontrada) {
            throw new ErrosAplicacao_1.MusicaNaoEncontradaError("Música não encontrada");
        }
    }
    inserirUsuario(usuario) {
        this.repUsuario.push(usuario);
    }
    inserirMusica(musica) {
        this.repMusica.push(musica);
    }
    excluirUsuario(id) {
        let indice = this.consultarIndexUsuario(id);
        if (indice != -1) {
            for (let i = indice; i < this.repUsuario.length; i++) {
                this.repUsuario[i] = this.repUsuario[i + 1];
            }
            this.repUsuario.pop();
        }
        else {
            throw new ErrosAplicacao_1.UsuarioNaoEncontradoError("Usuário não encontrado");
        }
    }
    excluirMusica(id) {
        let indice = this.consultarIndexMusica(id);
        if (indice != -1) {
            for (let i = indice; i < this.repMusica.length; i++) {
                this.repMusica[i] = this.repMusica[i + 1];
            }
            this.repMusica.pop();
        }
        else {
            throw new ErrosAplicacao_1.MusicaNaoEncontradaError("Música não encontrada");
        }
    }
    inserirFavorito(idUsuario, idMusica) {
        let indiceUsuario = this.consultarIndexUsuario(idUsuario);
        let indiceMusica = this.consultarIndexMusica(idMusica);
        let usuario = this.repUsuario[indiceUsuario];
        let musica = this.repMusica[indiceMusica];
        if (indiceUsuario != -1 && indiceMusica != -1) {
            usuario.favoritos.push(musica);
        }
        else if (indiceUsuario == -1) {
            throw new ErrosAplicacao_1.UsuarioNaoEncontradoError("Usuário não encontrado");
        }
        else if (indiceMusica == -1) {
            throw new ErrosAplicacao_1.MusicaNaoEncontradaError("Música não encontrada");
        }
    }
    removerFavorito(idUsuario, idMusica) {
        let indiceUsuario = this.consultarIndexUsuario(idUsuario);
        let indiceMusica = this.consultarIndexMusica(idMusica);
        let indice = this.repUsuario[indiceUsuario].consultarIndexFavorito(idMusica);
        if (indice != -1) {
            for (let i = indice; i < this.repUsuario[indiceUsuario].favoritos.length; i++) {
                this.repUsuario[indiceUsuario].favoritos[i] = this.repUsuario[indiceUsuario].favoritos[i + 1];
            }
            this.repUsuario[indiceUsuario].favoritos.pop();
        }
        else if (indiceUsuario == -1) {
            throw new ErrosAplicacao_1.UsuarioNaoEncontradoError("Usuário não encontrado");
        }
        else if (indiceMusica == -1) {
            throw new ErrosAplicacao_1.MusicaNaoEncontradaError("Música não encontrada");
        }
    }
    consultarIdUsuario(id) {
        let usuarioProcurado;
        for (let i = 0; i < this.repUsuario.length; i++) {
            if (this.repUsuario[i].id_usuario == id) {
                usuarioProcurado = this.repUsuario[i];
            }
        }
        return usuarioProcurado;
    }
    consultarIdMusica(id) {
        let musicaProcurada;
        for (let i = 0; i < this.repMusica.length; i++) {
            if (this.repMusica[i].id_musica == id) {
                musicaProcurada = this.repMusica[i];
            }
        }
        return musicaProcurada;
    }
}
exports.App = App;
