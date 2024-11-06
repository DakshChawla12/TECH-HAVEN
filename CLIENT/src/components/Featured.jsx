import React from 'react'

const Featured = () => {
    return (
        <div className='h-[20rem] w-[95%] mt-[3rem] border-2 border-red-500 mx-auto flex justify-between xl:h-[28rem] xl:w-[93%]'>

            <div className='w-[48%] h-[100%] border-2 border-green-600'>

            </div>


            <div className='w-[48%] h-[100%] border-2 border-green-600 flex flex-col justify-between'>

                <div className='w-[100%] h-[48%] border-2 border-green-600'>

                </div>

                <div className='w-[100%] h-[48%] border-2 border-green-600 flex justify-between'>
                    <div className='w-[48%] h-[100%] border-2 border-green-600'></div>
                    <div className='w-[48%] h-[100%] border-2 border-green-600'></div>
                </div>

            </div>

        </div>
    )
}

export default Featured
