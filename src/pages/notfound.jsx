import React from 'react';
import BottomNavBar from '../components/bottomNavBar';

const NotFound = () => {
  return (
    <div>
      <div className='absolute bottom-2 left-0 w-full'>
        <BottomNavBar />
      </div>
      <div className='w-full h-full'>
        Page Not Found
      </div>
    </div>
  )
}

export default NotFound