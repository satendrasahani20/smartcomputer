import { deleteAdminQuestion, deleteModule, getAdminQuestion, getModuleDetails, saveAdminQuestion, saveModule, updateAdminQuestion, updateModules } from '@/service/action/admin'
import React, { useEffect, useState } from 'react'
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
import { useDispatch, useSelector } from 'react-redux';
import { customStyles } from '@/common/style/commonModalStyle';

const CourseDetails = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const { modules } = useSelector((state) => state.adminReducer)
    const { id } = router.query
    useEffect(() => {
        dispatch(getModuleDetails(id))
    }, [id])

    const {
        register,
        setValue,
        getValues,
        reset,
        handleSubmit,
        setError,
        control,
        formState: { errors }
    } = useForm();

    const [question, setQuestion] = useState(false)
    const [addQuestion, setAddQuestion] = useState(false)
    const [edit, setEdit] = useState(false)
    const [editModule, setEditModule] = useState(false)
    const [editQuestions, setEditQuestion] = useState(false)
    const [moduleObj, setModuleObj] = useState({
        moduleName: "",
        content: "",
        id: "",
        questions: []
    })
    const [questionObj, setQuestionObj] = useState({
        question: "",
        optionA: "",
        optionB: "",
        optionC: "",
        optionD: "",
        answer: "",
        questionId: ""
    })
    const [isOpen, setIsOpen] = useState(false)
    const [options, setOptions] = useState([])

    const cancel = () => {
        setQuestionObj({})
        setModuleObj({})
        setQuestion(false);
        setEdit(false);
        setIsOpen(false);
        setEditQuestion(false)
        setEditModule(false)
    }

    const updateModule = () => {
        let tempData = {};
        if (editModule) {
            tempData = {
                moduleName: moduleObj?.moduleName,
                content: moduleObj?.content
            }
            dispatch(updateModules(moduleObj?.id, tempData, cancel))
        } else {
            tempData = {
                courseId: id,
                moduleName: moduleObj?.moduleName,
                content: moduleObj?.content
            }
            dispatch(saveModule(tempData, cancel))
        }
    }

    const handleEdit = (item) => {
        dispatch(getAdminQuestion(item?._id))
        setModuleObj({
            moduleName: item?.moduleName,
            content: item?.content,
            id: item?._id,
            questions: item?.questions
        })
        setEditModule(true)
        setIsOpen(true)
        setAddQuestion(false)
    }
    const editQuestion = (data) => {
        setQuestionObj({
            question: data?.question,
            optionA: data?.options[0],
            optionB: data?.options[1],
            optionC: data?.options[2],
            optionD: data?.options[3],
            questionId: data?._id,
            answer: data?.answer
        })
        setOptions(data?.options)
        setQuestion(true)
        setEditQuestion(true)
    }

    const resetQuestion = () => {
        setValue("question", "")
        setValue("optionA", "")
        setValue("optionB", "")
        setValue("optionC", "")
        setValue("optionD", "")
        setValue("answer", "")
        setEditQuestion(false)
        setAddQuestion(false);
        setQuestion(false)
    }

    const handleAddModule = () => {
        resetQuestion();
        setAddQuestion(false);
        setQuestion(false)
        setIsOpen(true)
    }


    const handleQuestionOpen = () => {
        if (addQuestion) {
            if (editQuestions) {
                let data = {
                    question: questionObj?.question,
                    options: [questionObj?.optionA, questionObj?.optionB, questionObj?.optionC, questionObj?.optionD],
                    answer: questionObj?.answer,
                    _id: questionObj?.questionId
                }

                dispatch(updateAdminQuestion(moduleObj?.id, data))
            } else {
                let data = {
                    question: questionObj?.question,
                    options: [questionObj?.optionA, questionObj?.optionB, questionObj?.optionC, questionObj?.optionD],
                    answer: questionObj?.answer
                }
                dispatch(saveAdminQuestion(moduleObj?.id, data, resetQuestion))
            }
        } else {
            resetQuestion();
            setAddQuestion(true);
            setQuestion(true)
        }

    }


    const deleteQuestion = (id) => {
        dispatch(deleteAdminQuestion(moduleObj?.id, id))
    }


    const handleChange = (e) => {
        setModuleObj({
            ...moduleObj,
            [e.target.name]: e.target.value
        })
        setQuestionObj({
            ...questionObj,
            [e.target.name]: e.target.value
        })
    }
    return (
        <div class="show_data">
            <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)}
                style={customStyles}
            >

                <form>
                    <div className='container '>
                        <div className='row'>

                            <div className='col-sm-6'>

                                <TextField
                                    size="small"
                                    label="Module Name"
                                    value={moduleObj?.moduleName}
                                    name="moduleName"
                                    sx={{ zIndex: 0, width: "100%", marginTop: 2 }}
                                    onChange={handleChange}

                                />

                            </div>
                            <div className='col-sm-6'>
                                <TextField
                                    size="small"
                                    value={moduleObj?.content}
                                    label="Content"
                                    name="content"
                                    sx={{ zIndex: 0, width: "100%", marginTop: 2 }}
                                    onChange={handleChange}

                                />

                            </div>

                            {
                                question && (
                                    <QuestionField handleChange={handleChange} questionObj={questionObj} />
                                )
                            }
                            <div className='col-sm-12 text-center'>
                                <Button variant='contained' className='mt-3' onClick={cancel}>Cancel</Button>
                                {
                                    <Button sx={{ marginLeft: 1 }} onClick={handleQuestionOpen} variant='contained' className='mt-3'>
                                        {editQuestions ? "Update Question" : addQuestion ? "Save Question" : "Add New Question"}
                                    </Button>
                                }

                                <Button sx={{ marginLeft: 1 }} variant='contained' className='mt-3' onClick={updateModule}> {editModule ? "Update Module" : "Save Module"}</Button>
                            </div>
                        </div>
                        {

                            (addQuestion || editModule) && (
                                <div className='row'>
                                    <div className='col-sm-12'>
                                        <Question editQuestion={editQuestion} deleteQuestion={deleteQuestion} />
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </form>
            </Modal>
            <div className='admin-assessment'>
                <div className='col-sm-12 text-right'>
                    <Button variant='contained' className='m-1' onClick={() => router.back()}>Back</Button>
                    <Button variant='contained' className='m-3' onClick={handleAddModule}>Add New Module</Button>
                </div>
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
                                modules?.map((item, index) => (
                                    <TableRow
                                        key={index}
                                        // onClick={() => router?.push("/admin/assessments/course-detail")}
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
                                        <TableCell align="right"><Button onClick={() => dispatch(deleteModule(item?._id, cancel))} variant='contained'>Delete</Button></TableCell>
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
export default CourseDetails