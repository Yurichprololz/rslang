/* eslint-disable no-param-reassign */
import { createElement, getFullMain } from '../../utils';
import { getWords, getWord } from '../../api/wordsF';
import {
  classesToBeUsed, objectBase, objStartHard, objStartLearned,
} from './objectBase';
import { wordList, wordListItemFn } from './dictionaryLayouts';
import { LocalStorageItem, StorageKeys } from '../../classes/lsNavigation';
import { IWords } from '../../interfaces/wordsInterface';
import DOMAIN from '../../api/domain';
import { StorageItems } from '../../interfaces/usersInterface';
import {
  createUserWord, getUserWord, updateUserWord, daleteUserWord, getUserWords,
} from '../../api/userWordsF';
import renderPreGamePage from '../mini-games/preGame';
import createGame from '../audio-call/audio-call';
import StatAnalizer from '../statistics/statAnalizer';

const lsItem = new LocalStorageItem();

function styleStandard(wordItem: HTMLElement, el: IWords) {
  const word = wordItem.querySelector(`.${classesToBeUsed.word}`) as HTMLTitleElement;
  const transcription = wordItem.querySelector(`.${classesToBeUsed.transcription}`) as HTMLTitleElement;
  const translation = wordItem.querySelector(`.${classesToBeUsed.translation}`) as HTMLTitleElement;
  const meaning = wordItem.querySelector(`.${classesToBeUsed.meaning}`) as HTMLTitleElement;
  const meaningTranslation = wordItem.querySelector(`.${classesToBeUsed.meaningTranslation}`) as HTMLTitleElement;
  const example = wordItem.querySelector(`.${classesToBeUsed.example}`) as HTMLTitleElement;
  const exampleTranslation = wordItem.querySelector(`.${classesToBeUsed.exampleTranslation}`) as HTMLTitleElement;
  const imgCont = wordItem.querySelector(`.${classesToBeUsed.img}`) as HTMLImageElement;
  const deleteBtn = wordItem.querySelector(`.${classesToBeUsed.delete}`) as HTMLButtonElement;
  const voluemBtn = wordItem.querySelector(`.${classesToBeUsed.voluem}`) as HTMLButtonElement;

  word.innerHTML = `${el.word}`;
  word.id = `${el.id}`;
  transcription.innerHTML = `${el.transcription}`;
  translation.innerHTML = `${el.wordTranslate}`;
  meaning.innerHTML = `${el.textMeaning}`;
  meaningTranslation.innerHTML = `${el.textMeaningTranslate}`;
  example.innerHTML = `${el.textExample}`;
  exampleTranslation.innerHTML = `${el.textExampleTranslate}`;
  imgCont.src = `${DOMAIN}/${el.image}`;
  deleteBtn.style.display = 'none'; // можно добавить возможность удалять слово. Сейчас кнопка просто скрыта

  voluemBtn.addEventListener('click', () => {
    voluemBtn.disabled = true;
    const audio1 = document.createElement('audio');
    audio1.src = `${DOMAIN}/${el.audio}`;
    const audio2 = document.createElement('audio');
    audio2.src = `${DOMAIN}/${el.audioMeaning}`;
    const audio3 = document.createElement('audio');
    audio3.src = `${DOMAIN}/${el.audioExample}`;
    audio1.play();
    audio1.addEventListener('ended', () => {
      audio2.play();
      audio2.addEventListener('ended', () => {
        audio3.play();
        audio3.addEventListener('ended', () => {
          voluemBtn.disabled = false;
        });
      });
    });
  });
}

