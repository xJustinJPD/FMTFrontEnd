import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function PrivateRoute({ children }) {
    const { authenticated } = useAuth()

    if(!authenticated) {
        return <Navigate to="/" replace />
    }

    return children
    }