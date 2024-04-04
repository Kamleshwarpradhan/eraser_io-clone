"use client"
import React, { useEffect, useState } from 'react'
import WorkSpaceHeader from '../_component/WorkSpaceHeader'
import Editor from '../_component/Editor'
import { useConvex } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { FILE } from '../../dashboard/_component/FileList'
import Whiteboard from '../_component/Whiteboard'
import Deletecomponant from '../_component/Deletecomponant'

const WorkSpace = ({params}:any) => {

  const [saveTrigger,setSaveTrigger] = useState(false)
  const convex = useConvex()
  const [fileData,setFileData] = useState<FILE|any>()
  useEffect(()=>{
    params && getFiles()
  },[params])
  const getFiles = async()=>{
      const res = await convex.query(api.files.getFilebyId,{_id:params.fileId})
      
      setFileData(res)
  }
  const onSave = ()=>{
        setSaveTrigger(!saveTrigger)
  }
  return (
    <div>
          {!fileData?<Deletecomponant />:
          <>
          <WorkSpaceHeader fileName = {fileData?.fileName} onSave={onSave} />

          {/* WorkSpace Section */}
          <div className='grid grid-cols-1 md:grid-cols-2'>
                {/* Document Section */}
               <div className='h-screen'>
                    <Editor onSaveTrigger={saveTrigger}  params={params}
                    fileData = {fileData}
                    />
               </div>
               {/* WhiteBoard section */}
               <div className='h-screen border-l-2 ml-4'>
                   <Whiteboard 
                     onSaveTrigger={saveTrigger}  params={params}
                     fileData = {fileData}
                    />               
               </div>
          </div>
          </>}
    </div>
  )
}

export default WorkSpace