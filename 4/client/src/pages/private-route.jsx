import { Outlet, Navigate } from 'react-router-dom'

export const PrivateRoutes = () => {
    const auth = localStorage.getItem("refreshtoken") && localStorage.getItem("userId")

    return(
      auth ? <Outlet/> : <Navigate to="/login"/>
    )
}

