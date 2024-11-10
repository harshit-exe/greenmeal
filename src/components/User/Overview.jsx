"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Leaf,
  Users,
  Apple,
  Carrot,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Download,
} from "lucide-react";
import { useTheme } from "next-themes";

const inventoryData = [
  { name: "Jan", fruits: 400, vegetables: 240, dairy: 240, meat: 100 },
  { name: "Feb", fruits: 300, vegetables: 139, dairy: 221, meat: 90 },
  { name: "Mar", fruits: 200, vegetables: 980, dairy: 229, meat: 110 },
  { name: "Apr", fruits: 278, vegetables: 390, dairy: 200, meat: 80 },
  { name: "May", fruits: 189, vegetables: 480, dairy: 218, meat: 95 },
  { name: "Jun", fruits: 239, vegetables: 380, dairy: 250, meat: 105 },
];

const donationData = [
  { name: "Food Bank A", value: 40 },
  { name: "Shelter B", value: 30 },
  { name: "Community Center C", value: 30 },
  { name: "Charity D", value: 20 },
];

const impactData = [
  { name: "Jan", mealsProvided: 400, wasteReduced: 240, carbonOffset: 240 },
  { name: "Feb", mealsProvided: 300, wasteReduced: 139, carbonOffset: 221 },
  { name: "Mar", mealsProvided: 200, wasteReduced: 980, carbonOffset: 229 },
  { name: "Apr", mealsProvided: 278, wasteReduced: 390, carbonOffset: 200 },
  { name: "May", mealsProvided: 189, wasteReduced: 480, carbonOffset: 218 },
  { name: "Jun", mealsProvided: 239, wasteReduced: 380, carbonOffset: 250 },
];

const Overview = () => {
  const [activeTab, setActiveTab] = useState("inventory");
  const [userStats, setUserStats] = useState({
    totalDonations: 1234,
    ngoPartnerships: 15,
    fruitsDonated: 456,
    vegetablesDonated: 789,
  });
  const { theme } = useTheme();

  useEffect(() => {
    // Simulating real-time data updates
    const interval = setInterval(() => {
      setUserStats((prev) => ({
        totalDonations: prev.totalDonations + Math.floor(Math.random() * 10),
        ngoPartnerships: prev.ngoPartnerships + (Math.random() > 0.9 ? 1 : 0),
        fruitsDonated: prev.fruitsDonated + Math.floor(Math.random() * 5),
        vegetablesDonated:
          prev.vegetablesDonated + Math.floor(Math.random() * 5),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const chartColors = {
    fruits: "rose",
    vegetables: "green",
    dairy: "blue",
    meat: "amber",
    mealsProvided: "emerald",
    wasteReduced: "blue",
    carbonOffset: "purple",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 space-y-6 bg-gray-50 dark:bg-gray-800 rounded-lg"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-green-800 dark:text-green-400">
          Your GreenMeal Impact
        </h1>
        <Button
          variant="outline"
          className="bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-100 dark:hover:bg-green-800"
        >
          <Download className="mr-2 h-4 w-4" /> Download Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<Leaf />}
          title="Total Donations"
          value={`${userStats.totalDonations} kg`}
          description="Your Contribution"
          trend="up"
        />
        <StatCard
          icon={<Users />}
          title="NGO Partnerships"
          value={userStats.ngoPartnerships}
          description="Active Collaborations"
          trend="up"
        />
        <StatCard
          icon={<Apple />}
          title="Fruits Donated"
          value={`${userStats.fruitsDonated} kg`}
          description="This Month"
          trend="up"
        />
        <StatCard
          icon={<Carrot />}
          title="Vegetables Donated"
          value={`${userStats.vegetablesDonated} kg`}
          description="This Month"
          trend="up"
        />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="inventory">Donation Inventory</TabsTrigger>
          <TabsTrigger value="impact">Your Impact</TabsTrigger>
          <TabsTrigger value="distribution">Distribution</TabsTrigger>
        </TabsList>
        <TabsContent value="inventory">
          <Card>
            <CardHeader>
              <CardTitle>Your Donation Inventory</CardTitle>
              <CardDescription>
                Monthly breakdown of your food donations
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  width={500}
                  height={300}
                  data={inventoryData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis dataKey={"dairy"} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="dairy" stackId="a" fill="#8884d8" />
                  <Bar dataKey="meat" stackId="a" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="impact">
          <Card>
            <CardHeader>
              <CardTitle>Your GreenMeal Impact</CardTitle>
              <CardDescription>
                Meals provided, waste reduced, and carbon offset
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart
                  cx="50%"
                  cy="50%"
                  outerRadius="80%"
                  data={impactData}
                >
                  <PolarGrid />
                  <PolarAngleAxis dataKey="mealsProvided" />
                  <PolarRadiusAxis />
                  <Radar
                    name="name"
                    dataKey="wasteReduced"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.6}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="distribution">
          <Card>
            <CardHeader>
              <CardTitle>Donation Distribution</CardTitle>
              <CardDescription>
                How your donations are distributed among NGOs
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  width={500}
                  height={300}
                  data={donationData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="name"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                  <Line type="monotone" dataKey="value" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <RecentActivities />
    </motion.div>
  );
};

const StatCard = ({ icon, title, value, description, trend }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 flex items-center"
  >
    <div className="mr-4 p-3 bg-green-100 dark:bg-green-800 rounded-full text-green-600 dark:text-green-300">
      {icon}
    </div>
    <div>
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
        {title}
      </h2>
      <p className="text-2xl font-bold text-green-600 dark:text-green-400">
        {value}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
        {description}
        {trend === "up" && (
          <TrendingUp className="text-green-500 ml-1" size={16} />
        )}
        {trend === "down" && (
          <TrendingDown className="text-red-500 ml-1" size={16} />
        )}
      </p>
    </div>
  </motion.div>
);

const RecentActivities = () => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center">
        <AlertTriangle className="mr-2 text-yellow-500" />
        Recent Activities & Alerts
      </CardTitle>
    </CardHeader>
    <CardContent>
      <ul className="space-y-2">
        <li className="flex items-center text-green-600 dark:text-green-400">
          <Leaf className="mr-2" size={16} />
          Youve donated 50kg of fruits to Food Bank A
        </li>
        <li className="flex items-center text-blue-600 dark:text-blue-400">
          <Users className="mr-2" size={16} />
          New partnership formed with Community Center C
        </li>
        <li className="flex items-center text-yellow-600 dark:text-yellow-400">
          <AlertTriangle className="mr-2" size={16} />
          Reminder: Schedule your next donation
        </li>
      </ul>
    </CardContent>
  </Card>
);

export default Overview;
