import DOMAIN from './domain';
import {
  StorageItems,
} from '../interfaces/usersInterface';
import { General, SubGeneral } from '../interfaces/generalEnum';
import {
  IUserWords, IUserWordsObj, IAggrObj, AggregRes,
} from '../interfaces/wordsInterface';
import buildFilterStrF from '../units/buildFilterStrF';
import { refreshToken } from './userF';

function shapeFetchStr(): string {
  return `${DOMAIN}${General.users}/${localStorage.getItem(StorageItems.id)}${General.words}`;
}

function shapeAggrFetchStr(): string {
  return `${DOMAIN}${General.users}/${localStorage.getItem(StorageItems.id)}${SubGeneral.aggregatedWords}`;
}

async function getUserWords(): Promise<IUserWords[]> {
  const rawResponse = await fetch(`${shapeFetchStr()}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem(StorageItems.token)}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  if (rawResponse.status === 401 || rawResponse.status === 403) {
    await refreshToken();
    return getUserWords();
  }
  const content: IUserWords[] = await rawResponse.json();
  return content;
}

async function createUserWord(wordId: string, wordObj: IUserWordsObj) {
  const rawResponse = await fetch(`${shapeFetchStr()}/${wordId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem(StorageItems.token)}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(wordObj),
  });
  if (rawResponse.status === 417) {
    return updateUserWord(wordId, wordObj);
  }
  const content: IUserWords = await rawResponse.json();
  return content;
}

async function getUserWord(wordId: string)
  : Promise<IUserWords> {
  const rawResponse = await fetch(`${shapeFetchStr()}/${wordId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem(StorageItems.token)}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  if (rawResponse.status === 401) {
    await refreshToken();
    return getUserWord(wordId);
  }
  const content: IUserWords = await rawResponse.json();
  return content;
}

async function getAggregatedWords(groupObj: IAggrObj) {
  const rawResponse = await fetch(`${shapeAggrFetchStr()}${buildFilterStrF(groupObj)}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem(StorageItems.token)}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const content: AggregRes[] = await rawResponse.json();
  return content[0].paginatedResults;
}

// как будто бесполезная функция. Возвращает то же самое, что и getWord только в массиве из 1 элем.
async function getAggregatedWord(wordId: string) {
  const rawResponse = await fetch(`${shapeAggrFetchStr()}/${wordId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem(StorageItems.token)}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const content: IUserWords[] = await rawResponse.json();
  return content[0];
}

async function updateUserWord(wordId: string, wordObj: IUserWordsObj) {
  const rawResponse = await fetch(`${shapeFetchStr()}/${wordId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${localStorage.getItem(StorageItems.token)}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(wordObj),
  });
  const content: IUserWords = await rawResponse.json();
  return content;
}

async function daleteUserWord(wordId: string) {
  await fetch(`${shapeFetchStr()}/${wordId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem(StorageItems.token)}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
}

export {
  createUserWord, getUserWord, updateUserWord, daleteUserWord, getUserWords, getAggregatedWords,
  getAggregatedWord,
};
