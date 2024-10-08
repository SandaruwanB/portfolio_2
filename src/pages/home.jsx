import React from 'react';
import BottomNavBar from '../components/bottomNavBar';
import { TypeAnimation } from 'react-type-animation';
import { TbBrandLinkedin, TbBrandGithub, TbMail, TbBrandWhatsapp } from 'react-icons/tb'

function Home() {
  const typeSequence = ['Full-Stack Developer', 'Web Developer', 'Android Developer', 'Freelancer', 'System Analyst', 'System Designer'];

  return (
    <div className='text-center'>
      <div className='fixed bottom-1 left-0 w-full'>
        <BottomNavBar />
      </div>
      <div className='w-full min-h-screen container mx-auto flex items-center z-0'>
          <div className='grid grid-cols-1 lg:grid-cols-5 gap-4 w-full'>
              <div className='lg:col-span-2 w-full'>
                  <div className='flex h-full justify-center items-center flex-col'>
                    <div className='profile-pic'></div>
                    <div className='mt-10 flex justify-between'>
                      <button><TbBrandLinkedin  size={35} /></button>
                      <button className='mx-4 px-2 py-2'><TbBrandGithub size={35} /></button>
                      <button><TbMail size={35} /></button>
                      <button className='ml-4 px-2 py-2'><TbBrandWhatsapp size={35} /></button>
                    </div>
                  </div>
              </div>
              <div className='flex justify-center flex-col lg:col-span-3 w-full p-5 lg:pr-16 text-left'>
                  <h1 className='text-[1.5rem] font-medium'>Hello !</h1>
                  <h2 className='text-[2rem] md:text-[3rem] font-semibold'>I'm <span className='text-[2rem] md:text-[3rem] text-yellow-600 font-bold'>Sandaruwan Bandara</span></h2>
                  <h1 className='text-[2rem] md:text-[3rem] font-bold tracking-widest'>
                    <TypeAnimation sequence={typeSequence} repeat={Infinity} speed={200} />
                  </h1>
                  <p className='mt-10 font-sans tracking-wide text-justify'>
                    Hi, I'm Sandy, a full-stack developer with 3+ years of experience. I specialize in creating custom web and Android apps that deliver results. I also develop desktop applications and APIs, with a focus on performance and scalability. Based in Sri Lanka, I’m passionate about building solutions that help businesses grow.
                  </p>
                  <div className='mt-10 relative bg-transparent '>
                    <button className='z-[1] border-2 bg-transparent border-yellow-600 px-8 py-2 text-yellow-600 font-semibold tracking-widest text-lg hover:bg-yellow-600 hover:text-white transition-all duration-500'>
                      Contact
                    </button>
                    <div className='h-4 bg-orange-400 w-4 rounded-full filter blur-xl'></div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  )
}

export default Home