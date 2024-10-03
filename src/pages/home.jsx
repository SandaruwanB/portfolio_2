import React from 'react'
import BottomNavBar from '../components/bottomNavBar'
import { TypeAnimation } from 'react-type-animation'

function Home() {

  const typeSequence = ['Full-Stack Developer', 'Web Developer', 'Android Developer', 'Freelancer', 'System Analyst', 'System Designer'];

  return (
    <div className='text-center'>
      <div className='fixed bottom-1 left-0 w-full'>
        <BottomNavBar />
      </div>
      <div className='w-full min-h-screen container mx-auto flex items-center'>
          <div className='grid grid-cols-1 lg:grid-cols-5 gap-4 w-full'>
              <div className='lg:col-span-2 border-2 rounded-2xl w-full p-16'>
                  <h1>My Data</h1>
              </div>
              <div className='lg:col-span-3 w-full p-5 lg:p-16 text-left'>
                  <h1 className='text-[1.5rem] font-medium'>Hello !</h1>
                  <h2 className='text-[3rem] font-semibold'>I'm <span className='text-[3rem] text-yellow-600 font-bold'>Sandaruwan Bandara</span></h2>
                  <h1 className='text-[3rem] font-bold tracking-widest'>
                    <TypeAnimation sequence={typeSequence} repeat={Infinity} speed={200} />
                  </h1>
                  <p className='mt-10 font-sans tracking-wide text-justify'>
                    Hi, I'm Sandy, a full-stack developer with 3+ years of experience. I specialize in creating custom web and Android apps that deliver results. I also develop desktop applications and APIs, with a focus on performance and scalability. Based in Sri Lanka, I’m passionate about building solutions that help businesses grow.
                  </p>
                  <button className='mt-10 border-2 bg-transparent border-yellow-600 px-8 py-2 text-yellow-600 font-semibold tracking-widest text-lg hover:bg-yellow-600 hover:text-white transition-all duration-500'>
                    Contact
                  </button>
              </div>
          </div>
      </div>
    </div>
  )
}

export default Home