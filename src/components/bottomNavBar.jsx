import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';

const BottomNavBar = () => {
    const navigate = useNavigate();

    const navData = [
        {'name' : 'Home', 'icon' : 'basil:home-solid', 'link' : '/', 'iconSize' : 28},
        {'name' : 'About', 'icon' : 'material-symbols:contact-support', 'link' : '/about', 'iconSize' : 28},
        {'name' : 'Contact', 'icon' : 'fluent:book-contacts-20-filled', 'link' : '/contact', 'iconSize' : 28},
    ];
    
  return (
    <div className='w-full h-full flex justify-center items-center'>
        <div className='bg-[#080a0e] px-3 py-4 rounded-lg' >
            {
                navData.map((value,index)=>(
                    <button className='mx-4' onClick={()=>navigate(value.link)}>
                        <Icon icon={value.icon} width={value.iconSize} />
                    </button>
                ))
            }
        </div>
    </div>
  )
}

export default BottomNavBar