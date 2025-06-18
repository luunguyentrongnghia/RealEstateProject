import clsx from 'clsx'
import React from 'react'
import { twMerge } from 'tailwind-merge'

const InputForm = ({ style = 'form-input', containerClassname, label, id, type = 'text', register, errors = {}, inputClassname, validate, placeholder, required, readOnly }) => {
    return (
        <div className={twMerge(clsx("flex flex-col gap-2 w-full", containerClassname))}>
            {label && <label className='font-medium text-main-700' htmlFor={id}>
                {label}
                {required && (
                    <sup>
                        ( <span className='text-red-500'>*</span>)
                    </sup>
                )}
            </label>}
            <input type={type} id={id} className={twMerge(clsx(style, 'placeholder:text-xs', readOnly && 'bg-gray-200 focus:ring-0 select-none cursor-not-allowed', inputClassname))} placeholder={placeholder} readOnly={readOnly} {...register(id, validate)} />
            {errors[id] && <small className='text-red-500'>{errors[id]?.message}</small>}
        </div>
    )
}

export default InputForm