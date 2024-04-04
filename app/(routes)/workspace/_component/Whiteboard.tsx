"use client"
import React, { useEffect, useState } from 'react'
import {Excalidraw, MainMenu, WelcomeScreen} from "@excalidraw/excalidraw"
import { FILE } from '../../dashboard/_component/FileList'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'

const Whiteboard = ({onSaveTrigger,params,fileData}:{onSaveTrigger:any,params:any,fileData:FILE}) => {

    const [whiteBoardData,setWhiteBoardData] = useState<any>()
    const {fileId} = params
    const updateWhiteboard = useMutation(api.files.upDateWhiteboard)
    useEffect(()=>{
        onSaveTrigger && saveData()
    },[onSaveTrigger])
    const saveData = ()=>{
         updateWhiteboard({
             _id: fileId,
             whiteboard: JSON.stringify(whiteBoardData)
         }).then((res)=>{
             console.log(res);
         })
    }
  return (
    <div>
        <div style={{ height: "670px" }}>
         {fileData && <Excalidraw
                initialData={{
                    elements: fileData?.whiteboard && JSON.parse(fileData?.whiteboard)
                }}
                onChange={(excalidrawElements, appState, files)=>setWhiteBoardData(excalidrawElements)}
            >
                <MainMenu>
                     <MainMenu.DefaultItems.ClearCanvas/>
                     <MainMenu.DefaultItems.ChangeCanvasBackground/>
                     <MainMenu.DefaultItems.SaveAsImage/>
                     <MainMenu.DefaultItems.Export/>
                     <MainMenu.DefaultItems.SaveAsImage/>
                     <MainMenu.DefaultItems.ToggleTheme />
                </MainMenu>
                <WelcomeScreen>
                     <WelcomeScreen.Hints.MenuHint/>
                     <WelcomeScreen.Hints.ToolbarHint/>
                     <WelcomeScreen.Hints.HelpHint/>
                     <WelcomeScreen.Center>
                          <WelcomeScreen.Center.Heading>Change your thoughts into drawing</WelcomeScreen.Center.Heading>
                     </WelcomeScreen.Center>
                </WelcomeScreen>
          </Excalidraw>}
        </div>
    </div>
  )
}

export default Whiteboard