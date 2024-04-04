"use client"
import React, { useContext, useEffect, useState } from 'react'
import { FileContext } from '../_context/Filecontext'
import moment from "moment"
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import Image from 'next/image'
import { Archive, Delete, MoreHorizontal } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'

export interface FILE{
    archive: boolean,
    createdBy: string,
    document:string,
    fileName:string,
    teamId:string,
    whiteboard: string,
    _creationTime: number,
    _id: string,
    editedTime: number
}
const FileList = () => {

    const {fileList_} = useContext(FileContext)

    const [fileList,setFileList] = useState<any>();
    const {user}:any = useKindeBrowserClient()
    useEffect(()=>{
        fileList_ && setFileList(fileList_)
    },[fileList_])
    const deleteFilebyId = useMutation(api.files.deleteFilebyId)
    const deleteFile = (fileId:any)=>{
      deleteFilebyId({
           _id: fileId
        })
    }

    const updatearchivefile = useMutation(api.files.updatearchiveFile)

    const updatearchiveFile = (fileId:any)=>{
        updatearchivefile({
           _id: fileId,
           archive: true
        })
    }
    const router = useRouter();
  return (
<div>
  <div className="overflow-x-auto">
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
                         onClick={()=>updatearchiveFile(file._id)}>
                            <Archive className='h-4 w-4'/>
                            Archive
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

export default FileList