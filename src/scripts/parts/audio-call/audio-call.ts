import { getWords } from '../../api/wordsF';
import serverPath from '../../api/domain';
import { IWords } from '../../interfaces/wordsInterface';
import { LocalStorageItem, StorageKeys } from '../../classes/lsNavigation';
import { createElement, getStandartMain } from '../../utils';
import mainHomeLayout from '../home/mainLayout';
// eslint-disable-next-line import/no-cycle
import renderChaptersMiniPage from '../mini-games/chapterMiniPage';
import { setStatistics } from '../../api/statisticsF';
import { StorageItems } from '../../interfaces/usersInterface';

class AudioCall {
  life:number;

  chapter:number;

  round:number;

  fromDictionary:boolean;

  word: IWords | null;

  wordlist: number;

  answerWord: IWords[];

  answers: boolean[];

  constructor(chapter: number, fromDictionary:boolean) {
    this.life = 5;
    this.chapter = chapter < 5 ? chapter : 5;
    this.fromDictionary = fromDictionary;
    this.round = 0;
    this.word = null;
    this.wordlist = new LocalStorageItem().getWordlist() || 0;
    this.answerWord = [];
    this.answers = [];
  }

  render(): void {
    const main = document.querySelector('.main');
    if (main) {
      main.innerHTML = templateGame();
      main.classList.add('main_audio');
      main.classList.add('main_bg');
      if (main.classList.contains('bg-dark')) {
        main.classList.remove('bg-dark');
      }
      this.createRound();
      document.getElementById('boombox')?.addEventListener('click', playWord);
      const fullscreen = document.getElementById('full-screen') as HTMLElement;
      fullscreen.addEventListener('click', () => (document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen()));
      const close = document.getElementById('close');
      if (close) {
        close.addEventListener('click', renderMain);
      }
    }
  }

  checkLife(): void {
    if (this.life === 0) {
      this.finishGame();
    } else {
      const block = document.querySelector('.life') as HTMLDivElement;
      block.innerHTML = '';
      for (let i = 0; i < this.life; i += 1) {
        const lifePic = document.createElement('div');
        lifePic.classList.add('life-pic');
        block.append(lifePic);
      }
    }
  }

  async createRound(): Promise<void> {
    this.checkLife();
    const words = await getWords(this.chapter, this.wordlist);
    this.word = words[this.round];
    this.answerWord.push(this.word);
    this.createSrcAudio();
    const options = this.getOptions(words);
    const optionsBTN = document.querySelectorAll('.options') as NodeListOf<HTMLSpanElement>;
    optionsBTN.forEach((element, index) => {
      element.addEventListener('click', checkAnswer);
      element.textContent = `${index + 1}. ${options[index].toLocaleUpperCase()}`;
      if (options[index] === this.word?.wordTranslate) {
        element.dataset.right = 'true';
      } else {
        element.dataset.right = 'false';
      }
    });
  }

  falseAnswer(): void {
    this.answers.push(false);
    this.life -= 1;
    playAns(false);
  }

  trueAnswer(): void {
    this.answers.push(true);
    playAns(true);
  }

  getOptions(words:IWords[]): string[] {
    const option:Set<string> = new Set();
    if (this.word) {
      option.add(this.word.wordTranslate);
      while (option.size < 5) {
        option.add(words[Math.floor(Math.random() * words.length)].wordTranslate);
      }
    }
    const sortArr:string[] = Array.from(option).sort();
    return sortArr;
  }

  createSrcAudio(): void {
    const audio = document.getElementById('audio-file') as HTMLAudioElement | null;
    if (audio) {
      audio.src = `${serverPath}/${this.word?.audio}`;
      audio.currentTime = 0;
      audio.play();
    }
  }

  naginateFromDictonary(): void {
    if (this.round === 19) {
      this.round = 0;
      this.wordlist += 1;
    } else {
      this.round += 1;
    }
  }

  paginateFromMenu(): void {
    if (this.round === 19) {
      this.round = 0;
      this.wordlist -= 1;
    } else {
      this.round += 1;
    }
  }

  async nextRound(): Promise<void> {
    if (this.fromDictionary) {
      this.naginateFromDictonary();
    } else {
      this.paginateFromMenu();
    }

    if (this.chapter < 0 || this.chapter > 29 || this.wordlist < 0) {
      this.finishGame();
    } else {
      await this.createRound();
    }
  }

  finishGame(): void {
    this.setStatisticFromAudio();
    const main = document.querySelector('main');
    if (main) {
      if (main.classList.contains('main_audio')) {
        main.classList.remove('main_audio');
      }
      main.innerHTML = templateResult();
      const table = main.querySelector('tbody');
      this.answerWord.forEach((word, index) => {
        const tr = createElement('tr');
        tr.innerHTML = `
        <th scope="row" ><button class="result__audio" data-src="${word.audio}"></button></th>
          <td>${word.word}</td>
          <td>${word.transcription}</td>
          <td>${word.wordTranslate}</td>
          <td>${this.answers[index] ? '&#10004;' : '&#10060;'}</td>`;
        table?.append(tr);
      });

      const audio = createElement('audio', '', { id: 'audio-result' });
      main.append(audio);
      const btns = document.querySelectorAll('.result__audio') as NodeListOf<HTMLButtonElement>;
      btns.forEach((btn) => {
        btn.addEventListener('click', hundleForAudioButton);
      });
      const close = document.getElementById('close-result');
      if (close) {
        close.addEventListener('click', renderMain);
      }
      document.removeEventListener('keydown', keyHandler);
    }
  }

