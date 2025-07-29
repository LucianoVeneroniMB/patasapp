import './globals.css';
import { Geist, Geist_Mono } from 'next/font/google';
import Script from 'next/script';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Use next/script to load recaptcha script asynchronously */}
        <Script
          src="https://www.google.com/recaptcha/enterprise.js?render=6LfNmpMrAAAAAHJjT35Fh69t4L6EOM5vBiWI3YME"
          strategy="afterInteractive"
        />
        {children}
      </body>
    </html>
  );
}
