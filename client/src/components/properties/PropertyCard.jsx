import React from 'react'
import { formatMoney } from '~/utils/fn'
import { MdOutlineAttachMoney, MdOutlineZoomOutMap, MdOutlineRemoveRedEye } from "react-icons/md";
import { IoBedOutline, IoShareSocialOutline } from "react-icons/io5";
import { PiBathtub } from "react-icons/pi";
import { FaRegHeart } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link } from 'react-router-dom';
import path from '~/utils/path';
const PropertyCard = ({ properties }) => {
    return (
        <div className='border'>
            <LazyLoadImage effect="blur" wrapperProps={{
                style: { transitionDelay: "1s" },
            }}
                src={properties?.featuredImage}
                alt=''
                className='w-full h-[240px] object-cover rounded-t-md' />
            <div className='p-4 flex flex-col gap-2'>
                <Link state={{ name: properties.name }} to={`/${path.PROPERTIES}/${properties.id}`} className='text-2xl font-medium uppercase line-clamp-2 text-gray-700'>{properties?.name}</Link>
                <span className='text-xl font-bold text-main-500 flex items-center gap-1'> <MdOutlineAttachMoney size={18} />{`${formatMoney(properties?.price)}`} </span>
                <div className='flex items-center gap-3 text-sm'>
                    <span className='flex items-center text-gray-500 gap-2'>
                        <IoBedOutline size={18} />
                        <span className='font-medium text-lg'>{properties?.bedRoom}</span>
                    </span>
                    <span className='flex items-center text-gray-500 gap-2'>
                        <PiBathtub size={18} />
                        <span className='font-medium text-lg'>{properties?.bathRoom}</span>
                    </span>
                    <span className='flex items-center text-gray-500 gap-2'>
                        <MdOutlineZoomOutMap size={18} />
                        <span className='font-medium text-lg'>{properties?.propertySize}
                            <span>m<sup>2</sup></span>
                        </span>
                    </span>
                </div>
                <div className='flex items-center justify-between gap-4'>
                    <div className='flex items-center gap-2'>
                        <div className='flex items-center gap-2'>
                            <img src={properties?.rPostedBy?.avatar} alt='' className='w-8 h-8 object-cover rounded-full' />
                            <span className='text-gray-500'>{properties?.rPostedBy?.name}</span>
                        </div>
                        <span className='px-4 py-1 text-xs flex items-center justify-center bg-green-600 text-white'>
                            Agent
                        </span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <span className='w-8 h-8 flex items-center justify-center bg-gray-200 rounded-md'>
                            <IoShareSocialOutline />
                        </span>
                        <span className='w-8 h-8 flex items-center justify-center bg-gray-200 rounded-md'>
                            <FaRegHeart />
                        </span>
                    </div>

                </div>
                <div className='flex items-center justify-between gap-4'>
                    <div className='flex items-center gap-2'>
                        <div className='flex items-center gap-2'>
                            <img src={properties?.rOwner?.avatar} alt='' className='w-8 h-8 object-cover rounded-full' />
                            <span className='text-gray-500'>{properties?.rPostedBy?.name}</span>
                        </div>
                        <span className='px-4 py-1 text-xs flex items-center justify-center bg-purple-600 text-white'>
                            Owner
                        </span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <span className='w-8 h-8 flex items-center justify-center bg-gray-200 rounded-md'>
                            <IoShareSocialOutline />
                        </span>
                        <span className='w-8 h-8 flex items-center justify-center bg-gray-200 rounded-md'>
                            <FaRegHeart />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PropertyCard