function styleSpecial(wordItem: HTMLElement) {
  const word = wordItem.querySelector(`.${classesToBeUsed.word}`) as HTMLTitleElement;
  const inputDifficulty = wordItem.querySelector(`.${classesToBeUsed.difficulty}`) as HTMLInputElement;
  const inputLearned = wordItem.querySelector(`.${classesToBeUsed.learned}`) as HTMLInputElement;
  const markDifficulty = wordItem.querySelector('.hard-mark') as HTMLTitleElement;
  markDifficulty.style.display = 'none';
  const markLearned = wordItem.querySelector('.learned-mark') as HTMLTitleElement;
  markLearned.style.display = 'none';
  const rightA = wordItem.querySelector(`.${classesToBeUsed.rightAnswer}`) as HTMLTitleElement;
  const wrongA = wordItem.querySelector(`.${classesToBeUsed.wrongAnswer}`) as HTMLTitleElement;
  const nodesForDisplayNone = [...wordItem.querySelectorAll('.display-none') as NodeListOf<HTMLDivElement>];
  const statAnalizer = new StatAnalizer();

  if (localStorage.getItem(StorageItems.id) && localStorage.getItem(StorageItems.token)) {
    statAnalizer.fillArrays().then(() => {
      const wrong = statAnalizer.wrongTotal(word.id);
      const right = statAnalizer.rightTotal(word.id);
      wrongA.innerHTML = `${wrong}`;
      rightA.innerHTML = `${right}`;
      statAnalizer.learenedToday();
    }).then(() => {
      getUserWords().then((elem) => {
        if (typeof elem !== 'number') {
          elem.forEach((element) => {
            if (element.wordId === word.id) {
              if (element.difficulty === 'hard') {
                inputDifficulty.checked = true;
                markDifficulty.style.display = 'inline';
              }
              if (element.optional?.learned === true) {
                inputLearned.checked = true;
                markLearned.style.display = 'inline';
              }
            }
          });
        }
      });
    });

    inputLearned.addEventListener('change', () => {
      if (inputLearned.checked && !inputDifficulty.checked) {
        createUserWord(word.id, objStartLearned).then(() => {
          markLearned.style.display = 'inline';
        });
      } else if (inputDifficulty.checked && inputLearned.checked) {
        getUserWord(word.id).then((elem) => {
          if (typeof elem !== 'number') {
            updateUserWord(word.id, { difficulty: 'light', optional: elem.optional });
            markDifficulty.style.display = 'none';
            inputDifficulty.checked = false;
            markLearned.style.display = 'inline';
          }
        });
      } else {
        daleteUserWord(word.id);
        markLearned.style.display = 'none';
      }
    });
    inputDifficulty.addEventListener('change', () => {
      if (!inputLearned.checked && inputDifficulty.checked) {
        createUserWord(word.id, objStartHard).then(() => {
          markDifficulty.style.display = 'inline';
        });
      } else if (inputDifficulty.checked && inputLearned.checked) {
        getUserWord(word.id).then((elem) => {
          if (typeof elem !== 'number') {
            updateUserWord(word.id, { difficulty: elem.difficulty, optional: { learned: false } });
            markLearned.style.display = 'none';
            inputLearned.checked = false;
            markDifficulty.style.display = 'inline';
          }
        });
      } else {
        daleteUserWord(word.id);
        markDifficulty.style.display = 'none';
      }
    });
  } else {
    nodesForDisplayNone.forEach((elem) => {
      elem.style.display = 'none';
      return true;
    });
  }
}

function renderWord(num: number, el: IWords) {
  const wordItem = createElement('div', 'accordion-item') as HTMLElement;
  wordItem.innerHTML = wordListItemFn(num);
  styleStandard(wordItem, el);
  styleSpecial(wordItem);

  return wordItem;
}

function renderWords(main: HTMLElement) {
  const wordContainer = main.querySelector('#accordionPanel') as HTMLDivElement;
  wordContainer.innerHTML = '';
  getWords(lsItem.getChapter(), <number>lsItem.getWordlist())
    .then((elem) => {
      elem.forEach((el, i) => {
        const word = renderWord(i + 1, el);
        wordContainer?.append(word);
      });
    });
}

function renderUserWords(main: HTMLElement) {
  const wordContainer = main.querySelector('#accordionPanel') as HTMLDivElement;
  wordContainer.innerHTML = '';
  getUserWords()
    .then((elem) => {
      if (typeof elem !== 'number') {
        elem.forEach((el, i) => {
          if (el.difficulty === 'hard') {
            getWord(el.wordId).then((element) => {
              const word = renderWord(i + 1, element);
              wordContainer?.append(word);
            });
          }
        });
      }
    });
}

