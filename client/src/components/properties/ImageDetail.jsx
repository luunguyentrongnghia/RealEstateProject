import React, { useEffect, useRef, useState } from 'react';
import { Carousel } from 'nuka-carousel';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useAppStore } from '~/store/useAppStore';
import { AiFillCloseCircle } from 'react-icons/ai';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { BsArrowLeftCircleFill, BsArrowRightCircle, BsArrowRightCircleFill } from 'react-icons/bs';
const ImageDetail = ({ images = [], forceIndex = 0 }) => {
    const { setModal } = useAppStore()
    const [currentSline, setCurrentSline] = useState(forceIndex)
    const sliderRef = useRef(null);
    useEffect(() => {
        if (sliderRef.current) {
            sliderRef.current.slickGoTo(forceIndex, true);
        }
    }, []);
    const handleSlideChange = (currentSlide) => {
        setCurrentSline(currentSlide)
    };
    const settings = {
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplaySpeed: 2000,
        afterChange: handleSlideChange,
    };

    return (
        <div onClick={(e) => e.stopPropagation()} className='bg-overlay-90 w-screen h-screen'>
            <div className='flex p-6 items-center justify-between'>
                <span className='text-white font-bold'>{`${currentSline + 1}/${images.length}`}</span>
                <span className='p-2 cursor-pointer' onClick={() => setModal(false, null)}>
                    <AiFillCloseCircle size={30} color='white' />
                </span>
            </div>
            <Slider ref={sliderRef}  {...settings} >
                {images.map((imageUrl, index) => (
                    <div key={index}>
                        <img src={imageUrl} alt={`Image ${index + 1}`} className='max-w-[600px] object-contain mx-auto' />
                    </div>
                ))}
            </Slider>
        </div >
    );
};

export default ImageDetail;
