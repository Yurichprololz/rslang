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

export { Words, IWords };
