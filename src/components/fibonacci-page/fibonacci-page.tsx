
import React from "react";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./fibonacci-page.module.css";
import { Circle } from "../ui/circle/circle";
import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from "../../constants/delays";
import { fibonacci } from "./utils";
import { delay } from "../utils/utils";

export const FibonacciPage: React.FC = () => {

  const [valueInput, setValueInput] = React.useState<number | string>('');
  const [arrFib, setArrFib] = React.useState<Array<number>>([]);
  const [disabled, setDisabled] = React.useState<boolean>(false);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    let target = e.target as HTMLInputElement;
    //+target делает из строки число так же как Numder(target)
    +target.value > 0  ? setDisabled(false) : setDisabled(true);
    setValueInput(+target.value);
  }

  const handleFibArr = async (valueInput: number) => {
    setDisabled(true);
    await fibonacci(valueInput + 1, setArrFib);
    setDisabled(false);
  }

  const handleClick = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    handleFibArr(+valueInput);
    setValueInput('');
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.content}>
      <Input value={valueInput} type="number" max={19} isLimitText={true} extraClass={'mr-4'} onChange={handleChange}></Input>
      <Button text='Рассчитать' isLoader={false} disabled={disabled} onClick={handleClick}></Button>
      </div>
      <ul className={styles.list} style={arrFib?.length < 11 ? { justifyContent: 'center' } : { justifyContent: 'flex-start' }}>
       {arrFib?.map((item, index) => (
          <li key = {index}>
            <Circle
              letter={item + ''}
              index={index}
            />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
