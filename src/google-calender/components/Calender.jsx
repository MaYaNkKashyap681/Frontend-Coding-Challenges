import React from 'react'
import { calenderData } from '../data';



function calculateHours(start, end) {
    const [startHour, startMinute] = start.split(':').map(Number);
    const [endHour, endMinute] = end.split(':').map(Number);    
    const startTimeInMinutes = startHour * 60 + startMinute;
    const endTimeInMinutes = endHour * 60 + endMinute;
    let differenceMinutes = endTimeInMinutes - startTimeInMinutes;
    if (differenceMinutes < 0) {
        differenceMinutes += 24 * 60;
    }
    const differenceHours = differenceMinutes / 60;
    return differenceHours;
}

function formatTime(time) {
    const [hour, minute] = time.split(':').map(Number);
    const period = hour < 12 ? 'AM' : 'PM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minute < 10 ? '0' : ''}${minute} ${period}`;
}

const Calender = () => {
    const MAX_RANGE = 24
    
    console.log(calenderData)

    return (
      <div className='w-[500px] h-[90vh] relative overflow-scroll border-[2px] border-gray-200 px-4'>
        <div className='flex flex-col gap-0 mt-4'>
        {
            Array.from({length: MAX_RANGE}, (_, index) => index).map((item, index) => (
                <div key = {index} className=' h-[100px] flex'>
                    <div className='w-fit text-nowrap mt-[-12px]'>{(index%12).toString().length === 1 ? '0' : ''}{index % 12}:00 {item < 12 ? 'AM' : 'PM'}</div>
                    <div className='h-[1px] mt-0 w-full bg-gray-600'></div>
                </div>
            ))
        }
        {
            calenderData.map((item) => (
                <div className={` w-[80%] ml-[15%] absolute flex flex-col text-white font-bold rounded-xl p-8 text-xl`} style={{
                    background: item.color,
                    height: calculateHours(item.startTime, item.endTime) * 100 + "px",
                    top: calculateHours("00:00", item.startTime) * 100 + 17 + "px"
                }}>
                   <h3>{item.title}</h3>
                   <span className='text-sm font-light'>{formatTime(item.startTime)} - {formatTime(item.endTime)}</span>
                </div>
            ))
        } 
        </div>
        
       

      </div>
    );
}

export default Calender