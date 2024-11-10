'use client'

import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  LeafIcon,
} from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b rounded-2xl from-green-50 to-white pt-16 pb-8 px-4 sm:px-6 lg:px-8">
      <div className=" text-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <Link
              href="/"
              className="inline-flex items-center space-x-2 text-2xl font-bold text-green-800 mb-4"
            >
              <LeafIcon className="h-8 w-8 text-green-600" />
              <span>
                Green<span className="text-green-600">Meal</span>
              </span>
            </Link>
            <p className="text-gray-600 mb-6 max-w-xs">
              Empowering communities to reduce waste and share resources for a
              sustainable future.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  aria-label={Icon.name}
                  className="text-green-600 hover:text-green-800 transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={24} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col items-center"
          >
            <h4 className="text-xl font-semibold text-green-800 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-center">
              {["Home", "About", "Services", "Contact"].map((item, index) => (
                <li key={index}>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-green-600 transition-colors duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <h4 className="text-xl font-semibold text-green-800 mb-4">
              Contact Us
            </h4>
            <ul className="space-y-4 text-center">
              {[
                {
                  icon: Mail,
                  text: "info@greenmeal.com",
                  href: "mailto:info@greenmeal.com",
                },
                {
                  icon: Phone,
                  text: "+1 (234) 567-890",
                  href: "tel:+1234567890",
                },
                {
                  icon: MapPin,
                  text: "123 Green Street, Eco City, EC 12345",
                  href: "#",
                },
              ].map((item, index) => (
                <li key={index} className="flex items-center justify-center">
                  <item.icon className="h-6 w-6 text-green-600 mr-2 flex-shrink-0" />
                  <a
                    href={item.href}
                    className="text-gray-600 hover:text-green-600 transition-colors duration-200"
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <Separator className="my-8 bg-green-200" />

        <div className="text-center">
          <p className="text-green-600 font-mono text-sm mt-2">
            Powered by Cipher Squad
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer