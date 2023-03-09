import { useEffect, useState, useRef } from 'react';

/**
 *
 * This is the useCountdown hook function
 * @param startTime 1500 seconds (twenty five minutes) by default, the countdown's starting number.
 * @returns '{ isActive, second, minute, counter, start, pause, reset }'
 *
 */

const calcComputedSecond = (value: number): string | number =>
  String(value).length === 1 ? `0${value}` : value;
const calcComputedMinute = (value: number): string | number =>
  String(value).length === 1 ? `0${value}` : value;

const useCountdown = (startTime: number = 1500) => {
  const [second, setSecond] = useState<string | number>(calcComputedSecond(startTime % 60));
  const [minute, setMinute] = useState<string | number>(
    calcComputedMinute(Math.floor(startTime / 60))
  );
  const [isActive, setIsActive] = useState<boolean>(false);
  const [counter, setCounter] = useState<number>(startTime);

  const intervalId = useRef<any>();

  useEffect(() => {
    if (isActive && counter > 0) {
      intervalId.current = setInterval(() => {
        const secondCounter = counter % 60;
        const minuteCounter = Math.floor(counter / 60);

        setSecond(calcComputedSecond(secondCounter));
        setMinute(calcComputedMinute(minuteCounter));

        setCounter(counter => counter - 1);
      }, 1000);
    }

    return () => clearInterval(intervalId.current);
  }, [isActive, counter, minute]);

  const start = (): void => setIsActive(true);

  const pause = (): void => setIsActive(false);

  const reset = (): void => {
    clearInterval(intervalId.current);
    setIsActive(false);
    setSecond('00');
    setMinute(`${Math.floor(startTime / 60)}`);
    setCounter(startTime);
  };

  return { isActive, second, minute, counter, start, pause, reset };
};

export default useCountdown;
