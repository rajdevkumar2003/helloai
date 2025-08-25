"use client"

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

const HomeLoginPage = () => {
    const router=useRouter();
  return (
    <div className="h-screen">
      <div className="h-full flex flex-col items-center justify-center gap-2">
        <h1 className='text-xl font-bold'>Welcome to HELLO AI,<span className='font-semibold'>Please Login</span></h1>
        <Button onClick={()=>router.push('/sign-in')}>Login</Button>
      </div>
    </div>
  )
}

export default HomeLoginPage
