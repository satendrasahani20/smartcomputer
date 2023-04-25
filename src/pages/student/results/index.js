import { getSession } from 'next-auth/react'
import React from 'react'
const Results = () => {

  return (
    <div class="show_data">
      <div className='container'>
        <br /><br /><br />
        <div className='row'>
          <div className='d-flex col-sm-12 justify-content-center'>
            <select className='custom-select'>
              <option>Select Course</option>
              <option>BCA</option>
              <option>DCA</option>
              <option>ADCA</option>
              <option>MCA</option>
            </select>
            <button className='btn-primary'>Preview</button>
          </div>
          <div className='col-sm-12 text-center'>
            <div className='result-area'>
              <h1>Result image Area</h1>
            </div>
            <button className='btn-primary mt-3'>Download</button>
          </div>
        </div>
      </div>
    </div>
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
export default Results;