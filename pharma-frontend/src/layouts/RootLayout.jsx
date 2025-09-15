import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../components/shared/Navbar/Navbar'
import Footer from '../components/shared/Footer/Footer'

const RootLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow bg-gray-50 dark:bg-gray-900">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default RootLayout
