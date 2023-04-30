import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Modal from 'react-modal'
import { Button } from '@mui/material';
import AddCentre from '@/common/components/admin/AddCentre';
import { useDispatch } from 'react-redux';
import { deleteAdminCentre, saveAdminCentre, updateAdminCentre } from '@/service/action/admin';
import { customStyles } from '@/common/style/commonModalStyle';
const CenterLists = ({ data,closeCenter}) => {
  const dispatch = useDispatch()
  const [centreDetails, setCentreDetail] = useState({
    modal: false,
    edit: false,
    data: [],
    id: ""
  })
  const [centreList,setCentreLists]=useState([])

  useEffect(()=>{
   setCentreLists(data?.data)
  },[data])
  const [centreObj, setCentreObj] = useState({
    centreName: "",
    ownerName: "",
    fatherName: "",
    gender: "",
    qualification: "",
    adharNo: "",
    state: "",
    district: "",
    address: "",
    pincode: "",
    mobileNo: "",
    email: "",
    password:"",
    centrePhoto: {
      inner: "",
      outer: ""
    },
    teacher: [
      {
        name: "",
        email: "",
        mobileNo: "",
        qualification: ""
      }
    ]

  })
  const [confirmPassword,setConfirmPassword]=useState("");
  const addCentre = () => {
    console.log("ceeee",centreObj)
    setCentreDetail({ 
      modal: true,
      edit: false,
      id:""})
      setCentreObj({})
  }

  const editCentre = (data) => {
    setCentreDetail({
      modal: true,
      edit: true,
      id: data?._id
    })

    setCentreObj({
      ...data
    })
  }


  const closeCentreModal = () => {
    setCentreDetail({
      modal: false,
      edit: false,
      id:""
    })
  }

  const handleCentreSubmit = () => {
    if (centreDetails?.edit) {
      dispatch(updateAdminCentre(centreObj,closeCentreModal,setCentreLists))
    } else {   
      dispatch(saveAdminCentre(centreObj,data?.quardinationId,closeCentreModal,setCentreLists))
    }
  }

  const handleCentreDelete=(item)=>{
    dispatch(deleteAdminCentre(item?._id,centreList,setCentreLists))
  }
  return (
    <>
      <Modal isOpen={centreDetails?.modal} onRequestClose={() => closeCentreModal}
        style={customStyles}
      >
        <div className='container'>
          <AddCentre
            setCentreObj={setCentreObj}
            centreObj={centreObj}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
          />
          <div className='row'>
            <div className='col-sm-12 text-right'>
              <Button variant='contained'style={{backgroundColor:"red"}} onClick={closeCentreModal} className='m-3'>Cancel</Button>
              <Button variant='contained' onClick={handleCentreSubmit}>{centreDetails?.edit ? "Update Centre" : "Add Centre"}</Button>
            </div>
          </div>
        </div>

      </Modal>
      <div className='container'>
        <div className='row'>
          <div className='col-6'>
            <h6>Quardinator Name : {data?.name}</h6>
          </div>
          <div className='col-4 text-right'>
            <Button variant={"contained"} size='small' onClick={addCentre}>Add Centre</Button>

          </div>
          <div className='col-2'>
            <Button variant={"contained"} style={{backgroundColor:"red"}} onClick={closeCenter} size='small'>Cancel</Button>

          </div>
        </div>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Sr No</TableCell>
              <TableCell align="right">Centre Name</TableCell>
              <TableCell align="right">Owner</TableCell>
              <TableCell align="right">Contact</TableCell>
              <TableCell align="right">address</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              centreList?.map((item, index) => (
                <TableRow
                  key={index}
                  // onClick={() => editCentre(item?.centre)}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell align="right">{item?.centreName}</TableCell>
                  <TableCell align="right">{item?.ownerName}</TableCell>
                  <TableCell align="right">{item?.mobileNo}</TableCell>
                  <TableCell align="right">{item?.address}</TableCell>
                  <TableCell align="right" sx={{ cursor: "pointer" }}>
                    <span className='text-primary' onClick={(e) => { e.stopPropagation(); editCentre(item) }} >Edit</span>
                    <span className='text-danger' onClick={(e) => { e.stopPropagation(); handleCentreDelete(item)}} > Delete</span>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </>
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


export default CenterLists