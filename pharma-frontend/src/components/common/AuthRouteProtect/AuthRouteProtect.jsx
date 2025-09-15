import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router'
import Loading from '../../ui/Loading/Loading'
import { AuthContext } from '../../../context/AuthContext'

const AuthRouteProtect = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const location = useLocation()

    if (loading) {
        return <Loading />
    }

    if (user) {
        return <Navigate to="/" state={{ from: location }} replace />
    }

    return children
}

export default AuthRouteProtect
