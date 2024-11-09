'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { MapPin, Phone, Search, Leaf, Navigation } from 'lucide-react'
import { Toaster, toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'
import DonationSelector from './DonationSelector'

const dummyNGOs = [
  { id: 1, name: "Green Earth Foundation", address: "123 Eco Street, Mumbai, Maharashtra", phone: "+91 9876543210", lat: 19.0760, lon: 72.8777 },
  { id: 2, name: "Clean Water Initiative", address: "456 River Road, Delhi, Delhi", phone: "+91 9876543211", lat: 28.6139, lon: 77.2090 },
  { id: 3, name: "Sustainable Future", address: "789 Green Avenue, Bangalore, Karnataka", phone: "+91 9876543212", lat: 12.9716, lon: 77.5946 },
  { id: 4, name: "Wildlife Protection Society", address: "101 Forest Lane, Chennai, Tamil Nadu", phone: "+91 9876543213", lat: 13.0827, lon: 80.2707 },
  { id: 5, name: "Renewable Energy Alliance", address: "202 Solar Street, Hyderabad, Telangana", phone: "+91 9876543214", lat: 17.3850, lon: 78.4867 },
]

export default function NGO() {
  const [ngos, setNgos] = useState(dummyNGOs)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedNGO, setSelectedNGO] = useState(null)
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false)
  const [userLocation, setUserLocation] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setNgos(dummyNGOs)
  }, [])

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase()
    setSearchTerm(term)
    const filteredNGOs = dummyNGOs.filter(ngo => 
      ngo.name.toLowerCase().includes(term) || 
      ngo.address.toLowerCase().includes(term)
    )
    setNgos(filteredNGOs)
  }

  const findNearestNGO = () => {
    setIsLoading(true)
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setUserLocation({ lat: latitude, lon: longitude })
          
          const sortedNGOs = [...ngos].sort((a, b) => {
            const distA = calculateDistance(latitude, longitude, a.lat, a.lon)
            const distB = calculateDistance(latitude, longitude, b.lat, b.lon)
            return distA - distB
          })

          setNgos(sortedNGOs)
          const nearestCity = sortedNGOs[0].address.split(',')[1].trim()
          console.log('Nearest city:', nearestCity)
          toast({
            title: "Location Found",
            description: `Showing NGOs nearest to ${nearestCity}`,
          })
          setIsLoading(false)
        },
        (error) => {
          console.error("Error getting location:", error)
          toast({
            title: "Location Error",
            description: "Unable to access your location. Please check your browser settings.",
            variant: "destructive",
          })
          setIsLoading(false)
        }
      )
    } else {
      toast({
        title: "Geolocation Unavailable",
        description: "Your browser doesn't support geolocation.",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371 // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLon = (lon2 - lon1) * Math.PI / 180
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    return R * c // Distance in kilometers
  }

  const openDonateModal = (ngo) => {
    setSelectedNGO(ngo)
    setIsDonateModalOpen(true)
  }

  const handleDonationComplete = (donationData) => {
    console.log('Donation data:', donationData)
    setIsDonateModalOpen(false)
    toast({
      title: "Donation Successful",
      description: `Thank you for donating ${donationData.length} items to ${selectedNGO.name}!`,
    })
  }

  return (
    <div className="container mx-auto p-4 bg-gradient-to-b from-green-50 to-green-100 min-h-screen">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-green-800 mb-8 text-center"
      >
        NGO Finder
      </motion.h1>
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search NGOs by name or location..."
            value={searchTerm}
            onChange={handleSearch}
            className="pl-10 bg-white border-green-300 focus:border-green-500 focus:ring-green-500 rounded-full"
          />
        </div>
        <Button 
          onClick={findNearestNGO} 
          className="bg-green-600 hover:bg-green-700 text-white rounded-full flex items-center justify-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Navigation className="mr-2" size={18} />
            </motion.div>
          ) : (
            <Navigation className="mr-2" size={18} />
          )}
          Find Nearest NGO
        </Button>
      </div>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {ngos.map((ngo) => (
            <motion.div
              key={ngo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-white border-green-200 hover:shadow-lg transition-shadow rounded-lg overflow-hidden">
                <CardHeader className="bg-green-600 text-white p-4">
                  <CardTitle className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-white text-green-600 flex items-center justify-center mr-3 text-xl font-bold">
                      {ngo.name[0]}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{ngo.name}</h3>
                      <p className="text-sm text-green-100">{ngo.address.split(',')[1].trim()}</p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <p className="flex items-center text-gray-600 mb-2">
                    <MapPin className="mr-2 text-green-500 flex-shrink-0" size={18} />
                    <span className="text-sm">{ngo.address}</span>
                  </p>
                  <p className="flex items-center text-gray-600">
                    <Phone className="mr-2 text-green-500 flex-shrink-0" size={18} />
                    <span className="text-sm">{ngo.phone}</span>
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between bg-green-50 p-4">
                  <Button variant="outline" className="border-green-500 text-green-600 hover:bg-green-100">
                    Get Directions
                  </Button>
                  <Button onClick={() => openDonateModal(ngo)} className="bg-green-600 hover:bg-green-700 text-white">
                    Donate Now
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      <Dialog open={isDonateModalOpen} onOpenChange={setIsDonateModalOpen}>
        <DialogContent className="bg-white max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center text-2xl text-green-700">
              <Leaf className="mr-2" />
              Donate to {selectedNGO?.name}
            </DialogTitle>
          </DialogHeader>
          <DonationSelector onDonationComplete={handleDonationComplete} />
        </DialogContent>
      </Dialog>
    </div>
  )
}