import DOMAIN from './domain';
import { General, SubGeneral } from '../interfaces/generalEnum';
import { IStat, IForOptional } from '../interfaces/statisticsInterface';
import { StorageItems } from '../interfaces/usersInterface';

function shapeFetchStr(): string {
  return `${DOMAIN}${General.users}/${localStorage.getItem(StorageItems.id)}${SubGeneral.statistics}`;
}

async function getStatistics() {
  const rawResponse = await fetch(`${shapeFetchStr()}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem(StorageItems.token)}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  if (rawResponse.ok) {
    const content: IStat = await rawResponse.json();
    return content.optional;
  }
  if (rawResponse.status === 404) {
    return rawResponse.status;
  }
  return rawResponse.status;
}

async function setStatistics(
  gameName:'sprint' | 'audio-call',
  idDate:number,
  rightArr: string[],
  wrongArr: string[],
  sessionLength: number,
) {
  getStatistics().then(async (el) => {
    const objectToSet = gameName === 'sprint'
      ? {
        sprint: {
          [idDate]: [rightArr, wrongArr, sessionLength],
        },
        'audio-call': { 1645443360195: [[], [], 0] },
      } : {
        sprint: { 1645443360195: [[], [], 0] },
        'audio-call': {
          [idDate]: [rightArr, wrongArr, sessionLength],
        },
      };

    if (el === 404) {
      const rawResponse = await fetch(`${shapeFetchStr()}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem(StorageItems.token)}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          learnedWords: 0,
          optional: objectToSet,
        }),
      });
      const content: IStat = await rawResponse.json();
      return content.optional;
    }

    const a = JSON.stringify({
      learnedWords: 0,
      optional: {
        sprint: { ...(<IForOptional>el)?.sprint, ...objectToSet.sprint },
        'audio-call': { ...(<IForOptional>el)?.['audio-call'], ...objectToSet['audio-call'] },
      },
    });
    if (a.length > 1500) return null;

    const rawResponse = await fetch(`${shapeFetchStr()}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem(StorageItems.token)}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        learnedWords: 0,
        optional: {
          sprint: { ...(<IForOptional>el)?.sprint, ...objectToSet.sprint },
          'audio-call': { ...(<IForOptional>el)?.['audio-call'], ...objectToSet['audio-call'] },
        },
      }),
    });
    const content: IStat = await rawResponse.json();
    return content.optional;
  });
}

export { getStatistics, setStatistics };
