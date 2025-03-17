import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

function ProtectedRoutes({child}) {
const {isAuthenticated, screenLoading} = useSelector((state)=>state.user);
const navigate = useNavigate();
//console.log("Authenticated",isAuthenticated)

useEffect(()=>{
    
    if(!isAuthenticated && !screenLoading){
        navigate("/login");
        //toast.error("Unauthorized request please login first.")
    }
    if(isAuthenticated && !screenLoading){
        navigate("/");
        //toast.error("Unauthorized request")
    }
    if(!isAuthenticated){
        navigate("/login");
        //toast.error("Unauthorized request")
    }
},[isAuthenticated])

return (
    child
  )
}

export default ProtectedRoutes
