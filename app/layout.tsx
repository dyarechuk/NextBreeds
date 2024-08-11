import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';

const montserrat = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Breeds',
  description:
    'This project is designed to allow users to view various cat and dog breeds in a card format. Users can also navigate to a detailed page for each breed to learn more about it',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={(montserrat.className, 'bg-gray-300')}>{children}</body>
    </html>
  );
}
