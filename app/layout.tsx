import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Sidebar } from '@/components/sidebar'
import { ThemeProvider } from '@/components/theme-provider'
import { AppHeader } from '@/components/app-header'
import { cn } from '@/lib/utils'
import { Analytics } from '@vercel/analytics/next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'iPaaS Platform',
  description: 'Integration Platform as a Service',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, 'min-h-screen bg-background text-foreground antialiased')}>
        <ThemeProvider>
          <div className="relative flex min-h-screen overflow-hidden">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.25),_transparent_60%)]" aria-hidden />
            <div className="pointer-events-none absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-primary/20 blur-3xl" aria-hidden />
            <div className="pointer-events-none absolute -right-60 bottom-0 h-[28rem] w-[28rem] rounded-full bg-emerald-500/10 blur-3xl" aria-hidden />

            <Sidebar />

            <div className="relative z-10 flex flex-1 flex-col overflow-hidden">
              <AppHeader />
              <main className="relative z-10 flex-1 overflow-y-auto px-4 pb-12 pt-6 md:px-8 lg:px-12">
                <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
                  {children}
                </div>
              </main>
              <footer className="relative z-10 border-t border-border/60 bg-background/60 backdrop-blur-sm">
                <div className="mx-auto flex max-w-6xl items-center justify-center px-4 py-3 md:px-8 lg:px-12">
                  <p className="text-xs text-muted-foreground">
                    Made by{' '}
                    <a
                      href="https://shan0o.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-foreground transition-colors hover:text-primary"
                    >
                      Shantanu Patel
                    </a>
                    {' • '}
                    <a
                      href="https://shan0o.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-primary"
                    >
                      shan0o.com
                    </a>
                  </p>
                </div>
              </footer>
            </div>
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
