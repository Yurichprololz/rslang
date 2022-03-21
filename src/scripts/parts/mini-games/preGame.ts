/* eslint-disable import/no-cycle */
import { prevGame } from './sprint/gameLayouts';
import renderGamePage from './sprint/gamePage';
import SingletonWord from '../../classes/sprintWords';
import objectBase from './sprint/objectBase';

function renderPreGamePage(): void {
  const header = document.querySelector('header') as HTMLDivElement;
  const footer = document.querySelector('footer') as HTMLDivElement;
  header.style.display = 'none';
  footer.style.display = 'none';

  const main = document.querySelector('main') as HTMLDivElement;
  main.innerHTML = prevGame;
  const numberChecker = main.querySelector('.three-to-one') as HTMLTimeElement;
  let i = 7;
  try {
    const wordGame = new SingletonWord();
    wordGame.startMainArr();
  } catch {
    const wordGame = SingletonWord.getInstance();
    wordGame.startMainArr();
  }

  const interval = setInterval(() => {
    numberChecker.innerHTML = `${i}`;
    i -= 1;
    if (i === 6) {
      const audio = document.createElement('audio');
      audio.src = `assets/sounds/${objectBase.music.clockLong}`;
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
    if (i < 0) {
      clearInterval(interval);
      i = 6;
      renderGamePage();
    }
  }, 1000);
}

export default renderPreGamePage;
