import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TbSmartHome, TbIdBadge2, TbAddressBook, TbBlockquote } from 'react-icons/tb'

const BottomNavBar = () => {
    const navigate = useNavigate();

    const navData = [
        {'name' : 'Home', 'icon' : <TbSmartHome size={28} style={{background : 'transparent'}} />, 'link' : '/', 'iconSize' : 28},
        {'name' : 'About', 'icon' : <TbIdBadge2 size={28} style={{background : 'transparent'}} />, 'link' : '/about', 'iconSize' : 28},
        {'name' : 'Blog', 'icon' : <TbBlockquote size={28} style={{background : 'transparent'}} />, 'link' : '/blog', 'iconSize' : 28},
        {'name' : 'Contact', 'icon' : <TbAddressBook size={28} style={{background : 'transparent'}} />, 'link' : '/contact', 'iconSize' : 28},
    ];
    
  return (
    <div className='w-full h-full flex justify-center items-center bg-transparent'>
        <div className='absolute w-2/5 h-56 bg-cyan-950 z-[2] rounded-t-full opacity-80 filter blur-3xl'></div>
        <div className='bg-black px-1 py-2 sm:px-3 sm:py-4 rounded-3xl z-[3]' >
            {
                navData.map((value,index)=>(
                    <button className='mx-4 nav-link' key={index} onClick={()=>navigate(value.link)}>
                        {value.icon}
                    </button>
                ))
            }
        </div>
    </div>
  )
}

export default BottomNavBar