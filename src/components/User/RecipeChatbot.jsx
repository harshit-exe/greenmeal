'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Bot, User, AlertCircle, ChevronDown, ChevronUp, Leaf, Volume2, StopCircle } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { GoogleGenerativeAI } from "@google/generative-ai"
import { toast, Toaster } from 'sonner'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || 'AIzaSyBCuvpypc1y7oCKQZPfctEGtHx5r8edCfo'
const genAI = new GoogleGenerativeAI(API_KEY)

export default function RecipeChatbot({ selectedIngredients = [] }) {
  const [messages, setMessages] = useState([
    { id: 'initial', role: 'assistant', content: "Hello! I'm your eco-friendly recipe assistant. Select ingredients or ask for a recipe!" }
  ])    
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [chatSession, setChatSession] = useState(null)
  const [expandedMessages, setExpandedMessages] = useState({})
  const messagesEndRef = useRef(null)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const speechSynthesisRef = useRef(null)

  useEffect(() => {
    const initChat = async () => {
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" })
        const chat = model.startChat({
          generationConfig: {
            temperature: 0.7,
            topP: 0.8,
            topK: 40,
            maxOutputTokens: 2048,
          },
          history: [],
        })
        setChatSession(chat)
      } catch (error) {
        console.error('Error initializing chat:', error)
        setError('Failed to initialize chat. Please check your API key.')
      }
    }

    initChat()
  }, [])

  useEffect(() => {
    if (selectedIngredients.length > 0) {
      handleSubmit(null, `Suggest a quick, eco-friendly recipe using: ${selectedIngredients.join(', ')}. Please provide step-by-step instructions.`)
    }
  }, [selectedIngredients])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSubmit = async (e, overrideInput = null) => {
    e?.preventDefault()
    const messageContent = overrideInput || input
    if (!messageContent.trim() || !chatSession) return

    const userMessage = { id: Date.now().toString(), role: 'user', content: messageContent }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)
    setError(null)

    try {
      const result = await chatSession.sendMessage(messageContent)
      const responseText = result.response.text()
      
      const stepsMatch = responseText.match(/Steps:([\s\S]*?)(?:\n\n|$)/)
      const recipeSteps = stepsMatch ? stepsMatch[1].split('\n').map(step => step.trim()).filter(Boolean) : []

      const newMessage = { 
        id: (Date.now() + 1).toString(), 
        role: 'assistant', 
        content: responseText,
        recipeSteps
      }

      setMessages(prev => [...prev, newMessage])

      if (recipeSteps.length > 0) {
        const imagePrompt = `${messageContent.split('using:')[1]?.trim() || 'prepared dish'}`
        const imageUrl = await generateImage(imagePrompt)
        if (imageUrl) {
          setMessages(prev => prev.map(msg => 
            msg.id === newMessage.id ? { ...msg, recipeImage: imageUrl } : msg
          ))
        }
      }
    } catch (error) {
      console.error('Error:', error)
      setError(error.message || 'An error occurred while processing your request.')
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'assistant', content: "I'm sorry, I encountered an error. Please try again later." }])
    } finally {
      setIsLoading(false)
    }
  }

  const generateImage = async (prompt) => {
    try {
      const response = await fetch(`https://source.unsplash.com/featured/?${encodeURIComponent(prompt)},food`)
      return response.url
    } catch (error) {
      console.error('Error generating image:', error)
      return null
    }
  }

  const toggleMessageExpansion = (id) => {
    setExpandedMessages(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const speakMessage = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()

      const utterance = new SpeechSynthesisUtterance(text)
      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)
      utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event)
        setIsSpeaking(false)
        toast.error('Failed to play the voice note. Please try again.')
      }

      speechSynthesisRef.current = utterance
      window.speechSynthesis.speak(utterance)
    } else {
      console.error('Text-to-speech not supported in this browser.')
      toast.error('Text-to-speech is not supported in your browser.')
    }
  }

  const stopSpeaking = () => {
    if (speechSynthesisRef.current) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
    }
  }

  const renderMessage = (message) => {
    if (message.role === 'user') {
      return <p>{message.content}</p>
    }

    const isExpanded = expandedMessages[message.id]
    const content = isExpanded ? message.content : message.content.slice(0, 100)

    return (
      <div className="space-y-4">
        <ReactMarkdown>{content}</ReactMarkdown>
        {message.content.length > 100 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toggleMessageExpansion(message.id)}
            className="mt-2 text-green-600 hover:text-green-800"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-4 h-4 mr-2" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4 mr-2" />
                Read More
              </>
            )}
          </Button>
        )}
        <div className="flex items-center gap-2 mt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => speakMessage(message.content)}
            disabled={isSpeaking}
          >
            <Volume2 className="w-4 h-4 mr-2" />
            {isSpeaking ? 'Speaking...' : 'Play Voice Note'}
          </Button>
          {isSpeaking && (
            <Button
              variant="outline"
              size="sm"
              onClick={stopSpeaking}
            >
              <StopCircle className="w-4 h-4 mr-2" />
              Stop
            </Button>
          )}
        </div>
        {message.recipeSteps && message.recipeSteps.length > 0 && (
          <Accordion type="single" collapsible className="mt-4">
            <AccordionItem value="steps">
              <AccordionTrigger>Recipe Steps</AccordionTrigger>
              <AccordionContent>
                <ol className="list-decimal list-inside">
                  {message.recipeSteps.map((step, index) => (
                    <li key={index} className="mb-2">{step}</li>
                  ))}
                </ol>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
        {message.recipeImage && (
          <div className="mt-4">
            <img src={message.recipeImage} alt="Recipe" className="rounded-lg shadow-md max-w-full h-auto" />
          </div>
        )}
      </div>
    )
  }

  return (
    <Card className="h-full bg-green-50 border-green-200 shadow-lg flex flex-col">
      <Toaster position="top-right" />
      <CardHeader className="bg-green-200 rounded-t-lg">
        <CardTitle className="flex items-center justify-between text-green-800 text-2xl">
          <div className="flex items-center">
            <Leaf className="mr-2 h-6 w-6" />
            Eco-Friendly Recipe Assistant
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col p-4">
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
            <AlertCircle className="inline-block w-4 h-4 mr-2" />
            <span className="font-bold">Error:</span> {error}
          </div>
        )}
        <ScrollArea className="flex-grow mb-4 pr-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className={`flex items-start gap-3 mb-4 ${
                  message.role === 'assistant' ? 'justify-start' : 'justify-end'
                }`}
              >
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white flex-shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`p-3 rounded-lg max-w-[80%] ${
                    message.role === 'assistant'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {renderMessage(message)}
                </div>
                {message.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white flex-shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </ScrollArea>
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask for a recipe or cooking tip..."
            className="flex-grow"
          />
          <Button
            type="submit"
            disabled={isLoading || !chatSession}
            className="bg-green-500 text-white hover:bg-green-600 transition-colors"
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              >
                <Send className="w-4 h-4" />
              </motion.div>
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}