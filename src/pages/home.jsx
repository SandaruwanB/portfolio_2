import React from 'react'
import BottomNavBar from '../components/bottomNavBar'

function Home() {
  return (
    <div className='text-center'>
      <div className='absolute bottom-0 left-0 w-full'>
        <BottomNavBar />
      </div>
    </div>
  )
}

export default Home