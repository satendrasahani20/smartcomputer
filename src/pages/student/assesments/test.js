import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getSession } from 'next-auth/react';
import { assessmentQuestion, assessmentTest } from '@/common/constant/assessments';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';

function createData(courseName, moduleName, content, question, obtainedMark, status) {
  return { courseName, moduleName, content, content, question, obtainedMark, status };
}

const rows = [
  createData('Basic Computer', 5, "Introduction to  computer working now this is description", 25, 40, "passed"),
  createData('Basic Computer', 5, "Introduction to  computer working now this is description", 25, 45, "passed"),
  createData('Basic Computer', 5, "Introduction to  computer working now this is description", 25, 43, "passed",),
  createData('Basic Computer', 5, "Introduction to  computer working now this is description", 25, 49, "passed",),
  createData('Basic Computer', 5, "Introduction to  computer working now this is description", 25, 45, "passed",),
  createData('Basic Computer', 5, "Introduction to  computer working now this is description", 25, 44, "failed",),
  createData('Basic Computer', 5, "Introduction to  computer working now this is description", 25, 43, "status",),
  createData('Basic Computer', 5, "Introduction to  computer working now this is description", 25, 44, "failed",),
  createData('Basic Computer', 5, "Introduction to  computer working now this is description", 25, 43, "passed",),
];

const Test = () => {
  const router = useRouter();
  return (
    <div className="show_data">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="spanning table">
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
              assessmentTest?.modules?.map((item, index) => (
                <TableRow
                  key={index}
                // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  {
                    parseInt((assessmentTest?.modules?.length / 2)) === index ? (
                      <TableCell sx={{ borderWidth: 0 }} >
                        {assessmentTest?.courseName}
                      </TableCell>
                    ) : <TableCell rowSpan={1} sx={{ borderWidth: 0 }} />
                  }

                  <TableCell sx={{ borderLeft: "1px solid #dee2e6" }} align="right">{item?.moduleName}</TableCell>
                  <TableCell align="right">{item?.content}</TableCell>
                  <TableCell align="right">{item?.questions?.length}</TableCell>
                  <TableCell align="right">{assessmentTest?.obtainedMark}</TableCell>
                  <TableCell align="right">passed</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
      <div className='container'>
        <div className='row'>
          <div className='col-sm-12 text-center'>
            <Button variant='contained' sx={{m:3}}>Start Test</Button>
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

export default Test