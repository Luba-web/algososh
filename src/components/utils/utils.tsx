import { ElementStates } from "../../types/element-states";

export interface IElemState {
  item: string | number;
  state?: ElementStates;
}
//swapString
export const swapString = (arr: string[] | number[] | IElemState[], firstIndex: number, secondIndex: number): void => {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
};

//delay
export const delay = (num: number) => {
  return new Promise(resolve => setTimeout(resolve, num));
}

//randomNum
export const randomNum = (min: number, max: number): number => {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

//randomArr size от 3-17 числа от 0 до 100
export const randomArr = () => {
  let arr: IElemState[] = [];
  const max = 100;
  const min = 0;
  const minSize = 3;
  const maxSize = 17;

  for (let i = 0; i < randomNum(minSize, maxSize); i++) {
    arr.push({ item: randomNum(min, max), state: ElementStates.Default});
  }

  return arr;
}

