import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import RanoStories from '../assets/ranoLogo.png';

const UnAuthorized = () => {
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .matches(/^[a-zA-Z0-9!@#$%^&*()_+={}\[\]:;"'<>,.?/\\|-]*$/, "Username can only contain letters, numbers, and symbols without spaces")
                .required('Username is required'),
            password: Yup.string()
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/,
                    'Password must contain at least one lowercase, one uppercase, one number, and one special character'
                )
                .required('Password is required'),
        }),
        onSubmit: (values) => {
            console.log('Form Submitted', values);
        },
    });

    return (
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
                <form onSubmit={formik.handleSubmit} className='w-full flex flex-col items-start px-5 gap-2'>

                    {/* Email */}
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="border p-2 rounded w-full text-gray-200 placeholder:text-gray-200 bg-transparent focus:outline-none focus:border-primary"
                    />
                    {formik.touched.username && formik.errors.username ? (
                        <div className="text-red-500 text-sm text-center w-full font-bold">{formik.errors.username}</div>
                    ) : null}

                    {/* Password */}
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="border p-2 rounded w-full text-gray-200 placeholder:text-gray-200 bg-transparent focus:outline-none focus:border-primary"
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div className="text-red-500 text-sm text-center w-full font-bold">{formik.errors.password}</div>
                    ) : null}
                    <div className='flex justify-center items-center mx-auto w-full'>
                        <button type="submit" className='w-1/2 bg-gradient-to-b from-primary to-secondary text-white p-3 rounded-xl'>
                            Submit
                        </button>
                    </div>
                </form>
            </div >
        </div >
    );
}

export default UnAuthorized;
