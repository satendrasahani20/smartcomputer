import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Login from './login'
import { getSession } from 'next-auth/react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Login />
    </>
  )
}

export async function getServerSideProps(context) {

  const user = await getSession(context)
  if (user?.user?.role === "student") {
      return {
          redirect: {
              destination: "/student/dashboard",
          },
      }
  } else if (user?.user?.role === "admin") {
      return {
          redirect: {
              destination: "/admin/student",
          },
      }
  } else if (user?.user?.role === "partner") {
      return {
          redirect: {
              destination: "/partner",
          },
      }
  }
  return {
      props: {
          user: user ? user.user:""
      }
  }
}