function operateButtons(main:HTMLElement, num:number) {
  const buttonNext = <HTMLButtonElement>main.querySelector('.WP-btn-next');
  const buttonPrev = <HTMLButtonElement>main.querySelector('.WP-btn-prev');
  const inputNum = <HTMLInputElement>main.querySelector('.page-number');
  lsItem.setWordlist(num);
  renderWords(main);
  if (lsItem.getWordlist() === 29) {
    buttonNext.disabled = true;
  } else {
    buttonNext.disabled = false;
  }
  if (lsItem.getWordlist() === 0) {
    buttonPrev.disabled = true;
  } else {
    buttonPrev.disabled = false;
  }
  inputNum.placeholder = `${num + 1}`;
  inputNum.value = '';
}

function renderWordsPage(num: number) {
  const main = document.querySelector('main') as HTMLDivElement;
  main.innerHTML = wordList;
  const mainContainer = main.querySelector('.wordlist') as HTMLDivElement;
  mainContainer.classList.add(`colored-${objectBase.colors[num]}`);

  if (num < 6) {
    const buttonNext = <HTMLButtonElement>main.querySelector('.WP-btn-next');
    if (lsItem.getWordlist() === 29) buttonNext.disabled = true;
    const buttonPrev = <HTMLButtonElement>main.querySelector('.WP-btn-prev');
    if (lsItem.getWordlist() === 0) buttonPrev.disabled = true;
    const inputNum = <HTMLInputElement>main.querySelector('.page-number');
    inputNum.placeholder = `${lsItem.getWordlist() as number + 1}`;
    renderWords(main);
    buttonNext.addEventListener('click', () => {
      const a = <number>lsItem.getWordlist() + 1;
      operateButtons(main, a);
    });
    buttonPrev.addEventListener('click', () => {
      const a = <number>lsItem.getWordlist() - 1;
      operateButtons(main, a);
    });
    inputNum.addEventListener('change', () => {
      if (validateInput(inputNum.value)) {
        operateButtons(main, Number(inputNum.value) - 1);
      } else {
        validateInput(inputNum.value);
      }
    });
  } else {
    const buttonTools = <HTMLDivElement>main.querySelector('.btn-toolbar');
    buttonTools.style.display = 'none';
    renderUserWords(main);
  }
  const btnPlaySprint = main.querySelector('#sprint-play') as HTMLButtonElement;
  const btnPlayAudio = main.querySelector('#sprint-audio-call') as HTMLButtonElement;
  btnPlaySprint.addEventListener('click', () => {
    lsItem.setPage(StorageKeys.sprint);
    changeHeader(lsItem.getPage());
    renderPreGamePage();
  });
  btnPlayAudio.addEventListener('click', () => {
    lsItem.setPage(StorageKeys.audio);
    changeHeader(lsItem.getPage());
    createGame(lsItem.getChapter(), false);
    getFullMain();
  });
}

function validateInput(value: string | number) {
  const input = document.querySelector('.page-number');
  if (Number(value) < 1 || Number(value) > 30 || Number.isNaN(Number(value))) {
    input?.classList.add('border-oops');
    return false;
  }
  input?.classList.remove('border-oops');
  return true;
}

function changeHeader(id: string) {
  const header = document.querySelector('header');
  const target = <HTMLLIElement>header?.querySelector(`#${id}`);
  switchClass(target);
}

function switchClass(buttonParam: HTMLLIElement): void {
  const buttons = document.querySelectorAll('.nav-link');
  [...buttons].map((button):boolean => {
    if (button.classList.contains('text-white') && (button.id === buttonParam.id)) {
      button.classList.replace('text-white', 'text-secondary');
    } else {
      button.classList.replace('text-secondary', 'text-white');
    }
    return true;
  });
}

export default renderWordsPage;
