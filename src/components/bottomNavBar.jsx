import React from 'react'
import { useNavigate } from 'react-router-dom'

const BottomNavBar = () => {
    const navigate = useNavigate();

    const navData = [
        {'name' : 'Home', 'icon' : '', 'link' : '/'},
        {'name' : 'About', 'icon' : '', 'link' : '/about'},
        {'name' : 'Contact', 'icon' : '', 'link' : '/contact'},
    ]
  return (
    <div className='w-full h-full flex justify-center items-center'>
        <div className='bg-red-500 px-3 py-4 rounded-lg' >
            {
                navData.map((value,index)=>(
                    <button className='mx-4' onClick={()=>navigate(value.link)}>{value.name}</button>
                ))
            }
        </div>
    </div>
  )
}

export default BottomNavBar