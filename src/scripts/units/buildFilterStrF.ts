import { IAggrObj, ForAggrObj } from '../interfaces/wordsInterface';

export default function buildFilterStrF(obj: IAggrObj) {
  let str = '?';
  if (ForAggrObj.group in obj) {
    str += `${ForAggrObj.group}=${obj[ForAggrObj.group]}&`;
  }
  if (ForAggrObj.page in obj) {
    str += `${ForAggrObj.page}=${obj[ForAggrObj.page]}&`;
  }
  if (ForAggrObj.wordsPerPage in obj) {
    str += `${ForAggrObj.wordsPerPage}=${obj[ForAggrObj.wordsPerPage]}&`;
  }
  if (ForAggrObj.filter in obj) {
    str += `${ForAggrObj.filter}=${JSON.stringify(obj[ForAggrObj.filter])}`;
  }
  if (str[str.length - 1] === '&') {
    str = str.slice(0, str.length - 2);
  }
  return str;
}

// Пример:

// const obj = {
//   group: 2,
//   page: 2,
//   filter: {
//     'userWord.difficulty': 'hard',
//   },
// };

// buildFilterStrF(obj) =>
// '?group=2&page=2&filter={"userWord.difficulty":"hard"}'
