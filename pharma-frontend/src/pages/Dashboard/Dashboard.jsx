import React from 'react'
import useRole from '../../hooks/useRole';
import Loading from '../../components/ui/Loading/Loading';
import { Navigate } from 'react-router';
import { useTitle, PAGE_TITLES } from '../../hooks/useTitle';

const Dashboard = () => {
    useTitle(PAGE_TITLES.DASHBOARD);
    const { role, isLoading } = useRole();

    if (isLoading) {
        return <Loading />;
    }

    if (role?.role === 'admin') {
        return <Navigate to="/dashboard/admin" />;
    } else if (role?.role === 'seller') {
        return <Navigate to="/dashboard/seller" />;
    } else if (role?.role === 'customer') {
        return <Navigate to="/dashboard/user" />;
    }
    console.log("Role data:", role);


    return (
        <div>
            <h1 className='text-red-500'>User Not found!</h1>
        </div>
    );
}

export default Dashboard
