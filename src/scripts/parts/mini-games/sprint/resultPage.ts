/* eslint-disable import/no-cycle */
import { baseSprintResultLayout, rightResultItem, wrongResultItem } from './gameLayouts';
import SingletonWord from '../../../classes/sprintWords';
import renderChaptersMiniPage from '../chapterMiniPage';
import { getWord } from '../../../api/wordsF';
import DOMAIN from '../../../api/domain';
import { createElement } from '../../../utils';
import objectBase from './objectBase';

const STWord = SingletonWord.getInstance();

function renderResultPage(): void {
  const main = document.querySelector('main') as HTMLDivElement;
  main.innerHTML = baseSprintResultLayout;

  const btnClose = main.querySelector('.close-game') as HTMLButtonElement;
  const btnCloseDouble = main.querySelector('.back') as HTMLButtonElement;
  const totalAmountTitle = main.querySelector('.result-rank') as HTMLTitleElement;
  const rightAmountTitle = main.querySelector('.result-rank-right') as HTMLTitleElement;
  const wrongAmountTitle = main.querySelector('.result-rank-wrong') as HTMLTitleElement;
  const rightAContainer = main.querySelector('.i-know') as HTMLDivElement;
  const wrongAContainer = main.querySelector('.i-dont-know') as HTMLDivElement;

  const { rightArr } = STWord;
  const { wrongArr } = STWord;

  if (STWord.score > 300) {
    const audio = document.createElement('audio');
    audio.src = `assets/sounds/${objectBase.music.positive}`;
    audio.play();
  } else {
    const audio = document.createElement('audio');
    audio.src = `assets/sounds/${objectBase.music.negative}`;
    audio.play();
  }

  totalAmountTitle.innerHTML = `${STWord.score}`;
  rightAmountTitle.innerHTML = `${rightArr.length}`;
  wrongAmountTitle.innerHTML = `${wrongArr.length}`;

  rightArr.forEach((el) => {
    getWord(el).then((elem) => {
      const item = renderWord('r', elem.word, elem.wordTranslate, elem.audio);
      rightAContainer.append(item);
    });
  });

  wrongArr.forEach((el) => {
    getWord(el).then((elem) => {
      const item = renderWord('w', elem.word, elem.wordTranslate, elem.audio);
      wrongAContainer.append(item);
    });
  });

  btnClose.addEventListener('click', () => {
    forClose();
  });

  btnCloseDouble.addEventListener('click', () => {
    forClose();
  });

  function forClose() {
    renderChaptersMiniPage();
    const header = document.querySelector('header') as HTMLDivElement;
    const footer = document.querySelector('footer') as HTMLDivElement;
    header.style.display = 'block';
    footer.style.display = 'block';
    STWord.zeroResults();
  }
}

function renderWord(boxID: 'w' | 'r', wordP: string, translationP: string, audioP: string) {
  const item = createElement('div', 'col-12 d-flex flex-row align-items-baseline') as HTMLDivElement;
  item.classList.add(`${boxID === 'w' ? 'result-box-wrong' : 'result-box-right'}`);
  item.innerHTML = boxID === 'r' ? rightResultItem : wrongResultItem;

  const word = item.querySelector('.word-described') as HTMLTitleElement;
  const translation = item.querySelector('.translation') as HTMLTitleElement;
  const btnVoluem = item.querySelector('svg') as SVGSVGElement;

  word.innerHTML = `${wordP}`;
  translation.innerHTML = `${translationP}`;

  btnVoluem.addEventListener('click', () => {
    const audio1 = document.createElement('audio');
    audio1.src = `${DOMAIN}/${audioP}`;
    audio1.play();
  });

  return item;
}

export default renderResultPage;
