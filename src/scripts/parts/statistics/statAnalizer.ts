/* eslint-disable @typescript-eslint/no-unused-vars */
import { getStatistics } from '../../api/statisticsF';
import {
  createUserWord, getUserWord, updateUserWord, daleteUserWord,
} from '../../api/userWordsF';
import { objStartLearned } from '../dictionary/objectBase';

type Obj = {
  [id: string]: number;
};

export default class StatAnalizer {
  wrongArrSprintToday: string[];

  wrongArrAudioToday: string[];

  rightArrSprintToday: string[];

  rightArrAudioToday: string[];

  wrongArrBefore: string[];

  rightArrBefore: string[];

  wrongSetBefore: Set<string>;

  rightSetBefore: Set<string>;

  longSeries: number;

  constructor() {
    this.wrongArrSprintToday = [];
    this.wrongArrAudioToday = [];
    this.rightArrSprintToday = [];
    this.rightArrAudioToday = [];
    this.wrongArrBefore = [];
    this.rightArrBefore = [];
    this.wrongSetBefore = new Set();
    this.rightSetBefore = new Set();
    this.longSeries = 0;
  }

  async fillArrays() {
    await getStatistics().then((el) => {
      if (typeof el !== 'number') {
        Object.keys(el.sprint).forEach((elem) => {
          const compareDate = new Date();
          compareDate.setHours(0);
          if (new Date(Number(elem)) > compareDate) {
            const sprintObj = el.sprint[Number(elem)];
            if (sprintObj) {
              sprintObj[1].forEach((e) => {
                if (e) this.wrongArrSprintToday.push(e);
              });
              sprintObj[0].forEach((e) => {
                if (e) this.rightArrSprintToday.push(e);
              });
              if (sprintObj[2] > this.longSeries) [, ,this.longSeries] = sprintObj;
            }
          } else {
            const sprintObj = el.sprint[Number(elem)];
            if (sprintObj) {
              sprintObj[1].forEach((e) => {
                if (e) this.wrongSetBefore.add(e); this.wrongArrBefore.push(e);
              });
              sprintObj[0].forEach((e) => {
                if (e) this.rightSetBefore.add(e); this.rightArrBefore.push(e);
              });
            }
          }
        });
        Object.keys(el?.['audio-call']).forEach((elem) => {
          const compareDate = new Date();
          compareDate.setHours(0);
          if (new Date(Number(elem)) > compareDate) {
            const sprintObj = el?.['audio-call'][Number(elem)];
            if (sprintObj) {
              sprintObj[1].forEach((e) => {
                if (e) this.wrongArrAudioToday.push(e);
              });
              sprintObj[0].forEach((e) => {
                if (e) this.rightArrAudioToday.push(e);
              });
              if (sprintObj[2] > this.longSeries) [, ,this.longSeries] = sprintObj;
            }
          } else {
            const sprintObj = el?.['audio-call'][Number(elem)];
            if (sprintObj) {
              sprintObj[1].forEach((e) => {
                if (e) this.wrongSetBefore.add(e); this.wrongArrBefore.push(e);
              });
              sprintObj[0].forEach((e) => {
                if (e) this.rightSetBefore.add(e); this.rightArrBefore.push(e);
              });
            }
          }
        });
      }
      return this;
    });
  }

  newWordSprint() {
    const arr = this.wrongArrSprintToday.concat(this.rightArrSprintToday);
    let count = 0;
    arr.forEach((el) => {
      if (this.wrongSetBefore.has(el) || this.rightSetBefore.has(el)) {
        count += 1;
      }
    });
    return count;
  }

  persentageSprint() {
    const arr = this.wrongArrSprintToday.concat(this.rightArrSprintToday);
    return (this.rightArrSprintToday.length / arr.length) * 100;
  }

  newWordAudio() {
    const arr = this.wrongArrAudioToday.concat(this.rightArrAudioToday);
    let count = 0;
    arr.forEach((el) => {
      if (this.wrongSetBefore.has(el) || this.rightSetBefore.has(el)) {
        count += 1;
      }
    });
    return count;
  }

  persentageAudio() {
    const arr = this.wrongArrAudioToday.concat(this.rightArrAudioToday);
    return (this.rightArrAudioToday.length / arr.length) * 100;
  }

  newWordDay() {
    return this.newWordAudio() + this.newWordSprint();
  }

  persentageDay() {
    const arr1 = this.wrongArrAudioToday.concat(
      this.rightArrAudioToday,
      this.wrongArrSprintToday,
      this.rightArrSprintToday,
    );
    const arr2 = this.rightArrSprintToday.concat(this.rightArrAudioToday);
    return (arr2.length / arr1.length) * 100;
  }

  learenedToday() {
    const resultRight = this.getObj(this.rightArrBefore);
    const resultWrong = this.getObj(this.wrongArrBefore);
    const resultRightNow = this.getObj(this.rightArrAudioToday.concat(this.rightArrSprintToday));
    const resultWrongNow = this.getObj(this.wrongArrAudioToday.concat(this.wrongArrSprintToday));
    let learened = 0;
    const learnedArr: string[] = [];

    Object.keys(resultRightNow).forEach((el) => {
      if (!isWrong(el) && isRightFeeted(el)) {
        learened += 1;
        learnedArr.push(el);
      }
    });

    learnedArr.forEach((el) => {
      getUserWord(el).then((elem) => {
        if (typeof elem === 'number') {
          createUserWord(el, objStartLearned);
        } else {
          updateUserWord(el, { difficulty: 'light', optional: { learned: true } });
        }
      });
    });

    return { number: learened, arr: learnedArr };

    function isWrong(el: string) {
      if (resultWrong[el] || resultWrongNow[el]) return true;
      return false;
    }

    function isRightFeeted(el: string) {
      if ((resultRight[el] < 3 || !resultRight[el])
      && (resultRight[el] || 0) + resultRightNow[el] >= 3) {
        return true;
      }
      return false;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  getObj(arr: string[]) {
    return arr.reduce((acc: Obj, rec) => ((typeof acc[rec] !== 'undefined')
      ? { ...acc, [rec]: acc[rec] + 1 }
      : { ...acc, [rec]: 1 }), {});
  }

  wrongTotal(id: string): number {
    const newArr = this.wrongArrAudioToday.concat(
      this.wrongArrSprintToday,
      this.wrongArrBefore,
    );
    const wrongRes = this.getObj(newArr);
    if (wrongRes[id]) return wrongRes[id];
    return 0;
  }

  rightTotal(id: string): number {
    const rightRes = this.getObj(this.rightArrAudioToday.concat(
      this.rightArrSprintToday,
      this.rightArrBefore,
    ));
    if (rightRes[id]) return rightRes[id];
    return 0;
  }
}
