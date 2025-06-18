import React from 'react'
import { Search } from '~/components'

const Home = () => {
    return (
        <div className='bg-white w-full'>
            <div className='w-full h-fit relative'>
                <img src='banner.png' alt='' className='w-full  object-cover' />
                <div className='absolute inset-0 flex flex-col items-center justify-center gap-6 pt-12'>
                    <h1 className='text-5xl text-white'>Find Your Dream Home</h1>
                    <span className='text-white text-lg flex flex-col items-center'>
                        <span>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;</span>
                        <span> Proin sodales ultrices nulla blandit volutpat.</span>
                    </span>
                </div>
            </div>
            <Search />
            <div className='w-main mx-auto h-[500px]'>
                content
            </div>

        </div>
    )
}

export default Home