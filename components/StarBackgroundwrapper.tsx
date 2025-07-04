// components/StarBackgroundWrapper.tsx
'use client';

import dynamic from 'next/dynamic';

const StarBackground = dynamic(
  () => import('@/components/StarBackground'),
  { 
    ssr: false,
    loading: () => <div className="fixed inset-0 -z-10 bg-black" />
  }
);

export default function StarBackgroundWrapper() {
  return <StarBackground />;
}