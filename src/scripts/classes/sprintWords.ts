/* eslint-disable no-return-assign */
/* eslint-disable no-use-before-define */
/* eslint-disable no-underscore-dangle */

import AudioManipuator from './manipulateAudio';
import { LocalStorageItem } from './lsNavigation';
import { getWords, getWord } from '../api/wordsF';
import randomInt from '../units/rendomInt';
import objectBase from '../parts/mini-games/sprint/objectBase';
import { getAggregatedWords, getUserWords } from '../api/userWordsF';
import { StorageItems } from '../interfaces/usersInterface';

const lsItem = new LocalStorageItem();

export default class SingletonWord {
  protected static _instance :SingletonWord;

  audio: AudioManipuator;

  score: number;

  value: number;

  totalAttempts: number;

  rightAttempts: number;

  maxRightAttempts: number;

  attemptsForFlash: number;

  mainArr: [id:string, word: string, translation:string][];

  wrongArr: string[];

  rightArr: string[];

  constructor() {
    if (SingletonWord._instance) {
      throw new Error('Instantiation failed: /n use SingletonWord.getInstance() instead of new.');
    }
    SingletonWord._instance = this;
    this.audio = new AudioManipuator();
    this.score = 0;
    this.value = 10;
    this.totalAttempts = 0;
    this.rightAttempts = 0;
    this.maxRightAttempts = 0;
    this.attemptsForFlash = 0;
    this.wrongArr = [];
    this.rightArr = [];
    this.mainArr = [];
  }

  public static getInstance() :SingletonWord {
    if (SingletonWord._instance) {
      return SingletonWord._instance;
    }
    return SingletonWord._instance = new SingletonWord();
  }

  async startMainArr() {
    if (!lsItem.getWordlist() && lsItem.getChapter() !== 6) {
      Array.from({ length: 12 }, (v, i) => i).map(async () => {
        await getWords(lsItem.getChapter(), randomInt(0, 30)).then((el) => {
          Array.from({ length: 6 }, (v, i) => i).map(() => {
            const wordT = el[randomInt(0, 20)];
            this.mainArr.push([wordT.id, wordT.word, wordT.wordTranslate]);
            return true;
          });
        });
        return true;
      });
    } else if (lsItem.getWordlist() && lsItem.getChapter() !== 6) {
      if (localStorage.getItem(StorageItems.token) && localStorage.getItem(StorageItems.id)) {
        const obj = {
          group: lsItem.getChapter(),
          page: <number>lsItem.getWordlist(),
          filter: {
            $or: [
              { 'userWord.optional.learned': 'false' },
              { userWord: 'null' },
            ],
          },
        };
        getAggregatedWords(obj).then((el) => {
          el.map((elem) => {
            this.mainArr.push([elem.id, elem.word, elem.wordTranslate]);
            return true;
          });
        });
        for (let counter = 0; counter < 3; counter += 1) {
          claimPrevAuth(1).then((el) => {
            el.map((elem) => {
              this.mainArr.push([elem.id, elem.word, elem.wordTranslate]);
              return true;
            });
          });
        }
      } else {
        await getWords(lsItem.getChapter(), <number>lsItem.getWordlist()).then((el) => {
          el.map((elem) => {
            this.mainArr.push([elem.id, elem.word, elem.wordTranslate]);
            return true;
          });
        });
        for (let counter = 0; counter < 3; counter += 1) {
          claimPrev(1).then((el) => {
            el.map((elem) => {
              this.mainArr.push([elem.id, elem.word, elem.wordTranslate]);
              return true;
            });
          });
        }
      }
    } else if (lsItem.getChapter() === 6) {
      getUserWords()
        .then((elem) => {
          elem.forEach((el) => {
            if (el.difficulty === 'hard') {
              getWord(el.wordId).then((element) => {
                this.mainArr.push([element.id, element.word, element.wordTranslate]);
              });
            }
            return true;
          });
        });
      for (let counter = 0; counter < 3; counter += 1) {
        claimPrevAuth(0).then((el) => {
          el.map((elem) => {
            this.mainArr.push([elem.id, elem.word, elem.wordTranslate]);
            return true;
          });
        });
      }
    }

    async function claimPrev(numID: number) {
      const wpNumber = <number>lsItem.getWordlist() - 1;
      const a = (numID && wpNumber >= 0)
        ? await getWords(lsItem.getChapter(), wpNumber)
        : await getWords(lsItem.getChapter() - 1, randomInt(0, 30));

      return a;
    }

    async function claimPrevAuth(numID: number) {
      const wpNumber = <number>lsItem.getWordlist() - 1;
      const obj = (numID && wpNumber >= 0)
        ? {
          group: lsItem.getChapter(),
          page: wpNumber,
          filter: {
            $or: [
              { 'userWord.optional.learned': 'false' },
              { userWord: 'null' },
            ],
          },
        } : {
          group: Number(lsItem.getChapter()) - 1,
          page: randomInt(0, 30),
          filter: {
            $or: [
              { 'userWord.optional.learned': 'false' },
              { userWord: 'null' },
            ],
          },
        };
      const a = await getAggregatedWords(obj);
      return a;
    }
  }

