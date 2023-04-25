import React from 'react'
import SidebarStudent from '../sidebar/student/Sidebar'
import SidebarAdmin from '../sidebar/admin/Sidebar'
import Logo from "../../../assets/images/logo.png"
import Head from 'next/head'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
const Layout = ({ children }) => {
    const { data: session } = useSession()
    return (
        <>
            <Head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                <title>SMART</title>
                <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/fontawesome.min.css" rel="stylesheet" type="text/css" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
            </Head>
            <div className="dashboard_main">
                <div className="header">
                    <div className="top_header d-flex">
                        <div className="logo">
                            <a href="#"><Image height="97" src={Logo} alt="logo" /></a>
                        </div>
                        <div className="top_heading">
                            <h1>Smart Computer Institute</h1>
                        </div>
                    </div>
                </div>

                <div className="menu_cont d-flex">
                    {
                        console.log("session?.user?.role",session?.user?.role)
                    }
                    {
                        session?.user?.role =="student"?<SidebarStudent />: session?.user?.role =="admin"?<SidebarAdmin/>:<></>
                    }
                    {children}
                </div>
            </div>
        </>
    )
}

export default Layout