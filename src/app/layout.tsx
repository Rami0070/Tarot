import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'UNIVERSAL TAROT · Integrated Edition | 인터랙티브 타로',
  description: '유니버셜 덱 기반 인터랙티브 타로 웹 애플리케이션 - 관찰, 행동, 해석 조언',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="bg-white text-zinc-900 antialiased selection:bg-purple-100 selection:text-purple-800">
        {children}
      </body>
    </html>
  );
}
