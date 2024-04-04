import { v } from "convex/values";
import { mutation, query } from "./_generated/server";


export const createFile = mutation({
    args:{
        fileName: v.string(),
        teamId: v.string(),
        createdBy: v.string(),
        archive: v.boolean(),
        document: v.string(),
        whiteboard: v.string(),
        editedTime: v.number()
    },
    handler:async(ctx, args)=> {
         const res = await ctx.db.insert("files",args)
         return res;
    },
})

export const getFiles = query({
     args:{
         teamId: v.string()
     },
     handler: async(ctx, args)=> {
         const res = await ctx.db.query("files")
                    .filter((q)=>q.eq(q.field("teamId"),args.teamId))
                    .order("asc")
                    .collect()
         return res;
     },
})

export const upDateDocument = mutation({
     args:{
         _id: v.id('files'),
         editedTime: v.number(),
         document: v.string()
     },
     handler:async(ctx, args)=>{
         const result = await ctx.db.patch(args._id,{document:args.document,
          editedTime: args.editedTime})
         return result         
     },
})
export const upDateWhiteboard = mutation({
     args:{
         _id: v.id('files'),
         whiteboard: v.string()
     },
     handler:async(ctx, args)=>{
         const result = await ctx.db.patch(args._id,{whiteboard:args.whiteboard})
         return result         
     },
})
export const getFilebyId = query({
     args:{
         _id: v.id('files')
     },
     handler:async(ctx, args)=>{
         const res = await ctx.db.get(args._id)
         return res;
     },
})

export const deleteFilebyId = mutation({
    args:{
        _id: v.id('files')
    },
    handler:async(ctx, args)=>{
        const res = await ctx.db.delete(args._id)
        return res;
    },
})

export const getArchivedFiles = query({
     args:{
         archive: v.boolean()
     },
     handler:async(ctx, args)=> {
         const files = await ctx.db.query("files")
                             .filter((q)=>q.eq(q.field("archive"),args.archive))
                             .collect()

         return files;
                            
     },
})

export const updatearchiveFile = mutation({
     args:{
         _id: v.id("files"),
         archive: v.boolean()
     },
     handler: async(ctx, args)=>{
        const res = await ctx.db.patch(args._id,{
             archive: args.archive
        })
     },
})