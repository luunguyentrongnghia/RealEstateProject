import React, { memo, useState } from 'react'
import { CiBoxList } from "react-icons/ci";
import { Button, ImageDetail } from '~/components'
import { useAppStore } from '~/store/useAppStore';
const Images = ({ images }) => {
    const { setModal } = useAppStore()
    const handleNavigateToDetailImage = index => {
        setModal(true, <ImageDetail images={images} forceIndex={index} />)
    }
    return (
        <div className='w-full grid grid-cols-4 grid-rows-2 gap-2 relative'>
            <img src={images[0]} alt='' className='w-full h-full col-span-2 row-span-2 rounded-l-md object-cover cursor-pointer' onClick={(e) => { handleNavigateToDetailImage(0) }} />
            <img src={images[1]} alt='' className='w-full h-full col-span-1 row-span-1  object-cover cursor-pointer' onClick={() => { handleNavigateToDetailImage(1) }} />
            <img src={images[2]} alt='' className='w-full h-full col-span-1 row-span-1 rounded-tr-md object-cover cursor-pointer' onClick={() => { handleNavigateToDetailImage(2) }} />
            <img src={images[3]} alt='' className='w-full h-full col-span-1 row-span-1  object-cover cursor-pointer' onClick={() => { handleNavigateToDetailImage(3) }} />
            <img src={images[4]} alt='' className='w-full h-full col-span-1 row-span-1 rounded-br-md object-cover cursor-pointer' onClick={() => { handleNavigateToDetailImage(4) }} />
            <div className='absolute bottom-4 right-4'>
                <Button handleOnClick={() => setModal(true, <ImageDetail images={images} />)} className='bg-white border border-main-600 text-main-600 font-bold'>
                    <CiBoxList size={20} />
                    <span>Hiển thị tất cả ảnh</span>
                </Button>
            </div>
        </div>
    )
}

export default memo(Images)