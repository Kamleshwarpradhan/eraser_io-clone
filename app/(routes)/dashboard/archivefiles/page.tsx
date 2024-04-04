"use client"
import { api } from '@/convex/_generated/api'
import { useConvex, useMutation } from 'convex/react'
import React, { useEffect, useState } from 'react'
import { FILE } from '../_component/FileList'
import { useRouter } from 'next/navigation'
import moment from 'moment'
import Image from 'next/image'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Archive, Delete, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'

const archivefiles = () => {

    const convex = useConvex()
    const router = useRouter()

    const {user}:any = useKindeBrowserClient()

    const [fileList,setFileList] = useState<FILE[]>()
    const getarchiveFile = async ()=>{
         const res = await convex.query(api.files.getArchivedFiles,{archive: true})

        if(res.length>0){
            setFileList(res)
        }
    }

    useEffect(()=>{
        user && getarchiveFile()
    },[user])
    const deleteFilebyId = useMutation(api.files.deleteFilebyId)
    const deleteFile = (fileId:any)=>{
      deleteFilebyId({
           _id: fileId
        })
    }
    const updatearchivefile = useMutation(api.files.updatearchiveFile)
    const upDateFile = (fileId:any)=>{
         updatearchivefile({
             _id:fileId,
             archive: false
         })
    }
  return (
    <div className='p-8'>
         <h2 className="text-4xl font-bold">Archieved Files</h2>

         <div className="overflow-x-auto pt-5">
    <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
      <thead className="ltr:text-left rtl:text-right">
        <tr>
          <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Filename</td>
          <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">CreatedAt</td>
          <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">EditedAt</td>
          <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Author</td>
        </tr>
      </thead>
  
      <tbody className="divide-y divide-gray-200">
        {fileList && fileList.map((file:FILE)=>(
            <tr 
              onClick={()=>router.push("/workspace/"+file._id)}
              key={file._id} className="odd:bg-gray-50 cursor-pointer">
            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{file.fileName}</td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700">{moment(file?._creationTime).format("DD MMM YYYY")}</td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700">{moment(file?.editedTime).format("DD MMM YYYY")}</td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                <Image
                    src={user?.picture}
                    alt='Author'
                    width={30}
                    height={30}
                    className='rounded-full'
                />
            </td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
              
              <DropdownMenu>
                  <DropdownMenuTrigger>
                      <MoreHorizontal/>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem className='flex flex-col gap-3'>
                        <Button className='flex gap-2 bg-blue-500 hover:bg-blue-800 p-1 rounded-lg w-full'
                         onClick={()=>upDateFile(file._id)}>
                            <Archive className='h-4 w-4'/>
                            Unarchive
                        </Button>
                        <Button variant={'destructive'} className='flex gap-2 p-1 rounded-lg w-full'
                        onClick={()=>deleteFile(file._id)}>
                            <Delete className='h-4 w-4'/>
                            Delete
                        </Button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

            </td>
            </tr>
        ))}
      </tbody>
    </table>
  </div>
    </div>
  )
}

export default archivefiles