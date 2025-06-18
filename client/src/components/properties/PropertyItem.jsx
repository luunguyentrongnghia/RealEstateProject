import React from 'react'
import { Link } from 'react-router-dom'
import { formatMoney } from '~/utils/fn'
import path from '~/utils/path'

const PropertyItem = ({ id, name, featuredImage, listingType, price, rPropertyType }) => {
    return (
        <div className='p-3 rounded-md even:bg-white odd:bg-gray-100 grid grid-cols-10 gap-3'>
            <img src={featuredImage} alt='' className='col-span-2 w-full object-contain rounded-md' />
            <div className='flex flex-col col-span-8'>
                <Link to={`/${path.PROPERTIES}/${id}`} state={{ name: name }} className='font-semibold text-main-600 hover:underline leading-4 line-clamp-1 w-full'>{name}</Link>
                <span className='text-orange-600  text-lg'>{'$' + formatMoney(price)}</span>
                <span className='flex gap-2 items-center text-xs'>
                    <span >Listing type: <span className='font-bold'>{listingType}</span></span>
                    <span>Property type: <span className='font-bold'>{rPropertyType.name}</span></span>
                </span>
            </div>
        </div>
    )
}

export default PropertyItem