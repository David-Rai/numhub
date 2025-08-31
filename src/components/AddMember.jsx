import { Mail, User, Lock, UserPlus, Loader2, AlertCircle } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import supabase from '../config/supabase'

const AddMember = () => {
    const navigate = useNavigate()
    const [adding, setAdding] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (formdata) => {
        setAdding(true)
        console.log("Form Data:", formdata);

        const { email, username, password } = formdata

        const { data, error } = await supabase.auth.signUp({
            email, username, password
        })

        if (error) {
            //   console.log(error)
            toast.error(error.message)
            setAdding(false)
        } else {
            //   console.log(data)
            toast.success("Successfully added new member")
            navigate('../members')
            AddProfile(email)
        }
    };

    const AddProfile = async (email) => {
        const res = await supabase.from('profiles')
            .insert({ email, is_admin: false })
        console.log(res)

        setAdding(false)
    }

    return (
        <div className="flex justify-center items-center bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen p-4">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200 w-full max-w-md space-y-6"
            >
                <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <UserPlus className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800">Add Member</h2>
                    <p className="text-gray-600 mt-2">Create a new team member account</p>
                </div>
        
                {/* Email */}
                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                        Email Address
                    </label>
                    <div className="relative">
                        <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                        <input
                            type="email"
                            placeholder="Enter email address"
                            {...register("email", { required: "Email is required" })}
                            className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                                errors.email ? "border-red-300 bg-red-50" : "border-gray-300 hover:border-gray-400"
                            }`}
                        />
                    </div>
                    {errors.email && (
                        <div className="flex items-center gap-2 text-red-600 text-sm">
                            <AlertCircle className="w-4 h-4" />
                            {errors.email.message}
                        </div>
                    )}
                </div>
        
                {/* Username */}
                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                        Username
                    </label>
                    <div className="relative">
                        <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Choose a username"
                            {...register("username", { required: "Username is required" })}
                            className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                                errors.username ? "border-red-300 bg-red-50" : "border-gray-300 hover:border-gray-400"
                            }`}
                        />
                    </div>
                    {errors.username && (
                        <div className="flex items-center gap-2 text-red-600 text-sm">
                            <AlertCircle className="w-4 h-4" />
                            {errors.username.message}
                        </div>
                    )}
                </div>
        
                {/* Password */}
                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                        Password
                    </label>
                    <div className="relative">
                        <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                        <input
                            type="password"
                            placeholder="Create a secure password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: { value: 6, message: "At least 6 characters" },
                            })}
                            className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                                errors.password ? "border-red-300 bg-red-50" : "border-gray-300 hover:border-gray-400"
                            }`}
                        />
                    </div>
                    {errors.password && (
                        <div className="flex items-center gap-2 text-red-600 text-sm">
                            <AlertCircle className="w-4 h-4" />
                            {errors.password.message}
                        </div>
                    )}
                </div>
        
                {/* Submit Button */}
                <button
                    disabled={adding}
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 focus:ring-4 focus:ring-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                    {adding ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Adding Member...
                        </>
                    ) : (
                        <>
                            <UserPlus className="w-5 h-5" />
                            Add Member
                        </>
                    )}
                </button>
        
                {/* Optional: Add a note */}
                <div className="text-center text-sm text-gray-500 pt-4 border-t border-gray-100">
                    The new member will receive an email notification
                </div>
            </form>
        </div>
    );
};

export default AddMember;
