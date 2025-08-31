import { Users, Hash, UserCircle, Phone, IdCard, Calendar, Trash2, Clock, AlertTriangle } from "lucide-react";
import Loading from './Loading'
import React from 'react'
import supabase from '../config/supabase'
import { useState, useEffect } from 'react'

const DashboardHome = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getClients()
    }, [])


    const getClients = async () => {
        setLoading(true)
        const { data, error } = await supabase.from('clients').select().order("created_at", { ascending: true })
        if (error) {
            console.log(error)
        } else {
            console.log(data)
            setUsers(data)
            setLoading(false)
        }
    }


    //Handling delete user
    const handleDelete = async (id) => {

        const res = await supabase.from("clients")
            .delete().eq("id", id).single()

        if (res?.status === 204) {
            getClients()
        }
    }

    if (loading) {
        return (
            <Loading />
        )
    }

    return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-blue-900">Users Directory</h2>
                    <p className="text-sm text-blue-700">{users.length} total users</p>
                </div>
            </div>
        </div>

        <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[600px]">
                <thead>
                    <tr className="bg-gradient-to-r from-blue-100 to-indigo-100 border-b-2 border-blue-200">
                        <th className="text-left p-3 font-semibold text-blue-900 text-sm">
                            <div className="flex items-center gap-2">
                                <Hash className="w-4 h-4" />
                                ID
                            </div>
                        </th>
                        <th className="text-left p-3 font-semibold text-blue-900 text-sm">
                            <div className="flex items-center gap-2">
                                <UserCircle className="w-4 h-4" />
                                Name
                            </div>
                        </th>
                        <th className="text-left p-3 font-semibold text-blue-900 text-sm hidden sm:table-cell">
                            <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4" />
                                Number
                            </div>
                        </th>
                        <th className="text-left p-3 font-semibold text-blue-900 text-sm hidden md:table-cell">
                            <div className="flex items-center gap-2">
                                <IdCard className="w-4 h-4" />
                                User ID
                            </div>
                        </th>
                        <th className="text-left p-3 font-semibold text-blue-900 text-sm hidden lg:table-cell">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                Created
                            </div>
                        </th>
                        <th className="text-left p-3 font-semibold text-blue-900 text-sm">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-blue-100">
                    {users.length > 0 && users.map((user, index) => (
                        <tr
                            key={user.id}
                            className={`transition-colors duration-200 hover:bg-blue-50 ${index % 2 === 0 ? "bg-white" : "bg-blue-25"
                                }`}
                        >
                            <td className="p-3 text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                        <span className="text-xs font-medium text-blue-700">
                                            {user.id}
                                        </span>
                                    </div>
                                </div>
                            </td>
                            <td className="p-3 text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                        <UserCircle className="w-4 h-4 text-green-600" />
                                    </div>
                                    <span className="font-medium text-gray-800 truncate max-w-[150px]">
                                        {user.name}
                                    </span>
                                </div>
                            </td>
                            <td className="p-3 text-sm hidden sm:table-cell">
                                <div className="flex items-center gap-2 text-gray-700">
                                    <Phone className="w-4 h-4 text-gray-400" />
                                    <span className="font-mono">{user.number}</span>
                                </div>
                            </td>
                            <td className="p-3 text-sm hidden md:table-cell">
                                <div className="flex items-center gap-2 text-gray-700">
                                    <IdCard className="w-4 h-4 text-gray-400" />
                                    <span className="font-mono bg-gray-100 px-2 py-1 rounded text-xs">
                                        {user.user_id}
                                    </span>
                                </div>
                            </td>
                            <td className="p-3 text-sm hidden lg:table-cell">
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Clock className="w-4 h-4 text-gray-400" />
                                    <div className="flex flex-col">
                                        <span>{new Date(user.created_at).toLocaleDateString()}</span>
                                        <span className="text-xs text-gray-400">
                                            {new Date(user.created_at).toLocaleTimeString([], {
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </span>
                                    </div>
                                </div>
                            </td>
                            <td className="p-3">
                                <button
                                    onClick={() => handleDelete(user.id)}
                                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 focus:ring-4 focus:ring-red-200 transition-all duration-200 transform hover:scale-105 active:scale-95 text-xs font-medium shadow-md hover:shadow-lg"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                    <span className="hidden sm:inline">Delete</span>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Empty state */}
            {users.length === 0 && (
                <div className="text-center py-16">
                    <AlertTriangle className="w-16 h-16 text-blue-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-blue-700 mb-2">No users found</h3>
                    <p className="text-blue-600">Users will appear here once they are added to the system.</p>
                </div>
            )}
        </div>

    </div>
    )
}

export default DashboardHome