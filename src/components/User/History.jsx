'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Leaf, Search, Calendar, Package, CheckCircle2, Truck, Box } from 'lucide-react'

const dummyDonations = [
  { 
    id: 1, 
    ngo: "Green Earth Foundation", 
    items: ["Rice", "Dal"], 
    date: "2023-06-15", 
    status: "complete",
    updates: [
      { status: "Donation Initiated", date: "2023-06-15", icon: Box, completed: true },
      { status: "Picked up", date: "2023-06-16", icon: Truck, completed: true },
      { status: "In Transit", date: "2023-06-16", icon: Truck, completed: true },
      { status: "Delivered", date: "2023-06-17", icon: CheckCircle2, completed: true },
    ]
  },
  { 
    id: 2, 
    ngo: "Clean Water Initiative", 
    items: ["Water Purifier"], 
    date: "2023-06-20", 
    status: "pending",
    updates: [
      { status: "Donation Initiated", date: "2023-06-20", icon: Box, completed: true },
      { status: "Awaiting pickup", date: "2023-06-21", icon: Truck, completed: false },
      { status: "In Transit", date: "", icon: Truck, completed: false },
      { status: "Delivered", date: "", icon: CheckCircle2, completed: false },
    ]
  },
  // ... (other donations)
]

export default function DonationHistory() {
  const [donations, setDonations] = useState(dummyDonations)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedDonation, setSelectedDonation] = useState(null)

  useEffect(() => {
    // Simulating API call to fetch donation history
    setTimeout(() => {
      setDonations(dummyDonations)
    }, 1000)
  }, [])

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase())
  }

  const handleStatusFilter = (value) => {
    setStatusFilter(value)
  }

  const filteredDonations = donations.filter(donation => 
    (donation.ngo.toLowerCase().includes(searchTerm) || 
     donation.items.some(item => item.toLowerCase().includes(searchTerm))) &&
    (statusFilter === 'all' || donation.status === statusFilter)
  )

  const handleViewMore = (donation) => {
    setSelectedDonation(donation)
  }

  const handleGetCertificate = (donationId) => {
    // Implement certificate generation logic here
    console.log(`Generating certificate for donation ${donationId}`)
  }

  return (
    <div className="container mx-auto p-4 bg-gradient-to-b from-green-50 to-green-100 min-h-screen">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-green-800 mb-8 text-center"
      >
        Donation History
      </motion.h1>
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search donations..."
            value={searchTerm}
            onChange={handleSearch}
            className="pl-10 bg-white border-green-300 focus:border-green-500 focus:ring-green-500 rounded-full"
          />
        </div>
        <Select onValueChange={handleStatusFilter} defaultValue="all">
          <SelectTrigger className="w-full sm:w-[180px] bg-white border-green-300 focus:border-green-500 focus:ring-green-500 rounded-full">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="complete">Complete</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {filteredDonations.map((donation) => (
            <motion.div
              key={donation.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-white border-green-200 hover:shadow-lg transition-shadow rounded-lg overflow-hidden">
                <CardHeader className="bg-green-600 text-white p-4">
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Leaf className="mr-2" size={18} />
                      <span className="text-lg font-semibold">{donation.ngo}</span>
                    </div>
                    <Badge 
                      variant={donation.status === 'complete' ? 'default' : 'secondary'}
                      className={`${donation.status === 'complete' ? 'bg-green-500' : 'bg-yellow-500'} text-white`}
                    >
                      {donation.status}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <p className="flex items-center text-gray-600 mb-2">
                    <Calendar className="mr-2 text-green-500 flex-shrink-0" size={18} />
                    <span className="text-sm">{donation.date}</span>
                  </p>
                  <p className="flex items-start text-gray-600">
                    <Package className="mr-2 text-green-500 flex-shrink-0 mt-1" size={18} />
                    <span className="text-sm">{donation.items.join(', ')}</span>
                  </p>
                </CardContent>
                <CardFooter className="bg-green-50 p-4 flex justify-between">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="text-green-600 border-green-600 hover:bg-green-100" onClick={() => handleViewMore(donation)}>
                        View More
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle className="text-green-700">Donation Updates</DialogTitle>
                      </DialogHeader>
                      <div className="mt-4 relative">
                        {donation.updates.map((update, index) => (
                          <div key={index} className="flex items-start mb-8 relative">
                            <div className={`absolute left-3 top-0 bottom-0 w-0.5 bg-green-200 ${index === donation.updates.length - 1 ? 'h-1/2' : ''}`}></div>
                            <div className={`flex items-center justify-center w-7 h-7 rounded-full ${update.completed ? 'bg-green-500' : 'bg-gray-300'} mr-4 z-10`}>
                              {update.icon && <update.icon className="w-4 h-4 text-white" />}
                            </div>
                            <div>
                              <p className={`font-semibold ${update.completed ? 'text-green-700' : 'text-gray-500'}`}>{update.status}</p>
                              <p className="text-sm text-gray-500">{update.date || 'Pending'}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button 
                    variant="secondary"
                    className="bg-green-600 text-white hover:bg-green-700"
                    onClick={() => handleGetCertificate(donation.id)}
                  >
                    Get Certificate
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      {filteredDonations.length === 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-500 mt-8"
        >
          No donations found matching your search criteria.
        </motion.p>
      )}
    </div>
  )
}