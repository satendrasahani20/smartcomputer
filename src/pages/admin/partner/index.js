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
import { Button } from '@mui/material';
import Modal from 'react-modal'
import Quardinator from '@/common/components/admin/Quardinator';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAdminQuardinator, getAdminQuardinator } from '@/service/action/admin';
import CenterLists from './center-lists';
import { customStyles } from '@/common/style/commonModalStyle';
const index = () => {
  const router = useRouter();
  const [isOpen, setOpen] = useState(false)
  const { quardinates } = useSelector((state) => state?.adminReducer)
  const dispatch = useDispatch();
 

  const [quardinateObj, setQuardinateObj] = useState([]);
  const [centreDetail, setCentreDetail] = useState({
    modal: false,
    edit: false,
    data: [],
    name:"",
    quardinationId:"",
  })
  const openCentre = (data,name,quardinationId) => {
    setCentreDetail({
      modal: true,
      data,
      name,
      quardinationId,
    })
  }
  const closeCentre = () => {
    setCentreDetail({
      modal: false,
      data: [],
    })
  }
  const cancel = () => {
    setOpen(false)
  }
  useEffect(() => {
    dispatch(getAdminQuardinator())
  }, [])
  const addQuardinator = (item = null) => {
    setQuardinateObj(item)
    setOpen(true)
  }

  const deleteQuardinate = (id) => {
    dispatch(deleteAdminQuardinator(id))
  }

  return (
    <div class="show_data">
      <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)}
        style={customStyles}
      >
        <Quardinator cancel={cancel} editQuardinateObj={quardinateObj} />
      </Modal>

      <Modal isOpen={centreDetail?.modal} onRequestClose={() => closeCentre}
        style={customStyles}
      >
        <CenterLists  data={centreDetail} closeCenter={closeCentre} />
      </Modal>
      <div className='container'>
        <div className='row'>
          <div className='col-sm-12'>
            <Button variant={"contained"} sx={{left: "-14px", top: "-10px"}} onClick={() => addQuardinator()}>Add Quardinator</Button>
          </div>
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Sr No</TableCell>
              <TableCell align="right">Quardinator Name</TableCell>
              <TableCell align="right">Address</TableCell>
              <TableCell align="right">Contact</TableCell>
              <TableCell align="right">Institute</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              quardinates?.map((item, index) => (
                <TableRow
                  key={index}
                  onClick={() => openCentre(item?.centre,item?.name,item?._id)}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell align="right">{item?.name}</TableCell>
                  <TableCell align="right">{item?.address}</TableCell>
                  <TableCell align="right">{item?.contact}</TableCell>
                  <TableCell align="right">{347 + index}</TableCell>
                  <TableCell align="right" sx={{ cursor: "pointer" }}>
                    <span className='text-primary' onClick={(e) => { e.stopPropagation(); addQuardinator(item) }} >Edit</span>
                    <span className='text-danger' onClick={(e) => { e.stopPropagation(); deleteQuardinate(item?._id) }} > Delete</span>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
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

export default index