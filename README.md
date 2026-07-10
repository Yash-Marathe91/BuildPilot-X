# BuildPilot X 🚀

**The Autonomous AI Venture Studio.**

BuildPilot X integrates elite AI executives, automated architecture design, and intelligent market research into a single, seamless platform. Go from idea to production in minutes, not months.

![BuildPilot X Interface](public/icon.png)

## Overview

BuildPilot X is designed to be the ultimate operating system for founders and technical leaders. It acts as an autonomous venture studio, replacing the need for immediate massive hires by providing a "Virtual C-Suite" powered by state-of-the-art Generative AI. 

Whether you need product strategy from an AI Chief Product Officer, database schemas from a virtual CTO, or market positioning from an AI CMO, BuildPilot X delivers.

## Key Features ✨

*   🧠 **Virtual AI Executive Board:** Real-time, context-aware strategic advice from specialized AI agents (CTO, CMO, CPO) utilizing the Vercel AI SDK.
*   📐 **Automated Architecture Designer:** Visual node-based infrastructure generation utilizing React Flow.
*   📊 **Market Intelligence:** Live competitor analysis, TAM calculations, and feature sentiment charts built with Recharts.
*   📈 **Investor Data Room:** Dynamic pitch deck generation and key metric tracking (ARR, Burn Rate, Active Users) to prepare for funding rounds.
*   💾 **Database Designer:** Visual schema builder with auto-generated PostgreSQL migration scripts.
*   💎 **Premium Glassmorphism UX:** A stunning, modern UI built with Shadcn, Tailwind CSS, and Framer Motion for buttery-smooth micro-interactions.

## Tech Stack

*   **Framework:** Next.js 15 (App Router)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS + Shadcn UI + Framer Motion
*   **Authentication & Database:** Supabase
*   **AI Engine:** Vercel AI SDK (`@ai-sdk/react`, `@ai-sdk/openai`)
*   **Data Visualization:** Recharts, `@xyflow/react` (React Flow)

## Getting Started

### Prerequisites

*   Node.js (v18+)
*   A Supabase account (for Authentication & Database)
*   An OpenAI API Key (for the Executive Board)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/buildpilot-x.git
   cd buildpilot-x
   ```

2. **Install dependencies:**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Configure Environment Variables:**
   Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```
   Fill in your `.env.local` with your Supabase credentials and OpenAI API Key.

4. **Initialize Supabase Schema:**
   Run the SQL commands found in `supabase_schema.sql` within your Supabase project's SQL Editor to set up the `projects` and `profiles` tables along with their RLS policies.

5. **Start the Development Server:**
   ```bash
   npm run dev
   ```

6. **Open the Application:**
   Navigate to `http://localhost:3000` to start building your venture.

## Hackathon Context

This project was built focusing on creating an enterprise-grade, highly polished user experience. Instead of basic CRUD functionality, the focus was placed on combining sophisticated AI orchestration with premium UI/UX design patterns (glassmorphism, advanced animations, complex data visualizations).
