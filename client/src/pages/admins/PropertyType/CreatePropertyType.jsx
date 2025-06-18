import React, { useState } from 'react'
import { Button, InputFile, InputForm, InputText, Textarea, Title } from '~/components'
import { CiCirclePlus } from "react-icons/ci";
import { useForm } from 'react-hook-form';
import { apicreateNewPropertyType } from '~/apis/propertyType';
import { toast } from 'react-toastify';
import { apiUploadImages } from '~/apis/beyound';

const CreatePropertyType = () => {
    const { register, formState: { errors }, handleSubmit, reset, setValue, setError, clearErrors } = useForm()
    const [isLoading, setIsLoading] = useState(false)
    const [deleteImage, setDeleteImage] = useState(0)
    const handleCreateNewProperty = async (data) => {
        if (!data.image || data.image.length === 0) {
            setError("image", {
                message: "This field cannot empty.",
                type: "required"
            })
        } else {
            setIsLoading(true)
            const formData = new FormData()
            const uploadPromises = []
            const { image, ...payload } = data
            for (let file of image) {
                formData.append('file', file)
                formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET)
                uploadPromises.push(apiUploadImages(formData))
            }
            const UploadImage = await Promise.all(uploadPromises)
            let imageLink = ''
            if (UploadImage && UploadImage.length > 0) {
                imageLink = UploadImage[0].data.secure_url
                const response = await apicreateNewPropertyType({ ...payload, image: imageLink })
                if (response.success) {
                    toast.success(response.mes)
                    reset()
                    getImages([])
                    setDeleteImage(prev => prev + 1)
                } else {
                    toast.error(response.mes)
                }
            } else {
                toast.error('something went wrong')
            }
            setIsLoading(false)
        }
    }
    const getImages = (images) => {
        if (images && images.length > 0) {
            clearErrors('image')
        }
        setValue('image', images.map(el => el.file))
    }
    return (
        <div className=''>
            <Title title='Create New Property Type' >
                <Button className="font-semibold" handleOnClick={handleSubmit(handleCreateNewProperty)} disabled={isLoading}>
                    <CiCirclePlus size={20} />
                    <span>
                        Create
                    </span>
                </Button>
            </Title>
            <form className='p-4 flex flex-col gap-4'>
                <InputForm id='name' register={register} errors={errors} validate={{ required: "This field cannot empty." }} label="Property Type Name" />
                {/* <InputText id='description' register={register} errors={errors} setValue={setValue} label='Description' validate={{ required: "This field cannot empty." }} /> */}
                <Textarea id='description' register={register} errors={errors} label='Description' validate={{ required: "This field cannot empty." }} />
                <InputFile id='image' label='Image' register={register} errors={errors} validate={{ required: "This field cannot empty." }} getImages={getImages} deleteImage={deleteImage} />
            </form>
        </div >
    )
}

export default CreatePropertyType