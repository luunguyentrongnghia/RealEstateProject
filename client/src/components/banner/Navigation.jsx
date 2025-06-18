import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import Button from '~/components/commons/Button'
import { navigation } from '~/utils/constants'
import clsx from 'clsx'
import withRouter from '~/hocs/withRouter'
import { twMerge } from 'tailwind-merge'
import { useUserStore } from '~/store/useUserStore'
import { useAppStore } from '~/store/useAppStore'
import Login from '~/components/login/Login'
const Navigation = ({ location, navigate }) => {
    const { token, current } = useUserStore()
    const { setModal } = useAppStore()
    return (
        <div className={twMerge(clsx('fixed w-full top-[85px] z-[9999]', location.pathname !== '/' && 'bg-white'))}>
            <div className=' bg-transparent  flex items-center w-main mx-auto justify-between  py-[26px]'>
                <Link to='/'>
                    <img src={location.pathname === '/' ? 'logo1.png' : 'logo2.png'} alt='' className='w-[180px] object-contain' />
                </Link>
                <div className={clsx('flex  text-lg items-center gap-6 ', location.pathname === '/' ? 'text-main-100' : 'text-gray-700 ')}>
                    {navigation?.map((el) => (
                        <NavLink key={el.id} to={el.path} className={({ isActive }) => clsx(isActive && ' font-medium', location.pathname === '/' ? 'text-white' : 'text-gray-900')}>
                            {el.text}
                        </NavLink>
                    ))}
                    {!current ? <Button
                        handleOnClick={() => setModal(true, <Login />)}
                        className={twMerge(clsx(location.pathname === '/' && 'bg-transparent border border-main-100'))}>
                        Sign in/Sign up
                    </Button> : <Button>Logout</Button>}
                </div>
            </div>
        </div>
    )
}

export default withRouter(Navigation)