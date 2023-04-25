import { getSession } from 'next-auth/react'
import React from 'react'

const Auth = () => {
  return (
    <div>Redirect</div>
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
      user: user ? user : ""
    }
  }
}
export default Auth