// app/layout.tsx
import './globals.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'Protected Dashboard',
  description: 'Simple protected dashboard example with login',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <body className='bg-gray-50 text-gray-900'>{children}</body>
    </html>
  );
}
