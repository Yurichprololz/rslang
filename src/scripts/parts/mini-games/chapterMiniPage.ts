import { StorageItems } from '../../interfaces/usersInterface';
import { createElement } from '../../utils';
import { objectBase } from '../dictionary/objectBase';
import { LocalStorageItem } from '../../classes/lsNavigation';

const chpterLayout = ` 
<div class="container dictionary py-3">
    <h2 class="text-center text-white difficulty-title pb-2"></h2>
    <div class="row row-cols-1 row-cols-md-3 g-4 chapter-cards">    
    </div>
</div>
`;

const chapterItem = `
<div class="card">
    <div class="card-body">
    <h3 class="card-title text-center"></h3>
</div>`;

function renderChapterMini(num: number) {
  const cardCol = createElement('div', 'col') as HTMLElement;
  cardCol.innerHTML = chapterItem;

  const cardContainer = cardCol.querySelector('.card') as HTMLDivElement;
  const cardBody = cardCol.querySelector('.card-body') as HTMLDivElement;
  const cardTitle = cardCol.querySelector('.card-title') as HTMLTitleElement;

  cardContainer.setAttribute('data-number', String(num));
  cardBody.classList.add(`colored-${objectBase.colors[num]}`);
  cardTitle.innerHTML = `${num + 1}`;

  cardCol.addEventListener('click', () => {
    new LocalStorageItem().setChapter(num);
    // ссылка на мини-игру
  });

  return cardCol;
}

function renderChaptersMiniPage(): void {
  const main = document.querySelector('main') as HTMLDivElement;
  main.innerHTML = chpterLayout;

  const difficultyTitle = main.querySelector('.difficulty-title') as HTMLTitleElement;
  difficultyTitle.innerHTML = `Уровень сложности игры </br><span class="text-uppercase text-warning">${new LocalStorageItem().getPage()}</span>`;
  const cardsContainer = main.querySelector('.chapter-cards');
  if (cardsContainer) cardsContainer.innerHTML = '';
  const len = (localStorage.getItem(StorageItems.token) && localStorage.getItem(StorageItems.id))
    ? 7
    : 6;
  Array.from({ length: len }, (v, i) => i).map((el) => {
    const card = renderChapterMini(Number(el));
    cardsContainer?.append(card);
    return true;
  });
}

export default renderChaptersMiniPage;
