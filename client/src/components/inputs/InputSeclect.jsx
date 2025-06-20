import clsx from 'clsx'
import React from 'react'
import { twMerge } from 'tailwind-merge'

const InputSeclect = ({ style = 'form-select', containerClassname, label, id, type = 'text', register, errors = {}, inputClassname, validate, placeholder, options = [] }) => {
    return (
        <div className={twMerge(clsx("flex flex-col gap-2 w-full ", containerClassname))}>
            {label && <label className='font-medium text-main-700' htmlFor={id}>{label}</label>}
            <select type={type} id={id} className={twMerge(clsx(style, 'placeholder:text-xs', inputClassname))} placeholder={placeholder} {...register(id, validate)} >
                <option value="">{placeholder}</option>
                {options.map((el, idx) => (
                    <option key={idx} value={el.code}>{el.label}</option>
                ))}
            </select>
            {errors[id] && <small className='text-red-500'>{errors[id]?.message}</small>}
        </div>
    )
}

export default InputSeclect