  renderTestItem(numItem: number) {
    const main = document.querySelector('main') as HTMLDivElement;
    const ranking = main.querySelector('.ranking') as HTMLTitleElement;
    const flashNodes = main.querySelectorAll('svg') as NodeListOf<SVGSVGElement>;
    const word = main.querySelector('.word') as HTMLTitleElement;
    const translation = main.querySelector('.translation') as HTMLTitleElement;
    const btnRight = main.querySelector('.right') as HTMLButtonElement;
    const btnWrong = main.querySelector('.wrong') as HTMLButtonElement;
    ranking.innerHTML = `${this.score}`;

    Array.from({ length: 4 }, (v, i) => i).map((el) => {
      if (this.attemptsForFlash > el) {
        flashNodes[el].classList.add('filled');
      } else {
        flashNodes[el].classList.remove('filled');
      }
      return true;
    });
    const currentArr = this.mainArr[numItem];
    word.innerHTML = `${currentArr[1]}`;

    if (Math.round(Math.random())) {
      btnRight.id = `${currentArr[0]}`;
      btnWrong.id = `${this.mainArr[randomInt(0, 60)]}`;
      translation.innerHTML = `${currentArr[2]}`;
    } else {
      const a = this.mainArr[randomInt(0, 60)];
      btnRight.id = `${a[0]}`;
      btnWrong.id = `${currentArr[0]}`;
      translation.innerHTML = `${a[2]}`;
    }
  }

  rightAnsverF() {
    this.totalAttempts += 1;
    this.rightAttempts += 1;
    if (this.attemptsForFlash < 4) {
      this.score += this.value;
      this.attemptsForFlash += 1;
    } else {
      this.score += this.value;
      this.value += 10;
      this.attemptsForFlash = 0;
    }

    if (this.rightAttempts > this.maxRightAttempts) {
      this.maxRightAttempts = this.rightAttempts;
    }

    const audio = document.createElement('audio');
    audio.src = `assets/sounds/${objectBase.music.rightA}`;
    audio.play();
  }

  wrongAnsverF() {
    this.totalAttempts += 1;
    this.value = 10;
    this.attemptsForFlash = 0;
    const audio = document.createElement('audio');
    audio.src = `assets/sounds/${objectBase.music.wrongA}`;
    audio.play();
  }

  zeroResults() {
    this.score = 0;
    this.value = 10;
    this.totalAttempts = 0;
    this.rightAttempts = 0;
    this.maxRightAttempts = 0;
    this.attemptsForFlash = 0;
    this.wrongArr = [];
    this.rightArr = [];
    this.mainArr = [];
  }
}
