import { async } from '@firebase/util'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { apiUploadImages } from '~/apis/beyound'
import { apiUpdateProfile } from '~/apis/user'
import { Button, InputFile, InputForm, OtpVerifier } from '~/components'
import { useAppStore } from '~/store/useAppStore'
import { useUserStore } from '~/store/useUserStore'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import auth from '~/utils/firebaseConfig';
const Personal = () => {
    const { register, formState: { errors }, handleSubmit, setValue, clearErrors, reset, watch } = useForm()
    const { current, getCurrent } = useUserStore()
    const { setModal } = useAppStore()
    const [isChangeAvatart, setIsChangeAvatart] = useState(false)
    const [deleteImage, setDeleteImage] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [initialPhoneNumber, setInitialPhoneNumber] = useState('');
    const avatar = watch('avatar')
    useEffect(() => {
        if (current) {
            reset({
                name: current.name,
                phone: current.phone,
                address: current.address,
                email: current.email,
                avatar: current.avatar,
            })
            setInitialPhoneNumber(current.phone)
        }
    }, [current])
    const handleCaptchaVerify = () => {
        if (!window.recaptchVerify) {
            window.recaptchVerify = new RecaptchaVerifier(auth, 'recapcha-verifier')
        }
    }
    const handleSendOTP = (phone) => {
        setIsLoading(true)
        handleCaptchaVerify()
        const verifier = window.recaptchVerify
        const formatPhone = '+84' + phone.slice(1)
        signInWithPhoneNumber(auth, formatPhone, verifier).then((result) => {
            setIsLoading(false)
            toast.success('Sent OTP to your phone.')
            window.confirmationResult = result
            setModal(true, <div className='absolute inset-71 bg-white rounded-md'>
                <OtpVerifier cb={handleSubmit(handleUpdate)} />
            </div>)
        }).catch((error) => {
            setIsLoading(false)
            console.log(error)
            window.isSentOTP = false
            toast.error('Something went wrong.')
        })
    }
    const getImages = (images) => {
        if (images && images.length > 0) {
            clearErrors('avatar')
        }
        setValue('avatar', images.map(el => el.file))
    }
    const onSubmit = async (data) => {
        const { phone, ...payload } = data
        // setIsLoading(true)
        if (phone !== initialPhoneNumber) {
            handleSendOTP(data.phone)
        } else {
            handleUpdate(data)
        }
    }
    const handleUpdate = async (data) => {
        setIsLoading(true)
        if (data.avatar[0] && data.avatar[0] instanceof File) {
            const formData = new FormData()
            const uploadPromises = []
            for (let file of data.avatar) {
                formData.append('file', file)
                formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET)
                uploadPromises.push(apiUploadImages(formData))
            }
            const UploadImage = await Promise.all(uploadPromises)
            if (UploadImage && UploadImage.length > 0) {
                data.avatar = UploadImage[0].data.secure_url
            } else {
                setIsLoading(false)
                return toast.error('something went wrong')
            }
        }
        const response = await apiUpdateProfile(data)
        if (response.success) {
            setIsLoading(false)
            toast.success(response.mes)
            getCurrent()
            setDeleteImage(prev => prev + 1)
            setIsChangeAvatart(false)
            setInitialPhoneNumber(data.phone)
        } else {
            setIsLoading(false)
            toast.error(response.mes)
        }
    }
    return (
        <div className='h-full '>
            <div className='h-14 flex justify-between items-center border-b px-6'>
                <h1 className='text-3xl font-bold text-main-700'>Personal Infomation</h1>
            </div>
            <form className='max-w-[600px] space-y-4 mx-auto my-6'>
                <InputForm
                    id='name'
                    register={register}
                    validate={{ required: 'This field cannot emty.' }}
                    errors={errors}
                    label='Fullname'
                    required
                    placeholder='Required fullname'
                />
                <InputForm
                    id='phone'
                    register={register}
                    validate={{ required: 'This field cannot emty.' }}
                    errors={errors}
                    label='Phone Number'
                    required
                    placeholder='Required phone'
                // readOnly={!(current?.userRole?.length === 1 && current?.userRole[0]?.roleCode === 'ROL7')}
                />
                <InputForm
                    id='email'
                    register={register}
                    validate={{ required: 'This field cannot emty.' }}
                    errors={errors}
                    label='Email Address'
                    required
                    placeholder='Required email'
                />
                <InputForm
                    id='address'
                    register={register}
                    validate={{ required: 'This field cannot emty.' }}
                    errors={errors}
                    label='Address'
                    required
                    placeholder='Required address'
                />
                <div className='flex flex-col gap-3'>
                    <span className='font-medium text-main-700'>Avatar <span onClick={() => setIsChangeAvatart(prev => !prev)} className='text-xs cursor-pointer hover:underline text-orange-600'>{isChangeAvatart ? 'unChange' : 'Change'}</span></span>
                    {isChangeAvatart ? <InputFile
                        id='avatar'
                        register={register}
                        errors={errors}
                        getImages={getImages}
                        deleteImage={deleteImage}
                    /> : <img src={avatar || '/user2.svg'} alt='' className='w-28 h-28 object-cover rounded-full ' />}
                </div>
                <Button disabled={isLoading} className="mx-auto my-8" handleOnClick={handleSubmit(onSubmit)}>Update</Button>
                <div id="recapcha-verifier"></div>
            </form>
        </div>
    )
}

export default Personal