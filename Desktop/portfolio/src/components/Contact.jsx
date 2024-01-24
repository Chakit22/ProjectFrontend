import React, {useRef} from 'react'
import emailjs from '@emailjs/browser';
import {EMAIL_ID} from "../data/data"
import { toast } from "react-toastify";

const Contact = () => {
  const form = useRef();

  const sendEmail = async (e) => {
    e.preventDefault()
    try{
      const body = await 
      emailjs.sendForm(
              process.env.REACT_APP_EMAILJS_SERVICE_ID, 
              process.env.REACT_APP_EMAILJS_TEMPLATE_ID, 
              form.current, 
              process.env.REACT_APP_EMAILJS_PUBLIC_KEY);
      toast.success("Email delivered sucessfully!");
      e.target.reset();
    }catch(err){
      console.error(err);
      toast.error("Unable to deliver emails!");
    }
  };

  return (
    <>
      <div name="Contact" className='w-full min-h-screen bg-[#0a192f] flex justify-center items-center p-4 pt-[80px] flex flex-col justify-center'>
          <form ref={form} onSubmit={sendEmail} className='flex flex-col max-w-[600px] w-full' >
              <div className='pb-8'>
                  <p className='text-4xl font-bold inline border-b-4 border-pink-600 text-gray-300'>Contact</p>
                  <p className='text-gray-300 py-4'>// Submit the form below or shoot me an email at <a href={`mailto:${EMAIL_ID}`} className='text-pink-600 underline'>{EMAIL_ID}</a></p>
              </div>
              <input className='bg-[#ccd6f6] p-2' type='text' placeholder='Your Name' name='name' required/>
              <input className='my-4 p-2 bg-[#ccd6f6]' type='email' placeholder='Your Email' name='email' required/>
              <textarea className='bg-[#ccd6f6] p-2' rows='10' placeholder='Type your message here!' name='message'></textarea>
              <button className='text-white border-2 hover:bg-pink-600 hover:border-pink-600 px-4 py-3 my-8 mx-auto flex items-center'>
                Let's Collaborate
              </button>
          </form>
      </div>
    </>
  )
}

export default Contact;