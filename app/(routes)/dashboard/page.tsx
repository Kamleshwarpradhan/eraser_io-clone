"use client"
import {LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";
import React, { useEffect } from 'react'
import { useConvex, useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import TopHeader from "./_component/TopHeader";
import FileList from "./_component/FileList";

const Dashboard = () => {

  const {user}:any = useKindeBrowserClient()

  // const getUser = useQuery(api.user.getUser,{email:user?.email})
  // to avoiding the server crash while user details is fetching from server
  const convex = useConvex()
  const createUser = useMutation(api.user.createUser)

  useEffect(()=>{
      user && checkUserexist()
  },[user])

  const checkUserexist = async()=>{
     const result = await convex.query(api.user.getUser,{email:user?.email})
     
     if(result?.length){
      createUser({
         email: user.email,
         name: user.given_name,
         image: user.picture
      }).then((res)=>{
        console.log(res);
      })
   }
  }
  return (
    <div className="p-8">
        <TopHeader />
        <FileList />   
    </div>
  )
}

export default Dashboard