# Miniurl - Professional URL Shortener

Miniurl is a modern, fast, and scalable URL shortener built with Next.js, Prisma, PostgreSQL, and Redis. It features a responsive dashboard, Google OAuth authentication, and advanced link tracking.

## 🚀 Features

- **Lightning Fast:** Built with Next.js App Router and optimized for performance.
- **Secure Authentication:** Seamless Google OAuth integration via NextAuth.
- **Link Tracking:** Asynchronous click tracking and link statistics.
- **High Performance:** Redis caching layer for rapid link resolution.
- **Modern UI/UX:** Responsive dashboard, dark mode support, and glassmorphism design powered by Tailwind CSS v4.
- **SEO Optimized:** Enterprise-grade branding, semantic HTML, and optimal web vitals.

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, React 19)
- **Database:** [PostgreSQL](https://www.postgresql.org/) with [Prisma ORM](https://www.prisma.io/)
- **Caching:** [Redis](https://redis.io/) (via `ioredis`)
- **Authentication:** [NextAuth.js](https://next-auth.js.org/) (Google Provider)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)

## 📋 Prerequisites

Before running the project locally, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **PostgreSQL** (local or hosted database)
- **Redis** (local or hosted instance)

## 💻 Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/namansharma3007/miniurl.git
   cd miniurl
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure Environment Variables:**

   Copy the sample environment file and update the values:

   ```bash
   cp .env.example .env
   ```

   Update the `.env` file with your specific configuration:
   - `DATABASE_URL`: Your PostgreSQL connection string.
   - `NEXTAUTH_URL`: `http://localhost:3000` for local development.
   - `NEXTAUTH_SECRET`: Generate a strong secret (e.g., using `openssl rand -base64 32`).
   - `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET`: Obtain from the Google Cloud Console.
   - `REDIS_URL`: Your Redis connection string.

4. **Initialize the Database:**

   Run Prisma commands to generate the client and push the schema:

   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Start the Development Server:**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser to interact with the application.

## 📁 Project Structure

- `src/app/`: Next.js App Router pages, layouts, and API routes.
- `prisma/`: Database schema and configuration.
- `public/`: Static assets and images.

## 🚀 Deployment

Miniurl is fully optimized for deployment on [Vercel](https://vercel.com). Make sure to configure all environment variables in your Vercel project settings prior to deployment.
