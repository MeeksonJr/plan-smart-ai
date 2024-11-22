"use client"
import { eq } from "drizzle-orm";
import {db} from "./../configs/db";
import {USER_TABLE} from "./../configs/schema";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
function Provider({children}) {

    const {user}=useUser();

    useEffect(()=>{
       user&&CheckINewUser(); 
    },[user])

    const CheckINewUser=async()=>{
        
        const result=await db.select().from(USER_TABLE)
        .where(eq(USER_TABLE.email,user?.primaryEmailAddress?.emailAddress))
        console.log(result);

        if(result?.length==0)
            {
                const userResponse = await db.insert(USER_TABLE).values({
                    name:user?.fullName,
                    email:user.primaryEmailAddress?.emailAddress
                }).returning({id:USER_TABLE.id})

                console.log(userResponse);
            }
    }

  return (
    <div>
        {children}
    </div>
  )
}

export default Provider