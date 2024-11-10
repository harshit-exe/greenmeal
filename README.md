# GreenMeal

**User Login Credentials:**  
- **User Account:**  
  - Email: `harshitnikam182005@gmail.com`  
  - Password: `11223344`  

- **NGO Account:**  
  - Email: `maneriteshh@gmail.com`  
  - Password: `11223344`  

**Minimize waste, uplift communities, and build a sustainable future.**

GreenMeal is a food waste tracker and donation platform designed to reduce food waste at home. It connects users with local shelters to donate surplus food, empowering communities to combat hunger and contribute to a sustainable future.

## Table of Contents
- [Introduction](#introduction)
- [Key Features](#key-features)
- [Technologies Used](#technologies-used)
- [Challenges We Faced](#challenges-we-faced)
- [How It Works](#how-it-works)
- [Installation](#installation)
- [Links](#links)

## Introduction

GreenMeal addresses the global problem of food waste and hunger. By tracking food items in your pantry, sending alerts for upcoming expiration dates, and providing a platform for surplus food donation, GreenMeal enables users to minimize waste and help those in need.

## Key Features

- **Track Food Items and Expiration Alerts**  
  Receive timely notifications before food items spoil, allowing you to use them efficiently and reduce waste.

- **Personalized Reminders**  
  Set customized reminders based on personal preferences and consumption habits to help prevent food waste.

- **Recipe Suggestions**  
  Get creative with leftovers by using ingredient-based recipe suggestions to maximize flavor and minimize waste.

- **Easy Food Donation**  
  List surplus food items for donation, categorize them, and share with local shelters or food banks, making it easy to help the community.

- **Donation Coordination**  
  Schedule pickups with shelters, track donations, and confirm deliveries, making the donation process smooth and hassle-free.

## Technologies Used

- **Frontend:** React, GSAP for animations
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Authentication:** JWT
- **Communication:** WebRTC

## Challenges We Faced

1. **Custom Expiration Alerts**  
   Implementing personalized expiration alerts was challenging due to the varied preferences of users. We resolved this by allowing users to set custom alert timings, providing flexibility and enhancing the user experience.

2. **Coordinating Food Donation Pickups**  
   Organizing donation pickups required a robust scheduling system for real-time coordination with local shelters. To address this, we developed a scheduling feature that allowed users to set pickup times and track donations, ensuring efficient and reliable food transfer.

## How It Works

1. **Food Tracking**  
   Users can log food items and set expiration dates. GreenMeal sends alerts as items near their expiration, helping users prevent waste.

2. **Donation Listings**  
   Surplus food can be listed for donation with details like quantity and expiry date. These items are shared with local shelters and food banks.

3. **Schedule Donations**  
   Users can arrange for shelter pickups or locate drop-off points, and track the status of their donations.

## Installation

To run GreenMeal locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/greenmeal.git
   cd greenmeal
