import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Eye, MapPin, Phone, Mail, Package, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

// Expanded static data with Indian context
const staticData = [
  {
    id: 1,
    userName: "Rajesh Kumar",
    address: "B-12, Vasant Kunj, Mumbai Suburban",
    phone: "+91 98765 43210",
    email: "rajesh.kumar@gmail.com",
    donations: [
      { id: 1, type: "Chawal", quantity: 10, date: "2024-03-15", unit: "kg" },
      { id: 2, type: "Dal", quantity: 5, date: "2024-03-15", unit: "kg" },
      { id: 3, type: "Atta", quantity: 8, date: "2024-03-15", unit: "kg" }
    ],
    status: "completed",
    donationDate: "2024-03-15",
    area: "Thane"
  },
  {
    id: 2,
    userName: "Priya Sharma",
    address: "A-15, Bandra West, Mumbai Suburban, Maharashtra - 400050",
    phone: "+91 97654 32109",
    email: "priya.sharma@yahoo.com",
    donations: [
      { id: 4, type: "Basmati Rice", quantity: 15, date: "2024-03-14", unit: "kg" },
      { id: 5, type: "Moong Dal", quantity: 7, date: "2024-03-14", unit: "kg" },
      { id: 6, type: "Cooking Oil", quantity: 5, date: "2024-03-14", unit: "L" }
    ],
    status: "completed",
    donationDate: "2024-03-14",
    area: "Mumbai Suburban"
  },
  {
    id: 3,
    userName: "Amit Patel",
    address: "C-45, Satellite, Mumbai Suburban",
    phone: "+91 96543 21098",
    email: "amit.patel@hotmail.com",
    donations: [
      { id: 7, type: "Suji", quantity: 6, date: "2024-03-13", unit: "kg" },
      { id: 8, type: "Chana Dal", quantity: 4, date: "2024-03-13", unit: "kg" }
    ],
    status: "pending",
    donationDate: "2024-03-13",
    area: "Mulund"
  },
  {
    id: 4,
    userName: "Srinivasan R",
    address: "24/7, Anna Nagar, Thane",
    phone: "+91 95432 10987",
    email: "srini.r@gmail.com",
    donations: [
      { id: 9, type: "Rice", quantity: 25, date: "2024-03-12", unit: "kg" },
      { id: 10, type: "Toor Dal", quantity: 10, date: "2024-03-12", unit: "kg" },
      { id: 11, type: "Sugar", quantity: 5, date: "2024-03-12", unit: "kg" }
    ],
    status: "completed",
    donationDate: "2024-03-12",
    area: "Thane"
  },
  {
    id: 5,
    userName: "Meera Banerjee",
    address: "P-12, Salt Lake, Mumbai Suburban",
    phone: "+91 94321 09876",
    email: "meera.b@outlook.com",
    donations: [
      { id: 12, type: "Atta", quantity: 12, date: "2024-03-11", unit: "kg" },
      { id: 13, type: "Mustard Oil", quantity: 4, date: "2024-03-11", unit: "L" }
    ],
    status: "pending",
    donationDate: "2024-03-11",
    area: "Mumbai Suburban"
  },
  {
    id: 6,
    userName: "Mohammed Siddiqui",
    address: "8-2-293/82/A, Banjara Hills, Kalva",
    phone: "+91 93210 98765",
    email: "md.siddiqui@gmail.com",
    donations: [
      { id: 14, type: "Sona Masoori Rice", quantity: 20, date: "2024-03-10", unit: "kg" },
      { id: 15, type: "Urad Dal", quantity: 8, date: "2024-03-10", unit: "kg" },
      { id: 16, type: "Poha", quantity: 5, date: "2024-03-10", unit: "kg" }
    ],
    status: "completed",
    donationDate: "2024-03-10",
    area: "Navi Mumbai"
  },
  {
    id: 7,
    userName: "Anjali Menon",
    address: "42/1969, Marine Drive, Thane",
    phone: "+91 92109 87654",
    email: "anjali.menon@yahoo.com",
    donations: [
      { id: 17, type: "Matta Rice", quantity: 15, date: "2024-03-09", unit: "kg" },
      { id: 18, type: "Coconut Oil", quantity: 3, date: "2024-03-09", unit: "L" }
    ],
    status: "completed",
    donationDate: "2024-03-09",
    area: "South Bombay"
  },
  {
    id: 8,
    userName: "Gurpreet Singh",
    address: "SCO-123, Sector 17, DN Nagar, Mumbai Suburban",
    phone: "+91 91098 76543",
    email: "gurpreet.s@gmail.com",
    donations: [
      { id: 19, type: "Atta", quantity: 30, date: "2024-03-08", unit: "kg" },
      { id: 20, type: "Sugar", quantity: 10, date: "2024-03-08", unit: "kg" },
      { id: 21, type: "Tea", quantity: 2, date: "2024-03-08", unit: "kg" }
    ],
    status: "pending",
    donationDate: "2024-03-08",
    area: "Mumbai Suburban"
  }
];


