import { ElementStates } from "../../types/element-states";

export interface IElemState {
  state?: ElementStates;
  item: string;
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