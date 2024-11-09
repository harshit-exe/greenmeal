'use client'

import { useState } from 'react'
import GroceryList from './GroceryList'
import RecipeChatbot from './RecipeChatbot'

export default function Recipes() {
  const [selectedIngredients, setSelectedIngredients] = useState([])

  const handleIngredientSelect = (ingredients) => {
    setSelectedIngredients(ingredients)
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-green-50 p-4 gap-4">
      <div className="w-full lg:w-1/2 lg:max-w-md">
        <GroceryList onIngredientSelect={handleIngredientSelect} />
      </div>
      <div className="w-full lg:flex-1">
        <RecipeChatbot selectedIngredients={selectedIngredients} />
      </div>
    </div>
  )
}