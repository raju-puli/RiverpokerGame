import React, { useState, useEffect } from 'react';
import TimeDisplay from './TimeDisplay';

const CountdownTimer1 = ({ initialMinutes = 0, initialSeconds = 0 }) => {
  const [time, setTime] = useState({
    minutes: initialMinutes,
    seconds: initialSeconds,
  });

  useEffect(() => {
    const tick = () => {
      if (time.minutes === 0 && time.seconds === 0) {
        return;
      } else if (time.seconds === 0) {
        setTime({ minutes: time.minutes - 1, seconds: 59 });
      } else {
        setTime({ minutes: time.minutes, seconds: time.seconds - 1 });
      }
    };

    const intervalId = setInterval(tick, 1000);

    return () => clearInterval(intervalId);
  }, [time]);
  

  return (
    <>
      <TimeDisplay minutes={time.minutes} seconds={time.seconds} />
    </>
  );
};

export default CountdownTimer1;





  
 