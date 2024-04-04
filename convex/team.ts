import { v } from "convex/values";
import { mutation, query } from "./_generated/server";


export const getTeam = query({
    args:{
         email: v.string()
    },
    handler: async(ctx, args)=> {
        const res = await ctx.db.query("teams")
                    .filter((q)=>q.eq(q.field("createdBy"),args.email))
                    .collect()
        return res;
    },
})

export const createTeam = mutation({
    args:{
        teamname: v.string(),
        createdBy: v.string()
    },
    handler: async(ctx, args)=> {
        const res = await ctx.db.insert("teams",args)
        return res;
    },
})