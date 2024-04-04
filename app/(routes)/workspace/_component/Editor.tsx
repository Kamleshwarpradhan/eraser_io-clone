"use client"
import React, { useEffect, useRef, useState } from 'react'
import EditorJS from '@editorjs/editorjs';

//@ts-ignore
import Header from '@editorjs/header';
//@ts-ignore
import List from "@editorjs/list";
//@ts-ignore
import Checklist from '@editorjs/checklist'
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';
import { FILE } from '../../dashboard/_component/FileList';

const rawData = {
  "time" : 1550476186479,
  "blocks" : [{
      data:{
          text: "Document name",
          level: 2
      },
      id: "11",
      type: "header"
  },
  {
    data:{
        level: 4
    },
    id: "112",
    type: "header"
}  
],
  "version" : "2.8.1"
}
const Editor = ({onSaveTrigger,params,fileData}:{onSaveTrigger:any,params:any,fileData:FILE}) => {
    const ref = useRef<EditorJS>()
    const upDateDocument = useMutation(api.files.upDateDocument)
    const {fileId} = params
    const [saveddocument,setSavedDocument] = useState(rawData);
    useEffect(()=>{
        fileData && initEditor()
    },[fileData])

    useEffect(()=>{
       onSaveTrigger && onSaveDocument()
    },[onSaveTrigger])
    const initEditor = ()=>{
        const editor = new EditorJS({
             
            tools:{
                header: {
                    class: Header,
                    shortcut: 'ctrl+SHIFT+H',
                    config: {
                        placeholder: 'Enter a header',
                        levels: [1,2,3,4,5,6],
                        defaultLevel: 3
                    }
                  },
                  list: {
                    class: List,
                    inlineToolbar: true,
                    config: {
                      defaultStyle: 'unordered'
                 }
                },
                checklist: {
                    class: Checklist,
                    inlineToolbar: true,
                },
            },
            data: fileData?.document?JSON.parse(fileData.document):saveddocument,
            holder: 'editorjs'
          });
        ref.current = editor;
    }

    const onSaveDocument = ()=>{
        if(ref.current){
          ref.current.save().then((outputData) => {
             console.log(Date.now());
             
             upDateDocument({
               _id:fileId,
               editedTime: Date.now(),
               document: JSON.stringify(outputData)
             }).then((res)=>{
                    toast("Document Updated Successfully !!!")
             }).catch((e)=>{
                console.log(e);
             })
          }).catch((error) => {
            console.log('Saving failed: ', error)
          });
        }
    }
  return (
    <div className='ml-5'>
          <div id='editorjs'></div>
    </div>
  )
}

export default Editor