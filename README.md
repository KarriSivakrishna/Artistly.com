# 🎨 Artistly — Performing Artist Booking Platform

**Artistly** is a fully responsive and functional web application built using **Next.js 13+, React, and Tailwind CSS**. Developed as part of a Frontend Developer  for Eventful India, it simulates a real-world platform where **Event Planners** can discover and book performing artists, while **Artist Managers** can onboard talent and manage submissions.

> Hosted on Vercel 👉 [Live Demo](https://artistly-com-nine.vercel.app/)

---

## 🚀 Project Overview

Artistly connects two user types:
- 🎭 **Event Planners** — Browse, filter, and request to book artists.
- 🎤 **Artist Managers** — Submit and manage artist profiles via an onboarding dashboard.

This project focuses on **frontend engineering quality**, featuring real-world UI rendering, routing, responsiveness, and component reuse — all built with modern React practices and the App Router from Next.js.

---

## 📄 Pages Implemented

### 1. 🏠 Homepage
- Hero section with overview and CTA
- Artist category cards (Singers, Dancers, Speakers, DJs)
- Basic site navigation

### 2. 🧑‍🎤 Artist Listing Page
- Responsive grid layout with filter options:
  - Category
  - Location
  - Price Range
- Cards with artist details and "Ask for Quote" buttons

### 3. 📋 Artist Onboarding Form
- Multi-section form to capture:
  - Name, Bio, Category (multi-select)
  - Languages Spoken
  - Fee Range
  - Profile Image (optional)
  - Location
- Validation with **React Hook Form + Yup**
- Mock form submission

### 4. 📊 Manager Dashboard (Optional Bonus)
- Table of artist submissions
- Conditional rendering
- Reusable table components

---

## 🛠️ Tech Stack

- **Next.js 13+ (App Router)**
- **React (Functional Components)**
- **Tailwind CSS** for utility-first styling
- **ShadCN UI** components
- **React Hook Form + Yup** for form handling
- **Mock JSON / Static API** for data simulation

---

## ✅ Key Features

- 📱 Fully responsive design (mobile-first)
- 🔍 Real-time filtering on artist listings
- 📤 Multi-step form with validation
- ⚙️ Component reuse and clean architecture
- 🌐 Hosted on [Vercel](https://vercel.com)

---

## 📦 Installation & Local Setup

```bash
git clone https://github.com/KarriSivakrishna/Artistly.com.git
cd Artistly.com
npm install
npm run dev
