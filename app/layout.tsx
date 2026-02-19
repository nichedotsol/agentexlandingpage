import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AgentEX - Premium Domain',
  description: 'The last 10 years were about UX. The next 10 years are about AX.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  )
}
