'use client'

import React, { useState } from 'react'
import { ChevronDown, ChevronUp, Leaf, MessageCircle, Search } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

// Sample Indian donor data
const donors = [
  { id: 1, name: 'Aarav Patel', phone: '+91 98765 43210', email: 'aarav@example.com', totalDonation: 75000, address: '123 MG Road, Mumbai, Maharashtra 400001' },
  { id: 2, name: 'Diya Sharma', phone: '+91 87654 32109', email: 'diya@example.com', totalDonation: 50000, address: '456 Anna Salai, Chennai, Tamil Nadu 600002' },
  { id: 3, name: 'Arjun Singh', phone: '+91 76543 21098', email: 'arjun@example.com', totalDonation: 100000, address: '789 Park Street, Kolkata, West Bengal 700016' },
  { id: 4, name: 'Ananya Reddy', phone: '+91 65432 10987', email: 'ananya@example.com', totalDonation: 25000, address: '101 Jubilee Hills, Hyderabad, Telangana 500033' },
  { id: 5, name: 'Vikram Mehta', phone: '+91 54321 09876', email: 'vikram@example.com', totalDonation: 150000, address: '202 Connaught Place, New Delhi, Delhi 110001' },
]

export default function DonorTable() {
  const [searchTerm, setSearchTerm] = useState('')
  const [expandedRow, setExpandedRow] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const filteredDonors = donors.filter(donor =>
    donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    donor.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const pageCount = Math.ceil(filteredDonors.length / itemsPerPage)
  const paginatedDonors = filteredDonors.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const toggleExpand = (id) => {
    setExpandedRow(expandedRow === id ? null : id)
  }

  return (
    <Card className="w-full p-10">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-green-800 flex items-center">
          <Leaf className="mr-2" /> Eco-Friendly Donor Management
        </CardTitle>
        <CardDescription>Manage and view donor information</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" />
          <Input
            type="text"
            placeholder="Search donors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-green-300 focus:border-green-500 focus:ring-green-500"
          />
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Name</TableHead>
                <TableHead className="hidden md:table-cell">Phone</TableHead>
                <TableHead className="hidden sm:table-cell">Email</TableHead>
                <TableHead>Total Donation (₹)</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedDonors.map((donor) => (
                <React.Fragment key={donor.id}>
                  <TableRow className="hover:bg-green-50 transition-colors">
                    <TableCell className="font-medium">{donor.name}</TableCell>
                    <TableCell className="hidden md:table-cell">{donor.phone}</TableCell>
                    <TableCell className="hidden sm:table-cell">{donor.email}</TableCell>
                    <TableCell>{donor.totalDonation.toLocaleString('en-IN')}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleExpand(donor.id)}
                        className="mr-2"
                      >
                        {expandedRow === donor.id ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                        <span className="hidden sm:inline ml-2">View More</span>
                      </Button>
                      <Button variant="outline" size="sm">
                        <MessageCircle className="h-4 w-4 sm:mr-2" />
                        <span className="hidden sm:inline">Chat Now</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                  <AnimatePresence>
                    {expandedRow === donor.id && (
                      <motion.tr
                        key={`expanded-${donor.id}`}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <td colSpan={5} className="bg-green-100 p-4">
                          <div className="text-green-800">
                            <strong>Address:</strong> {donor.address}
                          </div>
                          <div className="mt-2">
                            <strong>Donation History:</strong>
                            <ul className="list-disc list-inside">
                              <li key={`donation-1-${donor.id}`}>March 2023: ₹{(donor.totalDonation * 0.4).toLocaleString('en-IN')}</li>
                              <li key={`donation-2-${donor.id}`}>June 2023: ₹{(donor.totalDonation * 0.3).toLocaleString('en-IN')}</li>
                              <li key={`donation-3-${donor.id}`}>September 2023: ₹{(donor.totalDonation * 0.3).toLocaleString('en-IN')}</li>
                            </ul>
                          </div>
                        </td>
                      </motion.tr>
                    )}
                  </AnimatePresence>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="mt-4 flex flex-col sm:flex-row justify-between items-center">
          <div className="text-sm text-green-600 mb-2 sm:mb-0">
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredDonors.length)} of {filteredDonors.length} donors
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, pageCount))}
              disabled={currentPage === pageCount}
            >
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}