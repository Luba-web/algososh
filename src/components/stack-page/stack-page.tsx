import React from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { delay } from "../utils/utils";
import { Stack } from "./class";
import styles from './stack-page.module.css';

export interface IStack {
  item: string | unknown;
  state?: ElementStates;
  head?: string;
}

export const StackPage: React.FC = () => {
  const stack = new Stack<string>();

  const [arrStack, setArrStack] = React.useState<Array<IStack>>([]);
  const [valueInput, setValueInput] = React.useState<string>('');
  
  const [disabledPush, setDisabledPush] = React.useState<boolean>(false);
  const [disabledPop, setDisabledPop] = React.useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let target = e.target;
    setValueInput(target.value);
  }

  const getPush = async () => {
    setValueInput('');
    setDisabledPush(true);

    const arr = [...arrStack];
    stack.push(valueInput);

    arr.push({
      item: stack.peak(),
      state: ElementStates.Default,
    });
    
    arr[arr.length-1].state = ElementStates.Changing;
    setArrStack([...arr]);

    await delay(SHORT_DELAY_IN_MS);
    arr[arr.length - 1].state = ElementStates.Default;
   
    setDisabledPush(false);
  };

  const getPop = async () => {
    setDisabledPop(true);
    const arr = [...arrStack];

    if (stack.getSize() > 1) {
      stack.pop();
      arr[arr.length - 1].state = ElementStates.Changing;
      await delay(SHORT_DELAY_IN_MS);

      arr.pop();
      setArrStack([...arr]);
    } else {
      arr[arr.length - 1].state = ElementStates.Changing;
      await delay(SHORT_DELAY_IN_MS);
      
      arr.pop();
      getClear();
      setArrStack([...arr]);
    }

    if(arr.length > 0) {
      arr[arr.length - 1].state = ElementStates.Default;
    }

    setDisabledPop(false);
  };

  const getClear = async () => {
    stack.clear();
    setArrStack([]);
  }

  return (
    <SolutionLayout title="Стек">
      <div className={styles.content}>
        <Input value={valueInput} isLimitText = {true} maxLength={4} onChange={handleChange} />
        <Button text={'Добавить'} extraClass="mr-4 ml-4" disabled={valueInput === ''} onClick={getPush} />
        <Button text={'Удалить'} extraClass="mr-40" disabled={ !arrStack.length || disabledPop || disabledPush} onClick={getPop} />
        <Button text={'Очистить'} disabled={!arrStack.length || disabledPop || disabledPush } onClick={getClear} />
      </div>
      <ul className={styles.list}>
        {arrStack?.map((item, index) => {
          return (
            <Circle
              key={index}
              letter={`${item.item}`}
              state={item.state}
              head={index === arrStack.length - 1 ? "top" : ""}
              index={index}
              extraClass={'mt-15'}
            />
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
