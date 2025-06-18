import React, { useState } from 'react'
import SearchItem from './SearchItem'
import { Button, InputForm, InputSeclect } from '~/components'
import { useForm } from 'react-hook-form'
import SelectLib from '../inputs/SelectLib'
import { usePropertiesStore } from '~/store/usePropertiesStore'
import { AiOutlineDown } from 'react-icons/ai'
import withRouter from '~/hocs/withRouter'
import { createSearchParams } from 'react-router-dom'
import path from '~/utils/path'
import { twMerge } from 'tailwind-merge'
import clsx from 'clsx'
import { useAppStore } from '~/store/useAppStore'

const Search = ({ navigate, direction = "horizontal" }) => {
    const { register, formState: { errors }, handleSubmit, watch, setValue } = useForm()
    const { propertyTypes } = usePropertiesStore()
    const [isShowPopupPrice, setIsShowPopupPrice] = useState(false)
    const { setModal } = useAppStore()
    const handleSearchParams = (data) => {
        const { address, propertyType, start, end } = data
        const params = new Object()
        if (address) params.address = address
        if (propertyType) params.proprertyTypeId = propertyType
        if (start && !end) params.price = ['gte', +start]
        if (end && !start) params.price = ['lte', +end]
        if (start && end) params.price = [+start, +end]
        if (direction === 'vertical') setModal(false, null)
        navigate({
            pathname: `/${path.PROPERTIES}`,
            search: createSearchParams(params).toString()
        })
    }
    return (
        <form onClick={e => e.stopPropagation()} className={twMerge(clsx('bg-white rounded-md shadow-md py-4  mx-auto  mt-[-4em] relative z-20', direction === 'vertical' ? 'flex flex-col h-fit w-[500px] gap-4 px-8' : '', direction === 'horizontal' ? 'grid grid-cols-4 h-[8em] w-[1096px]' : ''))}>
            <SearchItem title={'Location'} className={direction === 'vertical' ? 'items-start justify-start border-none' : ''}>
                <InputForm
                    id='address'
                    register={register}
                    errors={errors}
                    placeholder='Type your required locations'
                    containerClassname={direction === 'vertical' ? 'w-full' : 'w-[14em]'}
                    inputClassname='rounded-md border border-gray-200'
                />
            </SearchItem>
            <SearchItem className={direction === 'vertical' ? 'items-start justify-start border-none' : ''} title={'Property type'} >
                <InputSeclect
                    id='propertyType'
                    register={register}
                    errors={errors}
                    options={propertyTypes?.map(el => ({ ...el, label: el.name, code: el.id }))}
                    placeholder='Select property type'
                    containerClassname={direction === 'vertical' ? 'w-full' : 'w-[14em]'}
                    inputClassname='rounded-md border border-gray-200'
                />
            </SearchItem>
            <SearchItem className={direction === 'vertical' ? 'items-start justify-start border-none' : ''} title={'Rent range'} >
                {
                    isShowPopupPrice && <div className='absolute top-full right-0 left-0 flex flex-col gap-6  border bg-white drop-shadow rounded-md p-4'>
                        <div className='flex flex-col gap-2'>
                            <span className='font-bold'>Type your price</span>
                            <div className='grid grid-cols-2 gap-3'>
                                <InputForm id='start'
                                    register={register}
                                    errors={errors}
                                />
                                <InputForm id='end'
                                    register={register}
                                    errors={errors}
                                />
                            </div>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <span>Choose your price</span>
                            <input className='w-full' type='range' name='' id="priceRange" {...register('priceRange')} />
                        </div>
                    </div>
                }
                {
                    direction === 'vertical' && <div className='grid grid-cols-2 w-full gap-3'>
                        <InputForm id='start'
                            inputClassname="border-gray-300 rounded-md"
                            register={register}
                            errors={errors}
                            placeholder='Type price start'
                        />
                        <InputForm id='end'
                            inputClassname="border-gray-300 rounded-md"
                            register={register}
                            errors={errors}
                            placeholder='Type price end'
                        />
                    </div>
                }
                <Button handleOnClick={() => setIsShowPopupPrice((prev) => !prev)} className={twMerge(clsx('bg-white text-black border border-gray-300 w-full', direction === 'vertical' ? 'max-w-full hidden' : ' max-w-[14em]'))}>
                    <span className='font-bold'>Select range price</span>
                    <AiOutlineDown />
                </Button>
            </SearchItem>
            <div className='flex items-center justify-center'>
                <Button handleOnClick={handleSubmit(data => handleSearchParams(data))} className='px-8'>Search</Button>
            </div>
        </form>
    )
}

export default withRouter(Search)