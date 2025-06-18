import React from 'react'
import { Navigation, Topheader } from '~/components'
import { Outlet } from 'react-router-dom'
import clsx from 'clsx'
import withRouter from '~/hocs/withRouter'
import { useAppStore } from '~/store/useAppStore'
const publicLayout = ({ location }) => {

    return (
        <main >
            <Topheader />
            <Navigation />
            <div className={clsx(location.pathname === '/' ? 'pt-0' : 'pt-[232px]')}>
                <Outlet />
            </div>
        </main>
    )
}

export default withRouter(publicLayout)