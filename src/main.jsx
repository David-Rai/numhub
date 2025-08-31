import React from 'react'
import Dashboard from './routes/Dashboard.jsx'
import AddMember from './components/AddMember.jsx'
import Members from './components/Members.jsx'
import { RouterProvider } from 'react-router'
import { ToastContainer } from 'react-toastify'
import { createBrowserRouter } from 'react-router'
import { StrictMode } from 'react'
import Signup from './routes/Signup.jsx'
import { createRoot } from 'react-dom/client'
import Home from './routes/Home.jsx'
import './index.css'
import ContactForm from './routes/ContactForm.jsx'
import Signin from './routes/Signin.jsx'
import DashboardHome from './components/DashboardHome.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Signin />
  }, {
    path: '/contactform',
    element: <ContactForm />
  }, {
    path: '/signin',
    element: <Signin />
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    children: [
      {
        index: true,
        element: <DashboardHome />
      },{
        path:'members',
        element:<Members />
      },
      {
        path:'addmember',
        element:<AddMember />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <>
    <RouterProvider router={router} />
    <ToastContainer />
  </>
)
