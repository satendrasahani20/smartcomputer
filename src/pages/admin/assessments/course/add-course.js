import { customStyles } from '@/common/style/commonModalStyle';
import { saveCourse, updateCourse } from '@/service/action/admin';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { useDispatch } from 'react-redux';

const AddCourse = ({ isOpen, setIsOpen, isEdit, course ,onClose}) => {
    const [data, setData] = useState({
        name: "",
        duration: "",
        cuttOffScore: 0,
        maxMark: 0,
        testTiming: 0
    })
    const [id,setId]=useState("");
    const dispatch = useDispatch()

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const saveCourses = () => {
        if(isEdit){
          dispatch(updateCourse(id,data,onClose))
        }else{
            dispatch(saveCourse(data,onClose));
        }
        
    }

    useEffect(() => {
        if (isEdit) {
            setId(course?._id)
            setData({
                name: course?.name,
                duration:course?.duration,
                cuttOffScore: course?.cuttOffScore,
                maxMark: course?.maxMark,
                testTiming: course?.testTiming
            })
        }
    }, [isEdit])
    return (
        <>
            <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)}
                style={customStyles}
            >
                <div className='container'>
                    <div className='row'>
                        <div className='col-sm-4'>
                            <TextField
                                size="small"
                                label="Course Name"
                                name="name"
                                value={data?.name}
                                sx={{ zIndex: 0, width: "100%", marginTop: 2 }}
                                onChange={handleChange}

                            />
                        </div>
                        <div className='col-sm-4'>
                            <TextField
                                size="small"
                                label="Duration"
                                value={data?.duration}
                                name="duration"
                                placeholder="eg, 2 years, 6 month"
                                sx={{ zIndex: 0, width: "100%", marginTop: 2 }}
                                onChange={handleChange}

                            />
                        </div>
                        <div className='col-sm-4'>
                            <TextField
                                size="small"
                                label="Cutt-Off Score"
                                value={data?.cuttOffScore}
                                name="cuttOffScore"
                                sx={{ zIndex: 0, width: "100%", marginTop: 2 }}
                                onChange={handleChange}

                            />
                        </div>
                    </div>
                    <div className='row'>

                        <div className='col-sm-4'>
                            <TextField
                                size="small"
                                label="Max Mark"
                                value={data?.maxMark}
                                name="maxMark"
                                sx={{ zIndex: 0, width: "100%", marginTop: 2 }}
                                onChange={handleChange}

                            />

                        </div>
                        <div className='col-sm-4'>
                            <TextField
                                type={"number"}
                                size="small"
                                label="Test Timing"
                                name="testTiming"
                                placeholder='Enter value in minutes'
                                value={data?.testTiming}
                                sx={{ zIndex: 0, width: "100%", marginTop: 2 }}
                                onChange={handleChange}

                            />

                        </div>
                        <div className='col-sm-2'>
                            <Button variant='contained'onClick={onClose} className='mt-3'>Cancel</Button>
                        </div>
                        <div className='col-sm-2'>
                            <Button variant='contained' className='mt-3' onClick={saveCourses}>{isEdit?"Update":"Save"}</Button>


                        </div>
                    </div>
                </div>


            </Modal>
        </>
    )
}

export default AddCourse;