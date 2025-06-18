import { useEffect, useState } from 'react'
import { Routes, Route, Outlet } from 'react-router-dom'
import { Modal } from './components'
import { Home, PublicLayout, AboutUs, Properties, OurAgents, Search } from './pages/public'
import { useAppStore } from './store/useAppStore'
import path from './utils/path'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useUserStore } from './store/useUserStore'
import { AdminLayout, CreatePropertyType, ManagePropertyType } from './pages/admins'
import DashBoard from './pages/admins/Dashboard'
import { Personal, UserLayout } from './pages/user'
import { usePropertiesStore } from './store/usePropertiesStore'
function App() {
  const { isShowModal } = useAppStore();
  const { getCurrent, current, token, getRoles } = useUserStore();
  const { getPropertyTypes } = usePropertiesStore();
  useEffect(() => {
    getCurrent()
    getRoles()
    getPropertyTypes({ fields: "id,name,image" })
  }, [token])
  return (
    <div className=''>
      {isShowModal && <Modal />}
      <Outlet />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  )
}

export default App
