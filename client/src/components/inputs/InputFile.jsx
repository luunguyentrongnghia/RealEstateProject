import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { FaCloudUploadAlt, FaUsersSlash } from "react-icons/fa";
import { set, useForm } from 'react-hook-form';
import { apiUploadImages } from '~/apis/beyound';
import { ImSpinner2 } from "react-icons/im";
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { getBase64 } from '~/utils/fn';
const InputFile = ({ style = 'form-input', errors, containerClassname, label, id, validate, multiple, getImages, deleteImage }) => {
    const { register, watch } = useForm()
    const [images, setImages] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const rawImages = watch(id)
    const handleUpload = async (files) => {
        const formData = new FormData()
        setIsLoading(true)
        // const uploadPromises = []
        const tempArrImage = []
        for (let file of files) {
            tempArrImage.push({
                id: uuidv4(),
                path: await getBase64(file),
                file
            })
            // formData.append('file', file)
            // formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET)
            // uploadPromises.push(apiUploadImages(formData))
        }
        // const response = await Promise.all(uploadPromises)
        setIsLoading(false)
        setImages(tempArrImage)
        // if (response && response.length > 0) {
        //     const tempArrImage = []
        //     for (let result of response) {
        //         if (result.status === 200) {
        //             tempArrImage.push({
        //                 id: result.data.public_id,
        //                 path: result.data.secure_url
        //             })
        //         }
        //     }
        //     setImages(tempArrImage)
        // } else {
        //     toast.error('something went wrong')
        // }
    }
    useEffect(() => {
        getImages(images)
    }, [images])
    useEffect(() => {
        setImages([])
    }, [deleteImage])
    useEffect(() => {
        if (rawImages && rawImages instanceof FileList && rawImages.length > 0) {
            handleUpload(rawImages)
        }
    }, [rawImages])
    return (
        <div className={twMerge(clsx("flex flex-col gap-2 w-full", containerClassname))}>
            {label && <span className='font-medium text-main-700' >{label}</span>}
            <input type='file' id={id} {...register(id, validate)} className="hidden" multiple={multiple} />
            <label htmlFor={id} className="bg-gray-100 w-full p-16 flex items-center flex-col gap-2 justify-center">
                {isLoading ? <span className='animate-spin text-main-600'><ImSpinner2 size={25} /></span> : images?.length > 0 ? <div className='grid grid-cols-4 gap-4 '>{images?.map((el, idx) => (
                    <div key={idx} className='col-span-1 relative'>
                        <span className='w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center cursor-pointer absolute top-1 right-1' onClick={() => setImages(prev => prev.filter(item => item.id !== el.id))}><AiOutlineCloseCircle size={18} /></span>
                        <img src={el.path} alt='' className='w-full object-contain' />
                    </div>
                ))}</div> : <> <span className='text-5xl text-gray-300'><FaCloudUploadAlt /></span>
                    <small className='text-gray-300 italic'>
                        Only support image with extension JPEG,PNG,JPG
                    </small></>}
            </label>
            {errors[id] && <small className='text-red-500'>{errors[id]?.message}</small>}
        </div>
    )
}

export default InputFile