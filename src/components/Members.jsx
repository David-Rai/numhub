import { Users, Hash, Mail, Calendar, Crown, User, Shield, Clock } from "lucide-react";
import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import supabase from '../config/supabase'

const Members = () => {
    const [members, setMembers] = useState([])
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        getMembers()
    }, [])

    const getMembers = async () => {

        setLoading(true)
        const { data, error } = await supabase.from('profiles').select().order("created_at", { ascending: true })
        if (error) {
            console.log(error)
        } else {
            console.log(data)
            setMembers(data)
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <Loading />
        )
    }

    return (
    <div className="p-4 bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
            </div>
            <div>
                <h2 className="text-xl font-bold text-gray-800">Member List</h2>
                <p className="text-sm text-gray-600">{members.length} total members</p>
            </div>
        </div>

        <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
                <thead>
                    <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                        <th className="text-left p-3 font-semibold text-gray-700 text-sm">
                            <div className="flex items-center gap-2">
                                <Hash className="w-4 h-4" />
                                ID
                            </div>
                        </th>
                        <th className="text-left p-3 font-semibold text-gray-700 text-sm">
                            <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                Email
                            </div>
                        </th>
                        <th className="text-left p-3 font-semibold text-gray-700 text-sm hidden md:table-cell">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                Created At
                            </div>
                        </th>
                        <th className="text-left p-3 font-semibold text-gray-700 text-sm">
                            <div className="flex items-center gap-2">
                                <Shield className="w-4 h-4" />
                                Role
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {members.map((member, index) => (
                        <tr
                            key={member.id}
                            className={`transition-colors duration-200 hover:bg-gray-50 ${member.is_admin
                                    ? "bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-amber-400"
                                    : index % 2 === 0 ? "bg-white" : "bg-gray-25"
                                }`}
                        >
                            <td className="p-3 text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                                        <span className="text-xs font-medium text-gray-600">
                                            {member.id}
                                        </span>
                                    </div>
                                </div>
                            </td>
                            <td className="p-3 text-sm">
                                <div className="flex items-center gap-2 max-w-xs">
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                        <Mail className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <span className="truncate font-medium text-gray-800">
                                        {member.email}
                                    </span>
                                </div>
                            </td>
                            <td className="p-3 text-sm hidden md:table-cell">
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Clock className="w-4 h-4 text-gray-400" />
                                    <span>{new Date(member.created_at).toLocaleDateString()}</span>
                                    <span className="text-xs text-gray-400">
                                        {new Date(member.created_at).toLocaleTimeString([], {
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </span>
                                </div>
                            </td>
                            <td className="p-3">
                                {member.is_admin ? (
                                    <div className="flex items-center gap-2">
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 rounded-full text-xs font-semibold border border-amber-200">
                                            <Crown className="w-3.5 h-3.5" />
                                            Admin
                                        </span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                                            <User className="w-3.5 h-3.5" />
                                            Member
                                        </span>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        {/* Empty state */}
        {members.length === 0 && (
            <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">No members found</h3>
                <p className="text-gray-500">Add your first team member to get started.</p>
            </div>
        )}

        {/* Footer with stats */}
        {members.length > 0 && (
            <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-200">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                        <Crown className="w-4 h-4 text-amber-600" />
                        {members.filter(m => m.is_admin).length} Admin{members.filter(m => m.is_admin).length !== 1 ? 's' : ''}
                    </span>
                    <span className="flex items-center gap-1">
                        <User className="w-4 h-4 text-gray-600" />
                        {members.filter(m => !m.is_admin).length} Member{members.filter(m => !m.is_admin).length !== 1 ? 's' : ''}
                    </span>
                </div>
                <div className="text-sm text-gray-500">
                    Total: {members.length} member{members.length !== 1 ? 's' : ''}
                </div>
            </div>
        )}
    </div>
    )
}

export default Members