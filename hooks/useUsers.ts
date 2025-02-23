"use client"

import featcher from '@/lib/featcher';
import useSWR from 'swr'

const useUsers = (limit: number) => {
  const { data, error, isLoading, mutate } = useSWR(`/api/users?limit=${limit}`, featcher)

  return {
    users: data,
    isError: error,
    isLoading,
    mutate
  }
}

export default useUsers;