// Music App, Features: Add song, remove song, reorder songs, play next.

interface Song {
  id: number;
  name: string;
}

class Music {
  songs: Song[];

  constructor() {
    this.songs = [];
  }

  addSong(song: string, id: number) {
    const songObj = { id, name: song };
    this.songs.push(songObj);
  }

  removeSong(id: number) {
    this.songs = this.songs.filter((song) => song.id !== id);
  }

  reorderSong(src: number, dest: number) {
    let s = this.songs.findIndex((song) => song.id === src);
    let d = this.songs.findIndex((song) => song.id === dest);

    [this.songs[s], this.songs[d]] = [this.songs[d], this.songs[s]];
  }

  playNext(id: number) {
    console.log(this.songs[id + 1]);
  }

  playlist() {
    console.log(this.songs);
  }
}

class MusicApp {
  music: Music;
  currSongId: number;
  currSongIndex: number;

  constructor(music: Music) {
    this.music = music;
    this.currSongId = 0;
    this.currSongIndex = 0;
  }

  addSong(song: string) {
    this.music.addSong(song, this.currSongId++);
  }

  removeSong(id: number) {
    this.music.removeSong(id);
  }

  reorderSong(src: number, dest: number) {
    this.music.reorderSong(src, dest);
  }

  playNext() {
    this.music.playNext(this.currSongIndex);
    this.currSongIndex++;
  }

  showPlaylist() {
    this.music.playlist();
  }
}

const music = new Music();

const musicApp = new MusicApp(music);
musicApp.addSong("abc");
musicApp.addSong("def");
musicApp.addSong("ghi");
musicApp.addSong("jkl");
musicApp.addSong("lmn");

musicApp.showPlaylist();

musicApp.removeSong(1);
musicApp.addSong("pqrs");
musicApp.showPlaylist();

musicApp.reorderSong(0, 3);
musicApp.showPlaylist();

musicApp.playNext();
