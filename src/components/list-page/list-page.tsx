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
  disabled: boolean;
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
  const [valueInputIndex, setValueInputIndex] = React.useState<string>('');

  const [isLoader, setIsLoader] = React.useState<IDisabledList>({
    addHead: false,
    addTail: false,
    deleteHead: false,
    deleteTail: false,
    addByIndex: false,
    deleteByIndex: false,
    disabled: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let target = e.target as HTMLInputElement;
    setValueInput(target.value);
  };

  const handleChangeIndex = (e: React.ChangeEvent<HTMLInputElement>) => {
    let target = e.target as HTMLInputElement;
    setValueInputIndex(target.value);
  };

  const addHead = async () => {
    setIsLoader({
      ...isLoader,
      disabled: true,
      addHead: true,
      addTail: true,
    })

    setValueInput('');
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

    setIsLoader({
      ...isLoader,
      disabled: false,
      addHead: false,
      addTail: false,
    })
    setValueInput('');
  };

  const addTail = async () => {
    setIsLoader({
      ...isLoader,
      disabled: true,
      addTail: true,
    })

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
    
    setIsLoader({
      ...isLoader,
      disabled: false,
      addTail: false,
    })
    setValueInput('');
  };

  const deleteHead = async () => {
    setIsLoader({
      ...isLoader,
      disabled: true,
      deleteHead: true,
    })
    list.current.deleteList(0);
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
    setIsLoader({
      ...isLoader,
      disabled: false,
      deleteHead: false,
    })
  };

  const deleteTail = async () => {
    setIsLoader({
      ...isLoader,
      disabled: true,
      deleteTail: true,
    })
    list.current.deleteList(arr.length - 1);
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
    setIsLoader({
      ...isLoader,
      disabled: false,
      deleteTail: false,
    })
  };

  const addIndex = async () => {
    const size = list.current.getSize();
    if (+valueInputIndex < 0 || +valueInputIndex > size) {
      return;
    }
    setIsLoader({
      ...isLoader,
      disabled: true,
      addByIndex: true,
    })
    list.current.insertAt(valueInput, +valueInputIndex);
    for (let i = 0; i <= +valueInputIndex; i++) {
      if (i < size) {
        arr[i] = { ...arr[i], add: true, miniCircle: { name: valueInput } };
      }
      if (i > 0 && i < size) {
        arr[i - 1] = {
          ...arr[i - 1],
          state: ElementStates.Changing,
          add: false,
          miniCircle: undefined,
        };
      }
      if (i === +valueInputIndex && +valueInputIndex === 0) {
        arr[0].head = false;
      }
      if (i === size - 1 && +valueInputIndex === size) {
        arr[size - 1].tail = false;
      }
      setArr([...arr]);
      await delay(SHORT_DELAY_IN_MS);
    }
    if (+valueInputIndex === size) {
      arr[+valueInputIndex! - 1] = {
        ...arr[+valueInputIndex! - 1],
        add: false,
        miniCircle: undefined,
      };
      arr.push({
        item: valueInput,
        state: ElementStates.Modified,
      });
    } else {
      arr[+valueInputIndex!] = {
        ...arr[+valueInputIndex!],
        add: false,
        miniCircle: undefined,
      };
      arr.splice(+valueInputIndex!, 0, {
        item: valueInput,
        state: ElementStates.Modified,
      });
    }
    setArr([...arr]);
    await delay(SHORT_DELAY_IN_MS);
    if (+valueInputIndex === 0) {
      arr[0].head = true;
    }

    if (+valueInputIndex === size) {
      arr[size].tail = true;
    }

    arr.forEach((item) => (item.state = ElementStates.Default));
    setArr([...arr]);
    setIsLoader({
      ...isLoader,
      disabled: false,
      addByIndex: false,
    })
    setValueInput('');
    setValueInputIndex('');
  };

  const deleteIndex = async () => {
    setIsLoader({
      ...isLoader,
      disabled: true,
      deleteByIndex: true,
    })
    list.current.deleteList(+valueInputIndex);
    for (let i = 0; i <= +valueInputIndex; i++) {
      arr[i].state = ElementStates.Changing;
      setArr([...arr]);
      await delay(SHORT_DELAY_IN_MS);
    }
    arr[+valueInputIndex] = {
      ...arr[+valueInputIndex],
      item: '',
      dell: true,
      miniCircle: { name: arr[+valueInputIndex].item },
    };
    setArr([...arr]);

    await delay(SHORT_DELAY_IN_MS);

    arr.splice(+valueInputIndex, 1);
    setArr([...arr]);

    await delay(SHORT_DELAY_IN_MS);

    arr.forEach((item) => (item.state = ElementStates.Default));
    setArr([...arr]);

    arr[arr.length - 1].tail = true;
    arr[0].head = true;

    setArr([...arr]);
    setIsLoader({
      ...isLoader,
      disabled: false,
      deleteByIndex: false,
    })
  };
console.log(isLoader)
  return (
    <SolutionLayout title="Связный список">
      <div className={styles.content}>
        <Input
          placeholder={'Введите значение'}
          isLimitText={true}
          maxLength={4}
          value={valueInput}
          onChange={handleChange}
          extraClass={`${styles.input}`}
        />
        <Button
          text={'Добавить в head'}
          disabled={valueInput === '' || isLoader.disabled || isLoader.addHead || arr.length > 7}
          onClick={addHead}
          extraClass={`${styles.smallBtn} ml-6`}
        />
        <Button
          text={'Добавить в tail'}
          disabled={valueInput === '' || isLoader.disabled || isLoader.addTail || arr.length > 7}
          onClick={addTail}
          extraClass={`${styles.smallBtn} ml-6`}
        />
        <Button
          text={'Удалить из head'}
          disabled={arr.length < 2 || isLoader.disabled || isLoader.deleteHead}
          onClick={deleteHead}
          extraClass={`${styles.smallBtn} ml-6`}
        />
        <Button
          text={'Удалить из tail'}
          disabled={arr.length < 2 || isLoader.disabled || isLoader.deleteTail}
          onClick={deleteTail}
          extraClass={`${styles.smallBtn} ml-6`}
        />
      </div>
      <div className={styles.content}>
        <Input extraClass={`${styles.input}`} value={valueInputIndex} placeholder={'Введите индекс'} onChange={handleChangeIndex} />
        <Button
          text={'Добавить по индексу'}
          disabled={valueInputIndex === '' || isLoader.disabled || isLoader.addByIndex || arr.length > 7}
          onClick={addIndex}
          extraClass={`${styles.bigBtn} ml-6`}
        />
        <Button
          text={'Удалить по индексу'}
          disabled={arr.length < 2 || isLoader.disabled || isLoader.deleteByIndex}
          onClick={deleteIndex}
          extraClass={`${styles.bigBtn} ml-6`}
        />
      </div>
      <ul className={styles.list}>
        {arr?.map((item, index) => {
          return (
            <div key={index + 1} className={styles.block}>
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
            </div>
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
