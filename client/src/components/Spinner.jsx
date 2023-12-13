import React from 'react'
import { useNavigate,useLocation } from 'react-router-dom'
import { useState,useEffect } from 'react'

const Spinner = ({path='login'}) => {

    const [count,setCount]=useState(3);
    const Navigate = useNavigate();
    const Location = useLocation();

    useEffect(()=>{
        const interval = setInterval(()=>{
            setCount((prevVal)=>--prevVal)
        },1000)
        count===0 && Navigate(`/${path}`,{
            state:Location.pathname
        })
        return ()=>clearInterval(interval)
    },[count,Navigate,Location,path])
  return (
    <>
            <div className="text-center">
                <h1 >redirecting to login page in {count} second</h1>
                <div className="spinner-border text-warning" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>

    </>
  )
}

export default Spinner