import clsx from 'clsx';
import React from 'react'
import { NavLink } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import useBreadcrumbs from "use-react-router-breadcrumbs";

const DynamicBreakCrumb = ({ location }) => {
    return <span>{
        location.state.name
    }</span>
}
const breadcrumbRouter = [
    {
        path: '/',
        breadcrumb: 'Home'
    },
    {
        path: '/properties',
        breadcrumb: 'Properties'
    },
    {
        path: '/properties/:id',
        breadcrumb: DynamicBreakCrumb
    },
]
const BreadCrumb = () => {
    const breadcrumbs = useBreadcrumbs(breadcrumbRouter);
    return (
        <div className='flex items-center'>
            {breadcrumbs.map(({ match, breadcrumb, location }, idx) => {
                return (
                    <NavLink key={match.pathname} to={match.pathname} className='h-5 line-clamp-1' state={{ name: location?.state?.name }}>
                        <span className={twMerge(clsx('hover:underline', Object.keys(match.params).length > 0 && 'w-[200px] line-clamp-1 flex items-center'))}>
                            {breadcrumb}
                        </span>
                        <span className='px-2'>
                            {idx < breadcrumbs.length - 1 && " / "}
                        </span>
                    </NavLink>
                );
            })}
        </ div>
    );
}

export default BreadCrumb