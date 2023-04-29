import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import DatePicker from "react-datepicker";
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import "react-datepicker/dist/react-datepicker.css";
const StudentForm = ({ handleChange, studentObj, setStudentObj, setConfirmPassword, confirmPassword }) => {
    const [options, setOptions] = useState([])
    
    const uploadImage = async (image) => {
        if (!image?.size / 1024 > 100) {
            toast.error("Please upload Image less than 100KB")
        } else {
            const data = new FormData();
            data.append("file", image);
            dispatch(uploadImageAction(data, "quardinator",setQuardinateObj,quardinateObj))
        }

    }
    return (
        <div className='row'>
            <div className='col-sm-4'>

                <TextField
                    size="small"
                    label="Student Name"
                    name="name"
                    value={studentObj?.name}
                    sx={{ zIndex: 0, width: "100%", marginTop: 2 }}
                    onChange={handleChange}

                />
            </div>
            <div className='col-sm-4'>
                <TextField
                    size="small"
                    label="Father Name"
                    name="fatherName"
                    value={studentObj?.fatherName}
                    sx={{ zIndex: 0, width: "100%", marginTop: 2 }}
                    onChange={handleChange}

                />


            </div>
            <div className='col-sm-4'>
                <TextField
                    value={studentObj?.motherName}
                    size="small"
                    label="Mother Name"
                    name="motherName"
                    sx={{ zIndex: 0, width: "100%", marginTop: 2 }}
                    onChange={handleChange}

                />
            </div>
            <div className='col-sm-4'>
                <div className='col-sm-4'>
                    <DatePicker className='mt-3
                         datePickerInput'
                        placeholderText='Enter Date Of Birth'
                        selected={studentObj?.dob}
                        onChange={(date) => setStudentObj({ ...studentObj, dob: date })} />
                </div>
            </div>
            <div className='col-sm-4'>
                <FormControl>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="gender"
                        onChange={handleChange}
                        sx={{ zIndex: 0, width: "100%", marginTop: 2 }}
                    >
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                        <FormControlLabel value="other" control={<Radio />} label="Other" />

                    </RadioGroup>
                </FormControl>
            </div>
            <div className='col-sm-4'>
                <TextField
                    value={studentObj?.qualification}
                    size="small"
                    label="Qualification"
                    name="qualification"
                    sx={{ zIndex: 0, width: "100%", marginTop: 2 }}
                    onChange={handleChange}

                />
            </div>
            <div className='col-sm-4'>
                <TextField
                    value={studentObj?.category}
                    size="small"
                    label="Category"
                    name="category"
                    sx={{ zIndex: 0, width: "100%", marginTop: 2 }}
                    onChange={handleChange}

                />
            </div>
            <div className='col-sm-4'>
                <TextField
                    value={studentObj?.state}
                    size="small"
                    label="State"
                    name="state"
                    sx={{ zIndex: 0, width: "100%", marginTop: 2 }}
                    onChange={handleChange}

                />
            </div>
            <div className='col-sm-4'>
                <TextField
                    value={studentObj?.district}
                    size="small"
                    label="District"
                    name="district"
                    sx={{ zIndex: 0, width: "100%", marginTop: 2 }}
                    onChange={handleChange}

                />
            </div>
            <div className='col-sm-4'>
                <TextField
                    value={studentObj?.address}
                    size="small"
                    label="Address"
                    name="address"
                    sx={{ zIndex: 0, width: "100%", marginTop: 2 }}
                    onChange={handleChange}

                />
            </div>
            <div className='col-sm-4'>
                <TextField
                    value={studentObj?.pinCode}
                    size="small"
                    label="Pin Code"
                    name="pinCode"
                    sx={{ zIndex: 0, width: "100%", marginTop: 2 }}
                    onChange={handleChange}

                />
            </div>
            <div className='col-sm-4'>
                <TextField
                    value={studentObj?.mobileNo}
                    size="small"
                    label="Mobile No"
                    name="mobileNo"
                    sx={{ zIndex: 0, width: "100%", marginTop: 2 }}
                    onChange={handleChange}

                />
            </div>
            <div className='col-sm-4'>
                <TextField
                    value={studentObj?.email}
                    size="small"
                    label="Email"
                    name="email"
                    sx={{ zIndex: 0, width: "100%", marginTop: 2 }}
                    onChange={handleChange}

                />
            </div>
            <div className='col-sm-4'>
                <TextField
                    value={studentObj?.password}
                    size="small"
                    label="Password"
                    name="password"
                    sx={{ zIndex: 0, width: "100%", marginTop: 2 }}
                    onChange={handleChange}

                />
            </div>
            <div className='col-sm-4'>
                <TextField
                    value={confirmPassword}
                    size="small"
                    label="Confirm Password"
                    sx={{ zIndex: 0, width: "100%", marginTop: 2 }}
                    onChange={(e) => setConfirmPassword(e.target.value)}

                />
            </div>
            <div className='col-sm-12 text-center'>
                <input type="file" className='m-3' onChange={(e) => uploadImage(e.target.files[0])} />
            </div>

        </div>
    )
}

export default StudentForm