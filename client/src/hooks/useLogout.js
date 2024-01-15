import { useAuthContext } from "./useAuthContext"
import {useNavigate} from "react-router-dom"

export const useLogout = ()=>{
  const {dispatch} = useAuthContext()
  const navigate = useNavigate()

  const logout = ()=>{
    // remove user from storage
    localStorage.removeItem('Authorization')

    const res = confirm('Are you sure, you want to logout?')

    if(!res){
      return;
    }


    //dispatch logout action
    dispatch({type: 'LOGOUT'})
    navigate('/login')
  }

  return {logout}
}