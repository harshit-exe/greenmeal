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
  RadialBar,
  RadialBarChart,
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
  {
    name: "Vegetables",
    fruits: 4000,
    vegetables: 2400,
    dairy: 2400,
    meat: 1000,
    range: "20-40",
    fill: "#8884d8",
    A: "30",
  },
  {
    name: "Fruits",
    fruits: 3000,
    vegetables: 1398,
    dairy: 2210,
    meat: 900,
    range: "40-60",
    fill: "#8884d8",
    A: "15",
  },
  {
    name: "Dairy",
    fruits: 2000,
    vegetables: 9800,
    dairy: 2290,
    meat: 1100,
    range: "30-70",
    fill: "#8884d8",
    A: "10",
  },
  {
    name: "Meat",
    fruits: 2780,
    vegetables: 3908,
    dairy: 2000,
    meat: 800,
    range: "10-50",
    fill: "#8884d8",
    A: "35",
  },
  {
    name: "Grains",
    fruits: 2780,
    vegetables: 3908,
    dairy: 2000,
    meat: 800,
    range: "10-50",
    fill: "#8884d8",
    A: "45",
  },
  {
    name: "Seeds",
    fruits: 2780,
    vegetables: 3908,
    dairy: 2000,
    meat: 800,
    range: "10-50",
    fill: "#8884d8",
    A: "35",
  },
];

const donorData = [
  { name: "Individual Donors", value: 400 },
  { name: "Corporate Partners", value: 300 },
  { name: "Food Banks", value: 200 },
  { name: "Restaurants", value: 100 },
];

const impactData = [
  { name: "Jan", mealsProvided: 4000, peopleServed: 2400, wasteReduced: 2400 },
  { name: "Feb", mealsProvided: 3000, peopleServed: 1398, wasteReduced: 2210 },
  { name: "Mar", mealsProvided: 2000, peopleServed: 9800, wasteReduced: 2290 },
  { name: "Apr", mealsProvided: 2780, peopleServed: 3908, wasteReduced: 2000 },
  { name: "May", mealsProvided: 1890, peopleServed: 4800, wasteReduced: 2181 },
  { name: "Jun", mealsProvided: 2390, peopleServed: 3800, wasteReduced: 2500 },
];

const Overview = () => {
  const [activeTab, setActiveTab] = useState("inventory");
  const [ngoStats, setNgoStats] = useState({
    totalReceived: 12340,
    activeDonors: 150,
    mealsProvided: 4560,
    peopleServed: 7890,
  });
  const { theme } = useTheme();

  useEffect(() => {
    // Simulating real-time data updates
    const interval = setInterval(() => {
      setNgoStats((prev) => ({
        totalReceived: prev.totalReceived + Math.floor(Math.random() * 100),
        activeDonors: prev.activeDonors + (Math.random() > 0.9 ? 1 : 0),
        mealsProvided: prev.mealsProvided + Math.floor(Math.random() * 50),
        peopleServed: prev.peopleServed + Math.floor(Math.random() * 50),
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
    peopleServed: "blue",
    wasteReduced: "purple",
  };

  const [opacity, setOpacity] = React.useState({
    uv: 1,
    pv: 1,
  });

  const handleMouseEnter = (o) => {
    const { dataKey } = o;

    setOpacity((op) => ({ ...op, [dataKey]: 0.5 }));
  };

  const handleMouseLeave = (o) => {
    const { dataKey } = o;

    setOpacity((op) => ({ ...op, [dataKey]: 1 }));
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
          NGO Dashboard
        </h1>
        <Button
          variant="outline"
          className="bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-100 dark:hover:bg-green-800"
        >
          <Download className="mr-2 h-4 w-4" /> Generate Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<Leaf />}
          title="Total Received"
          value={`${ngoStats.totalReceived} kg`}
          description="Food Donations"
          trend="up"
        />
        <StatCard
          icon={<Users />}
          title="Active Donors"
          value={ngoStats.activeDonors}
          description="Supporting Our Cause"
          trend="up"
        />
        <StatCard
          icon={<Apple />}
          title="Meals Provided"
          value={ngoStats.mealsProvided}
          description="This Month"
          trend="up"
        />
        <StatCard
          icon={<Carrot />}
          title="People Served"
          value={ngoStats.peopleServed}
          description="This Month"
          trend="up"
        />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid h-auto grid-cols-3">
          <TabsTrigger className='p-3 text-base' value="inventory">Inventory</TabsTrigger>
          <TabsTrigger className='p-3 text-base' value="impact">Impact</TabsTrigger>
          <TabsTrigger className='p-3 text-base' value="donors">Donor Analysis</TabsTrigger>
        </TabsList>
        <TabsContent value="inventory">
          <Card>
            <CardHeader>
              <CardTitle>Food Inventory</CardTitle>
              <CardDescription>
                Monthly breakdown of received food categories
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart
                  cx="50%"
                  cy="50%"
                  outerRadius="80%"
                  data={inventoryData}
                >
                  <PolarGrid />
                  <PolarAngleAxis dataKey="name" />
                  <PolarRadiusAxis />
                  <Radar
                    name="name"
                    dataKey="A"
                    stroke="#8884d8"
                    fill="#43A047"
                    fillOpacity={0.6}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="impact">
          <Card>
            <CardHeader>
              <CardTitle>NGO Impact</CardTitle>
              <CardDescription>
                Meals provided, people served, and waste reduced
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  width={500}
                  height={300}
                  data={impactData}
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
                  <Legend
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  />
                  <Line
                    type="monotone"
                    dataKey="mealsProvided"
                    strokeOpacity={opacity.pv}
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="wasteReduced"
                    strokeOpacity={opacity.uv}
                    stroke="#82ca9d"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="donors">
          <Card>
            <CardHeader>
              <CardTitle>Donor Analysis</CardTitle>
              <CardDescription>
                Distribution of donations by donor type.
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  width={500}
                  height={300}
                  data={donorData}
                  margin={{
                    top: 20,
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
                  <Bar dataKey="name" stackId="a" fill="#8884d8" />
                  <Bar dataKey="value" stackId="a" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <DonorAlerts />
    </motion.div>
  );
};

const StatCard = ({ icon, title, value, description, trend }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.95 }}
    className="bg-white dark:bg-gray-700 rounded-lg border p-6 flex items-center"
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

const DonorAlerts = () => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center">
        <AlertTriangle className="mr-2 text-yellow-500" />
        Donor Alerts & Recent Activities
      </CardTitle>
    </CardHeader>
    <CardContent>
      <ul className="space-y-2">
        <li className="flex items-center text-green-600 dark:text-green-400">
          <Leaf className="mr-2" size={16} />
          New donation of 500kg received from Corporate Partner A
        </li>
        <li className="flex items-center text-blue-600 dark:text-blue-400">
          <Users className="mr-2" size={16} />
          10 new individual donors joined this week
        </li>
        <li className="flex items-center text-yellow-600 dark:text-yellow-400">
          <AlertTriangle className="mr-2" size={16} />
          Low inventory alert: Dairy products running low
        </li>
      </ul>
    </CardContent>
  </Card>
);

export default Overview;
