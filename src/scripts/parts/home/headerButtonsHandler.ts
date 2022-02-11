import renderChaptersPage from '../dictionary/chapterPage';
import renderChaptersMiniPage from '../mini-games/chapterMiniPage';
import mainHomeLayout from './mainLayout';
import { LocalStorageItem, StorageKeys } from '../../classes/lsNavigation';

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

export default function headerButtonsHandler(head: HTMLElement): void {
  const homeDictionaryBtn = head.querySelector('#dictionary') as HTMLLIElement;
  const homeSprintButton = head.querySelector('#sprint') as HTMLButtonElement;
  const homeAudioCallButton = head.querySelector('#audio-call') as HTMLButtonElement;
  const homeBtn = head.querySelector('#home') as HTMLLIElement;

  homeDictionaryBtn.addEventListener('click', (ev:Event) => {
    switchClass(<HTMLLIElement>ev.target);
    renderChaptersPage();
    new LocalStorageItem().setPage(StorageKeys.chapter);
  });

  homeBtn.addEventListener('click', (ev:Event) => {
    switchClass(<HTMLLIElement>ev.target);
    const main = document.querySelector('main') as HTMLElement;
    main.innerHTML = mainHomeLayout;
    new LocalStorageItem().setPage(StorageKeys.home);
  });

  homeSprintButton.addEventListener('click', (ev:Event) => {
    switchClass(<HTMLLIElement>ev.target);
    new LocalStorageItem().setPage(StorageKeys.sprint);
    renderChaptersMiniPage();
  });
  homeAudioCallButton.addEventListener('click', (ev:Event) => {
    switchClass(<HTMLLIElement>ev.target);
    new LocalStorageItem().setPage(StorageKeys.audio);
    renderChaptersMiniPage();
  });
}
