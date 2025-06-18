import clsx from 'clsx'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import { ImSpinner2 } from "react-icons/im";
const Button = ({ children, className, handleOnClick, type = 'button', disabled }) => {
    return (
        <button type={type} onClick={handleOnClick} disabled={disabled} className={twMerge(clsx("py-3 px-4 text-white bg-main-700 rounded-md flex items-center justify-center gap-3 ", className, disabled && 'opacity-50'))}>
            {disabled &&
                <ImSpinner2 className='animate-spin' />
            }
            {children}
        </button>
    )
}

export default Button