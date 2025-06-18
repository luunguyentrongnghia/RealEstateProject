import clsx from 'clsx'
import React from 'react'
import { twMerge } from 'tailwind-merge'

const Boxinfo = ({ data, containerClassName, role, roleStyle }) => {
    return (
        <div className={twMerge(clsx('w-full bg-white border rounded-md border-main-700 p-4 flex flex-col items-center justify-center gap-4', containerClassName))}>
            <img src={data.avatar} alt='' className='w-24 h-24 rounded-full' />
            <h1 className='font-bold text-main-700 text-lg mt-4'>{data.name}</h1>
            <span className={clsx('text-sm my-2 italic', roleStyle)}>{role}</span>
            <a className='px-6 py-2 bg-main-700 text-white rounded-md font-semibold' href={`tel:${data.phone}`}>{data.phone}</a>
        </div>
    )
}

export default Boxinfo