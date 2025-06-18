import clsx from 'clsx'
import React from 'react'
import Select from 'react-select'
import { twMerge } from 'tailwind-merge'
const SelectLib = ({ style = 'form-select', containerClassname, label, id, type = 'text', onChange, register, errors = {}, inputClassname, validate, placeholder, options = [] }) => {
    return (
        <div className={twMerge(clsx("flex flex-col gap-2 w-full ", containerClassname))}>
            {label && <label className='font-medium text-main-700' htmlFor={id}>{label}</label>}
            <Select

                isSearchable
                onChange={(val) => onChange(val)}
                options={options}
                formatOptionLabel={(option) => (
                    <div className='flex px-6 items-center gap-2'>
                        <img src={option.image} alt='' className='w-5 h-5 object-cover' />
                        <span>{option?.name}</span>
                    </div>
                )}
                className={{
                    control: () => clsx(),
                    input: () => '',
                    option: () => '',
                }}
                isClearable
                placeholder={placeholder}
                {...register(id, validate)}
            />
            {errors[id] && <small className='text-red-500'>{errors[id]?.message}</small>}
        </div>
    )
}

export default SelectLib