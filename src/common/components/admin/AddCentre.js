import React, { Fragment, useEffect, useState } from 'react'
import { Button } from '@mui/material';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { toast } from 'react-hot-toast';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImageAction } from '@/service/action/common';
const AddCentre = ({ centreObj, setCentreObj,setConfirmPassword,confirmPassword }) => {
    const { centreOuterImage, centreInnerImage } = useSelector((state) => state.commonReducer)
    const dispatch = useDispatch()
  
    const handleChange = (e) => {
        setCentreObj({
            ...centreObj, [e.target.name]: e.target.value
        })
    }

    const handeTeacherChange = (e) => {
        console.log("teacger", centreObj?.teacher)
        if (centreObj?.teacher?.length) {
            console.log("...centreObj?.teacher[0]", {...centreObj?.teacher[0]})
            setCentreObj({
                ...centreObj,
                teacher: [{ ...centreObj?.teacher[0], [e.target.name]: e.target.value }]

            })
        } else {
            setCentreObj({
                ...centreObj,
                teacher: [{ [e.target.name]: e.target.value }]
            })
        }

    }
    const uploadOuterImage = async (image) => {
        if (!image?.size / 1024 > 100) {
            toast.error("Please upload Image less than 100KB")
        } else {
            const data = new FormData();
            data.append("file", image);
            dispatch(uploadImageAction(data, "centreOuterImage", setCentreObj, centreObj))
        }

    }

    const uploadInnerImage = async (image) => {
        if (!image?.size / 1024 > 100) {
            toast.error("Please upload Image less than 100KB")
        } else {
            const data = new FormData();
            data.append("file", image);
            dispatch(uploadImageAction(data, "centreInnerImage", setCentreObj, centreObj))
        }

    }


    return (
        <div className='row'>
            <div className='col-sm-4'>

                <TextField
                    size="small"
                    label="Centre Name"
                    name="centreName"
                    value={centreObj?.centreName}
                    sx={{ zIndex: 0, width: "100%", marginTop: 2 }}
                    onChange={handleChange}

                />
            </div>
            <div className='col-sm-4'>
                <TextField
                    size="small"
                    label="Owner Name"
                    name="ownerName"
                    value={centreObj?.ownerName}
                    sx={{ zIndex: 0, width: "100%", marginTop: 2 }}
                    onChange={handleChange}

                />


            </div>
            <div className='col-sm-4'>

                <TextField
                    value={centreObj?.fatherName}
                    size="small"
                    label="Father Name"
                    name="fatherName"
                    sx={{ zIndex: 0, width: "100%", marginTop: 2 }}
                    onChange={handleChange}

                />

            </div>
            <div className='col-sm-4'>

                <FormControl>
                    {/* <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel> */}
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
                    size="small"
                    value={centreObj?.qualification}
                    label="Qualification"
                    name="qualification"
                    sx={{ zIndex: 0, width: "100%", marginTop: 2 }}
                    onChange={handleChange}

                />
            </div>
            <div className='col-sm-4'>
                <TextField
                    size="small"
                    value={centreObj?.adharNo}
                    label="Adhar No"
                    name="adharNo"
                    sx={{ zIndex: 0, width: "100%", marginTop: 2 }}
                    onChange={handleChange}

                />
            </div>
            <div className='col-sm-4'>
                <TextField
                    size="small"
                    value={centreObj?.state}
                    label="State"
                    name="state"
                    sx={{ zIndex: 0, width: "100%", marginTop: 2 }}
                    onChange={handleChange}

                />
            </div>

            <div className='col-sm-4'>
                <TextField
                    size="small"
                    value={centreObj?.district}
                    label="District"
                    name="district"
                    sx={{ zIndex: 0, width: "100%", marginTop: 2 }}
                    onChange={handleChange}

                />
            </div> <div className='col-sm-4'>
                <TextField
                    size="small"
                    value={centreObj?.address}
                    label="Address"
                    name="address"
                    sx={{ zIndex: 0, width: "100%", marginTop: 2 }}
                    onChange={handleChange}

                />
            </div>

            <div className='col-sm-4'>
                <TextField
                    size="small"
                    value={centreObj?.pincode}
                    label="Pincode"
                    name="pincode"
                    sx={{ zIndex: 0, width: "100%", marginTop: 2 }}
                    onChange={handleChange}

                />
            </div> <div className='col-sm-4'>
                <TextField
                    size="small"
                    value={centreObj?.mobileNo}
                    label="Mobile No"
                    name="mobileNo"
                    sx={{ zIndex: 0, width: "100%", marginTop: 2 }}
                    onChange={handleChange}

                />
            </div>

            <div className='col-sm-4'>
                <TextField
                    size="small"
                    value={centreObj?.email}
                    label="Email"
                    name="email"
                    sx={{ zIndex: 0, width: "100%", marginTop: 2 }}
                    onChange={handleChange}

                />
            </div>
            <div className='col-sm-6'>
                <TextField
                    size="small"
                    value={centreObj?.password}
                    label="Password"
                    name="password"
                    sx={{ zIndex: 0, width: "100%", marginTop: 2 }}
                    onChange={handleChange}

                />
            </div>
            <div className='col-sm-6'>
                <TextField
                    size="small"
                    value={confirmPassword}
                    label="Confirm Password"
                    sx={{ zIndex: 0, width: "100%", marginTop: 2 }}
                    onChange={(e)=>setConfirmPassword(e.target.value)}

                />
            </div>
            <div className='col-sm-4 mt-3'>
                <label>Centre Inner Image</label>
                <input type="file" onChange={(e) => uploadInnerImage(e.target.files[0])} />
                <img className='mt-2' src={centreInnerImage ? centreInnerImage : centreObj?.centrePhoto?.inner ? centreObj?.centrePhoto?.inner : ""} width="20%" />
            </div>
            <div className='col-sm-4  mt-3'>
                <label>Centre Outer Image</label>
                <input type="file" onChange={(e) => uploadOuterImage(e.target.files[0])} />
                <img className='mt-2' src={centreOuterImage ? centreOuterImage : centreObj?.centrePhoto?.outer ? centreObj?.centrePhoto?.outer : ""} width="20%" />
            </div>
            <h6 className='mt-3'>Teacher Section</h6>

            {/* {
                    centreObj?.teacher?.map((item, index) => (
                        <Fragment key={index}>
                            <div className='col-sm-6'>
                                <TextField
                                    size="small"
                                    value={item?.name}
                                    label="Name"
                                    name="name"
                                    sx={{ zIndex: 0, width: "100%", marginTop: 2 }}
                                    onChange={handleChange}

                                />
                            </div>
                            <div className='col-sm-6'>
                                <TextField
                                    size="small"
                                    value={item?.email}
                                    label="Email"
                                    name="email"
                                    sx={{ zIndex: 0, width: "100%", marginTop: 2 }}
                                    onChange={handleChange}

                                />
                            </div>
                            <div className='col-sm-6'>
                                <TextField
                                    size="small"
                                    value={item?.mobileNo}
                                    label="Mobile No"
                                    name="mobileNo"
                                    sx={{ zIndex: 0, width: "100%", marginTop: 2 }}
                                    onChange={handleChange}

                                />
                            </div>
                            <div className='col-sm-6'>
                                <TextField
                                    size="small"
                                    value={item?.qualification}
                                    label="Qualification"
                                    name="qualification"
                                    sx={{ zIndex: 0, width: "100%", marginTop: 2 }}
                                    onChange={handleChange}

                                />
                            </div>
                        </Fragment>
                    ))
                    
            } */}
            <Fragment>
                <div className='col-sm-6'>
                    <TextField
                        size="small"
                        value={centreObj?.teacher?.length && centreObj?.teacher[0]?.name}
                        label="Name"
                        name="name"
                        sx={{ zIndex: 0, width: "100%", marginTop: 2 }}
                        onChange={handeTeacherChange}

                    />
                </div>
                <div className='col-sm-6'>
                    <TextField
                        size="small"
                        value={centreObj?.teacher?.length && centreObj?.teacher[0]?.email}
                        label="Email"
                        name="email"
                        sx={{ zIndex: 0, width: "100%", marginTop: 2 }}
                        onChange={handeTeacherChange}

                    />
                </div>
                <div className='col-sm-6'>
                    <TextField
                        size="small"
                        value={centreObj?.teacher?.length && centreObj?.teacher[0]?.mobileNo}
                        label="Mobile No"
                        name="mobileNo"
                        sx={{ zIndex: 0, width: "100%", marginTop: 2 }}
                        onChange={handeTeacherChange}

                    />
                </div>
                <div className='col-sm-6'>
                    <TextField
                        size="small"
                        value={centreObj?.teacher?.length && centreObj?.teacher[0]?.qualification}
                        label="Qualification"
                        name="qualification"
                        sx={{ zIndex: 0, width: "100%", marginTop: 2 }}
                        onChange={handeTeacherChange}

                    />
                </div>
            </Fragment>

            {/* <div className='col-sm-4'>
    
                <FormControl sx={{ mt: 2, minWidth: 350 }} size="small">
                    <InputLabel id="demo-select-small">Select Answer</InputLabel>
                    <Select
                        labelId="demo-select-small"
                        id="demo-select-small"
                        label="Select Answer"
                        name="answer"
                        value={centreObj?.answer}

                        onChange={handleChange}
                    >
                        {
                            options?.map((item)=>(
                                <MenuItem value={item}>{item}</MenuItem>
                            ))
                        }                    </Select>
                </FormControl>
    </div> */}
        </div>
    )
}

export default AddCentre