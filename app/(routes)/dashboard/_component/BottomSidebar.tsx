"use client"
import { Button } from '@/components/ui/button'
import { Archive, Flag, Github, Lock } from 'lucide-react'
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DialogClose } from '@radix-ui/react-dialog'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import Constant from '@/app/_constants/Constant'
import Pricing from './Pricing'
const BottomSidebar = ({onCreateFile,totalFiles}:any) => {
  const progressPercentage = (totalFiles/5)*100
  const optionList = [
    {
      id:1,
      name:"Getting Started",
      Icon:Flag
    },
    {
      id:2,
      name:"Github Sync",
      Icon:Github
    },
    {
      id:3,
      name:"Private Files",
      Icon: Lock
    },
    {
      id:4,
      name:"Archive",
      Icon:Archive
    },
  ]
  const [fileName,setFileName] = useState("")
  const router = useRouter()
  const handleclickhandler = (optionName:string)=>{
      if(optionName=='Archive'){
         router.push("/dashboard/archivefiles")
      }
  }
  return (
    <div className='flex flex-col gap-3'>
          <div>
               {optionList.map((option)=>(

                  <h2 key={option.id} className='flex gap-3 items-center p-2 hover:bg-gray-100 rounded-lg cursor-pointer'
                  onClick={()=>handleclickhandler(option.name)}>
                      <option.Icon className='h-4 w-4'/>
                      <p className='justify-center'>{option.name}</p>
                  </h2>
               ))}
          </div>
          <Dialog>
            <DialogTrigger className='w-full' asChild> 
              <Button className='w-full justify-start bg-blue-600 hover:bg-blue-800'>
                New File
              </Button>
            </DialogTrigger>
            {totalFiles<Constant.MAX_FREE_FILE_LIMIT?     <DialogContent>
              <DialogHeader>
                <DialogTitle>Create a file</DialogTitle>
                <DialogDescription>
                  <Input
                    placeholder='Enter file name'
                    className='mt-2 text-gray-900'
                    onChange={(e)=>setFileName(e.target.value)}
                  />
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" className='bg-blue-600'
                  disabled={!(fileName && fileName.length>0)}
                  onClick={()=>onCreateFile(fileName)}
                  >
                    create
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>:<Pricing />}
          </Dialog>

         

          {/* Progress bar */}

          <div className='h-4 w-full bg-gray-200 rounded-lg'>
               <div className={`h-4 rounded-lg bg-blue-600`}
                  style={{width: `${progressPercentage}%`}}
                ></div>
          </div>
          
          {/* Bottom text */}
          <div className='text-[11px]'>
              <p><strong>{totalFiles}</strong> out of <strong>{Constant.MAX_FREE_FILE_LIMIT}</strong> files are used</p>
              <p><span className='underline'>Upgrade</span> your plans for unlimited access</p>
          </div>
    </div>
  )
}

export default BottomSidebar