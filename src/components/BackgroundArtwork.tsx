import React from 'react';

export const BackgroundArtwork: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* Deep Space / Cyber Navy Background with subtle grid/vignette */}
      <div className="absolute inset-0 bg-[#080a1c]" />

      {/* Ambient Radial Glows */}
      <div className="absolute top-1/4 left-1/10 w-[550px] h-[550px] bg-gradient-to-br from-pink-600/35 via-purple-600/25 to-transparent rounded-full filter blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/6 right-1/12 w-[600px] h-[600px] bg-gradient-to-tl from-blue-600/35 via-cyan-500/20 to-purple-600/25 rounded-full filter blur-[130px] animate-pulse-glow" style={{ animationDelay: '3s' }} />
      <div className="absolute top-1/12 right-1/4 w-[400px] h-[400px] bg-gradient-to-b from-indigo-500/25 to-pink-500/15 rounded-full filter blur-[100px]" />

      {/* Top Floating Sphere (Peeking pill) */}
      <div className="absolute top-[8%] left-[48%] -translate-x-1/2 w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-br from-[#d946ef] via-[#8b5cf6] to-[#3b82f6] shadow-[0_0_50px_rgba(217,70,239,0.5)] animate-float-slow opacity-90 z-0">
        <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-transparent via-white/30 to-white/60 filter blur-[1px]" />
      </div>

      {/* Left 3D Neon Torus (Donut Ring) - Matching Reference Image */}
      <div className="absolute -bottom-16 -left-16 sm:left-[3%] sm:bottom-[12%] w-[260px] h-[260px] sm:w-[380px] sm:h-[380px] animate-float-slow z-0">
        <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-[0_20px_50px_rgba(217,70,239,0.4)]">
          <defs>
            <linearGradient id="torusGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ec4899" />
              <stop offset="35%" stopColor="#a855f7" />
              <stop offset="70%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>

            <linearGradient id="torusShine" x1="20%" y1="10%" x2="80%" y2="90%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.7" />
              <stop offset="25%" stopColor="#f472b6" stopOpacity="0.4" />
              <stop offset="60%" stopColor="#3b82f6" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.6" />
            </linearGradient>

            <radialGradient id="torusInnerShadow" cx="50%" cy="50%" r="50%">
              <stop offset="40%" stopColor="#090a1a" stopOpacity="0.9" />
              <stop offset="75%" stopColor="#3b82f6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>

          {/* 3D Torus Shape with realistic perspective */}
          <g transform="rotate(-28 200 200)">
            {/* Outer ring */}
            <ellipse
              cx="200"
              cy="200"
              rx="160"
              ry="110"
              fill="url(#torusGrad1)"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="2"
            />
            {/* Light highlight ring overlay */}
            <ellipse
              cx="195"
              cy="188"
              rx="155"
              ry="102"
              fill="none"
              stroke="url(#torusShine)"
              strokeWidth="38"
              opacity="0.85"
            />
            {/* Center Hole cut-out shadow to give 3D depth */}
            <ellipse
              cx="200"
              cy="200"
              rx="80"
              ry="52"
              fill="#080a1c"
            />
            <ellipse
              cx="200"
              cy="200"
              rx="80"
              ry="52"
              fill="url(#torusInnerShadow)"
            />
            {/* Inner rim glow */}
            <ellipse
              cx="200"
              cy="200"
              rx="80"
              ry="52"
              fill="none"
              stroke="rgba(6, 182, 212, 0.6)"
              strokeWidth="4"
            />
          </g>
        </svg>
      </div>

      {/* Right 3D Curving Tube / Snake Ring - Matching Reference Image */}
      <div className="absolute top-[5%] -right-12 sm:right-[1%] w-[320px] h-[650px] sm:w-[480px] sm:h-[850px] animate-float-reverse z-0">
        <svg viewBox="0 0 500 800" className="w-full h-full drop-shadow-[0_25px_60px_rgba(59,130,246,0.35)]">
          <defs>
            <linearGradient id="tubeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f43f5e" />
              <stop offset="25%" stopColor="#d946ef" />
              <stop offset="55%" stopColor="#8b5cf6" />
              <stop offset="85%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>

            <linearGradient id="tubeHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="40%" stopColor="#f472b6" stopOpacity="0.4" />
              <stop offset="80%" stopColor="#1e1b4b" stopOpacity="0.9" />
            </linearGradient>
          </defs>

          {/* 3D Organic Curved Swirl */}
          <path
            d="M 380 50 C 480 160, 480 320, 360 440 C 240 560, 180 660, 320 780"
            fill="none"
            stroke="url(#tubeGrad)"
            strokeWidth="90"
            strokeLinecap="round"
          />
          {/* Surface Gloss Specular highlight */}
          <path
            d="M 370 55 C 465 160, 465 315, 350 435 C 235 555, 175 655, 310 775"
            fill="none"
            stroke="url(#tubeHighlight)"
            strokeWidth="24"
            strokeLinecap="round"
            opacity="0.75"
          />
        </svg>
      </div>

      {/* Tiny ambient floating particles */}
      <div className="absolute top-1/4 left-1/3 w-2 h-2 rounded-full bg-pink-400/80 shadow-[0_0_12px_#f472b6] animate-pulse" />
      <div className="absolute top-2/3 left-1/4 w-1.5 h-1.5 rounded-full bg-cyan-400/80 shadow-[0_0_10px_#22d3ee] animate-pulse" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-1/3 right-1/4 w-2.5 h-2.5 rounded-full bg-purple-400/70 shadow-[0_0_14px_#c084fc] animate-pulse" style={{ animationDelay: '2.5s' }} />
    </div>
  );
};
