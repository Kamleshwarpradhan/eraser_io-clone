import React, { useContext, useEffect, useState } from 'react'
import TopSidebar, { TEAM } from './TopSidebar'
import BottomSidebar from './BottomSidebar'
import { useConvex, useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { toast } from 'sonner'
import { FileContext } from '../_context/Filecontext'
import { getTime } from '@/lib/utils'

// export interface FILE{
//    createdBy: string,
//    fileName: string,
//    teamId: string,
//    fileId: string
// }

const Sidebar = () => {

  const convex = useConvex();
  const {user}:any = useKindeBrowserClient();
  const createFile = useMutation(api.files.createFile)
  const {fileList_,setFileList_} = useContext(FileContext)
  const [activeTeam,setActiveTeam] = useState<TEAM>()

  const [totalFiles,setTotalFiles] = useState<Number>()

  const onCreateFile = (fileName:string)=>{
      createFile({
          fileName: fileName,
          teamId: activeTeam?._id || "",
          createdBy: user?.email,
          archive: false,
          document: "",
          whiteboard: "",
          editedTime: Date.now()
      }).then((res)=>{
            if(res){
               filesList()
               toast("File created successfully !!!")
            }
      }).catch((e)=>{
          toast(`Error occur while creating file and error is ${e.message}`)
      })
  }

  useEffect(()=>{
    activeTeam && filesList()
  },[activeTeam])
  const filesList = async()=>{
      const res = await convex.query(api.files.getFiles,{teamId:activeTeam?._id || ""})
      setFileList_(res)
      setTotalFiles(res?.length)
  }
  return (
    <div className='p-6 flex flex-col h-screen'>
          <div className='flex-1'>
            <TopSidebar
              setActiveTeamInfo={(activeTeam:TEAM)=>setActiveTeam(activeTeam)}
            />
          </div>
          <div className='justify-end'>
            <BottomSidebar totalFiles={totalFiles} onCreateFile={onCreateFile} />
          </div>
    </div>
  )
}

export default Sidebar