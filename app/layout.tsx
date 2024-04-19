import '@radix-ui/themes/styles.css';
import './theme-config.css';
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Theme } from '@radix-ui/themes';
import NavBar from './NavBar'

const inter = Inter({ 
    subsets: ['latin'],
    variable : '--font-inter'
})

export const metadata: Metadata = {
    title: 'Issue Tracker',
    description: 'Learning react and nextjs by creating a demo issue tracker',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.variable}>
                <Theme>
                    <NavBar />
                    <main className='p-5'>
                    {children}
                    </main>
                </Theme>
            </body>
        </html>
    )
}
