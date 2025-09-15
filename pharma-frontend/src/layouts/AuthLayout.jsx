import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../components/shared/Navbar/Navbar'

const AuthLayout = () => {
    return (
        <div>
            <Navbar />
            <main className="flex-grow bg-gray-50 dark:bg-gray-900">
                <Outlet />
            </main>
        </div>
    )
}

export default AuthLayout
