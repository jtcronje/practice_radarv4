import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Practice Radar v4',
  description: 'Medical practice management application',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}