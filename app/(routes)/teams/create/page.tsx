"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { api } from '@/convex/_generated/api'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { useMutation } from 'convex/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'sonner'

const CreateTeam = () => {
  
  const router = useRouter();

  const [teamName,setTeamName] = useState("")
  const {user}:any = useKindeBrowserClient()
  const createTeam = useMutation(api.team.createTeam)


  const createTeamhandler = ()=>{
    if(teamName){
       createTeam({
          teamname: teamName,
          createdBy: user?.email
       }).then((res)=>{
          console.log(res);
          
          if(res){
             toast("Team created succussfully !!!")
             router.push("/dashboard")
          }

       })
    }
  }
  return (
    <div className='p-10 md:p-16 flex flex-col gap-5'>
          <div>
               <Image 
                    src="/logo-black.png"
                    alt='Logo'
                    width={150}
                    height={150}
                />
          </div>
          <div className='m-auto w-9/10 md:w-1/2 mt-5 flex flex-col gap-8'>
                <div className='m-auto p-2 bg-green-300 w-fit rounded-md'>
                      <h2 className='text-green-700 font-bold'>Team name</h2>
                </div>
                <div className='text-center flex flex-col gap-3'>
                     <h2 className='text-3xl md:text-4xl font-bold '>What should we call your team?</h2>
                     <p className='text-gray-400'>You can always change this later from setting</p>
                </div>
                <div className='flex flex-col gap-2 self-center'>
                      <label className='text-gray-400 font-bold text-left' >Team name</label>
                      <Input
                        placeholder='Enter your team name'
                        className='bg-gray-100 w-80'
                        onChange={(e)=>setTeamName(e.target.value)}
                      />
                </div>
                <div className='self-center'>
                    <Button 
                         className='bg-blue-500 hover:bg-blue-600 w-64'
                         disabled={!(teamName && teamName?.length>0)}
                         onClick={()=>createTeamhandler()}>
                          Create Team
                    </Button>
                </div>
          </div>
    </div>
  )
}

export default CreateTeam