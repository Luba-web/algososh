import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { delay } from "../utils/utils";

// Из тренажера 
const calcFibonacci = (n: number, memo: Record<number, number> = {}): number => {
  if (n in memo) {
    return memo[n];
  }
  if (n <= 2) {
    return 1;
  }
  memo[n] = calcFibonacci(n - 1, memo) + calcFibonacci(n - 2, memo);
  return memo[n];
};

export const fibonacci = async (num: number, func: Function) => {
  const array: number[] = [];

  for (let i = 1; i <= num; i++) {
    array.push(calcFibonacci(i));
    func([...array]);
    await delay(SHORT_DELAY_IN_MS);
  }
};
