import { Console } from "console";
import React from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { delay } from "../utils/utils";

import { Queue } from "./class";
import styles from './queue-page.module.css';

interface IArrQueue {
  item: string;
  state: ElementStates;
  head: string;
  tail: string;
}

interface IDisabled {
  push: boolean;
  pop: boolean;
}

const queue = new Queue<string>(7);//почему не сработало в внутри компонента? В чем разница со стеком?

export const QueuePage: React.FC = () => {

  const initArr: Array<IArrQueue> = Array.from(Array(7), () => ({
    item: '',
    state: ElementStates.Default,
    head: '',
    tail: '',
  }));
  
  const [arrQueue, setArrQueue] = React.useState<Array<IArrQueue>>(initArr);
  const [valueInput, setValueInput] = React.useState<string>('');

  const [disabled, setDisabled] = React.useState<IDisabled>({
    push: false,
    pop: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let target = e.target as HTMLInputElement;
    setValueInput(target.value);
  }
 
  const getEnqueue = async () => {
    setDisabled({
      push: true,
      pop: false
    });
 
    queue.enqueue(valueInput);
    setValueInput('');

    arrQueue[queue.getHead()].head = 'head';

    if (queue.getTail() > 0) {
      arrQueue[queue.getTail() - 1].tail = '';
    }
    
    arrQueue[queue.getTail()].state = ElementStates.Changing;
    arrQueue[queue.getTail()].item = valueInput;
    arrQueue[queue.getTail()].tail = 'tail';
    setArrQueue([...arrQueue]);

    await delay(SHORT_DELAY_IN_MS);

    arrQueue[queue.getTail()].state = ElementStates.Default;
    setArrQueue([...arrQueue]);
   
    setDisabled({
      push: false,
      pop: false
    });
  }

  const getDequeue = async () => {
    setDisabled({
      push: false,
      pop: true
    });

  
    if (queue.getTail() === queue.getHead() && queue.getTail() === 6) {
      arrQueue[queue.getHead()].tail = '';
      arrQueue[queue.getHead()].item = '';
      
    } else if (queue.getTail() === queue.getHead() && queue.getTail() !== 6) {
      getClear(); 
    } else {
      queue.dequeue();

      if (queue.getHead() > 0) {
        arrQueue[queue.getHead() - 1].head = '';
        arrQueue[queue.getHead() - 1].item = '';
      }

      if(queue.getTail() < 6) {
        arrQueue[queue.getHead() - 1].item = valueInput;
      }

      arrQueue[queue.getHead() - 1].item = '';
      arrQueue[queue.getHead() - 1].state = ElementStates.Changing;

      await delay(SHORT_DELAY_IN_MS);

      arrQueue[queue.getHead()].head = 'head';
      arrQueue[queue.getHead() - 1].state = ElementStates.Default;
      setArrQueue([...arrQueue]); 
    }

    setDisabled({
      push: false,
      pop: false
    });
  }

  const getClear = async () => {
    queue.clear();
    setArrQueue([...initArr]);
    setValueInput('');
  }

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.content}>
        <Input value={valueInput} isLimitText = {true} maxLength={4} onChange={handleChange} />
        <Button text={'Добавить'} extraClass="mr-4 ml-4" disabled={valueInput === '' || queue.getTail() === 6} isLoader={disabled.push} onClick={getEnqueue}/>
        <Button text={'Удалить'} extraClass="mr-40" disabled = {queue.isEmpty()} isLoader={disabled.pop} onClick={getDequeue} />
        <Button text={'Очистить'} disabled = {queue.isEmpty()} onClick={getClear} />
      </div>
      <ul className={styles.list}>
        {arrQueue?.map((item, index) => {
          return (
            <Circle
              key={index}
              letter={item.item}
              state={item.state}
              head={item.head}
              tail={item.tail}
              index={index}
              extraClass={'mt-15'}
            />
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
