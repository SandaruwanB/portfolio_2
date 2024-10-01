import React from 'react';
import BottomNavBar from '../components/bottomNavBar';

const NotFound = () => {
  return (
    <div>
      <div className='fixed bottom-2 left-0 w-full'>
        <BottomNavBar />
      </div>
      <div className='w-full h-full'>
        Page Not Found
      </div>
    </div>
  )
}

export default NotFound