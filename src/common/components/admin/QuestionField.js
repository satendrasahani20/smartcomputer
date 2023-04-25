import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
const QuestionField = ({ handleChange, questionObj }) => {
    const [options,setOptions]=useState([])
    useEffect(()=>{
        setOptions([questionObj?.optionA,questionObj?.optionB,questionObj?.optionC,questionObj?.optionD])
    },[questionObj])
    return (
        <div className='row'>
            <div className='col-sm-4'>

                <TextField
                    size="small"
                    label="Question"
                    name="question"
                    value={questionObj?.question}
                    sx={{ zIndex: 0, width: "100%", marginTop: 2 }}
                    onChange={handleChange}

                />
            </div>
            <div className='col-sm-4'>
                <TextField
                    size="small"
                    label="Option A"
                    name="optionA"
                    value={questionObj?.optionA}
                    sx={{ zIndex: 0, width: "100%", marginTop: 2 }}
                    onChange={handleChange}

                />


            </div>
            <div className='col-sm-4'>

                <TextField
                    value={questionObj?.optionB}
                    size="small"
                    label="Option B"
                    name="optionB"
                    sx={{ zIndex: 0, width: "100%", marginTop: 2 }}
                    onChange={handleChange}

                />

            </div>
            <div className='col-sm-4'>

                <TextField
                    size="small"
                    value={questionObj?.optionC}
                    label="Option C"
                    name="optionC"
                    sx={{ zIndex: 0, width: "100%", marginTop: 2 }}
                    onChange={handleChange}

                />
            </div>
            <div className='col-sm-4'>
                        <TextField
                            size="small"
                            value={questionObj?.optionD}
                            label="Option D"
                            name="optionD"
                            sx={{ zIndex: 0, width: "100%", marginTop: 2 }}
                            onChange={handleChange}

                        />
            </div>
            <div className='col-sm-4'>
            
                        <FormControl sx={{ mt: 2, minWidth: 350 }} size="small">
                            <InputLabel id="demo-select-small">Select Answer</InputLabel>
                            <Select
                                labelId="demo-select-small"
                                id="demo-select-small"
                                label="Select Answer"
                                name="answer"
                                value={questionObj?.answer}

                                onChange={handleChange}
                            >
                                {
                                    options?.map((item)=>(
                                        <MenuItem value={item}>{item}</MenuItem>
                                    ))
                                }
                              
                                {/* <MenuItem value={getValues("optionB")}>Option B </MenuItem>
                                <MenuItem value={getValues("optionC")}>Option C </MenuItem>
                                <MenuItem value={getValues("optionD")}>Option D </MenuItem> */}


                            </Select>
                        </FormControl>
            </div>
        </div>
    )
}

export default QuestionField