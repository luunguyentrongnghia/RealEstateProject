import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiGetDetailProperty, apiGetProperties } from '~/apis/properties'
import { Boxinfo, BreadCrumb, Images, Map, RelatedPost } from '~/components'
import { usePropertiesStore } from '~/store/usePropertiesStore'
import { IoLocationOutline } from "react-icons/io5";
import DOMPurify from 'dompurify'
import { formatMoney } from '~/utils/fn'
import moment from 'moment'
import { async } from '@firebase/util'
const InfoCell = ({ title, value, unit = '' }) => {
    return <tr>
        <td className='border p-3 text-center'>{title}</td>
        <td className='border p-3 text-center'>{value}</td>
        <td className='border p-3 text-center'>{unit}</td>
    </tr>
}
const PropertyDetail = () => {
    const { id } = useParams()
    const [propertyDetail, setPropertyDetail] = useState()
    const [relatedProperties, setRelatedProperties] = useState({
        propertyType: null,
        listingTypes: null
    })
    useEffect(() => {
        const fetchDetailProperty = async () => {
            const response = await apiGetDetailProperty(id)
            if (response.success) {
                setPropertyDetail(response.data)

            }
        }

        fetchDetailProperty()
    }, [id])
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [id])
    useEffect(() => {
        const fetchRelatedPost = async () => {
            const [propertyType, listingTypes] = await Promise.all([
                apiGetProperties({ propertyTypeId: propertyDetail.propertyTypeId, limit: 5, fields: 'name,id,featuredImage,price,listingType,isAvailable' }),
                apiGetProperties({ listingType: propertyDetail.listingType, limit: 5, fields: 'name,id,featuredImage,price,listingType,isAvailable' })
            ])
            if (propertyType.success) setRelatedProperties(prev => ({ ...prev, propertyType: propertyType.properties }))
            if (listingTypes.success) setRelatedProperties(prev => ({ ...prev, listingTypes: listingTypes.properties }))
        }
        if (propertyDetail) {
            fetchRelatedPost()
        }
    }, [propertyDetail])
    return (
        <div className='w-full pb-[500px]'>
            <div className='relative w-full'>
                <img src='/Rectangle25.png' alt='' className='w-full object-contain' />
                <div className='absolute inset-0 text-white flex flex-col justify-center items-center'>
                    <h1 className='text-[48px] font-medium'>Property Detail</h1>
                    <div>
                        <BreadCrumb />
                    </div>
                </div>
            </div>
            {
                propertyDetail && <div className='w-main mx-auto my-8'>
                    {propertyDetail?.images && <Images images={propertyDetail.images} />}
                    <div className='grid grid-cols-10 gap-4 my-8'>
                        <div className='col-span-7'>
                            <h1 className='font-bold text-2xl line-clamp-2'>{propertyDetail.name}</h1>
                            <span className='flex items-center gap-3'>
                                <IoLocationOutline size={18} color='#2C3A61' />
                                <span>{propertyDetail.address}</span>
                            </span>
                            <div className='my-4' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(propertyDetail.description) }}></div>
                            <div>
                                <h3 className='font-bold text-lg'>Property's Iformation</h3>
                                <table className='w-full my-4 table-fixed'>
                                    <thead>
                                        <tr>
                                            <th className='border p-3 text-center bg-main-300'>Characteristics</th>
                                            <th className='border p-3 text-center bg-main-300'>Values</th>
                                            <th className='border p-3 text-center bg-main-300'>Unit</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <InfoCell title='Price' value={formatMoney(propertyDetail.price)} unit={'USD'} />
                                        <InfoCell title='Size' value={formatMoney(propertyDetail.propertySize)} unit={<span>m<sup>3</sup></span>} />
                                        <InfoCell title='Property Type' value={propertyDetail.rPropertyType?.name} />
                                        <InfoCell title='Built Year' value={propertyDetail.yearBuilt} />
                                        <InfoCell title='Is available' value={propertyDetail.isAvailable ? "Yes" : "No"} />
                                        <InfoCell title='Posted At' value={moment(propertyDetail.createdAt).format('DD/MM/YYYY')} />
                                    </tbody>
                                </table>
                            </div>
                            <div>
                                <Map address={propertyDetail.address} />
                            </div>
                        </div>
                        <div className='col-span-3 flex flex-col gap-6'>
                            <Boxinfo data={propertyDetail.rPostedBy} role='Agent' roleStyle={'text-green-600'} />
                            <Boxinfo data={propertyDetail.rOwner} role='Owner' roleStyle={'text-red-600'} />
                            <RelatedPost title='Related Properties' data={relatedProperties.propertyType?.rows} />
                            <RelatedPost title={`Propertices for ${propertyDetail.listingType}`} data={relatedProperties.listingTypes?.rows} />
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default PropertyDetail