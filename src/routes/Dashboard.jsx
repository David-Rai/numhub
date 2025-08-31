import { Users, Clock, Hash, TrendingUp, Activity, Calendar } from "lucide-react";
import Sidebar from '../components/Sidebar'
import React from 'react'
import { NavLink } from 'react-router'
import { Outlet } from 'react-router'
import { useEffect, useState } from 'react'

import { useNavigate } from 'react-router'
import supabase from '../config/supabase'

const Dashboard = () => {
  const navigate = useNavigate()
  const [users, setUsers] = useState([])

  const checkAdmin = async (email) => {
    const { data, error } = await supabase.from("profiles")
      .select()
      .eq("email", email)

    if (data[0]?.is_admin) {
      return true

    } else {
      return false
    }
  }

  const getClients = async () => {
    const { data, error } = await supabase.from('clients').select().order("created_at", { ascending: true })
    if (error) {
      console.log(error)
    } else {
      // console.log(data)
      setUsers(data)
    }
  }

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      //user found
      if (session && session.user) {
        const is_admin = await checkAdmin(session.user.email)

        if (is_admin) {
          getClients()
          return
        }
        navigate("/signin")
        return
      }

      //no user found
      navigate("/signin")
      // console.log("no user")
    }

    checkUser();
  }, [])


  return (
<div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-100 text-gray-900">
  {/* Sidebar */}
  <Sidebar />

  {/* Main content */}
  <main className="flex-1 p-4 md:p-6 space-y-6">
    {/* Header */}
    <div className="mb-6">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Dashboard Overview</h1>
      <p className="text-gray-600">Monitor your system performance and user activity</p>
    </div>

    {/* Stats cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {/* Total Users Card */}
      <div className="group bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div className="text-right">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-600 flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Total Users
          </p>
          <h3 className="text-3xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
            {users.length.toLocaleString()}
          </h3>
          <p className="text-xs text-green-600 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            Active system
          </p>
        </div>
      </div>

      {/* Last Created Card */}
      <div className="group bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Clock className="w-6 h-6 text-white" />
          </div>
          <div className="text-right">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
              Latest
            </span>
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-600 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Last Created
          </p>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-gray-800 group-hover:text-purple-600 transition-colors">
              {users.length > 0 ? new Date(users[users.length - 1]?.created_at).toLocaleDateString() : 'No data'}
            </h3>
            <p className="text-sm text-gray-500">
              {users.length > 0 ? new Date(users[users.length - 1]?.created_at).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
              }) : ''}
            </p>
          </div>
        </div>
      </div>

      {/* Unique IDs Card */}
      <div className="group bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] sm:col-span-2 lg:col-span-1">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Hash className="w-6 h-6 text-white" />
          </div>
          <div className="text-right">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-emerald-100 text-emerald-800">
              Unique
            </span>
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-600 flex items-center gap-2">
            <Hash className="w-4 h-4" />
            Unique IDs
          </p>
          <h3 className="text-3xl font-bold text-gray-800 group-hover:text-emerald-600 transition-colors">
            {[...new Set(users.map((d) => d.user_id))].length.toLocaleString()}
          </h3>
          <p className="text-xs text-gray-500">
            {users.length > 0 ? 
              `${((([...new Set(users.map((d) => d.user_id))].length / users.length) * 100)).toFixed(1)}% uniqueness` 
              : 'No data'
            }
          </p>
        </div>
      </div>
    </div>

    {/* Quick Actions */}
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-4">
        <Activity className="w-5 h-5 text-gray-600" />
        <h2 className="text-lg font-semibold text-gray-800">System Status</h2>
      </div>
      <div className="flex flex-wrap gap-3">
        <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-100 text-green-800 rounded-full text-sm font-medium">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          System Online
        </span>
        <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
          <Users className="w-4 h-4" />
          {users.length} Active Users
        </span>
        <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
          <Clock className="w-4 h-4" />
          Last Update: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>

    {/* Users Table */}
    <Outlet />
  </main>
</div>
  )
}

export default Dashboard