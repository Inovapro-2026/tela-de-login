import React, { useEffect, useState } from 'react';

interface AnimatedMascotProps {
  pupilX: number; // -8 to 8
  pupilY?: number; // -4 to 4
  isCoveringEyes: boolean;
  isPeeking: boolean;
  isHappy: boolean;
  activeField?: 'name' | 'email' | 'password' | 'none';
}

export const AnimatedMascot: React.FC<AnimatedMascotProps> = ({
  pupilX,
  pupilY = 0,
  isCoveringEyes,
  isPeeking,
  isHappy,
  activeField = 'none',
}) => {
  const [blink, setBlink] = useState(false);

  // Natural blinking interval
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      if (!isCoveringEyes) {
        setBlink(true);
        setTimeout(() => setBlink(false), 180);
      }
    }, 4200);

    return () => clearInterval(blinkInterval);
  }, [isCoveringEyes]);

  // Dynamic hand transforms based on states
  // When covering eyes: paws move up to cover (y: -44px)
  // When peeking: paws move slightly apart and rotate so eyes peek through
  const leftHandTransform = isCoveringEyes
    ? isPeeking
      ? 'translate(-12px, -36px) rotate(-22deg)'
      : 'translate(4px, -46px) rotate(14deg)'
    : 'translate(0px, 0px) rotate(0deg)';

  const rightHandTransform = isCoveringEyes
    ? isPeeking
      ? 'translate(12px, -36px) rotate(22deg)'
      : 'translate(-4px, -46px) rotate(-14deg)'
    : 'translate(0px, 0px) rotate(0deg)';

  // Head slight tilt when tracking
  const headTilt = isCoveringEyes ? 0 : pupilX * 0.8;

  return (
    <div className="relative flex flex-col items-center justify-center select-none pointer-events-none" id="mascot-container">
      {/* Glow aura behind mascot */}
      <div 
        className="absolute -top-2 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-pink-500/25 via-purple-500/20 to-cyan-400/25 blur-lg transition-opacity duration-500"
        style={{
          opacity: isCoveringEyes ? 0.3 : 0.7,
        }}
      />

      <svg
        viewBox="0 0 160 140"
        className="w-20 h-18 sm:w-24 sm:h-20 drop-shadow-xl overflow-visible"
        style={{
          transform: `rotate(${headTilt}deg)`,
          transition: 'transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)',
        }}
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="mascotBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2c2250" />
            <stop offset="60%" stopColor="#1a1838" />
            <stop offset="100%" stopColor="#111026" />
          </linearGradient>

          <linearGradient id="earInnerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff4b91" />
            <stop offset="100%" stopColor="#802bb1" />
          </linearGradient>

          <linearGradient id="pawGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3d2f6d" />
            <stop offset="100%" stopColor="#1d1b3c" />
          </linearGradient>

          <linearGradient id="eyeHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00f5d4" />
            <stop offset="100%" stopColor="#7b2cbf" />
          </linearGradient>

          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Ears */}
        <g id="mascot-ears">
          {/* Left Ear */}
          <path
            d="M 46 45 C 36 20, 42 12, 58 26 Z"
            fill="url(#mascotBodyGrad)"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="1.2"
          />
          <path
            d="M 47 40 C 40 25, 45 19, 55 28 Z"
            fill="url(#earInnerGrad)"
            opacity="0.85"
          />

          {/* Right Ear */}
          <path
            d="M 114 45 C 124 20, 118 12, 102 26 Z"
            fill="url(#mascotBodyGrad)"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="1.2"
          />
          <path
            d="M 113 40 C 120 25, 115 19, 105 28 Z"
            fill="url(#earInnerGrad)"
            opacity="0.85"
          />

          {/* Cute Mini Antenna or Crown gem */}
          <circle cx="80" cy="22" r="3.5" fill="#00f5d4" filter="url(#softGlow)" />
          <path d="M 80 26 L 80 34" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" />
        </g>

        {/* Head Base */}
        <g id="mascot-head">
          <ellipse
            cx="80"
            cy="70"
            rx="46"
            ry="40"
            fill="url(#mascotBodyGrad)"
            stroke="rgba(255,255,255,0.22)"
            strokeWidth="1.5"
          />

          {/* Cheek Blush */}
          <ellipse cx="48" cy="82" rx="6" ry="3.5" fill="#ff4b91" opacity={isHappy ? 0.8 : 0.45} />
          <ellipse cx="112" cy="82" rx="6" ry="3.5" fill="#ff4b91" opacity={isHappy ? 0.8 : 0.45} />

          {/* Cute Nose / Snout */}
          <ellipse cx="80" cy="74" rx="3.5" ry="2.5" fill="#ff70a6" />
          <path
            d="M 77 78 Q 80 82 83 78"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="1.2"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* Eyebrows */}
        <g id="mascot-eyebrows" className="transition-transform duration-300" style={{
          transform: isCoveringEyes ? 'translateY(2px)' : isHappy ? 'translateY(-3px)' : 'translateY(0)',
        }}>
          <path
            d="M 52 50 Q 60 47 68 51"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 92 51 Q 100 47 108 50"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* Eyes Group */}
        <g id="mascot-eyes">
          {/* Left Eye */}
          <g transform="translate(60, 62)">
            {/* Eye Sclera / Background */}
            <ellipse
              cx="0"
              cy="0"
              rx="12"
              ry={blink ? 1.5 : 12}
              fill="#ffffff"
              className="transition-all duration-150"
            />

            {!blink && (
              <>
                {isHappy ? (
                  // Happy curved arc eyes (^_^)
                  <path
                    d="M -9 2 Q 0 -6 9 2"
                    stroke="#1a1838"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    fill="none"
                  />
                ) : (
                  // Normal Eye with tracking pupil
                  <g
                    style={{
                      transform: `translate(${pupilX}px, ${pupilY}px)`,
                      transition: 'transform 0.12s ease-out',
                    }}
                  >
                    {/* Iris */}
                    <circle cx="0" cy="0" r="7" fill="#14142b" />
                    <circle cx="0" cy="0" r="5.5" fill="url(#eyeHighlight)" opacity="0.9" />
                    <circle cx="0" cy="0" r="3.2" fill="#0b0b18" />
                    {/* Light catch reflections */}
                    <circle cx="-2.2" cy="-2.2" r="2.2" fill="#ffffff" />
                    <circle cx="2" cy="2" r="1.1" fill="#ffffff" opacity="0.8" />
                  </g>
                )}
              </>
            )}
          </g>

          {/* Right Eye */}
          <g transform="translate(100, 62)">
            {/* Eye Sclera / Background */}
            <ellipse
              cx="0"
              cy="0"
              rx="12"
              ry={blink ? 1.5 : 12}
              fill="#ffffff"
              className="transition-all duration-150"
            />

            {!blink && (
              <>
                {isHappy ? (
                  // Happy curved arc eyes (^_^)
                  <path
                    d="M -9 2 Q 0 -6 9 2"
                    stroke="#1a1838"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    fill="none"
                  />
                ) : (
                  // Normal Eye with tracking pupil
                  <g
                    style={{
                      transform: `translate(${pupilX}px, ${pupilY}px)`,
                      transition: 'transform 0.12s ease-out',
                    }}
                  >
                    {/* Iris */}
                    <circle cx="0" cy="0" r="7" fill="#14142b" />
                    <circle cx="0" cy="0" r="5.5" fill="url(#eyeHighlight)" opacity="0.9" />
                    <circle cx="0" cy="0" r="3.2" fill="#0b0b18" />
                    {/* Light catch reflections */}
                    <circle cx="-2.2" cy="-2.2" r="2.2" fill="#ffffff" />
                    <circle cx="2" cy="2" r="1.1" fill="#ffffff" opacity="0.8" />
                  </g>
                )}
              </>
            )}
          </g>
        </g>

        {/* Paws / Hands with smooth animated covering/peeking */}
        <g id="mascot-paws">
          {/* Left Paw */}
          <g
            id="mascot-left-paw"
            style={{
              transform: leftHandTransform,
              transformOrigin: '52px 115px',
              transition: 'transform 0.35s cubic-bezier(0.34, 1.4, 0.64, 1)',
            }}
          >
            <ellipse
              cx="54"
              cy="112"
              rx="13"
              ry="11"
              fill="url(#pawGrad)"
              stroke="rgba(255,255,255,0.25)"
              strokeWidth="1.2"
            />
            {/* Paw pads / toes */}
            <circle cx="50" cy="110" r="2.5" fill="#ff70a6" opacity="0.75" />
            <circle cx="55" cy="107" r="2.5" fill="#ff70a6" opacity="0.75" />
            <circle cx="60" cy="111" r="2.5" fill="#ff70a6" opacity="0.75" />
            <ellipse cx="55" cy="115" rx="4.5" ry="3" fill="#ff70a6" opacity="0.7" />
          </g>

          {/* Right Paw */}
          <g
            id="mascot-right-paw"
            style={{
              transform: rightHandTransform,
              transformOrigin: '108px 115px',
              transition: 'transform 0.35s cubic-bezier(0.34, 1.4, 0.64, 1)',
            }}
          >
            <ellipse
              cx="106"
              cy="112"
              rx="13"
              ry="11"
              fill="url(#pawGrad)"
              stroke="rgba(255,255,255,0.25)"
              strokeWidth="1.2"
            />
            {/* Paw pads / toes */}
            <circle cx="102" cy="111" r="2.5" fill="#ff70a6" opacity="0.75" />
            <circle cx="107" cy="107" r="2.5" fill="#ff70a6" opacity="0.75" />
            <circle cx="112" cy="110" r="2.5" fill="#ff70a6" opacity="0.75" />
            <ellipse cx="107" cy="115" rx="4.5" ry="3" fill="#ff70a6" opacity="0.7" />
          </g>
        </g>
      </svg>

      {/* Mini status reaction speech pill when peeking or happy */}
      {isCoveringEyes && (
        <div 
          className="absolute -top-4 bg-purple-950/90 text-pink-300 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-pink-500/30 backdrop-blur-md shadow-lg animate-bounce"
        >
          {isPeeking ? '👀 Espiando...' : '🙈 Shh! Não estou olhando!'}
        </div>
      )}
    </div>
  );
};
