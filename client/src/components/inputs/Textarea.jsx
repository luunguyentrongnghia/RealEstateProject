import clsx from 'clsx'
import React from 'react'
import { twMerge } from 'tailwind-merge'

const Textarea = ({ style, containerClassname, label, id, type = 'text', register, errors = {}, inputClassname, validate, placeholder }) => {
    return (
        <div className={twMerge(clsx("flex flex-col gap-2 w-full", containerClassname))}>
            {label && <label className='font-medium text-main-700' htmlFor={id}>{label}</label>}
            <textarea id={id} className={twMerge(clsx(style, 'placeholder:text-xs', inputClassname))} placeholder={placeholder} {...register(id, validate)} rows={5}></textarea>
            {errors[id] && <small className='text-red-500'>{errors[id]?.message}</small>}
        </div>
    )
}

export default Textarea