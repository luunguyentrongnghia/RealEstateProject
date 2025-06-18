import React, { useState } from 'react'
import OtpInput from 'react-otp-input';
import { Button } from '~/components';
const OtpVerifier = ({ phone, cb }) => {
    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const handleConfirmotp = () => {
        setIsLoading(true)
        window.confirmationResult.confirm(otp).then(result => {
            setIsLoading(false)
            cb()
        }).catch(err => {
            setIsLoading(false)
        })
    }
    return (
        <div className='p-4 flex flex-col items-center justify-center h-full gap-12'>
            <span>
                We sent OTP code to your phone number <span>{phone}</span>. Please check your phone.
            </span>
            <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderSeparator={<span>•</span>}
                renderInput={(props) => <input {...props} />}
                inputStyle='h-20 border rounded-md outline-none inline-block border-blue-600 text-lg otp-item mx-2'
                shouldAutoFocus={true}
            />
            <div className='flex gap-4 items-center justify-center'>
                <Button disabled={isLoading} handleOnClick={handleConfirmotp}>Confirm otp</Button>
                <Button handleOnClick={() => { setOtp('') }}>Clear</Button>
            </div>
        </div>
    )
}

export default OtpVerifier