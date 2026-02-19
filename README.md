# AgentEX Landing Page

A modern, animated landing page built with Next.js, optimized for Vercel deployment.

## Features

- 🎨 Dark/Light mode toggle with code editor theme
- ✨ Smooth animations and transitions
- 📱 Responsive design
- 📧 Contact form with email integration
- 🚀 Optimized for Vercel deployment

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Email Setup

The contact form requires an email service to send messages. We recommend using [Resend](https://resend.com) for Vercel deployments.

### Option 1: Resend (Recommended)

1. Sign up at [resend.com](https://resend.com)
2. Get your API key from the dashboard
3. Install Resend:
   ```bash
   npm install resend
   ```
4. Add your API key to `.env.local`:
   ```
   RESEND_API_KEY=re_your_api_key_here
   ```
5. Update `app/api/contact/route.ts` to uncomment the Resend code and remove the TODO comment

### Option 2: Other Email Services

You can use SendGrid, Mailgun, or any other email service. Update the `app/api/contact/route.ts` file with your preferred service.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add your email service API key as an environment variable
4. Deploy!

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
