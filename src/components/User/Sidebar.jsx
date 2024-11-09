'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { LayoutDashboard, Utensils, BookOpen, Users, UserCircle, Settings, LogOut, X ,History} from 'lucide-react'
import { useRouter } from 'next/navigation'

const menuItems = [
  { name: 'Overview', icon: LayoutDashboard, component: 'Overview' },
  { name: 'Inventory', icon: Utensils, component: 'Inventory' },
  { name: 'Recipes', icon: BookOpen, component: 'Recipes' },
  { name: 'NGO', icon: Users, component: 'NGO' },
  { name: 'History', icon: History, component: 'History' },
  { name: 'Account', icon: UserCircle, component: 'Account' },
]

const sidebarVariants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-100%" },
}

const menuItemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 }
    }
  }
}

export default function Sidebar({ onSelectComponent, closeSidebar }) {
  const [status, setStatus] = useState(true)
  const router = useRouter();

  const handleLogout = () => {
    router.push("/")
  }

  return (
    <motion.div 
      className="flex flex-col h-full bg-green-50 text-green-900"
      variants={sidebarVariants}
      initial="closed"
      animate="open"
      exit="closed"
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage src="/logo.png" alt="GreenMeal" />
              <AvatarFallback>GM</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-semibold text-green-800">GreenMeal</h2>
              <p className="text-sm text-green-600">Eco-friendly food tracking</p>
            </div>
          </motion.div>
          <Button variant="ghost" size="icon" onClick={closeSidebar} className="md:hidden text-green-800">
            <X className="h-5 w-5" />
          </Button>
        </div>
        <nav>
          {menuItems.map((item) => (
            <motion.div
              key={item.name}
              variants={menuItemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="ghost"
                className="w-full justify-start mb-2 text-green-800 hover:text-green-600 hover:bg-green-100"
                onClick={() => {
                  onSelectComponent(item.component)
                }}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.name}
              </Button>
            </motion.div>
          ))}
        </nav>
      </div>
      <motion.div 
        className="mt-auto p-4 flex flex-col space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <motion.div 
          className="flex items-center justify-between bg-green-100 rounded-lg p-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <UserCircle className="h-4 w-4 text-green-600" />
          <span className="text-sm">Status:</span>
          <Switch
            checked={status}
            onCheckedChange={setStatus}
            className="data-[state=checked]:bg-green-600"
          />
          <span className="text-sm font-medium">{status ? 'Online' : 'Offline'}</span>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button variant="outline" className="w-full justify-start text-green-800 border-green-300 hover:bg-green-100">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button variant="ghost" onClick={handleLogout} className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-100">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}