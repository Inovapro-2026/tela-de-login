import React from 'react';
import { BackgroundArtwork } from './components/BackgroundArtwork';
import { AuthCard } from './components/AuthCard';

export default function App() {
  return (
    <main className="min-h-screen w-full relative flex items-center justify-center p-2 sm:p-4 overflow-hidden bg-[#080a1c] text-white">
      {/* 3D Organic Glow Blobs & Torus Shapes from Reference */}
      <BackgroundArtwork />

      {/* Main Interactive Glassmorphic Card Container */}
      <AuthCard />
    </main>
  );
}
