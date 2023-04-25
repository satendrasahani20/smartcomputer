import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getSession } from 'next-auth/react';
import { assessmentQuestion, students } from '@/common/constant/assessments';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';


const Student = () => {
  const router =useRouter();
  return (
    <div class="show_data">
      <div className='container'>
          <div className='row'>
               <div className='col-sm-12'>
                    <Button variant={"contained"}>Add Student</Button>
               </div>
          </div>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Sr No</TableCell>
              <TableCell align="right">Student Id</TableCell>
              <TableCell align="right">Student</TableCell>
              <TableCell align="right">Course</TableCell>
              <TableCell align="right">Institute</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              students?.map((item, index) => (
                <TableRow
                  key={index}
                  onClick={()=>router?.push("/student/assesments/test")}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item.srNo}
                  </TableCell>
                  <TableCell align="right">{item?.name}</TableCell>
                  <TableCell align="right">{item?._id}</TableCell>
                  <TableCell align="right">{item?.course}</TableCell>
                  <TableCell align="right">{item?.institute}</TableCell>
                  <TableCell align="right">{item?.status}</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
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
  if (user?.user?.role === "student") {
    return {
      redirect: {
        destination: "/student/dashboard",
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

export default Student