  setStatisticFromAudio():void {
    const wrong:string[] = [];
    const rigth:string[] = [];

    this.answers.forEach((answ, index) => {
      if (answ) {
        rigth.push(this.answerWord[index].id);
      } else {
        wrong.push(this.answerWord[index].id);
      }
    });
    if (localStorage.getItem(StorageItems.id) && localStorage.getItem(StorageItems.token)) {
      setStatistics('audio-call', Date.now(), rigth, wrong, 0);
    }
  }
}

let game:AudioCall;

function hundleForAudioButton(event:Event): void {
  const target = event.target as HTMLButtonElement;
  const { src } = target.dataset;
  if (src) {
    const audio = new Audio(`${serverPath}/${src}`);
    audio.currentTime = 0;
    audio.play();
  }
}

function templateGame(): string {
  return `<div class="audio__ui pb-4 d-flex justify-content-around align-items-center">
  <div class="full-screen" id="full-screen"></div>
  <div class="life"></div>
  <div class="close" id="close"></div>
</div>
<div class="pb-4 d-flex justify-content-center align-items-center">
  <img class="audio__repeat" id="boombox" src="./assets/images/boombox.svg">
  <audio id="audio-file"></audio>
</div>
<div class="pb-4 d-flex justify-content-around align-items-center">
<button type="button" class="options btn btn-outline-light" id="opt-1"></button>
<button type="button" class="options btn btn-outline-light" id="opt-2"></button>
<button type="button" class="options btn btn-outline-light" id="opt-3"></button>
<button type="button" class="options btn btn-outline-light" id="opt-4"></button>
<button type="button" class="options btn btn-outline-light" id="opt-5"></button>
</div>
<div class="key__tips">
      <h6>Управление клавиатурой</h6>
     <p> <span> 1 - 5 - Варианты ответа</span>
      <span> F - Полноэкранный режим</span>
      <span> S - Повтор проигрыания слова</span></p>
    </div>
`;
}

function templateResult(): string {
  return `<div class="result">
  <div class="close" id="close-result"></div>
  <h2 class="result__title" >Результаты</h2>
  <div class="result__table">
      <table class="table table-striped">
      <tbody>
      </tbody>
    </table>
  </div>
</div>`;
}

function createGame(num:number, mod:boolean): void {
  game = new AudioCall(num, mod);
  game.render();
  document.addEventListener('keydown', keyHandler);
}

function keyHandler(event:KeyboardEvent): void {
  const { code } = event;
  let element;
  switch (code) {
    case 'KeyF':
      element = document.getElementById('full-screen');
      break;
    case 'KeyS':
      element = document.getElementById('boombox');
      break;
    case 'Digit1':
      element = document.getElementById('opt-1');
      break;
    case 'Digit2':
      element = document.getElementById('opt-2');
      break;
    case 'Digit3':
      element = document.getElementById('opt-3');
      break;
    case 'Digit4':
      element = document.getElementById('opt-4');
      break;
    case 'Digit5':
      element = document.getElementById('opt-5');
      break;
    default:
      break;
  }
  element?.dispatchEvent(new Event('click'));
}

function checkAnswer(event:Event): void {
  const target = event.target as HTMLSpanElement;
  if (target.dataset.right !== 'true') {
    game.falseAnswer();
    target.classList.add('false_ask');
  } else {
    game.trueAnswer();
    target.classList.add('true_ask');
  }
  setTimeout(() => {
    game.nextRound();
    if (target.classList.contains('false_ask')) {
      target.classList.remove('false_ask');
    }
    if (target.classList.contains('true_ask')) {
      target.classList.remove('true_ask');
    }
  }, 200);
}

function playWord(): void {
  const audio = document.getElementById('audio-file') as HTMLAudioElement;
  audio.currentTime = 0;
  audio.play();
}

function playAns(ans:boolean): void {
  let audio;
  if (ans) {
    audio = new Audio('../../../assets/sounds/right.mp3');
  } else {
    audio = new Audio('../../../assets/sounds/wrong.mp3');
  }
  audio.currentTime = 0;
  audio.play();
}

function renderMain(): void {
  const main = document.querySelector('main') as HTMLElement;
  if (main.classList.contains('main_bg')) {
    main.classList.remove('main_bg');
    main.classList.add('bg-dark');
  }
  main.innerHTML = mainHomeLayout;
  new LocalStorageItem().setPage(StorageKeys.audio);
  getStandartMain();
  renderChaptersMiniPage();
  // getStandartMain();
}

export default createGame;
