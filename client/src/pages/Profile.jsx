import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";


import { updateUserStart,updateUserSuccess,
  updateUserFailure, 
  signINSuccess, 
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOUT
 } from "../redux/user/userSlice";

export default function Profile() {
  const dispatch = useDispatch();
  const {currentUser,loading,error} = useSelector(state => state.user);
  const fileRef=useRef(null);
  const [formData,setFormdata]=useState({});
  const [updateSuccess,setUpdateSuccess]=useState(false);
  const handleChange =(e)=>{
    set({...formData,[e.target.id]:e.target.value});
  };
  const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
      dispatchEvent(updateUserStart());
      const res=await fetch(`/api/user/update/${currentUser._id}`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(formData),
      });
      const data=await res.json();
      if(data.success===false){
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(signINSuccess(data));
      setUpdateSuccess(true);
     
    }
    catch(error){
      dispatch(updateUserFailure(error));

    }
  };
  const handleDeleteAccount = async()=>{
    try{
      dispatch(deleteUserStart());
      const res=await fetch(`/api/user/delete/${currentUser._id}`,{
        method:'DELETE',
      });
      const data=await res.json();
      if(data.success===false){
        dispatch(updateUserFailure(data));
        return;
      }
      dispatch(deleteUserSuccess(data));
      
    }
    catch(error){
      dispatch(deleteUserFailure(error));
    }
  };
  const handleSignOut = async ()=>{
    try{
      await fetch('/api/auth/signout');
      dispatch(signOUT());
    }
    catch(error){
      console.log(error);
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
        rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          {loading? 'Loading...':'Update'}
        </button>


      </form>
      <div className="flex justify-between mt-5">
        <span onClick={handleDeleteAccount} className="text-red-700 cursor-pointer">
          Delete Account
        </span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">
          Sign Out
        </span>
        <p className="text-red-700 mt-5">{error && "Something went wrong!"}</p>
        <p className="text-red-700 mt-5">{updateSuccess && "User is updated successfully! "}</p>
      </div>
    </div>
  )
}
