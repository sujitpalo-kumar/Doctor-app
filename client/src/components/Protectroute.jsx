import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { HideLoading, showLoading } from '../redux/features/alertSlice'
import axios from 'axios'
import { setUser } from '../redux/features/userSlice'

export default function Protectroute({ children }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector(state => state.user)
  const [isUserLoaded, setIsUserLoaded] = useState(false)

  const getUser = async () => {
    // dispatch(showLoading()) // ✅ Start loading at the very beginning
  
    try {
      const res = await axios.post(
        '/api/v1/user/getUserData',
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      )
  
      if (res.data.sucess) {
        dispatch(setUser(res.data.data))
        setIsUserLoaded(true)
      } else {
        localStorage.clear()
        navigate('/login')
      }
  
    } catch (error) {
      localStorage.clear()
      navigate('/login')
      console.error("Error fetching user:", error)
  
    } finally {
      dispatch(HideLoading()) // ✅ Ensures it's always called ONCE
    }
  }
  
  
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getUser()
    } else {
      navigate('/login')
    }
  }, [])

//   if (!localStorage.getItem('token')) {
//     return <Navigate to="/login" />
//   }

  if (!isUserLoaded || !user) {
    return null // or a loading spinner
  }
if(localStorage.getItem('token')){
    return children
}else{
    return <Navigate to="/"/>
}


  return children
}
