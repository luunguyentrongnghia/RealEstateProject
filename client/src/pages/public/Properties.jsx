import clsx from 'clsx'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { createSearchParams, useSearchParams } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'
import { apiGetProperties } from '~/apis/properties'
import { BreadCrumb, Button, InputSeclect, PropertyCard, Search } from '~/components'
import { Pagination } from '~/components/paginations'
import { CiBoxList } from "react-icons/ci";
import { useAppStore } from '~/store/useAppStore'
import withRouter from '~/hocs/withRouter'
const Properties = ({ navigate, location }) => {
    const [properties, setProperties] = useState()
    const [mode, setMode] = useState('ALL')
    const { register, formState: { errors }, watch } = useForm()
    const sort = watch('sort')
    const [searchParams] = useSearchParams()
    const { setModal } = useAppStore()

    useEffect(() => {
        const fetchProperties = async () => {
            const response = await apiGetProperties({ limit: import.meta.env.VITE_LIMITs, ...params })
            if (response.success) {
                setProperties(response.properties)
            }
        }
        const params = Object.fromEntries([...searchParams])
        if (params.price) {
            params.price = searchParams.getAll("price")
        }
        if (sort) params.sort = sort
        fetchProperties(params)
    }, [searchParams, sort])
    return (
        <div className='w-full'>
            <div className='relative w-full'>
                <img src='/Rectangle25.png' alt='' className='w-full object-contain' />
                <div className='absolute inset-0 text-white flex flex-col justify-center items-center'>
                    <h1 className='text-[48px] font-medium'>Properties</h1>
                    <div>
                        <BreadCrumb />
                    </div>
                </div>
            </div>
            <div className='w-main mx-auto my-20'>
                <div className='my-4 flex justify-between text-sm items-center'>
                    <div className='flex items-center gap-4'>
                        <span onClick={() => setModal(true, <Search direction="vertical" />)} className='cursor-pointer'><CiBoxList size={24} /></span>
                        <InputSeclect register={register} id='sort' errors={errors} options={[
                            {
                                label: 'Lastest',
                                code: '-createAt'
                            },
                            {
                                label: 'Oldest',
                                code: 'createAt'
                            },
                            {
                                label: 'A - Z',
                                code: 'name'
                            },
                            {
                                label: 'Z - A',
                                code: '-name'
                            },
                        ]}
                            placeholder='Select'
                            containerClassname='flex-row items-center  gap-2'
                            label="Sort: "
                            inputClassname="w-fit rounded-md"
                        />
                        <Button handleOnClick={() => navigate(location.pathname)} className="whitespace-nowrap">Reset Filter</Button>
                    </div>
                    <div className='flex items-center gap-4'>
                        <Button handleOnClick={() => setMode('ALL')} className={twMerge(clsx("whitespace-nowrap bg-transparent border-none text-gray-900 font-medium", mode === "ALL" && 'font-bold'))}>All Properties</Button>
                        <Button handleOnClick={() => setMode('RENT')} className={twMerge(clsx("whitespace-nowrap bg-transparent border-none text-gray-900 font-medium", mode === "RENT" && 'font-bold'))}>For Rent</Button>
                        <Button handleOnClick={() => setMode('SALE')} className={twMerge(clsx("whitespace-nowrap bg-transparent border-none text-gray-900 font-medium", mode === "SALE" && 'font-bold'))}>For Sale</Button>
                    </div>
                </div>
                <div className='w-full grid grid-cols-3 gap-4'>
                    {properties?.rows?.map(el => (
                        <PropertyCard key={el.id} properties={el} />
                    ))}
                </div>
                <div className='flex items-center justify-center my-4'>
                    <Pagination
                        total={properties?.count}
                        limit={properties?.limit}
                        page={properties?.page}
                    />
                </div>
            </div>
        </div>
    )
}

export default withRouter(Properties)