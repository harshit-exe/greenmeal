'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { BaseApiUrl } from '@/utils/constanst'

const donationItems = [
  { id: 1, name: 'Rice', color: 'bg-yellow-200' },
  { id: 2, name: 'Wheat', color: 'bg-amber-200' },
  { id: 3, name: 'Sugar', color: 'bg-white' },
  { id: 4, name: 'Dal', color: 'bg-yellow-600' },
  { id: 5, name: 'Oil', color: 'bg-yellow-400' },
  { id: 6, name: 'Salt', color: 'bg-gray-200' },
]

export default function DonationSelector({ onDonationComplete,userData }) {
  const [selectedItems, setSelectedItems] = useState([])
  const [donationItems, setdonationItems] = useState([])

  const toggleItem = (item) => {
    setSelectedItems(prev => 
      prev.some(i => i.id === item.id)
        ? prev.filter(i => i.id !== item.id)
        : [...prev, item]
    )
  }

  const handleDonateNow = () => {
    console.log('Selected donation items:', selectedItems)
    onDonationComplete(selectedItems)
  }

  const fetchProduct = async ()=>{
    const response = await fetch(`${BaseApiUrl}/inventory/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "userid":userData?.user?.id
      },
    
    })
    const json = await response.json()

    console.log(json,"userdata or lasdkfjadf",userData?.user);
    setdonationItems(json.resume)
   


  }

  useEffect(() => {
   
    fetchProduct()

  }, [])
  

  return (
    <div className="space-y-6">
      <motion.div 
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ staggerChildren: 0.1 }}
      >
        {donationItems.map((item) => (
          <motion.div
            key={item._id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Card 
              className={`overflow-hidden cursor-pointer transition-all duration-300 ${
                selectedItems.some(i => i._id === item._id) ? 'ring-2 ring-green-500' : ''
              }`}
              onClick={() => toggleItem(item)}
            >
              <CardContent className="p-4 flex flex-col items-center justify-center h-full">
                <div className={`w-16 h-16 rounded-full Rice flex items-center justify-center text-2xl font-bold mb-2`}>
                  {item.itemName[0]}
                </div>
                <Label className="font-semibold text-sm text-center">{item.itemName}</Label>
                <AnimatePresence>
                  {selectedItems.some(i => i._id === item._id) && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute top-2 right-2 bg-green-500 rounded-full p-1"
                    >
                      <Check className="w-4 h-4 text-white" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
      <AnimatePresence>
        {selectedItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-green-50 p-4 rounded-lg"
          >
            <h4 className="font-semibold mb-2 text-green-800">Selected Items:</h4>
            <ul className="space-y-2">
              {selectedItems.map((item) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex justify-between items-center"
                >
                  <span>{item.itemName}</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => toggleItem(item)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </Button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
      <Button 
        onClick={handleDonateNow} 
        className="w-full bg-green-600 hover:bg-green-700 text-white"
        disabled={selectedItems.length === 0}
      >
        Donate Now ({selectedItems.length} items)
      </Button>
    </div>
  )
}