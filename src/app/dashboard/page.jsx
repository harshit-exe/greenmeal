'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Search, Bell, Sun, Moon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useTheme } from 'next-themes'
import Sidebar from '@/components/User/Sidebar'
import Overview from '@/components/User/Overview'
import Inventory from '@/components/User/Inventory'
import Recipes from '@/components/User/Recipes'
import Account from '@/components/User/Account'
import NGO from '@/components/User/NGO'
import History from '@/components/User/History'
import { checkToken } from '@/utils/checkAuth'
import UpcomingEvent from '@/components/User/UpcomingEvent'

// Import your components here

const searchData = [
  { title: 'Overview', component: 'Overview' },
  { title: 'Inventory', component: 'Inventory' },
  { title: 'Recipes', component: 'Recipes' },
  { title: 'NGO Partnerships', component: 'NGO' },
  { title: 'Donation History', component: 'History' },
  { title: 'Account Settings', component: 'Account' },
]

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [selectedComponent, setSelectedComponent] = useState('Overview')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [notifications, setNotifications] = useState(3)
  const { theme, setTheme } = useTheme()
  const [userData, setUserData] = useState({})

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  useEffect(() => {
    const verifyToken = async () => {
      const tokenValid = await checkToken()
    
      setUserData(tokenValid.data);
      console.log(tokenValid.data);
      
  
    }
    verifyToken()

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true)
      } else {
        setIsSidebarOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (searchQuery) {
      const results = searchData.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setSearchResults(results)
    } else {
      setSearchResults([])
    }
  }, [searchQuery])

  const handleSearchSelect = (component) => {
    setSelectedComponent(component)
    setSearchQuery('')
  }

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'Overview':
        return <Overview />
      case 'Inventory':
        return <Inventory userData={userData} />
      case 'Recipes':
        return <Recipes />
      case 'NGO':
        return <NGO userData={userData}/>
      case 'History':
        return <History />
      case 'UpcomingEvent':
        return <UpcomingEvent />
      case 'Account':
        return <Account />
      default:
        return <Overview />
    }
  }



  return (
    <div className="flex h-screen bg-green-50 text-green-900">
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 left-0 z-50 w-64 bg-green-100 shadow-lg md:relative"
          >
            <Sidebar onSelectComponent={setSelectedComponent} closeSidebar={() => setIsSidebarOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between p-4 bg-green-100 shadow-sm">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="text-green-800 hover:text-green-600 mr-4">
              {isSidebarOpen ? <X /> : <Menu />}
            </Button>
            <h1 className="text-2xl font-bold text-green-800">{selectedComponent}</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <Input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 bg-green-50 border-green-300 focus:border-green-500 focus:ring-green-500"
              />
              <Button variant="ghost" size="icon" className="absolute right-0 top-0 text-green-600">
                <Search className="h-5 w-5" />
              </Button>
              {searchResults.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute z-10 w-full mt-1 bg-green-50 border border-green-200 rounded-md shadow-lg"
                >
                  {searchResults.map((result, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-start text-green-800 hover:bg-green-100"
                      onClick={() => handleSearchSelect(result.component)}
                    >
                      {result.title}
                    </Button>
                  ))}
                </motion.div>
              )}
            </div>
            <Button variant="ghost" size="icon" className="relative text-green-800">
              <Bell className="h-5 w-5" />
              {notifications > 0 && (
                <Badge variant="destructive" className="absolute -top-1 -right-1 bg-red-500">
                  {notifications}
                </Badge>
              )}
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="text-green-800">
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-green-50 p-6">
          <motion.div
            key={selectedComponent}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderComponent()}
          </motion.div>
        </main>
      </div>
    </div>
  )
}