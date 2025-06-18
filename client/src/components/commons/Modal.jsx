import React from 'react'
import { useAppStore } from '~/store/useAppStore'

const Modal = () => {
    const { contentModal, setModal } = useAppStore()
    return (
        <div onClick={() => setModal(false)} className="fixed z-[99999] top-0 h-full w-full flex items-center justify-center left-0 bg-overlay-50">
            {contentModal}
        </div>
    )
}

export default Modal