import React from 'react';

const FullScreenViewer = ({ gifUrl, handleCloseFullScreen}) => {
  return (
    <div className='w-screen z-[50] h-screen flex items-center justify-center bg-[#000000] bg-opacity-40 flex-col fixed top-0 left-0 right-0 bottom-0'>
      <img src={gifUrl} alt='FullScreenGif' className='max-w-full max-h-full' />
      <div className='flex justify-center mt-[3rem]'><button onClick={handleCloseFullScreen} className='w-20 h-8 p-4 text-white bg-green-400 flex items-center justify-center rounded-md'>Close</button></div>
    </div>
  );
};

export default FullScreenViewer;
