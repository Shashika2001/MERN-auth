
import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { signINStart,signINSuccess,signINFailure } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import OAuth from '../components/OAuth';

export default function SignIn() {
  const[formData, setFormData] = useState({});
  const {loading,error} = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate= useNavigate();




  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value});
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signINStart());
  
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
     //console.log(res);
  
      if (!res.ok) {
        const errorData = await res.json();
        dispatch(signINFailure(errorData));
        return;
      }
      //console.log(res);
  
      const data = await res.json();
      console.log(data);
      if (!data.success) {
        dispatch(signINFailure(data));
        return;
      }
      console.log(data);
  
      dispatch(signINSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signINFailure({ message: error.message || 'An unexpected error occurred.' }));
    }
  };
  
   
    
  
 
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>
        
        Sign In</h1>
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
     
      <input type='email'
       placeholder='Email'
      id='email'
       className='bg-slate-100 p-3 rounded-lg' 
       onChange={handleChange}
       />
      <input type='password'
       placeholder='Password'
      id='password'
       
       className='bg-slate-100 p-3 rounded-lg' 
       onChange={handleChange}
        />
    
    <button disabled={loading} className='bg-slate-700 text-white p-3
    rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
      {loading ? 'Loading...' : 'Sign in'}
      
    </button>
    <OAuth/>
    </form>
    <div className='flex gap-2 mt-5'>
      <p>Don't Have an account?</p>
      <Link to='/signup'>
      <span className='text-blue-500'>Sign up</span>
      </Link>
    </div>
    <div>
    <p className='text-blue-700 mt-5'>
  {error ? (error.message || JSON.stringify(error) || 'Something went wrong!') : ''}
</p>
    </div>
    </div>

  )
}
