import React from 'react'
import { PropertyItem } from '~/components'

const RelatedPost = ({ title = '', data = [] }) => {
    return (
        <div className='w-full rounded-md bg-white flex flex-col'>
            <h1 className='font-bold text-lg w-full h-12 flex justify-center items-center bg-main-300'>{title}</h1>
            <div className='flex flex-col'>
                {data.map(el => (
                    <PropertyItem key={el.id} id={el.id} name={el.name} featuredImage={el.featuredImage} price={el.price} rPropertyType={el.rPropertyType} listingType={el.listingType} />
                ))}
            </div>
        </div>
    )
}

export default RelatedPost