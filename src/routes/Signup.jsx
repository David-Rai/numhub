import React from "react";
import { useForm } from "react-hook-form";
import supabase from '../config/supabase'

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formdata) => {
    console.log("Form Data:", formdata);

    const { email, username, password } = formdata


    const { data, error } = await supabase.auth.signUp({
      email, username, password
    })

    if (data) {
      console.log(data)
    } else {
      console.log(error)
    }

    // alert("Signup Successful!");
  };

  return (
    <div className="flex justify-center items-center  bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-xl shadow-md w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-gray-700">Sign Up</h2>

        {/* Email */}
        <div>
          <label className="block mb-1 text-gray-600">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            {...register("email", { required: "Email is required" })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Username */}
        <div>
          <label className="block mb-1 text-gray-600">Username</label>
          <input
            type="text"
            placeholder="Choose a username"
            {...register("username", { required: "Username is required" })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block mb-1 text-gray-600">Password</label>
          <input
            type="password"
            placeholder="Enter a password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "At least 6 characters" },
            })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
