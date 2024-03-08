import React, { useEffect, useState } from 'react';

const maxTime = 100;

const App = () => {
  const [time, setTime] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prevTime => {
        if (prevTime < maxTime) {
          return prevTime + 1;
        } else {
          clearInterval(interval);
          return prevTime;
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='w-screen h-screen bg-purple-100 flex items-center justify-center'>
      <div className='w-[80%] h-[200px] bg-white rounded-xl flex flex-col items-center justify-center gap-y-4'>
        <h3 className='font-bold font-3xl w-full pl-16'>{time} Seconds</h3>
        <div className='w-[90%] h-[30px] outline-double outline-blue-400 rounded-3xl flex items-center overflow-hidden'>
          <div className='h-full bg-blue-700 rounded-3xl'
          style = {{
            width: (100 / maxTime) * time + "%"
          }}
          >
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
