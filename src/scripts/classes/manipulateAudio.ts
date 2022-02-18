import gameObject from '../parts/mini-games/sprint/objectBase';

export default class AudioManipuator {
  audios;

  constructor() {
    this.audios = gameObject;
  }

  rightAnswer() {
    const audio = document.createElement('audio');
    audio.src = `assets/sounds/${this.audios.music.rightA}`;
    audio.play();
  }

  wrongAnswer() {
    const audio1 = document.createElement('audio');
    audio1.src = `assets/sounds/${this.audios.music.wrongA}`;
    audio1.play();
  }
}
