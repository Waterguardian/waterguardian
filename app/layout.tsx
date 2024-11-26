import { DarkMode } from '@/components/DarkMode'
import Footer from '@/components/ui/footer'
import Header from '@/components/ui/header'
import { cn } from '@/util/cn'
import { GeistSans } from 'geist/font/sans'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Waterguardian',
  description: 'Das Citizen Science Projekt aus Braunschweig',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de">
      <body
        className={cn(
          GeistSans.className,
          'antialiased radix-themes radix-themes-custom-fonts font-sans',
        )}
        data-is-root-theme="true"
        data-accent-color="indigo"
        data-gray-color="slate"
        data-has-background="true"
        data-panel-background="translucent"
        data-radius="medium"
        data-scaling="100%"
      >
        <Header />
        {children}
        <Footer />
        <DarkMode />
      </body>
    </html>
  )
}
