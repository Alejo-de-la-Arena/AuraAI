import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';

export const metadata: Metadata = {
  title: 'AURA AI — Enterprise AI Integration Platform',
  description:
    'AURA AI connects your existing tools to any LLM in under 30 minutes. Visual workflow builder. Industry templates. Enterprise compliance. No ML team required.',
  openGraph: {
    title: 'AURA AI — Enterprise AI Integration Platform',
    description:
      'Connect your existing stack to any LLM in under 30 minutes. Visual workflow builder. No ML team required.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="bg-aura-950 text-zinc-50 font-sans antialiased">{children}</body>
    </html>
  );
}
