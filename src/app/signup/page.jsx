"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    roles: {
      donor: false,
      foodBank: false,
    },
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]:
        type === "checkbox"
          ? {
              ...prevState[name],
              [value]: checked,
            }
          : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-green-400 via-teal-500 to-blue-500">
      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDVMNSAwWk02IDRMNCA2Wk0tMSAxTDEgLTFaIiBzdHJva2U9IiM4ODgiIHN0cm9rZS13aWR0aD0iMSI+PC9wYXRoPgo8L3N2Zz4=')] opacity-10"></div>
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-green-300 to-blue-300 opacity-30"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md z-10"
      >
        <div className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-8 sm:p-12">
            <motion.h1
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="text-4xl sm:text-5xl font-bold text-center bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-8"
            >
              GreenMeal
            </motion.h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <InputField
                label="Username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
              />
              <InputField
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
              />
              <InputField
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <div className="flex items-center justify-start gap-4">
                  <CheckboxField
                    label="Donor"
                    name="roles"
                    value="donor"
                    checked={formData.roles.donor}
                    onChange={handleChange}
                  />
                  <CheckboxField
                    label="Food Bank"
                    name="roles"
                    value="foodBank"
                    checked={formData.roles.foodBank}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <InputField
                label="Phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />
              <InputField
                label="Address"
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your address"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-200 ease-in-out transform"
              >
                Sign Up
              </motion.button>
            </form>
          </div>
          <div className="bg-gradient-to-r from-green-100 to-blue-100 px-8 py-4">
            <p className="text-sm text-center text-gray-600">
              Already have an account?{" "}
              <a
                href={"/login"}
                className="font-medium text-green-600 hover:text-green-800 transition duration-200 ease-in-out"
              >
                Log in
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const InputField = ({ label, type, name, value, onChange, placeholder }) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required
      className="w-full px-4 py-2 bg-white bg-opacity-50 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 ease-in-out"
      placeholder={placeholder}
    />
  </div>
);

const CheckboxField = ({ label, name, value, checked, onChange }) => (
  <label className="flex items-center space-x-3">
    <input
      type="checkbox"
      name={name}
      value={value}
      checked={checked}
      onChange={onChange}
      className="form-checkbox h-5 w-5 text-green-600 transition duration-150 ease-in-out"
    />
    <span className="text-sm text-gray-700">{label}</span>
  </label>
);

export default SignUpPage;
