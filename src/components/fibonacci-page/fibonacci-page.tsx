
import React from "react";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./fibonacci-page.module.css";
import { Circle } from "../ui/circle/circle";
import { fibonacci } from "./utils";
import { useForm } from "../../hooks/useForm";

export const FibonacciPage: React.FC = () => {

  // const [valueInput, setValueInput] = React.useState<number | string>('');

  const {valueInput, handleChange, setValueInput} = useForm({});
  const [arrFib, setArrFib] = React.useState<Array<number>>([]);
  const [disabled, setDisabled] = React.useState<boolean>(false);
  //console.log(valueInput)
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   let target = e.target;
  //   setValueInput(+target.value);
  // }

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
      <Input value={valueInput} type="number" max={19} isLimitText={true} maxLength={2} extraClass={'mr-4'} onChange={handleChange}></Input>
      <Button text='Рассчитать' isLoader={disabled} disabled={valueInput === '' || valueInput >= 20 || valueInput < 1} onClick={handleClick}></Button>
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
