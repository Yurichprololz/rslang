import { createElement } from './utils';
import { switchClass } from './parts/home/headerButtonsHandler';
import { LocalStorageItem, StorageKeys } from './classes/lsNavigation';
import renderChaptersPage from './parts/dictionary/chapterPage';
import renderWordsPage from './parts/dictionary/wordlistPage';
import renderChaptersMiniPage from './parts/mini-games/chapterMiniPage';
import updateHeader from './auth';
import mainHomeLayout from './parts/home/mainLayout';

function createHeader():HTMLElement {
  const header = createElement('header', 'header p-3 bg-dark text-white') as HTMLElement;
  updateHeader(header);
  return header;
}

function createFooter():HTMLElement {
  const footer = createElement('footer', 'footer bg-dark pt-5') as HTMLElement;
  footer.innerHTML = `
  <div class="container footer__container">
      <div class="footer__rsschool">
          <img src="./assets/images/rs_school.svg" alt="RS school logo">
      </div>
      <div class="footer__developers">
          <a class="text-white footer__developer" href="https://github.com/Yurichprololz" target="_blank">Yuri<img src="./assets/images/GitHub-Mark-32px.png" alt="link for repository"></a>
          <a class="text-white footer__developer" href="https://github.com/sashatsarikova" target="_blank">Sasha<img src="./assets/images/GitHub-Mark-32px.png" alt="link for repository"></a>
      </div>
      <div class="footer__year text-white">2022</div>
</div>`;
  return footer;
}

function createMain():HTMLElement {
  const main = createElement('main', 'main bg-dark text-white') as HTMLElement;
  main.innerHTML = mainHomeLayout;
  return main;
}

function renderHomeLayout():void {
  const header = createHeader();
  const main = createMain();
  const footer = createFooter();

  document.body.append(header);
  document.body.append(main);
  document.body.append(footer);
}

function renderBasicLayout():void {
  if (!localStorage.getItem(StorageKeys.keyId)) {
    new LocalStorageItem().startStorage();
  }
  const lsItem = new LocalStorageItem();
  const page = lsItem.getPage();
  renderHomeLayout();
  switch (page) {
    case StorageKeys.home:
      // renderHomeLayout();
      break;
    case StorageKeys.chapter:
      renderChaptersPage();
      switchClass(document.querySelector('#dictionary') as HTMLLIElement);
      break;
    case StorageKeys.wordlist:
      renderWordsPage(lsItem.getChapter());
      switchClass(document.querySelector('#dictionary') as HTMLLIElement);
      break;
    case StorageKeys.sprint:
      renderChaptersMiniPage();
      switchClass(document.querySelector(`#${StorageKeys.sprint}`) as HTMLLIElement);
      break;
    case StorageKeys.audio:
      renderChaptersMiniPage();
      switchClass(document.querySelector(`#${StorageKeys.audio}`) as HTMLLIElement);
      break;
    case StorageKeys.statistics:
      // renderHomeLayout();
      break;
    default:
      renderHomeLayout();
      break;
  }
}

export default renderBasicLayout;
