import React from 'react';
import { Spinner } from "@material-tailwind/react";

const SmallSpinner = () => {
    return (
        <div className='w-full flex items-center justify-center h-[20%]'>
            <Spinner className='h-[3rem] w-[3rem]' />
        </div>
    )
}

export default SmallSpinner;
