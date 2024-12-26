import { useSelector } from "react-redux";
import { useRef } from "react";
import e from "express";
import { set } from "mongoose";

export default function Profile() {
  const {currentUser} = useSelector(state => state.user);
  const fileRef=useRef(null);
  const handleChange =(e)=>{
    set({...FormData,[e.target.id]:e.target.value});
  };
  const handleSubmit = async(e)=>{
    e.oreventDefault();
    try{
      const res=await fetch('/api/auth/update',)
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className='text-3xl text-center font-semibold
      my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="file"  ref={fileRef} hidden accept="image/*" />
        <img src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg" 
        alt="profile" 
        className="h-24 w-24 self-center cursor-pointer
        rounded-full object-cover mt-2"
        onClick={()=>fileRef.current.click()}
        />

       <input defaultValue={currentUser.username} type="text" id="username" placeholder="Username"
         className="bg-slate-100
        rounded-lg p-3"
        onChange={handleChange}/>
     

       <input defaultValue={currentUser.email} type="email" id="email" placeholder="Email"
         className="bg-slate-100
        rounded-lg p-3"
        onChange={handleChange}/>

       <input type="password" id="password" placeholder="Password"
         className="bg-slate-100
        rounded-lg p-3"
        onChange={handleChange}/>

        <button className="bg-slate-700 text-white p-3 
        rounded-lg uppercase hover:opacity-95 disabled:opacity-80">Update</button>


      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">
          Delete Account
        </span>
        <span className="text-red-700 cursor-pointer">
          Sign Out
        </span>
      </div>
    </div>
  )
}
