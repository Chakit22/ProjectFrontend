import React from 'react'
import { technologies } from '../data/data';

const Skills = () => {
  return (
    <div name="Skills" className='w-full min-h-screen bg-[#0a192f] text-gray-300 pt-[80px] flex flex-col justify-center'>
      {/* Container */}
      <div className='max-w-[1000px] mx-auto p-4 w-full h-full flex flex-col justify-center'>
        <div>
          <p className='text-4xl inline border-b-2 border-pink-600 font-bold'>Skills</p>
          <p className='py-4'>// List of Technologies I've worked with.</p>
        </div>
        <div className='w-full grid grid-cols-2 sm:grid-cols-3 gap-4 text-center py-8'>
          {technologies.map((technology, index) => (
              <div key={index} className='shadow-md shadow-[#040c16] hover:scale-110 duration-500'>
                <img className='w-20 mx-auto' src={technology.image} alt={`${technology.name} icon`}/>
                <p className='my-4'>{technology.name}</p>
              </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Skills;