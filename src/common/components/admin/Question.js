import React, { useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
const Question = ({editQuestion,deleteQuestion}) => {
    const {questions}=useSelector((state)=>state.adminReducer)
    const router=useRouter();
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Question</TableCell>
                        <TableCell align="right">Option A</TableCell>
                        <TableCell align="right">Option B</TableCell>
                        <TableCell align="right">Option C</TableCell>
                        <TableCell align="right">Option D</TableCell>
                        <TableCell align="right">Answer</TableCell>
                        <TableCell align="right">Edit</TableCell>
                        <TableCell align="right">Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        questions?.map((item, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {item.question}
                                </TableCell>

                                <TableCell align="right">{item?.options[0]}</TableCell>
                                <TableCell align="right">{item?.options[1]}</TableCell>
                                <TableCell align="right">{item?.options[2]}</TableCell>
                                <TableCell align="right">{item?.options[1]}</TableCell>
                                <TableCell component="th" scope="row">
                                    {item.answer}
                                </TableCell>
                                <TableCell align="right"><Button type='button' onClick={() => editQuestion(item)} variant='contained'>Edit</Button></TableCell>
                                <TableCell align="right"><Button variant='contained' onClick={()=>deleteQuestion(item?._id)}>Delete</Button></TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default Question