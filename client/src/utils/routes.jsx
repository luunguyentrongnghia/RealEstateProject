import App from "~/App";
import { Search } from "~/components";
import {
  AdminLayout,
  CreatePropertyType,
  ManagePropertyType,
} from "~/pages/admins";
import DashBoard from "~/pages/admins/Dashboard";
import {
  AboutUs,
  Home,
  OurAgents,
  Properties,
  PropertyDetail,
  PublicLayout,
} from "~/pages/public";
import { Personal, UserLayout } from "~/pages/user";
import path from "./path";

export const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: path.PUBLIC_LAYOUT,
        element: <PublicLayout />,
        children: [
          {
            path: path.HOME,
            element: <Home />,
          },
          {
            path: path.ABOUT_US,
            element: <AboutUs />,
          },
          {
            path: path.OUR_AGENTS,
            element: <OurAgents />,
          },
          {
            path: path.PROPERTIES,
            element: <Properties />,
          },
          {
            path: path.PROPERTY_DETAIL_ID,
            element: <PropertyDetail />,
          },
          {
            path: path.SEARCH,
            element: <Search />,
          },
        ],
      },
      {
        path: path.ADMIN_LAYOUT,
        element: <AdminLayout />,
        children: [
          {
            path: path.ADMIN_DASHBOARD,
            element: <DashBoard />,
          },
          {
            path: path.CREATE_PROPERTY_TYPE,
            element: <CreatePropertyType />,
          },
          {
            path: path.MANAGE_PROPERTY_TYPE,
            element: <ManagePropertyType />,
          },
        ],
      },
      {
        path: path.USER_LAYOUT,
        element: <UserLayout />,
        children: [
          {
            path: path.PERSONAL,
            element: <Personal />,
          },
        ],
      },
    ],
  },
];
