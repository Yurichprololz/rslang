import DOMAIN from './domain';
import { Words, IWords } from '../interfaces/wordsInterface';
import { General } from '../interfaces/generalEnum';

async function getWords(group: number, page: number) {
  const rawResponse: Response = await fetch(`${DOMAIN}${General.words}?${Words.group}=${group}&${Words.page}=${page}`);
  const content: IWords[] = await rawResponse.json();
  return content;
}

async function getWord(id: string) {
  const rawResponse: Response = await fetch(`${DOMAIN}${General.words}/${id}`);
  const content: IWords = await rawResponse.json();
  return content;
}

export { getWords, getWord };
