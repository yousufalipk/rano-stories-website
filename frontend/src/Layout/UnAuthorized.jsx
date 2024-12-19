import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import RanoStories from '../assets/ranoLogo.png';
import { useUser } from '../context/index';
import { toast } from 'react-toastify';

const UnAuthorized = () => {
    const { createAccount, loginUser } = useUser();

    const [page, setPage] = useState('login');

    const formikLogin = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Please enter a valid email address')
                .required('Email is required'),
            password: Yup.string()
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/,
                    'Password must contain at least one lowercase, one uppercase, one number, and one special character'
                )
                .required('Password is required'),
        }),
        onSubmit: async (values) => {
            const res = await loginUser(values);
            if (res.success) {
                toast.success('LoggedIn Succesfully!');
            } else {
                toast.error(res.mess);
            }
        },
    });

    const formikSignup = useFormik({
        initialValues: {
            fname: '',
            lname: '',
            sEmail: '',
            sPassword: '',
            comfirmPass: '',
        },
        validationSchema: Yup.object({
            fname: Yup.string().required('First name is required'),
            lname: Yup.string().required('Last name is required'),
            sEmail: Yup.string()
                .email('Please enter a valid email address')
                .required('Email is required'),
            sPassword: Yup.string()
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/,
                    'Password must contain at least one lowercase, one uppercase, one number, and one special character'
                )
                .required('Password is required'),
            comfirmPass: Yup.string()
                .oneOf([Yup.ref('sPassword'), null], 'Passwords must match')
                .required('Confirm Password is required'),
        }),
        onSubmit: async (values) => {
            const res = await createAccount(values);
            if (res.success) {
                toast.success('Account Created Succesfuly!!');
            } else {
                toast.error(res.mess);
            }
        },
    });

    const handleTogglePage = () => {
        if (page === 'login') {
            setPage('signup');
            formikLogin.resetForm();
        } else {
            setPage('login');
            formikSignup.resetForm();
        }
    };

    return (
        <>
            {page === 'login' ? (
                <div className='w-full h-full flex flex-col justify-center items-center'>
                    <img
                        src={RanoStories}
                        alt="rano_logo"
                        className='rounded-full'
                        style={{
                            filter: "drop-shadow(0px 0px 40px #f719d2)",
                        }}
                        width={250}
                    />
                    <h1 className='Rano-heading text-4xl text-center font-bold -mt-3'>
                        Rano Stories
                    </h1>

                    <div className='w-full h-1/2 my-5 flex flex-col justify-center items-center p-5 rounded-3xl backdrop-blur-sm shadow-lg border border-secondary'>
                        <form onSubmit={formikLogin.handleSubmit} className='w-full flex flex-col items-start px-5 gap-2'>
                            {/* Username */}
                            <label htmlFor="username">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email"
                                value={formikLogin.values.email}
                                onChange={formikLogin.handleChange}
                                onBlur={formikLogin.handleBlur}
                                className="border p-2 rounded w-full text-gray-200 placeholder:text-gray-200 bg-transparent focus:outline-none focus:border-primary"
                            />
                            {formikLogin.touched.email && formikLogin.errors.email ? (
                                <div className="text-red-500 text-sm text-center w-full font-bold">{formikLogin.errors.email}</div>
                            ) : null}

                            {/* Password */}
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Password"
                                value={formikLogin.values.password}
                                onChange={formikLogin.handleChange}
                                onBlur={formikLogin.handleBlur}
                                className="border p-2 rounded w-full text-gray-200 placeholder:text-gray-200 bg-transparent focus:outline-none focus:border-primary"
                            />
                            {formikLogin.touched.password && formikLogin.errors.password ? (
                                <div className="text-red-500 text-sm text-center w-full font-bold">{formikLogin.errors.password}</div>
                            ) : null}

                            <div className='flex justify-center items-center mx-auto w-full mt-3'>
                                <button type="submit" className='w-1/2 bg-gradient-to-b from-primary to-secondary text-white p-3 rounded-xl'>
                                    LogIn
                                </button>
                                <button
                                    onClick={() => handleTogglePage()}
                                    className='text-md absolute top-2 right-4 underline italic'
                                >
                                    {page === 'signup' ? 'Login?' : 'SignUp?'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : (
                <div className='w-full h-full p-5 rounded-3xl backdrop-blur-sm shadow-lg border border-secondary flex flex-col justify-center items-center'>
                    <h1 className='Rano-heading text-2xl text-center font-bold py-5'>
                        Rano Stories
                    </h1>
                    <form onSubmit={formikSignup.handleSubmit} className='w-full flex flex-col items-start px-5 gap-2'>
                        {/* First Name */}
                        <label htmlFor="fname">First Name</label>
                        <input
                            type="text"
                            id="fname"
                            name="fname"
                            placeholder="First Name"
                            value={formikSignup.values.fname}
                            onChange={formikSignup.handleChange}
                            onBlur={formikSignup.handleBlur}
                            className="border p-2 rounded w-full text-gray-200 placeholder:text-gray-200 bg-transparent focus:outline-none focus:border-primary"
                        />
                        {formikSignup.touched.fname && formikSignup.errors.fname ? (
                            <div className="text-red-500 text-sm text-center w-full font-bold">{formikSignup.errors.fname}</div>
                        ) : null}

                        {/* Last Name */}
                        <label htmlFor="lname">Last Name</label>
                        <input
                            type="text"
                            id="lname"
                            name="lname"
                            placeholder="Last Name"
                            value={formikSignup.values.lname}
                            onChange={formikSignup.handleChange}
                            onBlur={formikSignup.handleBlur}
                            className="border p-2 rounded w-full text-gray-200 placeholder:text-gray-200 bg-transparent focus:outline-none focus:border-primary"
                        />
                        {formikSignup.touched.lname && formikSignup.errors.lname ? (
                            <div className="text-red-500 text-sm text-center w-full font-bold">{formikSignup.errors.lname}</div>
                        ) : null}

                        {/* Email */}
                        <label htmlFor="sEmail">Email</label>
                        <input
                            type="email"
                            id="sEmail"
                            name="sEmail"
                            placeholder="Email"
                            value={formikSignup.values.sEmail}
                            onChange={formikSignup.handleChange}
                            onBlur={formikSignup.handleBlur}
                            className="border p-2 rounded w-full text-gray-200 placeholder:text-gray-200 bg-transparent focus:outline-none focus:border-primary"
                        />
                        {formikSignup.touched.sEmail && formikSignup.errors.sEmail ? (
                            <div className="text-red-500 text-sm text-center w-full font-bold">{formikSignup.errors.sEmail}</div>
                        ) : null}

                        {/* Password */}
                        <label htmlFor="sPassword">Password</label>
                        <input
                            type="password"
                            id="sPassword"
                            name="sPassword"
                            placeholder="Password"
                            value={formikSignup.values.sPassword}
                            onChange={formikSignup.handleChange}
                            onBlur={formikSignup.handleBlur}
                            className="border p-2 rounded w-full text-gray-200 placeholder:text-gray-200 bg-transparent focus:outline-none focus:border-primary"
                        />
                        {formikSignup.touched.sPassword && formikSignup.errors.sPassword ? (
                            <div className="text-red-500 text-sm text-center w-full font-bold">{formikSignup.errors.sPassword}</div>
                        ) : null}

                        {/* Confirm Password */}
                        <label htmlFor="comfirmPass">Confirm Password</label>
                        <input
                            type="password"
                            id="comfirmPass"
                            name="comfirmPass"
                            placeholder="Confirm Password"
                            value={formikSignup.values.comfirmPass}
                            onChange={formikSignup.handleChange}
                            onBlur={formikSignup.handleBlur}
                            className="border p-2 rounded w-full text-gray-200 placeholder:text-gray-200 bg-transparent focus:outline-none focus:border-primary"
                        />
                        {formikSignup.touched.comfirmPass && formikSignup.errors.comfirmPass ? (
                            <div className="text-red-500 text-sm text-center w-full font-bold">{formikSignup.errors.comfirmPass}</div>
                        ) : null}

                        <div className='flex justify-center items-center mx-auto w-full mt-3'>
                            <button type="submit" className='w-1/2 bg-gradient-to-b from-primary to-secondary text-white p-3 rounded-xl'>
                                SignUp
                            </button>
                            <button
                                onClick={() => handleTogglePage()}
                                className='text-md absolute top-2 right-4 underline italic'
                            >
                                {page === 'signup' ? 'Login?' : 'SignUp?'}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
}

export default UnAuthorized;
