"use client"
import { api } from '@/convex/_generated/api';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useConvex} from 'convex/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Sidebar from './_component/Sidebar';
import { FileContext } from './_context/Filecontext';

const DashboardLayout = (
    {
        children,
      }: Readonly<{
        children: React.ReactNode;
      }>
) => {

    const router = useRouter();
    const convex = useConvex()
    const [fileList_,setFileList_] = useState();
    const {user}:any = useKindeBrowserClient()
    const checkTeam = async()=>{
         const res = await convex.query(api.team.getTeam,{email:user?.email})

         if(!res?.length){
            router.push("teams/create")
     }
    }

    useEffect(()=>{
       user && checkTeam()
    },[user])
  return (
    <div>
        <FileContext.Provider value={{fileList_,setFileList_}}>
         <div className='flex'>
             <div className="w-72 border-r-[1px] h-screen">
                <Sidebar/>
             </div>
             <div className='flex-1 h-screen'>
                {children}
             </div>
         </div>   
        </FileContext.Provider>
    </div>
  )
}

export default DashboardLayout