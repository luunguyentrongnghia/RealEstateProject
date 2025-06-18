import React, { Fragment, useState } from 'react'
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'
import withRouter from '~/hocs/withRouter';
import { useUserStore } from '~/store/useUserStore';
import { showOptions } from '~/utils/constants';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { useEffect } from 'react';
const Topheader = ({ location }) => {
    const { current, Logout } = useUserStore()
    const [isShowOptions, setIsShowOptions] = useState(false)
    const optionBox = useRef()
    useEffect(() => {
        const handleOnClick = (e) => {
            if (optionBox.current && optionBox.current.contains(e.target)) {
                setIsShowOptions(true)
            } else {
                setIsShowOptions(false)
            }
        }
        document.addEventListener('click', handleOnClick)
        return () => {
            document.removeEventListener('click', handleOnClick)
        }
    }, [])
    return (
        <div className={twMerge(clsx('h-[85px] text-white border-b border-main-400 bg-transparent fixed z-[9999] top-0 flex items-center justify-between w-full px-[100px] py-[26px]',
            location.pathname !== '/' && 'bg-main-700'
        ))}>
            <span className='flex items-center gap-2'>
                <AiOutlineMail />
                <span>
                    <span>Email us at: </span>
                    <span className='text-gray-300'>example@gmail.com</span>
                </span>
            </span>
            <div className='flex items-center gap-6 '>
                <div className='flex items-center  text-gray-300 gap-6'>
                    <FaFacebookF />
                    <FaInstagram size={18} />
                    <FaYoutube size={20} />
                </div>
                <div className='flex items-center pl-8 border-l border-main-400'>
                    <span className='flex items-center gap-2'>
                        <AiOutlinePhone />
                        <span className='text-gray-300'>123-456-7890</span>
                    </span>
                </div>
                {current && <div ref={optionBox} onClick={() => setIsShowOptions(true)} className='flex items-center gap-4 pl-8 border-l border-main-400 cursor-pointer hover:bg-overlay-30 p-2 rounded-md relative select-none'>
                    <div className='flex flex-col gap-2'>
                        <span>{current?.name}</span>
                        <span> ID: #{current?.id}</span>
                    </div>
                    <img src={current?.avatar || '/user.svg'} alt='' className='w-12 h-12 object-cover rounded-full' />
                    {isShowOptions && <div className='absolute z-50 left-0 right-0 top-full bg-white rounded-md text-black drop-shadow-sm flex flex-col py-2 border'>
                        {showOptions.map(el => <Fragment key={el.id}>
                            {current?.userRoles?.some(role => role.roleCode === el.code) && <Link className='px-6 py-2 hover:bg-gray-100' to={el.path}>{el.name}</Link>}
                        </Fragment>)}
                        <span onClick={() => Logout()} className='px-6 py-2 hover:bg-gray-100 cursor-pointer'>Logout</span>
                    </div>}
                </div>}
            </div>
        </div>
    )
}

export default withRouter(Topheader)