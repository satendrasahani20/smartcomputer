import { getSession } from 'next-auth/react'
import React from 'react'

const studentId = () => {
  return (
    <div>Working here</div>
  )
}
export async function getServerSideProps(context) {

  const user = await getSession(context)
  if (!user) {
    return {
      redirect: {
        destination: "/login",
      },
    }
  }
  if (user?.user?.role === "admin") {
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
      user: user ? user.user : ""
    }
  }
}
export default studentId;