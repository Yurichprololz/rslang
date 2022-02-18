enum Words {
  id = 'id',
  group = 'group',
  page = 'page',
  word = 'word',
  image = 'image',
  audio = 'audio',
  audioMeaning = 'audioMeaning',
  audioExample = 'audioExample',
  textMeaning = 'textMeaning',
  textExample = 'textExample',
  transcription = 'transcription',
  wordTranslate = 'wordTranslate',
  textMeaningTranslate = 'textMeaningTranslate',
  textExampleTranslate = 'textExampleTranslate',
}

interface IWords {
  id: string,
  group: number,
  page: number,
  word: string,
  image: string,
  audio: string,
  audioMeaning: string,
  audioExample: string,
  textMeaning: string,
  textExample: string,
  transcription: string,
  wordTranslate: string,
  textMeaningTranslate: string,
  textExampleTranslate: string
}

enum WordOptional{
  difficulty = 'difficulty',
  optional = 'optional',
  learned = 'learned',
  failure = 'failure',
  success = 'success',
}
interface IWordOptional {
  learned: boolean,
}
interface IUserWordsObj {
  difficulty: string,
  optional?: IWordOptional,
}

interface IUserWords {
  userId: string,
  wordId: string,
  difficulty: string,
  optional?: IWordOptional,
}

enum ForAggrObj {
  group = 'group',
  page = 'page',
  wordsPerPage = 'wordsPerPage',
  filter = 'filter',
  difficulty = 'userWord.difficulty',
  and = '$and',
  or = '$or',
}

interface FilterObj {
  'userWord.optional.learned' ?: string,
  'userWord.difficulty' ?: string,
  '$and' ?: {}[],
  '$or' ?: {}[],
}
interface IAggrObj {
  group?: number,
  page?: number,
  wordsPerPage?: number,
  filter?: any,
}

interface AggregRes {
  paginatedResults: IWords[],
  totalCount: {
    'count': number
  }[],
}

export {
  Words, IWords, IUserWords, WordOptional, IUserWordsObj, IAggrObj, ForAggrObj, AggregRes,
};
