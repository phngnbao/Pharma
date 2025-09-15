import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from './useAuth'
import useAxiosSecure from './useAxiosSecure'


const useRole = () => {
  const { user, loading } = useAuth()
  const axiosSecure = useAxiosSecure()
  const { data: role, isLoading } = useQuery({
    queryKey: ['role', user?.email],
    enabled: !!user?.email && !loading,
    queryFn: async () => {
      const response = await axiosSecure.get(`/users/role/${user?.email}`)
      console.log("API response:", response.data)
      return response.data
    }
  })


  return { role, isLoading }
}

export default useRole
