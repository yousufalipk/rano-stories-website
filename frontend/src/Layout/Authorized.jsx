import React from 'react';
import { useUser } from '../context/index';

const Authorized = () => {
    const { logOutUser } = useUser();
    return (
        <div className='w-full h-full bg-yellow-300 flex justify-center items-center'>
            <button
                onClick={() => {
                    logOutUser()
                }}
                className='w-full h-12 bg-red-600 text-4xl font-bold italic'
            >
                Log Out
            </button>
        </div>
    )
}

export default Authorized;
