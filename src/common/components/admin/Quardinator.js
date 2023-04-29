import { TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Button } from '@mui/material';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { uploadImageAction } from '@/service/action/common';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { saveQuardinator, updateAdminQuardinator } from '@/service/action/admin';
const Quardinator = ({ cancel, editQuardinateObj }) => {
    const [image, setImage] = useState("");
    const dispatch = useDispatch();
    const { quardinatorImage } = useSelector((state) => state.commonReducer)
    const [edit, setEdit] = useState(false)
    const [quardinateObj, setQuardinateObj] = useState({
        name: "",
        fatherName: "",
        motherName: "",
        dob: "",
        gender: "",
        state: "",
        district: "",
        address: "",
        pinCode: "",
        contact: "",
        email: "",
        qualification: "",
        adhar: "",
        image: "",
        password:"",
    })

    const [confirmPassword,setConfirmPassword]=useState("")

    useEffect(() => {
        if (editQuardinateObj?._id) {
            setEdit(true)
            console.log("image",editQuardinateObj)
            setImage(editQuardinateObj?.image)
            setQuardinateObj({
                ...editQuardinateObj,
                dob: new Date(editQuardinateObj?.dob)
            })
        }
    }, [editQuardinateObj])

    const handleChange = (e) => {
        setQuardinateObj({
            ...quardinateObj,
            [e.target.name]: e.target.value
        })
    }


    const close=()=>{
        cancel();
        setQuardinateObj({})
        setEdit(false)
    }


    const handleSubmit = () => {
        if (quardinatorImage || image) {
            if (edit) {
                if(confirmPassword){
                    if(!quardinateObj?.password || quardinateObj?.password !=confirmPassword){
                        toast.error("Password and confirm password not match!")
                        return false;
                    }
                }
                let id = quardinateObj?._id;
                delete quardinateObj?._id;
                dispatch(updateAdminQuardinator(id,quardinateObj,close))
            } else {
                if(!quardinateObj?.password || quardinateObj?.password ==confirmPassword){
                    dispatch(saveQuardinator({ ...quardinateObj, image: quardinatorImage },close))
                }else{
                    toast.error("Password and confirm password not match!")
                }
             
            }

        } else {
            toast.error("Please Upload Image!")
            return false;
        }
    }

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
        <form>
            <div className='container '>
                <div className='row'>

                    <div className='col-sm-4'>

                        <TextField
                            size="small"
                            label="Full Name"
                            value={quardinateObj?.name}
                            name="name"
                            sx={{ zIndex: 0, width: "100%", marginTop: 2 }}
                            onChange={handleChange}

                        />

                    </div>
                    <div className='col-sm-4'>
                        <TextField
                            size="small"
                            value={quardinateObj?.fatherName}
                            label="Father Name"
                            name="fatherName"
                            sx={{ zIndex: 0, width: "100%", marginTop: 2 }}
                            onChange={handleChange}

                        />

                    </div>
                    <div className='col-sm-4'>
                        <TextField
                            size="small"
                            value={quardinateObj?.motherName}
                            label="Mother Name"
                            name="motherName"
                            sx={{ zIndex: 0, width: "100%", marginTop: 2 }}
                            onChange={handleChange}
                        />

                    </div>
                    <div className='col-sm-4'>
                        <TextField
                            size="small"
                            value={quardinateObj?.contact}
                            label="Contact"
                            name="contact"
                            sx={{ zIndex: 0, width: "100%", marginTop: 2 }}
                            onChange={handleChange}
                        />

                    </div>

                    <div className='col-sm-4'>
                        <DatePicker className='mt-3
                         datePickerInput'
                            placeholderText='Enter Date Of Birth'
                            selected={quardinateObj?.dob}
                            onChange={(date) => setQuardinateObj({ ...quardinateObj, dob: date })} />
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
                            value={quardinateObj?.state}
                            label="State"
                            name="state"
                            sx={{ zIndex: 0, width: "100%", marginTop: 2 }}
                            onChange={handleChange}
                        />

                    </div>
                    <div className='col-sm-4'>
                        <TextField
                            size="small"
                            value={quardinateObj?.district}
                            label="District"
                            name="district"
                            sx={{ zIndex: 0, width: "100%", marginTop: 2 }}
                            onChange={handleChange}
                        />

                    </div>
                    <div className='col-sm-4'>
                        <TextField
                            size="small"
                            value={quardinateObj?.address}
                            label="Address"
                            name="address"
                            sx={{ zIndex: 0, width: "100%", marginTop: 2 }}
                            onChange={handleChange}
                        />

                    </div>
                    <div className='col-sm-4'>
                        <TextField
                            size="small"
                            value={quardinateObj?.pinCode}
                            label="Pin Code"
                            name="pinCode"
                            sx={{ zIndex: 0, width: "100%", marginTop: 2 }}
                            onChange={handleChange}
                        />

                    </div>

                    <div className='col-sm-4'>
                        <TextField
                            size="small"
                            value={quardinateObj?.email}
                            label="Email"
                            name="email"
                            sx={{ zIndex: 0, width: "100%", marginTop: 2 }}
                            onChange={handleChange}
                        />

                    </div>
                    <div className='col-sm-4'>
                        <TextField
                            size="small"
                            value={quardinateObj?.qualification}
                            label="Qualification"
                            name="qualification"
                            sx={{ zIndex: 0, width: "100%", marginTop: 2 }}
                            onChange={handleChange}
                        />

                    </div>
                    <div className='col-sm-4'>
                        <TextField
                            size="small"
                            value={quardinateObj?.adhar}
                            label="Adhar Number"
                            name="adhar"
                            sx={{ zIndex: 0, width: "100%", marginTop: 2 }}
                            onChange={handleChange}
                        />

                    </div>
                    <div className='col-sm-4'>
                        <TextField
                            size="small"
                            value={quardinateObj?.password}
                            label="Password"
                            name="password"
                            sx={{ zIndex: 0, width: "100%", marginTop: 2 }}
                            onChange={handleChange}
                        />

                    </div>
                    <div className='col-sm-4'>
                        <TextField
                            size="small"
                            value={confirmPassword}
                            label="Confirm Password"
                            name="confirmPassword"
                            sx={{ zIndex: 0, width: "100%", marginTop: 2 }}
                            onChange={(e)=>setConfirmPassword(e.target.value)}
                        />

                    </div>
                    <div className='col-sm-12 text-center'>
                        <input type="file" className='m-3' onChange={(e) => uploadImage(e.target.files[0])} />
                    </div>
                    <div className='col-sm-12 text-center'>
                        <img src={quardinatorImage ? quardinatorImage :image?image: ""} width="20%" />
                        {/* <img src={quardinatorImage ? quardinatorImage : image ? URL?.createObjectURL(image) : ""} width="20%" /> */}
                    </div>
                    <div className='col-sm-12 text-center'>
                        <Button variant='contained' className='mt-3' style={{backgroundColor:"red"}}
                            onClick={cancel}
                        >Cancel</Button>

                        <Button sx={{ marginLeft: 1 }} onClick={handleSubmit} variant='contained' className='mt-3' > Save Quardinator</Button>
                    </div>
                </div>

            </div>
        </form>
    )
}

export default Quardinator