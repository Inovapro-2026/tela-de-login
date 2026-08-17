export type AuthMode = 'signup' | 'login';

export interface PasswordStrength {
  score: number; // 0 to 4
  label: string;
  colorClass: string;
  gradientClass: string;
}

export interface MascotState {
  isCoveringEyes: boolean;
  isPeeking: boolean;
  pupilOffsetX: number;
  pupilOffsetY: number;
  isHappy: boolean;
  isBlinking: boolean;
}
