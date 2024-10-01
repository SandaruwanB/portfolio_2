import React from 'react';
import BottomNavBar from '../components/bottomNavBar';

const Contact = () => {
  return (
    <div>
      <div className='fixed bottom-1 left-0 w-full'>
        <BottomNavBar />
      </div>
      <div className='w-full min-h-screen container mx-auto flex items-center'>
          <div className='grid grid-cols-3 gap-4 w-full'>
              <div className='border-2 w-full border-cyan-100'>
                  <h1>My Data</h1>
              </div>
              <div className='col-span-2 w-full border-2 border-cyan-100'>
                  <h1>Content</h1>
              </div>
          </div>
      </div>
    </div>
  )
}

export default Contact