import React from 'react';
import { DELAY_IN_MS } from '../../constants/delays';
import { Direction } from '../../types/direction';
import { ElementStates } from '../../types/element-states';
import { Button } from '../ui/button/button';
import { Column } from '../ui/column/column';
import { RadioInput } from '../ui/radio-input/radio-input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { delay, IElemState, randomArr, swapString } from '../utils/utils';
import styles from './sorting-page.module.css';

export const SortingPage: React.FC = () => {
  const [checked, setChecked] = React.useState<string>('selection');
  const [arrSort, setArrSort] = React.useState<Array<IElemState>>([]);
  const [, setAscending] = React.useState<boolean>(false);
  const [, setDescending] = React.useState<boolean>(false);
  const [isLoader, setIsLoader] = React.useState<boolean>(false);

  React.useEffect(() => {
    getRandomArr();
  }, []);

  const getRandomArr = () => {
    return setArrSort(randomArr());
  };

  const bubbleSort = async (typeSort: string) => {
    setIsLoader(true);
    typeSort === 'ascending' ? setAscending(true) : setDescending(true);
    const arrSortNew = [...arrSort];
    const length = arrSortNew.length;

    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        arrSortNew[j].state = ElementStates.Changing;
        arrSortNew[j + 1].state = ElementStates.Changing;
        setArrSort([...arrSortNew]);
        await delay(DELAY_IN_MS);
        if (typeSort === 'ascending') {
        }
        if (
          (typeSort === 'ascending' &&
            arrSortNew[j].item > arrSortNew[j + 1].item) ||
          (typeSort === 'descending' &&
            arrSortNew[j].item < arrSortNew[j + 1].item)
        ) {
          swapString(arrSortNew, j, j + 1);
          setArrSort([...arrSortNew]);
        }
        arrSortNew[j].state = ElementStates.Default;
        arrSortNew[j + 1].state = ElementStates.Default;
        setArrSort([...arrSortNew]);
      }

      arrSortNew[length - i - 1].state = ElementStates.Modified;
      setArrSort([...arrSortNew]);
    }
    setIsLoader(false);
    typeSort === 'ascending' ? setAscending(false) : setDescending(false);
  };

  const selectionSort = async (typeSort: string) => {
    setIsLoader(true);
    typeSort === 'ascending' ? setAscending(true) : setDescending(true);
   
    const arrSortNew = [...arrSort];
    const length = arrSortNew.length;

    for (let i = 0; i < length - 1; i++) {
      let index = i;
      for (let j = i + 1; j < length; j++) {
        arrSortNew[i].state = ElementStates.Changing;
        arrSortNew[j].state = ElementStates.Changing;
        setArrSort([...arrSortNew]);
        await delay(DELAY_IN_MS);
        if (
          (typeSort === 'descending' &&
            arrSortNew[index].item < arrSortNew[j].item) ||
          (typeSort === 'ascending' &&
            arrSortNew[index].item > arrSortNew[j].item)
        ) {
          index = j;
        }
     
        arrSortNew[j].state = ElementStates.Default;
        setArrSort([...arrSortNew]);       
      }

      swapString(arrSortNew, i, index);
      arrSortNew[index].state = ElementStates.Default;
      arrSortNew[i].state = ElementStates.Modified;
    }
    arrSortNew[length - 1].state = ElementStates.Modified;
    setArrSort([...arrSortNew]);
    setIsLoader(false);
    typeSort === 'ascending' ? setAscending(false) : setDescending(false);
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.content}>
        <RadioInput
          label="Выбор"
          disabled={isLoader}
          checked={checked === 'selection'}
          onChange={() => setChecked('selection')}
          extraClass="mr-20"
        />
        <RadioInput
          label="Пузырёк"
          disabled={isLoader}
          checked={checked === 'bubble'}
          onChange={() => setChecked('bubble')}
          extraClass="mr-20"
        />
        <Button
          text={'По возрастанию'}
          disabled={isLoader}
          sorting={Direction.Ascending}
          extraClass="mr-6"
          onClick={() =>
            checked === 'selection'
              ? selectionSort('ascending')
              : bubbleSort('ascending')
          }
        />
        <Button
          text={'По убыванию'}
          disabled={isLoader}
          sorting={Direction.Descending}
          extraClass="mr-40"
          onClick={() =>
            checked === 'selection'
              ? selectionSort('descending')
              : bubbleSort('descending')
          }
        />
        <Button
          text={'Новый массив'}
          onClick={getRandomArr}
          disabled={isLoader}
        />
      </div>
      <ul className={styles.list}>
        {arrSort?.map((item, index) => {
          return (
            <Column
              key={index}
              index={+item.item}
              state={item.state}
              extraClass={'mt-25'}
            />
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
