import clsx from 'clsx'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { twMerge } from 'tailwind-merge';
import { apiRegister, apiSignIn } from '~/apis/auth';
import { Button, InputForm, InputRadio, OtpVerifier } from '~/components';
import { useAppStore } from '~/store/useAppStore';
import { useUserStore } from '~/store/useUserStore';
import auth from '~/utils/firebaseConfig';

const login = () => {
    const [variant, setVariant] = useState('LOGIN')
    const { register, formState: { errors }, handleSubmit, reset } = useForm()
    const [isLoading, setIsLoading] = useState(false)
    const [isShowComfirmOTP, setIsShowComfirmOTP] = useState(false)
    const { setModal } = useAppStore()
    const { token, setToken, roles } = useUserStore()
    const { getCurrent, current } = useUserStore();
    // ham tao capcha neu no chua co
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
            setIsShowComfirmOTP(true)
        }).catch((error) => {
            setIsLoading(false)
            console.log(error)
            window.isSentOTP = false
            toast.error('Something went wrong.')
        })
    }
    const onSubmit = async (data) => {
        if (variant === 'REGISTER') {
            if (data?.roleCode !== 'ROL7') {
                handleSendOTP(data.phone)
            } else {
                handleRegister(data)
            }

        }
        if (variant === 'LOGIN') {
            const { name, role, ...payload } = data
            const response = await apiSignIn(payload)
            if (response.success) {
                setModal(false, null)
                setToken(response.accessToken)
                toast.success(response.mes)
            } else {
                toast.error(response.mes)
            }
        }

    }
    useEffect(() => { reset() }, [variant])
    const handleRegister = async (data) => {
        const { roleCode, ...payload } = data
        if (roleCode !== 'ROL7') {
            payload.roleCode = roleCode
        }
        const response = await apiRegister(payload)
        setIsLoading(false)
        if (response.success) {
            Swal.fire({
                icon: 'success',
                title: 'Congrats',
                text: response.mes,
                showConfirmButton: true,
                confirmButtonText: 'Go sign in'
            }).then((isConfirmed) => {
                if (isConfirmed) {
                    setVariant("LOGIN")
                    setIsShowComfirmOTP(false)
                }
            })
        } else {
            toast.error(response.mes)
        }
    }
    return (
        <div onClick={e => e.stopPropagation()} className={twMerge(clsx('bg-white text-lg relative rounded-md px-6 py-12 flex flex-col gap-6 w-[500px] items-center', isShowComfirmOTP && 'w-[600px] h-[270px]'))}>
            {isShowComfirmOTP && <div className='absolute inset-0 bg-white rounded-md'>
                <OtpVerifier cb={handleSubmit(handleRegister)} />
            </div>}
            <h1 className='text-2xl font-dance font-semibold tracking-tight'>Welcome to Rest06</h1>
            <div className='flex border-b justify-start  gap-6 w-full '>
                <span onClick={() => setVariant('LOGIN')} className={clsx(variant === 'LOGIN' && 'border-b-4 border-main-700 ', "cursor-pointer")}>Login</span>
                <span onClick={() => setVariant('REGISTER')} className={clsx(variant === 'REGISTER' && 'border-b-4 border-main-700 ', 'cursor-pointer')}>New account</span>
            </div>

            <form className={twMerge(clsx('flex w-full px-4 flex-col gap-4', isShowComfirmOTP && 'hidden'))}>
                <InputForm label="Phone Number" inputClassname='rounded-md' register={register} id="phone" placeholder='Type your phone number here' validate={{
                    required: 'This field cannot empty.',
                    pattern: {
                        value: /(0[1|3|5|7|8|9])+([0-9]{8})\b/,
                        message: "Phone number invalid."
                    }
                }} errors={errors} />
                <InputForm label="Password" inputClassname='rounded-md' register={register} id="password" placeholder='Type your password here' type='password' validate={{ required: 'This field cannot empty.' }} errors={errors} />
                {variant === 'REGISTER' && <InputForm label="Your Fullname" inputClassname='rounded-md' register={register} id="name" placeholder='Type your name here' validate={{ required: 'This field cannot empty.' }} errors={errors} />}

                {variant === 'REGISTER' && <InputRadio label="Type account" register={register} coptionsClassname="grid grid-cols-3 gap-4" options={roles?.filter(el => el.code !== "ROL1")?.map(el => ({ label: el.value, value: el.code }))} id="roleCode" validate={{ required: 'This field cannot empty.' }} errors={errors} />}
                <div id="recapcha-verifier"></div>
                <Button handleOnClick={handleSubmit(onSubmit)} className='py-2 my-6' disabled={isLoading}>
                    {variant === 'LOGIN' ? 'Sign in' : 'Register'}
                </Button>
                <span className='cursor-pointer text-main-500 hover:underline w-full text-center'>
                    Forgot your password?
                </span>

            </form>
        </div>
    )
}

export default login