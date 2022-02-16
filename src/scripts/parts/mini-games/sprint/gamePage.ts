/* eslint-disable import/no-cycle */
import { game } from './gameLayouts';
import renderChaptersMiniPage from '../chapterMiniPage';
import SingletonWord from '../../../classes/sprintWords';

const STWord = SingletonWord.getInstance();

function renderGamePage(): void {
  const main = document.querySelector('main') as HTMLDivElement;
  main.innerHTML = game;

  const btnClose = main.querySelector('.close-game') as HTMLButtonElement;
  const timer = main.querySelector('.timer') as HTMLTitleElement;

  btnClose.addEventListener('click', () => {
    renderChaptersMiniPage();
    const header = document.querySelector('header') as HTMLDivElement;
    const footer = document.querySelector('footer') as HTMLDivElement;
    header.style.display = 'block';
    footer.style.display = 'block';
  });

  let i = 60;
  const interval = setInterval(() => {
    timer.innerHTML = `${i}`;
    i -= 1;
    if (i === 4) {
      STWord.audio.endGameGood();
    }
    if (i < 0) {
      clearInterval(interval);
      console.log('end');
    }
  }, 1000);

  STWord.renderTestItem(0);
}

function renderGameItem() {


}

export default renderGamePage;
