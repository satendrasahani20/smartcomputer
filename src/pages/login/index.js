import Image from 'next/image'
import React, { useState } from 'react'
import Logo from "../../assets/images/logo.png"
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import { useForm } from 'react-hook-form';
import { getSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function Login(props) {
    const {
        register,
        setValue,
        reset,
        handleSubmit,
        setError,
        formState: { errors }
    } = useForm();
    
    const [errorBox, setErrorBox] = useState({
        error: false,
        message: "",
        box: false
    });

    const router=useRouter();

    const loginNow = async (data) => {
        const login = await signIn("credentials", { ...data, redirect: false })
        setErrorBox({ ...errorBox, box: true })
        if (login?.status === 200) {
            setErrorBox({ ...errorBox, error: false, message: "" })
            router.push("/login/auth")
        } else {
            setErrorBox({ ...errorBox, box: true, error: true, message: "Email or Password not match" })
        }
    }
    return (
        <Stack sx={{ width: '100%' }} spacing={2}>
            <div className="pt-5 login-area">
                <div className="container">
                    <div className="row">
                        <div className="col-md-5 mx-auto">
                            <div className="login-box">
                                <a href="#" className='login-logo'><Image src={Logo} alt="logo" /></a> <br /> <br />
                            </div>
                            <div className="card card-body">
                                <form id="submitForm" action="#" method="post" data-parsley-validate=""
                                    data-parsley-errors-messages-disabled="true" noValidate="" _lpchecked="1" onSubmit={handleSubmit(loginNow)}>
                                    <div className="form-group required">
                                        {
                                            errorBox?.box && (
                                                <Alert severity={`${errorBox?.error ? "error" : "success"}`}
                                                    onClose={() => { }}
                                                    className="login-alert">{errorBox?.message || "Login Successfully!!"}</Alert>
                                            )
                                        }

                                        <label htmlFor="username"> Enter your Name / Email </label>
                                        <input type="text" className="form-control text-lowercase" {
                                            ...register("email", {
                                                required: true
                                            })
                                        }
                                        />
                                    </div>
                                    <div className="form-group required">
                                        <label className="d-flex flex-row align-items-center" htmlFor="password"> Enter your
                                            Password
                                            <a className="ml-auto border-link small-xl" href="#"> Forget Password? </a> </label>
                                        <input type="password" className="form-control" {
                                            ...register("password", {
                                                required: true
                                            })
                                        }
                                        />
                                    </div>
                                    <div className="form-group mt-4 mb-4">
                                        <div className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input" id="remember-me"
                                                name="remember-me" data-parsley-multiple="remember-me" />
                                            <label clss="custom-control-label" htmlFor="remember-me"> Remember me? </label>
                                        </div>
                                    </div>
                                    <div className="form-group pt-1">
                                        <button className="btn btn-primary btn-block" type="submit"> Log In </button>

                                    </div>
                                </form>
                                <p className="small-xl pt-3 text-center">
                                    <span className="text-muted"> Not a member? </span>
                                    <a href="#"> Sign up </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Stack>
    )
}

export async function getServerSideProps(context) {

    const user = await getSession(context)
    if (user?.user?.role === "student") {
        return {
            redirect: {
                destination: "/student/dashboard",
            },
        }
    } else if (user?.user?.role === "admin") {
        return {
            redirect: {
                destination: "/admin/student",
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
            user: user ? user.user:""
        }
    }
}
