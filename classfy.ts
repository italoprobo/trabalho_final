import { UsuarioNaoEncontradoError, MusicaNaoEncontradaError, PlaylistNaoEncontradaError, UsuarioJaCadastradoError, MusicaJaCadastradaError, PlaylistJaCriadaError} from "./ErrosAplicacao";

export class Usuario {

    id_usuario: string;
    nome_usuario: string;
    favoritos : Musica[] = []
    qtd_Favoritos: number = this.favoritos.length

    constructor(id_usuario: string, nome_usuario: string){
        this.id_usuario = id_usuario;
        this.nome_usuario = nome_usuario;
    }

    consultarFavorito(musica: Musica): string {
        for (let f of this.favoritos) {
            if(f.id_musica === f.id_musica){
                return f.id_musica
            }
            break
        }

        throw new MusicaNaoEncontradaError("Música não encontrada")
    }

    consultarIndexFavorito(id: string): number {
        let indiceProcurado: number = -1;
        for (let i = 0; i < this.favoritos.length; i++) {
            if (this.favoritos[i].id_musica== id) {
                indiceProcurado = i;
            }
        }

        return indiceProcurado;
    }

}

export class UsuarioPremium extends Usuario {

    playlists: Playlist[] = []
    qtd_Playlists: number = this.playlists.length

    constructor(id_usuario: string, nome_usuario: string){
        super(id_usuario, nome_usuario);
    }

    consultarPlaylist(playlist: Playlist): string {
        for (let p of this.playlists) {
            if(p.id_playlist === playlist.id_playlist){
                return p.id_playlist
            }
            break
        }

        throw new PlaylistNaoEncontradaError("Playlist não encontrada")
    }

    consultarIndexPlaylist(id: string): number {
        let indiceProcurado: number = -1;
        for (let i = 0; i < this.playlists.length; i++) {
            if (this.playlists[i].id_playlist== id) {
                indiceProcurado = i;
            }
        }

        return indiceProcurado;
    }

    consultarIdPlaylist(id: string): Playlist {
        let playlistProcurada!: Playlist
        for (let i = 0; i < this.playlists.length; i++) {
            if (this.playlists[i].id_playlist== id) {
                playlistProcurada = this.playlists[i];
            }
        }

        return playlistProcurada
    }

    alterarPlaylist(playlist: Playlist, nome: string): void {
        try{
            this.consultarPlaylist(playlist)
            playlist.nome_playlist = nome
        } catch(PlaylistNaoEncontrada){
            throw new PlaylistNaoEncontradaError("Playlist não encontrada")
        }
    }

    inserirPlaylist(playlist: Playlist): void {
        this.playlists.push(playlist)
    }

    excluirPlaylist(id: string): void {
        let indice: number = this.consultarIndexPlaylist(id);
    
        if (indice != -1) {
            for (let i = indice; i < this.playlists.length; i++) {
                this.playlists[i] = this.playlists[i + 1];
            }
            this.playlists.pop();
        } else {
            throw new PlaylistNaoEncontradaError("Playlist não encontrada")
        }
    }
}

export class UsuarioFree extends Usuario {

    constructor(id_usuario: string, nome_usuario: string){
        super(id_usuario, nome_usuario);
    }
}

export class Musica {

    id_musica: string
    nome_musica: string;
    nome_artista: string;
    tempo_musica: string;
    anoLancamento: string;
    genero: string;
    
    constructor(id_musica: string, nome_musica: string, nome_artista: string, 
        tempo_musica: string, anoLancamento: string, genero: string) {
        
        this.id_musica = id_musica;
        this.nome_musica = nome_musica;
        this.nome_artista = nome_artista;
        this.tempo_musica = tempo_musica;
        this.anoLancamento = anoLancamento;
        this.genero = genero; 
    }
    
}

export class Playlist {

    id_playlist: string;
    nome_playlist: string;
    musicas: Musica[] = []
    qtd_musicas: number = this.musicas.length;

    constructor(id_playlist: string, nome_playlist: string){
        this.id_playlist = id_playlist
        this.nome_playlist = nome_playlist
    }

    inserir_musica_na_playlist(musica: Musica): void {
        this.musicas.push(musica)
    }

