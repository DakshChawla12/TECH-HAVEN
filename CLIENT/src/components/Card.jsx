import { FaStar } from 'react-icons/fa';
import { CiHeart } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";

const Card = () => {
    return (
        <div className='w-[47.5%] sm:w-[31%] lg:w-[20%] h-[13.7rem] border-2 border-red-400'>
            <div className="h-[70%] w-[100%] relative flex items-center justify-center 1.5xl:h-[65%] bg-[#f0efef]">
                <img src="/controller.png" alt="" className="h-[6rem] w-[6rem] 1.5xl:h-[7rem] 1.5xl:w-[7rem]" />
                <div className='flex flex-col gap-2 absolute top-2 right-2'>
                    <CiHeart className='h-[1.5rem] w-[1.5rem] 1.5xl:h-[2rem] 1.5xl:w-[2rem] rounded-full text-[0.8rem] p-1 bg-white' />
                    <IoEyeOutline className='h-[1.5rem] w-[1.5rem] 1.5xl:h-[1.7rem] 1.5xl:w-[1.7rem] rounded-full p-1 bg-white' />
                </div>
            </div>

            <div className="h-[30%] w-[100%] 1.5xl:h-[35%]">
                <p className="text-[0.85rem] 1.5xl:text-base font-medium">Gaming Controller</p>
                <div className="w-[50%] flex gap-3">
                    <span className="text-[0.85rem] 1.5xl:text-base text-[#DB4444]">120$</span>
                    <span className="text-[0.85rem] 1.5xl:text-base line-through text-gray-500">160$</span>
                </div>
                <div className="flex items-center gap-0.5">
                    <FaStar className="text-yellow-400 fill-current" />
                    <FaStar className="text-yellow-400 fill-current" />
                    <FaStar className="text-yellow-400 fill-current" />
                    <FaStar className="text-yellow-400 fill-current" />
                    <FaStar className="text-yellow-400 fill-current" />
                    <span className="text-[0.5rem] md:text-[0.7rem] mt-[0.2rem]">(88)</span>
                </div>
            </div>
        </div>
    );
};
export default Card;