import clsx from 'clsx'
import React from 'react'
import { twMerge } from 'tailwind-merge'

const SearchItem = ({ title, children, className }) => {
    return (
        <div className={twMerge(clsx('flex flex-col relative border-r gap-2  justify-center items-center', className))}>
            <h1 className='font-bold text-main-700 '>{title}</h1>
            {children}
        </div>
    )
}

export default SearchItem