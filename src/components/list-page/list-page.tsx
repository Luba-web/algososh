import React from 'react';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { ElementStates } from '../../types/element-states';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { ArrowIcon } from '../ui/icons/arrow-icon';
import { Input } from '../ui/input/input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { delay } from '../utils/utils';
import { LinkedList } from './class';

import styles from './list-page.module.css';

interface IArrList {
  item: string;
  state: ElementStates;
  head?: boolean;
  tail?: boolean;
  add?: boolean;
  dell?: boolean;
  miniCircle?: {
    name: string;
  };
}

interface IDisabledList {
  addHead: boolean;
  addTail: boolean;
  deleteTail: boolean;
  deleteHead: boolean;
  addByIndex: boolean;
  deleteByIndex: boolean;
}

export const ListPage: React.FC = () => {
  const arrStart: Array<number> = [0, 34, 8, 1];

  const initArr: Array<IArrList> = arrStart.map((item, index, array) => ({
    item: `${item}`,
    state: ElementStates.Default,
    add: false,
    dell: false,
    head: index === 0 ? true : false,
    tail: index === array.length - 1 ? true : false,
  }));

  const list = React.useRef(new LinkedList<any>(initArr));
  const [arr, setArr] = React.useState<Array<IArrList>>(initArr);

  const [valueInput, setValueInput] = React.useState<string>('');
  const [valueInputIndex, setValueInputIndex] = React.useState<number | null>(null);

  const [isLoader, setIsLoader] = React.useState<IDisabledList>({
    addHead: false,
    addTail: false,
    deleteHead: false,
    deleteTail: false,
    addByIndex: false,
    deleteByIndex: false,
  });
  const [disabled, setDisabled] = React.useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueInput(e.target.value);
  };

  const handleChangeIndex = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueInputIndex(+e.target.value);
    //валидация input от 0 до 9
    if(+e.target.value > 9 || +e.target.value < 0) {
      setValueInputIndex(arr.length);
    }
  };

  const addHead = async () => {
    setIsLoader({
      ...isLoader,
      addHead: true,
    })
    setDisabled(true);

    list.current.prepend(valueInput);
    arr[0] = {
      ...arr[0],
      add: true,
      head: false,
      miniCircle: { name: valueInput },
    };

    setArr([...arr]);
    await delay(SHORT_DELAY_IN_MS);

    arr[0] = { ...arr[0], add: false, head: false, miniCircle: undefined };

    setArr([...arr]);
    await delay(SHORT_DELAY_IN_MS);

    arr.unshift({
      item: valueInput,
      state: ElementStates.Modified,
    });

    setArr([...arr]);
    await delay(SHORT_DELAY_IN_MS);

    arr[0] = { ...arr[0], state: ElementStates.Default, head: true };
    setArr([...arr]);

    setDisabled(false);
    setIsLoader({
      ...isLoader,
      addHead: false,
    })
    setValueInput('');
  };

  const addTail = async () => {
    setIsLoader({
      ...isLoader,
      addTail: true,
    })
    setDisabled(true);
    setValueInput('');

    list.current.append(valueInput);
    arr[arr.length - 1] = {
      ...arr[arr.length - 1],
      add: true,
      tail: false,
      miniCircle: { name: valueInput },
    };
    setArr([...arr]);

    await delay(SHORT_DELAY_IN_MS);

    arr[arr.length - 1] = {
      ...arr[arr.length - 1],
      add: false,
      tail: false,
      miniCircle: undefined,
    };
    setArr([...arr]);

    await delay(SHORT_DELAY_IN_MS);

    arr.push({
      item: valueInput,
      state: ElementStates.Modified,
    });

    setArr([...arr]);
    await delay(SHORT_DELAY_IN_MS);

    arr[arr.length - 1] = {
      ...arr[arr.length - 1],
      state: ElementStates.Default,
      tail: true,
    };
    setArr([...arr]);

    arr[arr.length - 2] = { ...arr[arr.length - 2], tail: false };
    setArr([...arr]);

    setDisabled(false);
    setIsLoader({
      ...isLoader,
      addTail: false,
    })
  };

  const deleteHead = async () => {
    setIsLoader({
      ...isLoader,
      deleteHead: true,
    })
    setDisabled(true);
    
    list.current.deleteNode(0);
    arr[0] = {
      ...arr[0],
      item: '',
      head: false,
      dell: true,
      miniCircle: { name: arr[0].item },
    };
    setArr([...arr]);

    await delay(SHORT_DELAY_IN_MS);

    arr.shift();
    arr[0].state = ElementStates.Modified;

    setArr([...arr]);

    await delay(SHORT_DELAY_IN_MS);

    arr[0] = { ...arr[0], state: ElementStates.Default, head: true };
    setArr([...arr]);
    setValueInput('');

    setDisabled(false);
    setIsLoader({
      ...isLoader,
      deleteHead: false,
    })
  };

  const deleteTail = async () => {
    setIsLoader({
      ...isLoader,
      deleteTail: true,
    })
    setDisabled(true);

    list.current.deleteNode(arr.length - 1);
    arr[arr.length - 1] = {
      ...arr[arr.length - 1],
      item: '',
      tail: false,
      dell: true,
      miniCircle: { name: arr[arr.length - 1].item },
    };

    setArr([...arr]);
    await delay(SHORT_DELAY_IN_MS);

    arr.pop();
    arr[arr.length - 1].state = ElementStates.Modified;

    setArr([...arr]);
    await delay(SHORT_DELAY_IN_MS);

    arr[arr.length - 1].state = ElementStates.Default;
    setArr([...arr]);

    arr[arr.length - 1].tail = true;

    setArr([...arr]);
    setValueInput('');

    setDisabled(false);
    setIsLoader({
      ...isLoader,
      deleteTail: false,
    })
  };

  const addIndex = async (index: number) => {
    setIsLoader({
      ...isLoader,
      addByIndex: true,
    })
    setDisabled(true);

    const size = list.current.getSize();
    if (index< 0 || index > size) {
      return;
    }

    list.current.insertAt(valueInput, index);
    for (let i = 0; i <= index; i++) {
      if (i < size) {
        arr[i] = { ...arr[i], add: true, miniCircle: { name: valueInput }};
      }
      if (i > 0 && i < size) {
        arr[i - 1] = {
          ...arr[i - 1],
          state: ElementStates.Changing,
          add: false,
          miniCircle: undefined,
        };
      }
      if (i === index && index === 0) {
        arr[0].head = false;
      }
      if (i === size - 1 && index === size) {
        arr[size - 1].tail = false;
      }
      setArr([...arr]);
      await delay(SHORT_DELAY_IN_MS);
    }
    if (index === size) {
      arr[index! - 1] = {
        ...arr[index! - 1],
        add: false,
        miniCircle: undefined,
      };
      arr.push({
        item: valueInput,
        state: ElementStates.Modified,
      });
    } else {
      arr[index] = {
        ...arr[index],
        add: false,
        miniCircle: undefined,
      };
      arr.splice(index, 0, {
        item: valueInput,
        state: ElementStates.Modified,
      });
    }
    setArr([...arr]);
    await delay(SHORT_DELAY_IN_MS);
    if (index === 0) {
      arr[0].head = true;
    }

    if (index === size) {
      arr[size].tail = true;
    }

    arr.forEach((item) => (item.state = ElementStates.Default));
    setArr([...arr]);

    setDisabled(false);
    setIsLoader({
      ...isLoader,
      addByIndex: false,
    })
    setValueInput('');
    setValueInputIndex(null);
  };

  const deleteIndex = async (index: number) => {
    setIsLoader({
      ...isLoader,
      deleteByIndex: true,
    })
    setDisabled(true);

    list.current.deleteNode(index);
    for (let i = 0; i <= index; i++) {
      arr[i].state = ElementStates.Changing;
      setArr([...arr]);
      await delay(SHORT_DELAY_IN_MS);
    }
    arr[index] = {
      ...arr[index],
      item: '',
      dell: true,
      miniCircle: { name: arr[index].item },
    };
    setArr([...arr]);

    await delay(SHORT_DELAY_IN_MS);

    arr.splice(index, 1);
    setArr([...arr]);

    await delay(SHORT_DELAY_IN_MS);

    arr.forEach((item) => (item.state = ElementStates.Default));
    setArr([...arr]);

    arr[arr.length - 1].tail = true;
    arr[0].head = true;

    setArr([...arr]);
    setValueInput('');
    setValueInputIndex(null);

    setDisabled(false);
    setIsLoader({
      ...isLoader,
      deleteByIndex: false,
    })
  };

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.content}>
        <Input
          placeholder={'Введите значение'}
          isLimitText={true}
          maxLength={4}
          value={valueInput}
          disabled={disabled}
          onChange={handleChange}
          extraClass={`${styles.input}`}
        />
        <Button
          text={'Добавить в head'}
          disabled={!valueInput || disabled || arr.length >= 7}
          isLoader={isLoader.addHead}
          onClick={addHead}
          extraClass={`${styles.smallBtn} ml-6`}
        />
        <Button
          text={'Добавить в tail'}
          disabled={!valueInput || disabled || arr.length >= 7}
          isLoader={isLoader.addTail}
          onClick={addTail}
          extraClass={`${styles.smallBtn} ml-6`}
        />
        <Button
          text={'Удалить из head'}
          disabled={arr.length <= 1 || disabled}
          isLoader={isLoader.deleteHead}
          onClick={deleteHead}
          extraClass={`${styles.smallBtn} ml-6`}
        />
        <Button
          text={'Удалить из tail'}
          disabled={arr.length <= 1 || disabled}
          isLoader={isLoader.deleteTail}
          onClick={deleteTail}
          extraClass={`${styles.smallBtn} ml-6`}
        />
      </div>
      <div className={styles.content}>
        <Input 
          type='number'
          maxLength={4}
          max={arr.length-1}
          value={valueInputIndex == null ? '' : valueInputIndex}
          extraClass={`${styles.input}`} 
          disabled={disabled}
          placeholder={'Введите индекс'} 
          onChange={handleChangeIndex} 
          />
        <Button
          text={'Добавить по индексу'}
          disabled={valueInput === '' || valueInputIndex === null || valueInputIndex > arr.length || arr.length >= 7 || disabled}
          isLoader={isLoader.addByIndex}
          onClick={() => addIndex(valueInputIndex as number)}
          extraClass={`${styles.bigBtn} ml-6`}
        />
        <Button
          text={'Удалить по индексу'}
          disabled={valueInputIndex as number > arr.length - 1 || disabled || arr.length - 1 < 1 || valueInputIndex === null}
          isLoader={isLoader.deleteByIndex}
          onClick={() => deleteIndex(valueInputIndex as number)}
          extraClass={`${styles.bigBtn} ml-6`}
        />
      </div>
      <ul className={styles.list}>
        {arr?.map((item, index) => {
          return (
            <li key={index + 1} className={styles.block}>
              <Circle
                key={index}
                letter={item.item}
                index={index}
                head={item.head ? 'head' : ''}
                tail={item.tail ? 'tail' : ''}
                state={item.state}
              />

              {index !== arr.length - 1 && (
                <ArrowIcon
                  fill={
                    item.state === ElementStates.Changing
                      ? '#d252e1'
                      : '#0032FF'
                  }
                />
              )}

              {item.add && (
                <Circle
                  isSmall={true}
                  state={ElementStates.Changing}
                  letter={item.miniCircle?.name}
                  extraClass={styles.add}
                />
              )}

              {item.dell && (
                <Circle
                  isSmall={true}
                  state={ElementStates.Changing}
                  letter={item.miniCircle?.name}
                  extraClass={styles.dell}
                />
              )}
            </li>
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
