import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./string.module.css";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS } from "../../constants/delays";
import { delay, IElemState, swapString } from "../utils/utils";

export const StringComponent: React.FC = () => {

const [valueInput, setValueInput] = React.useState<string>('');
const [valueString, setValueString] = React.useState<Array<IElemState>>([]);
const [isLoader, setIsLoader] = React.useState<boolean>(false);

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setValueInput(e.target.value);
}

const handleClick = (e: React.SyntheticEvent): void => {
  e.preventDefault(); 
  reverseString(valueInput);
  setValueInput('');
}

//код сортировки реверса
const reverseString = async (str: string) => { 
  setIsLoader(true);
  const arrString: IElemState[] = [];
  str.split('').forEach((item) => {
    arrString.push({item: item, state: ElementStates.Default})
  })
  setValueString(arrString);
  let start = 0;
  let end = arrString.length - 1;
  
  while (start < end) {
    if(end < 3) {
      arrString[start].state = ElementStates.Changing
      arrString[end].state = ElementStates.Changing
    }
    await delay(DELAY_IN_MS);
    swapString(arrString, start, end);
    arrString[start].state = ElementStates.Modified
    arrString[end].state = ElementStates.Modified
    start++;
    end--;
    arrString[start].state = ElementStates.Changing
    arrString[end].state = ElementStates.Changing
    setValueString([...arrString])
  }
  arrString[start].state = ElementStates.Modified
  arrString[end].state = ElementStates.Modified
  setValueString([...arrString])
  setIsLoader(false);
}

return (
    <SolutionLayout title="Строка">
      <div className={styles.content}>
      <Input value={valueInput} isLimitText = {true} maxLength={11} extraClass={'mr-4'} onChange={handleChange}></Input>
      <Button text={'Развернуть'} isLoader={isLoader} disabled={valueInput === ''} onClick={handleClick}></Button>
      </div>
      <ul className={styles.list}>
       {valueString?.map((item, index) => (
          <li key = {index}>
            <Circle
              letter={item.item + ''}
              state={item.state}
            />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
