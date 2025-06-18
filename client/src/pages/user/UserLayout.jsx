import React, { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Swal from 'sweetalert2'
import { Login, UserSidebar } from '~/components'
import withRouter from '~/hocs/withRouter'
import { useAppStore } from '~/store/useAppStore'
import { useUserStore } from '~/store/useUserStore'

const UserLayout = ({ navigate }) => {
    const { current } = useUserStore()
    const { setModal } = useAppStore()
    useEffect(() => {
        if (!current || !current?.userRoles?.some(el => el.roleCode === 'ROL7')) {
            Swal.fire({
                icon: 'info',
                title: 'Oops!',
                text: "Login required.",
                showCancelButton: true,
                showConfirmButton: true,
                cancelButtonText: "Go Home",
                confirmButtonText: "Go Login"
            }).then((response) => {
                if (response.isConfirmed) setModal(true, <Login />)
                if (response.isDismissed) navigate('/')
            })
        }
    }, [current])
    return (
        <>
            {current?.userRoles?.some(el => el.roleCode === 'ROL7') &&
                <div className='w-full min-h-screen overflow-y-auto grid grid-cols-12'>
                    <div className=' col-span-2'>
                        <UserSidebar />
                    </div>
                    <div className=' col-span-10'>
                        <Outlet />
                    </div>
                </div>}
        </>
    )
}

export default withRouter(UserLayout)