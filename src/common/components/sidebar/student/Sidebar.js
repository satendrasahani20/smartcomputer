import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Profile from "../../../../assets/images/profile.png"
import Dashboard from "../../../../assets/images/dashboard.png"
import Fee from "../../../../assets/images/fee.png"
import LiveClass from "../../../../assets/images/live_class.png"
import Downloads from "../../../../assets/images/download.png"
import Results from "../../../../assets/images/result.png"
import Assessment from "../../../../assets/images/assessment.png"
import ProfileIcon from "../../../../assets/images/profileIcon.png"
import Image from 'next/image';
import { getSession, signOut, useSession } from 'next-auth/react';
const Sidebar = () => {
    const [openSidebar, setSidebar] = useState(false)
    const router = useRouter();
    const [link, setLink] = useState("")

    const { data: session } = useSession()

    useEffect(() => {
        setLink(router?.pathname)
    }, [router?.pathname])
    // /student/assesments

    useEffect(() => {
        const menuBar = document.querySelector(".menu_bar");
        if (openSidebar) {
            document.querySelector("body").classList.add("open_menu")
            menuBar.classList.add("visible")
        } else {
            menuBar.classList.remove("visible")
            document.querySelector("body").classList.remove('open_menu');
        }
    }, [openSidebar]);


    const handleSideBarButton = () => {
        setSidebar(!openSidebar)
    }


    return (
        <>
            <div className="menu_bar">
                <div className="profile_sec">
                    <figure>
                        <img src={session?.user?.image} alt="Student image" width="100%" height="100%" layout="responsive" objectFit="contain" />
                    </figure>
                    <p><span>Student Name: </span> {session?.user?.name}</p>
                    <p><span>Student Id: </span>  765473022</p>
                    <p><span>Course: </span>  BCA</p>
                </div>

                <ul>
                    <li onClick={() => router?.push("/student/dashboard")}><a href="#" className={link == "/student/dashboard" && "active"}><span><Image height="17" src={Dashboard} alt="Dashboard" /></span> Dashboard</a></li>
                    <li onClick={() => router?.push("/student/assesments")}><a href="#" className={link == "/student/assesments" && "active"}> <span><Image height="17" src={Assessment} alt="Assesments" /></span> Assesments</a></li>
                    <li onClick={() => router?.push("/student/results")}><a href="#" className={link == "/student/results" && "active"}> <span><Image height="17" src={Results} alt="Results" /></span> Results</a></li>
                    {/* <li onClick={()=>router?.push("/student/fee")}><a href="#" className={link=="/student/fee" && "active"}> <span> <Image src={Fee} alt="Fee" /></span> Fee</a></li> */}
                    <li onClick={() => router?.push("/student/live-class")}><a href="#" className={`${link == "/student/live-class" && "active"}`}> <span><Image height="17" src={LiveClass} alt="Live Class" /></span> Live Class</a></li>
                    <li onClick={() => router?.push("/student/downloads")}><a href="#" className={link == "/student/downloads" && "active"}> <span><Image height="17" src={Downloads} alt="Download" /></span> Download </a></li>
                    <li onClick={() => router?.push("/student/profile")}><a href="#" className={link == "/student/profile" && "active"}> <span><Image height="17" src={ProfileIcon} alt="Profile" /></span> Profile</a></li>

                </ul>

                <a href="#" onClick={()=>signOut({callbackUrl:"/login"})} className="logout">Logout</a>
            </div>

            <div className="menubar clearfix">
                <div className="navbar-fostrap" onClick={handleSideBarButton}>
                    <span></span> <span></span> <span></span>
                </div>
            </div>
        </>
    );
}


export default Sidebar