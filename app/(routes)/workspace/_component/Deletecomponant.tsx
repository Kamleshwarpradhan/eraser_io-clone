"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const Deletecomponant = () => {
    const router = useRouter()
  return (
    <div className='flex justify-center items-center h-screen w-full'>
    <section className="rounded-3xl shadow-2xl w-1/2">
    <div className="p-8 text-center sm:p-12">
        <div className='w-full flex justify-center'>
      <Image src="/image.png" alt='Deleted' height={99} width={99} />
        </div>
  
      <h2 className="mt-6 text-3xl font-bold">Sorry! The page you are looking for is no longer exist!</h2>
  
      <Button
        className="mt-8 inline-block  rounded-full bg-green-600 hover:bg-green-800 text-sm font-bold text-white shadow-xl"
        onClick={()=>router.push("/dashboard")}
      >
        Go back to dashboard
      </Button>
    </div>
  </section>
    </div>
  )
}

export default Deletecomponant