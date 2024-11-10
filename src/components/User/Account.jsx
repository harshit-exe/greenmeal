'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Edit, Trash2, Award, Mail, Phone, MapPin, Globe } from 'lucide-react'
import { getNgoAccount, getUser } from '@/data/getAccount'
import { baseApiUrl } from 'mapbox-gl'
import { BaseApiUrl } from '@/utils/constanst'

const dummyUser = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  phone: "+91 9876543210",
  address: "123 Green Street, Eco City, 400001",
  language: "English",
  profilePic: "/placeholder.svg?height=200&width=200",
  certificates: [
    { id: 1, name: "Eco Warrior", date: "2023-05-15" },
    { id: 2, name: "Green Innovator", date: "2023-06-20" },
    { id: 3, name: "Sustainability Champion", date: "2023-07-10" },
  ]
}

export default function UserProfile({ userData }) {
  const [user, setUser] = useState(dummyUser)
  const [myuser, setmyUser] = useState({})
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
    console.log("Delete profile")
  }

  const fetchUser = async () => {
    const response = await fetch(`${BaseApiUrl}/user/user`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
        ,'id':userData.user.id
      },
    })
    const json = await response.json()
    console.log(json);
    setmyUser(json)
    

  }


  useEffect(() => {
    fetchUser()
  }, [])


  const handleChange = (e) => {
    const { name, value } = e.target
    setUser(prevUser => ({ ...prevUser, [name]: value }))
  }

  const handleLanguageChange = (value) => {
    setUser(prevUser => ({ ...prevUser, language: value }))
  }

  return (
    <div className="container mx-auto p-4 bg-gradient-to-b from-green-50 to-green-100 min-h-screen">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-green-800 mb-8 text-center"
      >
        User Profile
      </motion.h1>
      <Card className="bg-white border-green-200 shadow-lg rounded-lg overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-green-600 to-green-400 text-white p-6">
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                <AvatarImage src={user.profilePic} alt={`${user.firstName} ${user.lastName}`} />
                <AvatarFallback className="text-4xl font-bold bg-green-400 text-white">
                  {myuser?.resume?.userName[0]}
                </AvatarFallback>
              </Avatar>
            </motion.div>
            <div className="text-center md:text-left">
              <CardTitle className="text-3xl font-bold mb-2">
                {isEditing ? (
                  <Input
                    name="firstName"
                    value={myuser?.resume?.userName}
                    onChange={handleChange}
                    className="bg-green-500 text-white border-white"
                  />
                ) : (
                  `${myuser?.resume?.userName}`
                )}
              </CardTitle>
              <p className="text-green-100">{myuser?.resume?.email}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs defaultValue="info" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="info">Personal Info</TabsTrigger>
              <TabsTrigger value="certificates">Certificates</TabsTrigger>
            </TabsList>
            <TabsContent value="info">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center text-green-700">
                    <Mail className="mr-2" size={18} /> Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    value={myuser?.resume?.email}
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
                    value={myuser?.resume?.phone}
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
                    value={myuser?.resume?.address}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="bg-green-50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language" className="flex items-center text-green-700">
                    <Globe className="mr-2" size={18} /> Language
                  </Label>
                  <Select
                    onValueChange={handleLanguageChange}
                    defaultValue={user.language}
                    disabled={!isEditing}
                  >
                    <SelectTrigger className="bg-green-50">
                      <SelectValue placeholder="Select Language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Hindi">Hindi</SelectItem>
                      <SelectItem value="Marathi">Marathi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="certificates">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-green-700 flex items-center">
                  <Award className="mr-2" /> Your Certificates
                </h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Certificate Name</TableHead>
                      <TableHead>Date Received</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {user.certificates.map((cert) => (
                      <TableRow key={cert.id}>
                        <TableCell>{cert.name}</TableCell>
                        <TableCell>{cert.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
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