const AdminPanel = () => {
  const [users, setUsers] = useState(staticData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredUsers = users.filter(user => 
    user.userName?.toLowerCase().includes(searchTerm) ||
    user.address?.toLowerCase().includes(searchTerm) ||
    user.email?.toLowerCase().includes(searchTerm) ||
    user.area?.toLowerCase().includes(searchTerm)
  );

  const viewDetails = (user) => {
    setSelectedUser(user);
    setIsDetailsModalOpen(true);
  };

  const getTotalDonations = (donations) => {
    return donations.reduce((total, donation) => total + donation.quantity, 0);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Card className="bg-white shadow-md">
        <CardHeader className="bg-green-600 text-white">
          <CardTitle className="text-2xl">Donation Management Dashboard</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="relative flex-grow max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by name, location, or area..."
                value={searchTerm}
                onChange={handleSearch}
                className="pl-10 w-full"
              />
            </div>
            <div className="flex gap-2">
              <Badge className="bg-green-100 text-green-800">
                Completed: {users.filter(u => u.status === 'completed').length}
              </Badge>
              <Badge className="bg-yellow-100 text-yellow-800">
                Pending: {users.filter(u => u.status === 'pending').length}
              </Badge>
            </div>
          </div>

          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Donor Name</TableHead>
                  <TableHead>Area</TableHead>
                  <TableHead>Donation Date</TableHead>
                  <TableHead>Total Items</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence>
                  {filteredUsers.map((user) => (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="hover:bg-gray-50"
                    >
                      <TableCell className="font-medium">{user.userName}</TableCell>
                      <TableCell>{user.area}</TableCell>
                      <TableCell>{formatDate(user.donationDate)}</TableCell>
                      <TableCell>{getTotalDonations(user.donations)} items</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(user.status)}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => viewDetails(user)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                      </TableCell>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-green-700 mb-4">
              Donation Details
            </DialogTitle>
          </DialogHeader>
          
          {selectedUser && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Donor Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 text-gray-500 mr-2" />
                      <span>{selectedUser.address}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-5 h-5 text-gray-500 mr-2" />
                      <span>{selectedUser.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-5 h-5 text-gray-500 mr-2" />
                      <span>{selectedUser.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 text-gray-500 mr-2" />
                      <span>Donated on: {formatDate(selectedUser.donationDate)}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Donation Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedUser.donations.map((donation) => (
                        <div
                          key={donation.id}
                          className="flex items-center justify-between border-b pb-2"
                        >
                          <div className="flex items-center">
                            <Package className="w-5 h-5 text-gray-500 mr-2" />
                            <span>{donation.type} ({donation.quantity} {donation.unit})</span>
                          </div>
                          <div className="text-sm text-gray-500">
                            {formatDate(donation.date)}
                          </div>
                        </div>
                      ))}
                      <div className="pt-4 border-t">
                        <strong>Total Items: </strong>
                        {getTotalDonations(selectedUser.donations)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPanel;