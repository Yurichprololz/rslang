/* eslint-disable import/no-cycle */
import { game } from './gameLayouts';
import renderChaptersMiniPage from '../chapterMiniPage';
import SingletonWord from '../../../classes/sprintWords';
import objectBase from './objectBase';
import renderResultPage from './resultPage';

const STWord = SingletonWord.getInstance();

function renderGamePage(): void {
  const main = document.querySelector('main') as HTMLDivElement;
  main.innerHTML = game;

  const containerGame = main.querySelector('.sprint-game') as HTMLDivElement;

  const btnClose = main.querySelector('.close-game') as HTMLButtonElement;
  const timer = main.querySelector('.timer') as HTMLTitleElement;
  let attempts = 0;

  const btnsContainer = main.querySelector('.buttons-container') as HTMLDivElement;

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
      const audio = document.createElement('audio');
      audio.src = `assets/sounds/${objectBase.music.clock}`;
      audio.play();
      audio.onended = () => {
        const audio2 = document.createElement('audio');
        audio2.src = `assets/sounds/${objectBase.music.horn}`;
        audio2.play();
        audio.onended = () => {
          document.removeChild(audio2);
          document.removeChild(audio);
        };
      };
    }
    if (i < 0 || STWord.mainArr.length <= attempts) {
      clearInterval(interval);
      renderResultPage();
    }
  }, 1000);

  STWord.renderTestItem(attempts);

  btnsContainer.addEventListener('click', (ev: MouseEvent) => {
    const button = <HTMLButtonElement>(<HTMLDivElement>ev.target).closest('button');
    const id: string = STWord.mainArr[attempts][0];
    if (button.id === id) {
      STWord.rightAnsverF();
      STWord.rightArr.push(id);
      attempts += 1;
      STWord.renderTestItem(attempts);
    } else {
      STWord.wrongAnsverF();
      STWord.wrongArr.push(id);
      attempts += 1;
      STWord.renderTestItem(attempts);
    }
  });

  containerGame.focus();
  containerGame.addEventListener('keyup', (ev: KeyboardEvent) => {
    const buttons = main.querySelectorAll('button') as NodeListOf<HTMLButtonElement>;
    const id: string = STWord.mainArr[attempts][0];
    buttons.forEach((el) => {
      if (el.id === id && el.classList.contains('right')) {
        if (ev.key === 'ArrowLeft') {
          STWord.rightAnsverF();
          STWord.rightArr.push(id);
          attempts += 1;
          STWord.renderTestItem(attempts);
        } else if (ev.key === 'ArrowRight') {
          STWord.wrongAnsverF();
          STWord.wrongArr.push(id);
          attempts += 1;
          STWord.renderTestItem(attempts);
        }
      } else if (el.id === id && el.classList.contains('wrong')) {
        if (ev.key === 'ArrowRight') {
          STWord.rightAnsverF();
          STWord.rightArr.push(id);
          attempts += 1;
          STWord.renderTestItem(attempts);
        } else if (ev.key === 'ArrowLeft') {
          STWord.wrongAnsverF();
          STWord.wrongArr.push(id);
          attempts += 1;
          STWord.renderTestItem(attempts);
        }
      }
      return true;
    });
  });
}

export default renderGamePage;
