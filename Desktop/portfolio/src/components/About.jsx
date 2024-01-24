import React from 'react'
import { aboutName, aboutDescription } from '../data/data'

const About = () => {
  return (
    <div name="About" className='w-full min-h-screen bg-[#0a192f] text-gray-300 flex flex-col justify-center pt-[80px]'>    
        <div className='flex flex-col justify-center items-center w-full h-full'>
            <div className='max-w-[1000px] w-full grid grid-cols-2 gap-8'>
                <div className='sm:text-right pb-8 pl-4'>
                    <p className='text-4xl font-bold inline border-b-4 border-pink-600'>
                        About
                    </p>
                </div>
                <div>
                    
                </div>
            </div>
            <div className='max-w-[1000px] w-full grid sm:grid-cols-2 gap-8 px-4'>
                <div className='sm:text-right'>
                    <p className='text-4xl font-bold'>
                        Hi, I'm {aboutName}, Nice to meet you. Please take a look around.
                    </p>
                </div>
                <div>
                    <p>{aboutDescription}</p> 
                </div>
            </div>
        </div>
    </div>
  )
}

export default About