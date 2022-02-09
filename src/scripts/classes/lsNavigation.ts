type VoidReturnFN = () => void;
type StringReturnFN = () => string;
type NumberReturnFN = () => number;
type StringGetFN = (k: string) => void;
type NumberGetFN = (k: number) => void;
type IgetAny = (k: string) => string | number | null;
type ISetAny = (k: string, b: string | number | null) => void;

interface ForLocalStorageItem{
  storage:Storage;
  startStorage: VoidReturnFN,

  getPage: StringReturnFN,
  getChapter: NumberReturnFN,
  getWordlist: NumberReturnFN,

  setPage: StringGetFN,
  setChapter: NumberGetFN,
  setWordlist: NumberGetFN,

  getAny: IgetAny;
  setAny: ISetAny;
}

enum StorageKeys{
  keyId = 'navRSlang',
  page = 'page',
  home = 'home',
  registration = 'registration',
  chapter = 'chapter',
  wordlist = 'wordlist',
  audio = 'audio',
  sprint = 'sprint',
  statistics = 'statistics',
}

const localhostStartObj = {
  page: 'home',
  registration: null,
  chapter: 0,
  wordlist: 0,
  audio: null,
  sprint: null,
  statistics: null,
};

class LocalStorageItem implements ForLocalStorageItem {
  storage: Storage;

  constructor() {
    this.storage = localStorage;
  }

  startStorage():void {
    this.storage.setItem(StorageKeys.keyId, JSON.stringify(localhostStartObj));
  }

  getPage():string {
    return <string> this.getAny(StorageKeys.page);
  }

  getChapter(): number {
    return <number> this.getAny(StorageKeys.chapter);
  }

  getWordlist():number {
    return <number> this.getAny(StorageKeys.wordlist);
  }

  setPage(pageParam: string): void {
    this.setAny(StorageKeys.page, pageParam);
  }

  setChapter(chapterNum: number): void {
    this.setAny(StorageKeys.chapter, chapterNum);
  }

  setWordlist(wordlistNum: number): void {
    this.setAny(StorageKeys.wordlist, wordlistNum);
  }

  getAny(key: string):string | number | null {
    const obj = JSON.parse(<string> this.storage.getItem(StorageKeys.keyId));
    return obj[key];
  }

  setAny(key: string, newData: string | number | null): void {
    const obj = JSON.parse(<string> this.storage.getItem(StorageKeys.keyId));
    obj[key] = newData;
    this.storage.setItem(StorageKeys.keyId, JSON.stringify(obj));
  }
}

export { LocalStorageItem, StorageKeys };
