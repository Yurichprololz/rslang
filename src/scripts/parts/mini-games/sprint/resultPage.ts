/* eslint-disable import/no-cycle */
import { baseSprintResultLayout, rightResultItem, wrongResultItem } from './gameLayouts';
import SingletonWord from '../../../classes/sprintWords';
import renderChaptersMiniPage from '../chapterMiniPage';
import { getWord } from '../../../api/wordsF';

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
  const wrongAContainer = main.querySelector(".i-don't-know") as HTMLDivElement;

  const { rightArr } = STWord;
  const { wrongArr } = STWord;

  totalAmountTitle.innerHTML = `${STWord.score}`;
  rightAmountTitle.innerHTML = `${rightArr.length}`;
  wrongAmountTitle.innerHTML = `${wrongArr.length}`;

  rightArr.forEach((el) => {
    getWord(el).then((elem) => {

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
  }
}

function renderWord() {

}

export default renderResultPage;
