import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'OfferLoop｜证据驱动的 AI 求职 Copilot',
  description: '把真实经历和岗位要求放在一起，再决定是否值得投入时间。',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