    remover_musica_da_playlist(musica: Musica): void {
        for(let m of this.musicas){
            if(musica.id_musica == m.id_musica) {
                this.musicas.pop()
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

    consultarIdMusica(id: string): Musica {
        let musicaProcurada!: Musica;
        for (let i = 0; i < this.musicas.length; i++) {
            if (this.musicas[i].id_musica == id) {
                musicaProcurada = this.musicas[i];
            }
        }

        return musicaProcurada
    }
}

export class App implements metodosUsuario, metodosMusica {
    repUsuario: Usuario[] = []
    repMusica: Musica[] = []

    consultarUsuario(usuario: Usuario): string {
        for (let u of this.repUsuario) {
            if(u.id_usuario === usuario.id_usuario){
                return u.id_usuario
            }
            break
        }

        throw new UsuarioNaoEncontradoError("Usuário não encontrado")
    }

    consultarMusica(musica: Musica): string {
        for(let m of this.repMusica) {
            if(m.id_musica === musica.id_musica){
                return m.id_musica
            }
            break
        }

        throw new MusicaNaoEncontradaError("Música não encontrada")
    }
    
    consultarIndexUsuario(id: string): number {
        let indiceProcurado: number = -1;
        for (let i = 0; i < this.repUsuario.length; i++) {
            if (this.repUsuario[i].id_usuario== id) {
                indiceProcurado = i;
            }
        }

        return indiceProcurado;
    }

    
    consultarIndexMusica(id: string): number {
        let indiceProcurado: number = -1;
        for (let i = 0; i < this.repMusica.length; i++) {
            if (this.repMusica[i].id_musica== id) {
                indiceProcurado = i;
            }
        }

        return indiceProcurado;
    }

    alterarUsuario(usuario: Usuario, nome: string): void {
        try{
            this.consultarUsuario(usuario)
            usuario.nome_usuario = nome
        } catch(UsuarioNaoEncontrado) {
            throw new UsuarioNaoEncontradoError("Usuário não encontrado")
        }

    }
    
    alterarMusica(musica: Musica, nome: string): void {
        try{
            this.consultarMusica(musica)
            musica.nome_musica = nome
        } catch(MusicaNaoEncontrada) {
            throw new MusicaNaoEncontradaError("Música não encontrada")
        }
    }

    inserirUsuario(usuario: Usuario): void {
        this.repUsuario.push(usuario)
        
    }

    inserirMusica(musica: Musica): void {
        this.repMusica.push(musica)
    }

    excluirUsuario(id: string): void {
        let indice: number = this.consultarIndexUsuario(id);
    
        if (indice != -1) {
            for (let i = indice; i < this.repUsuario.length; i++) {
                this.repUsuario[i] = this.repUsuario[i + 1];
            }
            this.repUsuario.pop();
        } else {
            throw new UsuarioNaoEncontradoError("Usuário não encontrado")
        }
    }

    excluirMusica(id: string): void {
        let indice: number = this.consultarIndexMusica(id);
    
        if (indice != -1) {
            for (let i = indice; i < this.repMusica.length; i++) {
                this.repMusica[i] = this.repMusica[i + 1];
            }
            this.repMusica.pop();
        } else {
            throw new MusicaNaoEncontradaError("Música não encontrada")
        }
    }

    inserirFavorito(idUsuario: string, idMusica: string): void {
        let indiceUsuario: number = this.consultarIndexUsuario(idUsuario)
        let indiceMusica: number = this.consultarIndexMusica(idMusica)

        let usuario = this.repUsuario[indiceUsuario]
        let musica = this.repMusica[indiceMusica]

        if(indiceUsuario != -1 && indiceMusica != -1) {
            usuario.favoritos.push(musica)
        } else if (indiceUsuario == -1) {
            throw new UsuarioNaoEncontradoError("Usuário não encontrado")
        } else if (indiceMusica == -1) {
            throw new MusicaNaoEncontradaError("Música não encontrada")
        }
        
    }
    
    removerFavorito(idUsuario: string, idMusica: string): void {
        let indiceUsuario: number = this.consultarIndexUsuario(idUsuario)
        let indiceMusica: number = this.consultarIndexMusica(idMusica)

        
        let indice: number = this.repUsuario[indiceUsuario].consultarIndexFavorito(idMusica)
    
        if (indice != -1) {
            for (let i = indice; i < this.repUsuario[indiceUsuario].favoritos.length; i++) {
                this.repUsuario[indiceUsuario].favoritos[i] = this.repUsuario[indiceUsuario].favoritos[i + 1];
            }
            this.repUsuario[indiceUsuario].favoritos.pop();
        } else if (indiceUsuario == -1) {
            throw new UsuarioNaoEncontradoError("Usuário não encontrado")
        } else if (indiceMusica == -1) {
            throw new MusicaNaoEncontradaError("Música não encontrada")
        } 
    }

    consultarIdUsuario(id: string): Usuario {
        let usuarioProcurado!: Usuario;
        for (let i = 0; i < this.repUsuario.length; i++) {
            if (this.repUsuario[i].id_usuario == id) {
                usuarioProcurado = this.repUsuario[i];
            }
        }

        return usuarioProcurado
    }

    consultarIdMusica(id: string): Musica {
        let musicaProcurada!: Musica;
        for (let i = 0; i < this.repMusica.length; i++) {
            if (this.repMusica[i].id_musica == id) {
                musicaProcurada = this.repMusica[i];
            }
        }

        return musicaProcurada
    }
}

interface metodosUsuario{
    consultarUsuario(usuario: Usuario): string
    consultarIdUsuario(id: string) : Usuario
    consultarIndexUsuario(id: string): number
    alterarUsuario(usuario: Usuario, nome: string): void
    inserirUsuario(usuario: Usuario): void
    excluirUsuario(id: string): void 
    inserirFavorito(idUsuario: string, idMusica: string): void   
}
interface metodosMusica{
    consultarMusica(musica: Musica): string
    consultarIdMusica(id: string) : Musica
    consultarIndexMusica(id: string): number 
    alterarMusica(musica: Musica, nome: string): void
    inserirMusica(musica: Musica): void
    excluirMusica(id: string): void    
}