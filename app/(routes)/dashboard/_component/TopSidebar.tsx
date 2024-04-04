"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import {ChevronDown,ChevronUp, LayoutGrid, LogOut, Settings, User} from "lucide-react"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { LogoutLink, useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { Separator } from '@/components/ui/separator'
import { useConvex, useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export interface TEAM{
     createdBy: String,
     teamname: String,
     _id: string
}

const TopSidebar = ({setActiveTeamInfo}:any) => {
    const [isOpen,setIsOpen] = useState(false)
    const [teamList,setTeamList] = useState<TEAM[]>()
    const [activeTeam,setActiveTeam] = useState<TEAM>()
    const router = useRouter()
    const menuOption = [
        {
            id: 1,
            name: "Create team",
            Icon: User,
            path: "teams/create"
        },
        {
            id:2,
            name: "Settings",
            Icon: Settings,
            path:""
        }
    ]
    const convex = useConvex();
    const {user}:any = useKindeBrowserClient()

    
    const getTeamList = async()=>{
        const teams = await convex.query(api.team.getTeam,{email:user?.email})

        if(teams?.length>0){
            setTeamList(teams)
            setActiveTeam(teams[0])
        }
        return;
    }
    useEffect(()=>{
        user && getTeamList()
    },[user])

    useEffect(()=>{
        activeTeam && setActiveTeamInfo(activeTeam)
    },[activeTeam])
    const handleonClick = (path:string)=>{
          if(path.length>0){
            router.push(path)
          }
    }

    return (
    <div className='flex flex-col gap-4'>
          <Popover>
            <PopoverTrigger onClick={()=>setIsOpen(!isOpen)}>
                    <div className='flex gap-2 items-center p-4 hover:bg-slate-100 rounded-lg'>
                        <Image src="/logo-1.png" alt="logo" width={50} height={50}/>
                        
                        <div className='flex items-center gap-2'>
                            <h2 className='font-semibold'>{activeTeam?.teamname}</h2>
                            {isOpen?<ChevronDown/>:<ChevronUp/>}
                        </div>        
                    </div>
            </PopoverTrigger>
            <PopoverContent>
                         <div className='p-2 flex flex-col gap-3'>
                               <div className='flex flex-col gap-2'>
                                     {teamList?.map((team,index)=>(
                                        <h2 key={index} className={`p-2 hover:bg-sky-300 hover:text-white rounded-lg ${activeTeam?._id==team._id && "bg-sky-300 text-white font-bold"}`}
                                        onClick={()=>setActiveTeam(team)}
                                        >
                                            {team.teamname}
                                        </h2>
                                     ))}
                               </div>
                               <Separator />
                               <div className='flex flex-col gap-3 ml-2'>
                                    {menuOption.map((item)=>(
                                    <div onClick={()=>handleonClick(item.path)} key={item.id} className='flex items-center gap-2  hover:bg-sky-200 rounded-lg p-2'>
                                        <item.Icon/>
                                        {item.name}
                                    </div>
                                    ))}
                                    <LogoutLink>
                                        <div className='flex items-center gap-2 hover:bg-sky-200 rounded-lg p-2'>
                                                    <LogOut/>
                                                    Logout
                                        </div>
                                    </LogoutLink>
                               </div>
                               <Separator />
                               <div className='flex items-center gap-3'>
                                    <Image 
                                        src={user?.picture} 
                                        alt='user'
                                        width={30}
                                        height={30}
                                        className='rounded-full'
                                    />
                                    <div>
                                         <p className='text-[14px] font-bold'>{user?.given_name} {user?.family_name}</p>
                                         <p className='text-[10px] text-gray-400'>{user?.email}</p>
                                    </div>
                               </div>
                         </div>
            </PopoverContent>
          </Popover>
          <div>
                <Button variant="outline" className='w-full flex gap-2 p-3 rounded-lg justify-start'
                 onClick={()=> router.push("/dashboard")}>
                        <LayoutGrid className='h-5 w-5'/>
                        All files
                </Button>
          </div>
    </div>
  )
}

export default TopSidebar