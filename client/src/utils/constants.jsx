import path from "./path";
import { RiDashboardLine } from "react-icons/ri";
import { BsHouseGearFill } from "react-icons/bs";
import { FaRegCircleUser } from "react-icons/fa6";
export const navigation = [
    {
        id: 1,
        path: '/',
        text: 'HOME',
    },
    {
        id: 2,
        path: `/${path.ABOUT_US}`,
        text: 'ABOUT US',
    },
    {
        id: 3,
        path: `/${path.OUR_AGENTS}`,
        text: 'OUR AGENTS',
    },
    {
        id: 4,
        path: `/${path.PROPERTIES}`,
        text: 'PROPERTIES',
    },
    {
        id: 5,
        path: `/${path.SEARCH}`,
        text: 'SEARCH',
    },
]
export const adminSidebar = [
    {
        id: 12,
        name: 'Dashboard',
        path: `/${path.ADMIN_LAYOUT}/${path.DASHBOARD}`,
        icon: <RiDashboardLine />,
        type: 'SINGLE'
    },
    {
        id: 132,
        name: 'Property Type',
        icon: <BsHouseGearFill />,
        type: 'PARENT',
        subs: [
            {
                id: 121,
                path: `/${path.ADMIN_LAYOUT}/${path.CREATE_PROPERTY_TYPE}`,
                name: 'Create-new',
            },
            {
                id: 122,
                path: `/${path.ADMIN_LAYOUT}/${path.MANAGE_PROPERTY_TYPE}`,
                name: 'Manage',
            },
        ]
    },
]
export const userSidebar = [
    {
        id: 12,
        name: 'Personal',
        path: `/${path.USER_LAYOUT}/${path.PERSONAL}`,
        icon: <FaRegCircleUser />,
        type: 'SINGLE'
    },
]
export const showOptions = [
    {
        id: 1,
        name: 'Personal',
        code: 'ROL7',
        path: `/${path.USER_LAYOUT}/${path.PERSONAL}`
    },
    {
        id: 2,
        name: 'Agent',
        code: 'ROL5',
        path: `/${path.AGENT_LAYOUT}/${path.AGENT_DASHBOARD}`
    },
    {
        id: 3,
        name: 'Owner',
        code: 'ROL3',
        path: `/${path.OWNER_LAYOUT}/${path.OWNER_DASHBOARD}`
    },
    {
        id: 4,
        name: 'Admin',
        code: 'ROL1',
        path: `/${path.ADMIN_LAYOUT}/${path.ADMIN_DASHBOARD}`
    },
]
