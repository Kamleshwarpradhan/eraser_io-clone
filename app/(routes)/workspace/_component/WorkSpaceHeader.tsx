import { Button } from '@/components/ui/button'
import { Link, Save } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const WorkSpaceHeader = ({fileName,onSave}:any) => {
  return (
    <div className='flex justify-between items-center p-4 border-b'>
           <div className='flex gap-2 items-center'>
                <Image src="/logo-1.png" alt='Logo' height={60} width={60} />
                <h2 className='text-2xl font-bold'>{fileName}</h2>
            </div>
            <div className='flex gap-2'>
                <Button 
                    onClick={()=>onSave()}
                    className='bg-green-600 hover:bg-green-800 p-2 flex gap-1'>
                     save
                     <Save className='h-3 w-3'/>
                </Button>
                <Button className='bg-blue-600 hover:bg-blue-800 p-2 flex gap-1'>
                     share
                     <Link className='h-3 w-3'/>
                </Button>
            </div> 
    </div>
  )
}

export default WorkSpaceHeader