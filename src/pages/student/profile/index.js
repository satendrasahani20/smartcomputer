import { getSession } from 'next-auth/react'
import React from 'react'

const Profile = ({user}) => {
  console.log("front end found",user)
  return (
    <div>index</div>
  )
}

export async function getServerSideProps(context) {

  let user = await fetch("https://smrtinstut-satendrasahani20-gmailcom.vercel.app/api/hello");
  user = await user?.json()
  console.log("user backend",user)
  return {
    props: {
      user: user ? user : "not found"
    }
  }
}
export default Profile