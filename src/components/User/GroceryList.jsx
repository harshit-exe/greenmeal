'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ShoppingBasket, Leaf } from 'lucide-react'

const groceryItems = [
  { id: 1, name: 'Tomatoes', expiryDate: '2023-06-30', category: 'Vegetables' },
  { id: 2, name: 'Spinach', expiryDate: '2023-06-25', category: 'Vegetables' },
  { id: 3, name: 'Chicken', expiryDate: '2023-06-28', category: 'Meat' },
  { id: 4, name: 'Rice', expiryDate: '2023-12-31', category: 'Grains' },
  { id: 5, name: 'Eggs', expiryDate: '2023-07-15', category: 'Dairy' },
  { id: 6, name: 'Carrots', expiryDate: '2023-07-10', category: 'Vegetables' },
  { id: 7, name: 'Milk', expiryDate: '2023-06-27', category: 'Dairy' },
  { id: 8, name: 'Bread', expiryDate: '2023-06-24', category: 'Bakery' },
  { id: 9, name: 'Apples', expiryDate: '2023-07-05', category: 'Fruits' },
  { id: 10, name: 'Salmon', expiryDate: '2023-06-26', category: 'Seafood' },
]

export default function GroceryList({ onIngredientSelect }) {
  const [selectedItems, setSelectedItems] = useState([])

  const toggleItemSelection = (item) => {
    setSelectedItems(prev =>
      prev.some(i => i.id === item.id)
        ? prev.filter(i => i.id !== item.id)
        : [...prev, item]
    )
  }

  const handleSendToChat = () => {
    onIngredientSelect(selectedItems.map(item => item.name))
  }

  return (
    <Card className="h-full bg-green-50 border-green-200 shadow-lg">
      <CardHeader className="bg-green-200 rounded-t-lg">
        <CardTitle className="flex items-center text-green-800 text-2xl">
          <ShoppingBasket className="mr-2 h-6 w-6" />
          Eco-Friendly Grocery List
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <ScrollArea className="h-[calc(100vh-250px)] pr-4">
          <div className="grid gap-4">
            {groceryItems.map(item => (
              <Button
                key={item.id}
                variant={selectedItems.some(i => i.id === item.id) ? 'default' : 'outline'}
                className="w-full justify-start hover:bg-green-100 transition-colors"
                onClick={() => toggleItemSelection(item)}
              >
                <div className="flex justify-between w-full items-center">
                  <span className="font-medium">{item.name}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-green-600 bg-green-50">
                      {item.category}
                    </Badge>
                    <span className="text-sm text-green-600">Expires: {item.expiryDate}</span>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </ScrollArea>
        <Button
          className="mt-4 w-full bg-green-500 text-white hover:bg-green-600 transition-colors"
          onClick={handleSendToChat}
          disabled={selectedItems.length === 0}
        >
          <Leaf className="mr-2 h-4 w-4" />
          Get Eco-Friendly Recipes
        </Button>
      </CardContent>
    </Card>
  )
}