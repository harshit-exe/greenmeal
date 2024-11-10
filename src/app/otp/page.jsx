"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { BaseApiUrl } from "@/utils/constanst";
import { useRouter } from 'next/navigation'
const OTPForm = () => {
  const router = useRouter()

  const [formData, setFormData] = useState({
    otp: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }
  const [isClient, setIsClient] = useState(false); // To check if the code is running on the client side

  useEffect(() => {
    setIsClient(true); // Set to true after the component is mounted on the client
  }, []);

  const handleChange = (e, index) => {
    const value = e.target.value;

    // Only allow numeric values in the OTP input
    if (value.match(/[0-9]/)) {
      const newOtp = [...otp];
      newOtp[index] = value; // Update OTP value at the current index
      setOtp(newOtp); // Update the state

      // Move focus to the next input if the current input is filled
      if (index < 5 && value) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  const handleBackspace = (e, index) => {
    // If backspace is pressed and the current OTP input is empty, move focus to the previous input
    if (otp[index] === "" && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle OTP verification
    console.log("Entered OTP:",formData.otp);


    const response = await fetch(`${BaseApiUrl}/user/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: localStorage.getItem('email'), userotp: formData.otp })
    });
    const json = await response.json();

    if (json.message) {


      localStorage.setItem('token', json.data.token)
      toast.success("Signup SuccessFull");
      router.push("/")
    } else {
      toast.error("Error to Create");
    }




  };

  if (!isClient) {
    return null; // Don't render OTP inputs on the server side
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-4">
          Enter OTP
        </h2>
        <p className="text-center text-gray-600 mb-6">
          We sent a one-time password (OTP) to your phone. Please enter it
          below.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-between">

            <Input id="username" onChange={handleInputChange} name="otp" placeholder="Enter OTP" className="pl-10" />
            {/* {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                className="w-12 h-12 text-center text-2xl font-bold border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={digit}
                onChange={(e) => handleChange(e, index)} // Update OTP value
                onKeyDown={(e) =>
                  e.key === "Backspace" && handleBackspace(e, index)
                } // Handle backspace
                id={`otp-input-${index}`}
                autoFocus={index === 0} // Focus first input initially
              />
            ))} */}
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-gradient-to-l focus:outline-none"
            >
              Submit OTP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OTPForm;
