/* eslint-disable no-param-reassign */
// The maximum is exclusive and the minimum is inclusive
export default function randomInt(min: number, max:number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
