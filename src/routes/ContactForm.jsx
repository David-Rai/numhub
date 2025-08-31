import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify'
import { Send, User, Phone } from "lucide-react";
import { useNavigate } from "react-router";
import supabase from "../config/supabase";

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (session && session.user) {
        console.log("User is valid");
        return true;
      } else {
        navigate("/signin")
        console.log("No valid user");
        return false;
      }
    };
    checkUser();
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (formdata) => {
    const { fullname, contact } = formdata
    const { data: { session } } = await supabase.auth.getSession();
    console.log(session)
    const id = session.user.id

    setIsSubmitting(true);

    // Simulate API call
    const { data, error } = await supabase.from("clients")
      .insert({
        name: fullname, number: contact, user_id: id
      })

    if (!error) {
      setIsSubmitting(false);
      reset({
        fullname: "",
        contact: ""
      })
      toast.success("successfully added")
      console.log("successfully added")
    }

    if (error) {
      toast.error(error.message)
      console.log(error)
      return
    }
  };


  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-100 space-y-6 backdrop-blur-sm">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Add User Data
            </h2>
            <p className="text-gray-600 mt-2">We'd love to hear from you</p>
          </div>

          {/* Full Name */}
          <div className="relative">
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Full Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Enter full name"
                {...register("fullname", {
                  required: "Full Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters"
                  }
                })}
                className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none ${errors.fullname
                  ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                  : "border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  }`}
              />
            </div>
            {errors.fullname && (
              <p className="text-red-500 text-sm mt-2 flex items-center">
                <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                {errors.fullname.message}
              </p>
            )}
          </div>



          {/* Contact Number */}
          <div className="relative">
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Contact Number *
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                placeholder="Enter contact number"
                {...register("contact", {
                  required: "Contact number is required",
                })}
                className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none ${errors.contact
                  ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                  : "border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  }`}
              />
            </div>
            {errors.contact && (
              <p className="text-red-500 text-sm mt-2 flex items-center">
                <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                {errors.contact.message}
              </p>
            )}
          </div>



          {/* Submit Button */}
          <button
            disabled={isSubmitting}
            onClick={handleSubmit(onSubmit)}
            className={`w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer select-none ${isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 hover:shadow-lg"
              }`}
          >
            <Send className="w-5 h-5" />
            <span>Send Message</span>
          </button>

          <p className="text-center text-xs text-gray-500 mt-4">
            We respect your privacy and will never share your information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;