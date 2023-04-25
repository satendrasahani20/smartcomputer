import React, { useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getSession } from 'next-auth/react';
import { adminModules } from '@/common/constant/assessments';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Modal from 'react-modal'
import { Controller, useForm } from 'react-hook-form';
import Question from '@/common/components/admin/Question';
import QuestionField from '@/common/components/admin/QuestionField';


const courseDetail = () => {
    
    return (
        <div class="show_data">
            <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)}
                style={customStyles}
            >

                <form>
                    <div className='container '>
                        <div className='row'>
                            <div className='col-sm-6'>
                                <Controller
                                    name="moduleName"
                                    control={control}
                                    {...register("moduleName")}
                                    render={({ field }) => (
                                        <TextField
                                            size="small"
                                            label="Module Name"
                                            value={getValues("moduleName")}
                                            sx={{ zIndex: 0, width: "100%", marginTop: 2 }}
                                            onChange={({ target: { value } }) => {
                                                field.onChange(value)
                                            }}

                                        />
                                    )}
                                />

                            </div>
                            <div className='col-sm-6'>
                                <Controller
                                    name="content"
                                    control={control}
                                    {...register("content")}
                                    render={({ field }) => (
                                        <TextField
                                            size="small"
                                            value={getValues("content")}
                                            label="Content"
                                            sx={{ zIndex: 0, width: "100%", marginTop: 2 }}
                                            onChange={({ target: { value } }) => {
                                                field.onChange(value)
                                            }}

                                        />
                                    )}
                                />
                            </div>

                            {
                                question && (
                                    <QuestionField register={register} control={control} getValues={getValues} />
                                )
                            }
                            <div className='col-sm-12 text-center'>
                                <Button variant='contained' className='mt-3' onClick={cancel}>Cancel</Button>
                                {
                                    addQuestion ? <Button sx={{ marginLeft: 1 }} variant='contained' className='mt-3'>Save Question</Button> : <Button sx={{ marginLeft: 1 }} variant='contained' className='mt-3' onClick={() => { resetQuestion(); setAddQuestion(true); setQuestion(true) }}>Add New Question</Button>
                                }

                                <Button sx={{ marginLeft: 1 }} variant='contained' className='mt-3' onClick={handleSubmit(updateModule)}> Update Module</Button>
                            </div>
                        </div>
                        {

                            (addQuestion || edit) && (
                                <div className='row'>
                                    <div className='col-sm-12'>
                                        <Question questions={getValues("questions")} editQuestion={editQuestion} />
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </form>
            </Modal>
            <div className='admin-assessment'>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Sr No</TableCell>
                                <TableCell>Module Name</TableCell>
                                <TableCell align="right">Content</TableCell>
                                <TableCell align="right">No of Question</TableCell>
                                <TableCell align="right">Edit</TableCell>
                                <TableCell align="right">Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                adminModules?.map((item, index) => (
                                    <TableRow
                                        key={index}
                                        onClick={() => router?.push("/admin/assessments/course-detail")}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {item.moduleName}
                                        </TableCell>
                                        <TableCell align="right">{item?.content}</TableCell>
                                        <TableCell align="right">{item?.questions?.length}</TableCell>
                                        <TableCell align="right"><Button onClick={() => handleEdit(item)} variant='contained'>Edit</Button></TableCell>
                                        <TableCell align="right"><Button variant='contained'>Delete</Button></TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <Button variant='contained' className='m-3' onClick={()=>router.back()}>Back</Button>
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

export default courseDetail