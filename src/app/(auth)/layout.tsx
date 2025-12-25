"use client"
import { useAuthStore } from "@/store/Auth"
import { useRouter } from "next/router"
import React from "react"



const Layout = ({ children }: { children: React.ReactNode }) =>
{
    const { session } = useAuthStore()
    const router = useRouter()

    React.useEffect(() =>
    {
        if (session)
        {
            router.replace("/")  
        }
        
    }, [session, router])

    if (session)
    {
        return null
    }

    return (
        <div className="">
            <div className="">{children}</div>
        </div>
    )
}
 






export default Layout




