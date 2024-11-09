"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search, Utensils, ArrowRight } from "lucide-react";
import { Logo } from "@/utils/constanst";

const LandingPage = () => {
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div className="min-h-screen bg-green-100 flex items-center justify-center p-4 overflow-hidden">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden relative"
      >
        {/* Animated background shapes */}
        <motion.div
          className="absolute top-0 right-0 w-2/3 h-full bg-green-50 rounded-l-full z-0"
          style={{ y: backgroundY }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-96 h-96 bg-green-200 rounded-full z-0"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute top-10 left-10 w-20 h-20 bg-green-300 rounded-full z-0"
          animate={{
            y: [0, 20, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        {/* Content */}
        <div className="relative z-10 p-8 md:p-12 flex flex-col h-full">
          {/* Navigation */}
          <nav className="flex justify-between items-center mb-12">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center space-x-2"
            >
              <Utensils className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold text-green-800">
                GreenMeal
              </span>
            </motion.div>
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center space-x-6"
            >
              <NavLink href="#about">About Us</NavLink>
              <NavLink href="#contact">Contact</NavLink>
              <motion.button
                className="p-2 hover:bg-green-100 rounded-full transition-colors"
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
              >
                <Search className="h-5 w-5 text-green-600" />
              </motion.button>
            </motion.div>
          </nav>

          {/* Main content */}
          <div className="flex flex-col md:flex-row items-center justify-between flex-grow">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="md:w-1/2 mb-8 md:mb-0"
            >
              <motion.h1
                className="text-4xl md:text-5xl font-bold text-green-800 mb-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                Track Your Meals.
                <br />
                <motion.span
                  className="text-green-600"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  Achieve Your Goals
                </motion.span>
              </motion.h1>
              <motion.p
                className="text-green-700 mb-6 max-w-md"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                GreenMeal helps you monitor your food intake, set nutritional
                goals, and make healthier choices for a better lifestyle.
              </motion.p>
              <motion.div
                className="flex items-center space-x-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.5 }}
              >
                <motion.button
                  href={"/login"}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-green-600 text-white rounded-full font-medium hover:bg-green-700 transition-colors flex items-center space-x-2"
                >
                  <a href="/login">
                    <span>Get Started</span>
                  </a>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <ArrowRight className="h-5 w-5" />
                  </motion.div>
                </motion.button>
                <motion.span
                  className="text-green-600 font-medium"
                  whileHover={{ scale: 1.1 }}
                >
                  4K+ Users
                </motion.span>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="md:w-1/2 flex justify-center"
            >
              <motion.img
                src={"assets/logo.jpg"}
                alt="GreenMeal App Interface"
                className="max-w-full h-auto rounded-lg shadow-lg"
                whileHover={{ scale: 1.05, rotate: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const NavLink = ({ href, children }) => (
  <motion.a
    href={href}
    className="text-green-700 hover:text-green-600 transition-colors relative"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {children}
    <motion.span
      className="absolute left-0 right-0 bottom-0 h-0.5 bg-green-600"
      initial={{ scaleX: 0 }}
      whileHover={{ scaleX: 1 }}
      transition={{ duration: 0.3 }}
    />
  </motion.a>
);

export default LandingPage;
