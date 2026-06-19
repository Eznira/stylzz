import React from 'react';
import ClientLayoutWrapper from '../components/ClientLayoutWrapper';
import '../index.css';

export const metadata = {
  title: 'Stylzz - Aesthetic Wardrobe Lookbook Engine',
  description: 'Streamline digital closet planning, explore high-contrast layering patterns, bookmark seasonal pieces, or pull real items directly from our integrated global inventory.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </body>
    </html>
  );
}
