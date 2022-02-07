import { chpterLayout, chapterItem } from './dictionaryLayouts';
import { createElement } from '../../utils';
import { objectBase } from './objectBase';
import { StorageItems } from '../../interfaces/usersInterface';
import { LocalStorageItem } from '../../classes/lsNavigation';
import { renderWordsPage } from './wordlistPage';

function renderChapter(num: number) {
  const cardCol = createElement('div', 'col') as HTMLElement;
  cardCol.innerHTML = chapterItem;

  const cardContainer = cardCol.querySelector('.card') as HTMLDivElement;
  const cardBody = cardCol.querySelector('.card-body') as HTMLDivElement;
  const cardTitle = cardCol.querySelector('.card-title') as HTMLTitleElement;
  const cardText = cardCol.querySelector('.special-text') as HTMLTitleElement;

  cardContainer.setAttribute('data-number', String(num));
  cardBody.classList.add(`colored-${objectBase.colors[num]}`);
  cardTitle.innerHTML = `${num + 1}`;
  cardText.innerHTML = `${objectBase.text[num]}`;

  cardCol.addEventListener('click', () => {
    new LocalStorageItem().setChapter(num + 1);
    renderWordsPage(num);
  });

  return cardCol;
}

function renderChaptersPage(): void {
  const main = document.querySelector('main') as HTMLDivElement;
  main.innerHTML = chpterLayout;
  const cardsContainer = main.querySelector('.chapter-cards');
  if (cardsContainer) cardsContainer.innerHTML = '';
  const len = (localStorage.getItem(StorageItems.token) && localStorage.getItem(StorageItems.id))
    ? 7
    : 6;
  Array.from({ length: len }, (v, i) => i).map((el) => {
    const card = renderChapter(Number(el));
    cardsContainer?.append(card);
    return true;
  });
}

export default renderChaptersPage;
