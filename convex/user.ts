import { v } from "convex/values"
import {mutation, query} from "./_generated/server"

export const getUser = query({
    args:{
        email: v.string()
    },
    handler:async(ctx,args)=>{
        const user = await ctx.db.query("user")
        .filter((q)=>q.eq(q.field("email"),args.email))
        .collect()

        return user;
    }
})

export const createUser = mutation({
    args:{
        name: v.string(),
        email: v.string(),
        image: v.string()
    },
    handler:async(ctx, args)=>{
        return await ctx.db.insert("user",args)
    },
})