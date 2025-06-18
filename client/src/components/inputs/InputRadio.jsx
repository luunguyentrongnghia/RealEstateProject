import React from 'react'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'
const InputRadio = ({ style = 'form-radio', containerClassname, coptionsClassname, label, id, register, errors = {}, inputClassname, validate, placeholder, options = [] }) => {
    return (
        <div className={twMerge(clsx("flex flex-col gap-2 w-full", containerClassname))}>
            {label && <label className='font-medium text-main-700' htmlFor={id}>{label}</label>}
            <div className={twMerge(clsx(coptionsClassname))}>
                {options.map(el => (
                    <div key={el.value} className='flex items-center gap-2 '>
                        <input type='radio' name={id} id={el.value} value={el.value} className={twMerge(clsx(style, 'placeholder:text-xs', inputClassname))} placeholder={placeholder} {...register(id, validate)} />
                        <label className='cursor-pointer' htmlFor={el.value}>{el.label}</label>
                    </div>
                ))}
            </div>

            {errors[id] && <small className='text-red-500'>{errors[id]?.message}</small>}
        </div>
    )
}

export default InputRadio