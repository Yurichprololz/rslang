import gameObject from '../parts/mini-games/sprint/objectBase';

export default class AudioManipuator {
  audios;

  audio: HTMLAudioElement;

  constructor() {
    this.audios = gameObject;
    this.audio = document.createElement('audio');
  }

  // eslint-disable-next-line class-methods-use-this
  forAnswers(lingStr: string) {
    this.audio.src = `assets/sounds/${lingStr}`;
    this.audio.play();
  }

  rightAnswer() {
    this.forAnswers(`${this.audios.music.rightA}`);
  }

  wrongAnswer() {
    this.forAnswers(`${this.audios.music.wrongA}`);
  }

  endGameGood() {
    this.forAnswers(`${this.audios.music.positive}`);
  }

  resultGood() {
    this.forAnswers(`${this.audios.music.negative}`);
  }

  resultBad() {
    this.forAnswers(`${this.audios.music.clock}`);
  }
}
