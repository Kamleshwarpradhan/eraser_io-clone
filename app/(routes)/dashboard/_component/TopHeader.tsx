import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { Search, Send } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const TopHeader = () => {

  const {user}:any = useKindeBrowserClient();
  return (
    <div className=' flex justify-end gap-3'>
          <div className='flex items-center border-2 p-1 rounded-lg transition-all gap-1'>
                <Search className='ml-1 h-5 w-5'/>
                <Input placeholder='Type to search' className='h-8 w-full border-none focus-visible:ring-0 focus-visible:ring-offset-0'/>
          </div>
          <Image src={user?.picture} alt='User' height={40} width={40} className='rounded-full' />
          <Button className='bg-blue-600 hover:bg-blue-800'><Send /> invite</Button>
    </div>
  )
}

export default TopHeader