'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Edit, Trash2, Mail, Phone, MapPin, Globe, Users, Leaf } from 'lucide-react'
import { getNgoAccount, getUser } from '@/data/getAccount'

const dummyNGO = {
  name: "Green Earth Foundation",
  email: "contact@greenearthfoundation.org",
  phone: "+91 9876543210",
  address: "456 Eco Avenue, Sustainable City, 500001",
  website: "www.greenearthfoundation.org",
  focusArea: "Environmental Conservation",
  description: "Green Earth Foundation is dedicated to promoting sustainable practices and environmental conservation through community engagement and education.",
  logo: "/placeholder.svg?height=200&width=200",
}

export default function NGOProfile() {
  const [ngo, setNGO] = useState(dummyNGO)
  const [isEditing, setIsEditing] = useState(false)

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    // Implement save logic here
    setIsEditing(false)
  }

  const handleDelete = () => {
    // Implement delete logic here
    console.log("Delete NGO profile")
  }

  const fetch = async ()=>{
    const data = await getUser()
    console.log(data);
    
    setNGO((prev) => ({
      ...prev,
      address: data?.resume.address,
      email: data?.resume.email,
      name: data?.resume.userName,
      phone: data?.resume.phone,
    }));
  }

  useEffect(()=>{
    fetch()
  },[])

  const handleChange = (e) => {
    const { name, value } = e.target
    setNGO(prevNGO => ({ ...prevNGO, [name]: value }))
  }

  const handleFocusAreaChange = (value) => {
    setNGO(prevNGO => ({ ...prevNGO, focusArea: value }))
  }

  return (
    <div className="container mx-auto p-4 bg-gradient-to-b from-green-50 to-green-100 min-h-screen">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-green-800 mb-8 text-center"
      >
        NGO Profile
      </motion.h1>
      <Card className="bg-white border-green-200 shadow-lg rounded-lg overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-green-600 to-green-400 text-white p-6">
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                <AvatarImage src={ngo.logo} alt={ngo.name} />
                <AvatarFallback className="text-4xl font-bold bg-green-400 text-white">
                  {ngo.name[0]}
                </AvatarFallback>
              </Avatar>
            </motion.div>
            <div className="text-center md:text-left">
              <CardTitle className="text-3xl font-bold mb-2">
                {isEditing ? (
                  <Input
                    name="name"
                    value={ngo.name}
                    onChange={handleChange}
                    className="bg-green-500 text-white border-white"
                  />
                ) : (
                  ngo.name
                )}
              </CardTitle>
              <p className="text-green-100">{ngo.email}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center text-green-700">
                <Mail className="mr-2" size={18} /> Email
              </Label>
              <Input
                id="email"
                name="email"
                value={ngo.email}
                onChange={handleChange}
                disabled={!isEditing}
                className="bg-green-50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center text-green-700">
                <Phone className="mr-2" size={18} /> Phone
              </Label>
              <Input
                id="phone"
                name="phone"
                value={ngo.phone}
                onChange={handleChange}
                disabled={!isEditing}
                className="bg-green-50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address" className="flex items-center text-green-700">
                <MapPin className="mr-2" size={18} /> Address
              </Label>
              <Input
                id="address"
                name="address"
                value={ngo.address}
                onChange={handleChange}
                disabled={!isEditing}
                className="bg-green-50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website" className="flex items-center text-green-700">
                <Globe className="mr-2" size={18} /> Website
              </Label>
              <Input
                id="website"
                name="website"
                value={ngo.website}
                onChange={handleChange}
                disabled={!isEditing}
                className="bg-green-50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="focusArea" className="flex items-center text-green-700">
                <Leaf className="mr-2" size={18} /> Focus Area
              </Label>
              <Select
                onValueChange={handleFocusAreaChange}
                defaultValue={ngo.focusArea}
                disabled={!isEditing}
              >
                <SelectTrigger className="bg-green-50">
                  <SelectValue placeholder="Select Focus Area" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Environmental Conservation">Environmental Conservation</SelectItem>
                  <SelectItem value="Sustainable Development">Sustainable Development</SelectItem>
                  <SelectItem value="Renewable Energy">Renewable Energy</SelectItem>
                  <SelectItem value="Wildlife Protection">Wildlife Protection</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description" className="flex items-center text-green-700">
                <Users className="mr-2" size={18} /> Description
              </Label>
              <Textarea
                id="description"
                name="description"
                value={ngo.description}
                onChange={handleChange}
                disabled={!isEditing}
                className="bg-green-50 min-h-[100px]"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-green-50 p-6 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          {isEditing ? (
            <Button onClick={handleSave} className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white">
              Save Changes
            </Button>
          ) : (
            <Button onClick={handleEdit} className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white">
              <Edit className="mr-2 h-4 w-4" /> Edit Profile
            </Button>
          )}
          <Button onClick={handleDelete} variant="destructive" className="w-full sm:w-auto">
            <Trash2 className="mr-2 h-4 w-4" /> Delete Profile
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}