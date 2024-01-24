import React, {useState} from 'react'
import Logo from "../assets/logo.png"
import {FaBars, FaTimes, FaLinkedin, FaGithub} from "react-icons/fa"
import {BsFillPersonLinesFill} from "react-icons/bs";
import { Link } from 'react-scroll'
import { LINKEDIN_URL, GITHUB_URL, RESUME_URL } from '../data/data';

// All the NAVBAR ITEMS 
const NAVBAR_ITEMS = ['Home','About','Skills','Work','Contact'];

// CONTACTS
const CONTACTS = [
    {name:'LinkedIn',element:<FaLinkedin size={30}/>,color:'#0077b5',link:LINKEDIN_URL},
    {name:'GitHub',element:<FaGithub size={30}/>,color:"#333333",link:GITHUB_URL},
    {name:'Resume',element:<BsFillPersonLinesFill size={30}/>,color:'#565f69',link:RESUME_URL}
];

const NavBar = () => {
  const [ham,setHam] = useState(false);
  const handleHam = () => setHam(!ham);

  return (
    <div className="fixed w-full h-[80px] flex justify-between items-center px-4 bg-[#0a192f] text-gray-50 z-10">

        {/* Logo Image */}
        <div>
            <a href="/">
                <img src={Logo} alt="Logo Image" className='w-[50px]'/>
            </a>
        </div>

        {/* Menu */}
        <ul className='hidden md:flex'>
            {NAVBAR_ITEMS.map((item, index)=> (<Link key={index} to={item} smooth={true} duration={500}><li>{item}</li></Link>))}
        </ul>

        {/* Hamburger */}
        <div onClick={handleHam} className='z-10 md:hidden'>
            {!ham ? <FaBars /> : <FaTimes/>}
        </div>

        {/* Mobile Menu */}
        {/* absolute makes the whole ul element go towards the left without caring for anything.
        top-0 makes 0px margin a dleft-0 takes 0px margin*/}
        <ul className={ham ? 'absolute top-0 left-0 w-screen h-screen bg-[#0a192f] flex flex-col justify-center items-center md:hidden' : 'hidden'}>
            {NAVBAR_ITEMS.map((item, index)=> (<Link key={index} to={item} smooth={true} duration={500} onClick={handleHam}><li className='py-6 text-4xl'>{item}</li></Link>))}
        </ul>

        {/* Social Icons */}
        <ul className='hidden lg:fixed lg:top-[44%] lg:left-0 lg:flex lg:flex-col'>
            {CONTACTS.map((contact, index) => (
                <a key={index} href={contact.link} className={`w-[160px] h-[60px] flex ml-[-100px] hover:ml-[-10px] duration-300 ease-in-out`} 
                   style={{backgroundColor: `${contact.color}`}} target='_blank'>
                    <li className='flex justify-between items-center w-full text-gray-300'>
                        {contact.name}
                        {contact.element}
                    </li>
                </a>
            ))}
        </ul>
    </div>
  );
}

export default NavBar;