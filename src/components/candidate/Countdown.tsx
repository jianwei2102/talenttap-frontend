import React, { useEffect, useState } from 'react';

interface Props {
  time: number;
}

const CountdownTimer: React.FC<Props> = ({time}) => {
  const [countDown, setCountDown] = useState<number>(time * 60 * 1000);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown((prevCountDown) => prevCountDown - 1000);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getReturnValues = (countDown: number) => {
    const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((countDown % (1000 * 60)) / 1000);
    return [minutes, seconds];
  };

  const [minutes, seconds] = getReturnValues(countDown);

  if (minutes + seconds <= 0) {
    return (
      <div className="expired-notice">
        <span>Time's Up!!!</span>
      </div>
    );
  } else {
    return (
      <div className="show-counter">
        <DateTimeDisplay value={minutes} type={'Minutes'} isDanger={minutes < 1} />
        <p>:</p>
        <DateTimeDisplay value={seconds} type={'Seconds'} isDanger={minutes < 1} />
      </div>
    );
  }
};

interface DateTimeDisplayProps {
  value: number;
  type: string;
  isDanger: boolean;
}

const DateTimeDisplay: React.FC<DateTimeDisplayProps> = ({ value, type, isDanger }) => {
  return (
    <div className={isDanger ? 'countdown danger' : 'countdown'}>
      <p>{value}</p>
      <span>{type}</span>
    </div>
  );
};

export default CountdownTimer;