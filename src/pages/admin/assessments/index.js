import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getSession } from 'next-auth/react';
// import { adminAssessment } from '@/common/constant/assessments';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';
import AddCourse from './course/add-course';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCourse, getCourse } from '@/service/action/admin';

const Assesments = () => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [corseData, setCourseData] = useState({})
    const dispatch = useDispatch();
    const { assessment } = useSelector((state) => state.adminReducer)
    useEffect(() => {
        dispatch(getCourse())

    }, [])

    const handleEditCourse = (data) => {
        setCourseData(data)
        setIsEdit(true)
        setIsOpen(true)
    }

    const handleAddCourse = () => {
        setCourseData({})
        setIsEdit(false)
        setIsOpen(true)
    }
    const closeModal = () => {
        setCourseData({})
        setIsEdit(false)
        setIsOpen(false)
    }
    return (
        <div class="show_data">
            {
                isOpen && (<AddCourse isOpen={isOpen} course={corseData} onClose={closeModal} setIsOpen={setIsOpen} isEdit={isEdit} />)
            }
            <div className='admin-assessment'>
                <h5 className='assmnt-h p-3'>My Assesments-Economic Survey
                    <Button variant="outlined" className="addnewcrs" onClick={handleAddCourse}>Add New Course</Button></h5>

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Sr No</TableCell>
                                <TableCell>Course</TableCell>
                                <TableCell align="right">Module</TableCell>
                                <TableCell align="right">No of Question</TableCell>
                                <TableCell align="right">Edit</TableCell>
                                <TableCell align="right">Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                Array.isArray(assessment) && assessment?.map((item, index) => (
                                    <TableRow
                                        key={index}
                                        onClick={()=>router?.push(`/admin/assessments/course/${item?._id}`)}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {item?.name}
                                        </TableCell>
                                        <TableCell align="right">{item?.module || 0}</TableCell>
                                        <TableCell align="right">{item?.noOfQuestion || 0}</TableCell>
                                        <TableCell align="right"><Button size="small" onClick={(e) => {
                                            e?.stopPropagation();
                                            handleEditCourse(item)
                                        }
                                        } variant='contained'>Edit</Button></TableCell>
                                        <TableCell align="right"><Button size="small" onClick={(e) => {
                                             e?.stopPropagation();
                                            dispatch(deleteCourse(item?._id))
                                        }
                                        } variant='contained'>Delete</Button></TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
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

export default Assesments