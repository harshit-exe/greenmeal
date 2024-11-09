"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, Building } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { BaseApiUrl } from "@/utils/constanst";

const SignUpPage = () => {


  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: '',
    userName: '',
    phone: '',
    address: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleRoleInputChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      role: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(formData);


      console.log(formData);
      // const { username, email, password, role, firstname, lastname } = req.body
      let { email, password, userName, role, phone, address } = formData
      const response = await fetch(`${BaseApiUrl}/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, password: password, role: role, username: userName,phone:phone,address:address })
      });
      const json = await response.json();

      if (json) {

        localStorage.setItem('email', email)
        toast.success("Otp send successfully");
        router.push("/otp")
      } else {
        toast.error("Error to Create");
      }
    
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-green-400 via-teal-500 to-blue-500">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl"
      >
        <Card className="bg-white/90 backdrop-blur-lg shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Join GreenMeal
            </CardTitle>
            <CardDescription>
              Start your journey towards reducing food waste and helping communities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input id="username" onChange={handleInputChange} name="userName" placeholder="Choose a username" className="pl-10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select name="role" onValueChange={handleRoleInputChange}> {/* use onValueChange instead of onChange if required by your library */}
                    <SelectTrigger>
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">Food Donor</SelectItem>
                      <SelectItem value="ngo">Food Bank</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input id="email" onChange={handleInputChange} name="email" type="email" placeholder="name@example.com" className="pl-10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input onChange={handleInputChange} name="phone" id="phone" type="tel" placeholder="Enter your phone number" className="pl-10" />
                  </div>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 text-gray-400" size={18} />
                    <Textarea onChange={handleInputChange} name="address" id="address" placeholder="Enter your address" className="pl-10" rows={3} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input id="password" onChange={handleInputChange} name="password" type="password" placeholder="Create a password" className="pl-10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input id="confirmPassword" type="password" placeholder="Confirm your password" className="pl-10" />
                  </div>
                </div>
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white">
                Sign Up
              </Button>
            </form>
          </CardContent>
          <CardFooter className="justify-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <a
                href="/login"
                className="font-medium text-green-600 hover:text-green-800 transition duration-200 ease-in-out"
              >
                Log in
              </a>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default SignUpPage;