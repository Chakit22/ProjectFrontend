import React from 'react'
import { HiArrowNarrowRight } from 'react-icons/hi'
import { Link } from 'react-scroll'
import { homeName, homeDescription, homeTitle } from '../data/data'

const Home = () => {
  return (
    <div name="Home" className='w-full min-h-screen bg-[#0a192f] flex flex-col justify-center pt-[80px]'>

      {/* Container */}
      {/* max-w-[1000px] is written so that the maximum it can spread upto is 1000px because spreading more will affect other elements. */}
      <div className='max-w-[1000px] mx-auto h-full flex flex-col justify-center px-8'>
        <p className='text-pink-600'>Hi, my name is</p>
        <h1 className='text-4xl sm:text-7xl font-bold text-[#ccd6f6]'>{homeName}</h1>
        <h2 className='text-4xl sm:text-7xl font-bold text-[#8892b0]'>{homeTitle}</h2>
        <p className='text-[#8892b0] py-4 max-w-[700px]'>{homeDescription}</p>
        {/* In group when you hover over the parent element and you add group-hover:rotate:90 then the child rotates by 90. 
        If you hovered in any of the elements within the group that will be rotated by 90.*/}
        <div>
        <Link to="Work" smooth={true} duration={500}>
            <button type="button" className='text-white border-2 px-6 py-3 my-2 flex items-center hover:bg-pink-600 hover:border-pink-600 group'> 
              View Work
              <HiArrowNarrowRight className='ml-3 group-hover:rotate-90 duration-300'/>
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home