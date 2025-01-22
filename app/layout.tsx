import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Astuteai Survey',
  description: 'Fill the form to get started',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
