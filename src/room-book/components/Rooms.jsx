import React from 'react'

const Rooms = ({rooms, userCredits, bookingRoom}) => {
    const handleRoomBooking = (roomIndex) => {
      const isBooked = bookingRoom(roomIndex);
      isBooked ? alert("Room Booked") : alert("Room not Booked");
    }
   
  return (
    <div className='w-[70vw] p-12 border-r-[4px] border-r-blue-200'>
         { !rooms && <h1 className='text-white font-bold text-2xl'>Fetching Rooms Data...</h1>}
         {rooms && <div className='grid grid-cols-3 grid-rows-5 gap-x-20 gap-y-32'>
            {
                rooms.map((room, index) => (
                    <div onClick={() => handleRoomBooking(index)} key = {room.id} className='p-4 cursor-pointer hover:opacity-80 text-center w-[150px] h-[150px] bg-gray-700 mx-auto rounded-2xl relative my-[4rem] flex items-center justify-center'>
                         <div className='w-[40px] h-[40px] rounded-full bg-green-700 absolute top-[160px] left-1/2 -translate-x-1/2'></div>
                         <div className='w-[40px] h-[40px] rounded-full bg-blue-700 absolute left-[160px] top-1/2 -translate-y-1/2'></div>
                         <div className='w-[40px] h-[40px] rounded-full bg-yellow-700 absolute right-[160px] top-1/2 -translate-y-1/2'></div>
                        <div className='w-[40px] h-[40px] rounded-full bg-red-700 absolute bottom-[160px] left-1/2 -translate-x-1/2' ></div>
                    
                    <div className='flex flex-col items-center'>
                      <span>R{index}</span>
                      <span>Cost: {room.cost}</span>
                      {
                        room.isReserved ? <span className='text-blue-400'>Reserved</span> : userCredits >= room.cost ? <span className='text-green-400'>Available</span> : <span className='text-red-400'>Not Enough Credits</span>
                      }
                    </div>
                    </div>
                ))
            }       
         </div>}
    </div>
  )
}

export default Rooms