import { getWords, getWord } from '../../api/wordsF';
import { classesToBeUsed, objectBase } from './objectBase';
import { wordList, wordListItem } from './dictionaryLayouts';

function renderWord() {

};

function renderWordsPage(num: number) {
  const main = document.querySelector('main') as HTMLDivElement;
  main.innerHTML = wordList;
  const mainContainer = main.querySelector('.wordlist') as HTMLDivElement;
  mainContainer.classList.add(`colored-${objectBase.colors[num]}`);
}

export { renderWordsPage };