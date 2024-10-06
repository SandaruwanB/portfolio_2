import React, { useState } from 'react';
import BottomNavBar from '../components/bottomNavBar';

const About = () => {
  const [value, setValue] = useState(0)

  return (
    <div>
      <div className='fixed bottom-1 left-0 w-full'>
        <BottomNavBar />
        <div className='text-white'>
          {value}
        </div>
        <button onClick={()=>setValue(value + 1)}>click</button>
      </div>
    </div>
  )
}

export default About