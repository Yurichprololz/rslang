interface IGames {
  [id: number]: [string[], string[], number],
}

interface IForOptional {
  sprint: IGames,
  'audio-call': IGames,
}

interface IStat {
  learnedWords: 0,
  optional: IForOptional,
}

export { IStat, IForOptional };
