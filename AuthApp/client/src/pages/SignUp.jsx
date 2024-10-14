import { set } from 'mongoose';
import React from 'react'
import {useState} from 'react';


export default function SignUp() {

  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

 
  const handleChange = (e) => {
   setFormData({...formData, [e.target.id]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   try {
    setLoading(true);
    setError(false);
    const response = await fetch('api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    const data = await response.json();
    setLoading(false);
    if(data.success===false){
      setError(true);
      return
    }
 
   } catch (error) {
    setLoading(false);
    setError(true);
  
   }
    // console.log(data); { message: 'User created successfully' }

  };


  return (
    <div className='p-3 max-w-lg mx-auto'>
    <h1 className = 'text-3xl text-center font-semibold my-7'>Sign Up</h1>
    
    <form onSubmit = {handleSubmit} className= 'flex flex-col gap-4 '>
      <input type="text" placeholder='Username' id='userName' className='bg-slate-100 p-3 rounded-lg ' onChange={handleChange} />

      <input type="email" placeholder='Email' id='email' className='bg-slate-100 p-3 rounded-lg  '    onChange={handleChange} />

      <input type="password" placeholder='Password' id='password' className='bg-slate-100 p-3 rounded-lg ' onChange={handleChange} />

      <button disabled = {loading} className='bg-slate-700  text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80' > {loading? 'Loading...' : 'Sign Up'} </button>
    </form>

    <div>
      <p className='text-center mt-5'>Already have an account? <a href='/signIn' className='text-blue-700'>Login here</a></p>
    </div>

    <p className='text-red-700 mt-5' >{error && 'Something went wrong!'}</p>

    </div>
  )
}
