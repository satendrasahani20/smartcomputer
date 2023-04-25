import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getSession } from 'next-auth/react';
import { assessmentQuestion } from '@/common/constant/assessments';
import { useRouter } from 'next/router';



const Assesments = () => {
  const router =useRouter();
  return (
    <div class="show_data">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Course</TableCell>
              <TableCell align="right">Module</TableCell>
              <TableCell align="right">Content</TableCell>
              <TableCell align="right">No of Question</TableCell>
              <TableCell align="right">Marks Obtained</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              assessmentQuestion?.map((item, index) => (
                <TableRow
                  key={item?.courseName}
                  onClick={()=>router?.push("/student/assesments/test")}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item.courseName}
                  </TableCell>
                  <TableCell align="right">{item?.module}</TableCell>
                  <TableCell align="right">{item?.content}</TableCell>
                  <TableCell align="right">{item?.noOfQuestion}</TableCell>
                  <TableCell align="right">{item?.obtainedMark}</TableCell>
                  <TableCell align="right">{item?.isPassed?"passed":"failed"}</TableCell>
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

export default Assesments