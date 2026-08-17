import React, { useState, useRef, useMemo } from 'react';
import { 
  Lock, 
  Eye, 
  EyeOff, 
  User, 
  Mail, 
  ShieldCheck, 
  Sparkles,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { AnimatedMascot } from './AnimatedMascot';
import { AuthMode, PasswordStrength } from '../types';

export const AuthCard: React.FC = () => {
  // Form State
  const [authMode, setAuthMode] = useState<AuthMode>('signup');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ title: string; desc: string; type: 'success' | 'error' } | null>(null);

  // Mascot Focus & Interaction State
  const [activeField, setActiveField] = useState<'name' | 'email' | 'password' | 'none'>('none');
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isHappy, setIsHappy] = useState(false);

  // 3D Tilt Card State
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // Calculate Pupil X Tracking based on active field character count
  const pupilX = useMemo(() => {
    if (activeField === 'name') {
      const len = Math.min(fullName.length, 25);
      return (len / 25) * 12 - 6; // -6px to +6px
    }
    if (activeField === 'email') {
      const len = Math.min(email.length, 30);
      return (len / 30) * 12 - 6;
    }
    return 0;
  }, [activeField, fullName, email]);

  const pupilY = useMemo(() => {
    if (activeField === 'name') return -1;
    if (activeField === 'email') return 1.5;
    if (activeField === 'password') return 3;
    return 0;
  }, [activeField]);

  // Password Strength Calculation
  const passwordStrength: PasswordStrength = useMemo(() => {
    if (!password) {
      return { score: 0, label: 'Digite uma senha', colorClass: 'bg-white/20', gradientClass: 'from-gray-500 to-gray-400' };
    }
    let score = 0;
    if (password.length >= 6) score += 1;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
    if (/\d/.test(password)) score += 1;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password) || password.length >= 10) score += 1;

    switch (score) {
      case 1:
        return { score: 1, label: 'Muito Fraca', colorClass: 'bg-pink-500', gradientClass: 'from-pink-500 to-rose-400' };
      case 2:
        return { score: 2, label: 'Média', colorClass: 'bg-amber-400', gradientClass: 'from-pink-500 via-purple-500 to-amber-400' };
      case 3:
        return { score: 3, label: 'Forte', colorClass: 'bg-cyan-400', gradientClass: 'from-pink-500 via-indigo-500 to-cyan-400' };
      case 4:
        return { score: 4, label: 'Excelente & Segura', colorClass: 'bg-emerald-400', gradientClass: 'from-pink-500 via-cyan-400 to-emerald-400' };
      default:
        return { score: 0, label: 'Muito curta', colorClass: 'bg-pink-600', gradientClass: 'from-pink-600 to-pink-500' };
    }
  }, [password]);

  // 3D Card Tilt Mouse Handling
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Controlled tilt angles for comfortable reading without distortion
    const rotateY = (x / (rect.width / 2)) * 4.5;
    const rotateX = -(y / (rect.height / 2)) * 4.5;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // Form Submit Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (authMode === 'signup' && !fullName.trim()) {
      showToast('Nome obrigatório', 'Por favor, informe seu nome completo.', 'error');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      showToast('E-mail inválido', 'Insira um endereço de e-mail válido.', 'error');
      return;
    }

    if (password.length < 6) {
      showToast('Senha muito curta', 'A senha deve conter no mínimo 6 caracteres.', 'error');
      return;
    }

    if (authMode === 'signup' && !agreeTerms) {
      showToast('Termos de Uso', 'Você precisa concordar com os termos para continuar.', 'error');
      return;
    }

    setIsSubmitting(true);
    setIsHappy(true);

    setTimeout(() => {
      setIsSubmitting(false);
      showToast(
        authMode === 'signup' ? '🎉 Conta criada com sucesso!' : '✨ Login realizado!',
        authMode === 'signup' 
          ? `Bem-vindo(a) ao SAVYRON, ${fullName || 'Usuário'}!` 
          : `Bem-vindo(a) de volta ao SAVYRON!`,
        'success'
      );
      setTimeout(() => setIsHappy(false), 3000);
    }, 1100);
  };

  const showToast = (title: string, desc: string, type: 'success' | 'error') => {
    setToastMessage({ title, desc, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  return (
    <div className="relative z-10 w-full max-w-3xl lg:max-w-[800px] mx-auto px-3 sm:px-4 py-2 sm:py-3 flex flex-col items-center justify-center">
      {/* Dynamic Toast Feedback */}
      {toastMessage && (
        <div 
          className={`fixed top-4 right-4 z-50 flex items-start gap-2.5 p-3.5 rounded-2xl border backdrop-blur-xl shadow-2xl transition-all duration-300 transform translate-y-0 ${
            toastMessage.type === 'success' 
              ? 'bg-emerald-950/85 border-emerald-500/40 text-emerald-100 shadow-emerald-900/30' 
              : 'bg-rose-950/85 border-rose-500/40 text-rose-100 shadow-rose-900/30'
          }`}
        >
          {toastMessage.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
          ) : (
            <ShieldCheck className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" />
          )}
          <div>
            <h4 className="font-semibold text-xs sm:text-sm">{toastMessage.title}</h4>
            <p className="text-[11px] text-white/80 mt-0.5">{toastMessage.desc}</p>
          </div>
        </div>
      )}

      {/* 3D Tilt Wrapper */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: tilt.x === 0 && tilt.y === 0 ? 'transform 0.5s ease-out' : 'transform 0.1s ease-out',
        }}
        className="w-full relative glass-panel rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-7 transition-shadow duration-300"
      >
        {/* Subtle top glare reflection */}
        <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent" />

        {/* Header Bar */}
        <div className="flex items-start justify-between gap-3 mb-3.5 sm:mb-4.5">
          {/* Title and Decorative Gradient Bar */}
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-white tracking-tight leading-tight font-display">
              {authMode === 'signup' ? (
                <>
                  Junte-se ao<br />Futuro
                </>
              ) : (
                <>
                  Bem-vindo<br />de Volta
                </>
              )}
            </h1>
            {/* Pink to Cyan Decorative Underline Bar */}
            <div className="mt-2 h-1 w-16 sm:w-20 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 shadow-[0_0_10px_rgba(236,72,153,0.5)]" />
          </div>

          {/* Top-Right Pill Badge & Mascot Preview */}
          <div className="flex flex-col items-end gap-1.5 sm:gap-2">
            <button
              onClick={() => {
                setAuthMode(authMode === 'signup' ? 'login' : 'signup');
                setIsHappy(true);
                setTimeout(() => setIsHappy(false), 800);
              }}
              id="toggle-auth-badge"
              className="group glass-badge px-3 py-1 rounded-full flex items-center gap-1.5 text-[11px] font-medium text-white/90 hover:text-white hover:border-pink-500/50 transition-all duration-300 cursor-pointer shadow-md"
              title="Alternar entre Login e Cadastro"
            >
              <span>{authMode === 'signup' ? 'Já tenho conta' : 'Criar nova conta'}</span>
              <span className="w-5 h-5 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-white shadow-[0_0_6px_rgba(236,72,153,0.7)] group-hover:scale-110 transition-transform">
                <Lock className="w-2.5 h-2.5" />
              </span>
            </button>

            {/* Positioned Cute Mascot */}
            <div className="mr-1">
              <AnimatedMascot
                pupilX={pupilX}
                pupilY={pupilY}
                isCoveringEyes={isPasswordFocused}
                isPeeking={showPassword && isPasswordFocused}
                isHappy={isHappy || passwordStrength.score === 4}
                activeField={activeField}
              />
            </div>
          </div>
        </div>

        {/* Main Grid Content: Left Form + Right Testimonial */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-7 items-start">
          {/* Left Column: Form Fields */}
          <form onSubmit={handleSubmit} className="lg:col-span-7 flex flex-col space-y-3 sm:space-y-3.5" id="auth-form">
            {/* Full Name Field (Cadastro only) */}
            {authMode === 'signup' && (
              <div className="relative flex flex-col space-y-0.5 group">
                <label className="text-[11px] font-semibold text-white/70 tracking-wide uppercase">
                  Nome Completo
                </label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    id="input-fullname"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    onFocus={() => setActiveField('name')}
                    onBlur={() => setActiveField('none')}
                    placeholder="Seu nome completo"
                    className="w-full bg-transparent text-white text-sm py-1.5 px-0 placeholder-white/30 border-b border-white/20 focus:border-cyan-400 focus:outline-none transition-colors duration-300"
                    autoComplete="name"
                  />
                  <User className="w-3.5 h-3.5 text-white/40 absolute right-1 pointer-events-none group-focus-within:text-cyan-400 transition-colors" />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div className="relative flex flex-col space-y-0.5 group">
              <label className="text-[11px] font-semibold text-white/70 tracking-wide uppercase">
                E-mail
              </label>
              <div className="relative flex items-center">
                <input
                  type="email"
                  id="input-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setActiveField('email')}
                  onBlur={() => setActiveField('none')}
                  placeholder="exemplo@savyron.com"
                  className="w-full bg-transparent text-white text-sm py-1.5 px-0 placeholder-white/30 border-b border-white/20 focus:border-cyan-400 focus:outline-none transition-colors duration-300"
                  autoComplete="email"
                />
                <Mail className="w-3.5 h-3.5 text-white/40 absolute right-1 pointer-events-none group-focus-within:text-cyan-400 transition-colors" />
              </div>
            </div>

            {/* Password Field */}
            <div className="relative flex flex-col space-y-0.5 group">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-semibold text-white/70 tracking-wide uppercase">
                  Senha
                </label>
                {authMode === 'login' && (
                  <button 
                    type="button" 
                    onClick={() => showToast('Recuperação de Senha', 'Enviamos o link de redefinição para seu e-mail.', 'success')}
                    className="text-[11px] text-pink-400 hover:text-pink-300 transition-colors"
                  >
                    Esqueceu a senha?
                  </button>
                )}
              </div>

              <div className="relative flex items-center">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="input-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => {
                    setActiveField('password');
                    setIsPasswordFocused(true);
                  }}
                  onBlur={() => {
                    setActiveField('none');
                    setIsPasswordFocused(false);
                  }}
                  placeholder="••••••••••••"
                  className="w-full bg-transparent text-white text-sm py-1.5 pr-8 pl-0 placeholder-white/30 border-b border-white/20 focus:border-pink-500 focus:outline-none transition-colors duration-300 tracking-wider"
                  autoComplete={authMode === 'signup' ? 'new-password' : 'current-password'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  id="toggle-password-visibility"
                  className="absolute right-1 text-white/50 hover:text-white p-0.5 rounded transition-colors cursor-pointer"
                  title={showPassword ? 'Ocultar senha' : 'Ver senha (mascote vai espiar!)'}
                >
                  {showPassword ? (
                    <EyeOff className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                  ) : (
                    <Eye className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              {/* Password Strength Bar (Real-time colored indicator) */}
              {authMode === 'signup' && (
                <div className="pt-1">
                  <div className="flex items-center justify-between text-[10px] mb-0.5">
                    <span className="text-white/60">Força da senha:</span>
                    <span className={`font-semibold ${
                      passwordStrength.score >= 3 ? 'text-cyan-300' : passwordStrength.score === 2 ? 'text-amber-300' : 'text-pink-300'
                    }`}>
                      {passwordStrength.label}
                    </span>
                  </div>
                  <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden flex gap-1 p-0.5">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 bg-gradient-to-r ${passwordStrength.gradientClass}`}
                      style={{ width: `${Math.max(passwordStrength.score * 25, 8)}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Terms Checkbox (Cadastro only) */}
            {authMode === 'signup' && (
              <label className="flex items-center gap-2 pt-0.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  id="checkbox-terms"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-3.5 h-3.5 rounded border-white/30 text-pink-500 focus:ring-pink-500 focus:ring-offset-0 bg-white/10 accent-pink-500 cursor-pointer"
                />
                <span className="text-[11px] text-white/75 hover:text-white transition-colors leading-tight">
                  Concordo com os <span className="underline decoration-pink-500/60 font-medium">Termos de Uso</span> e <span className="underline decoration-cyan-500/60 font-medium">Privacidade</span>
                </span>
              </label>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              id="submit-auth-btn"
              disabled={isSubmitting}
              className="w-full mt-1 relative group overflow-hidden rounded-xl py-2.5 px-5 font-semibold text-sm text-white tracking-wide shadow-md shadow-pink-500/20 hover:shadow-pink-500/35 active:scale-[0.99] transition-all duration-300 cursor-pointer"
            >
              {/* Vibrant Pink-Magenta to Electric Blue Gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#f43f5e] via-[#d946ef] to-[#06b6d4] group-hover:opacity-95 transition-opacity" />
              {/* Shimmer light reflection effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              
              <span className="relative flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processando...</span>
                  </>
                ) : (
                  <>
                    <span>{authMode === 'signup' ? 'Cadastrar' : 'Entrar na Conta'}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </span>
            </button>

            {/* Bottom Toggle Link */}
            <div className="text-center pt-1">
              <button
                type="button"
                onClick={() => setAuthMode(authMode === 'signup' ? 'login' : 'signup')}
                className="text-[11px] text-white/60 hover:text-white transition-colors cursor-pointer"
              >
                {authMode === 'signup' ? (
                  <>Já tem uma conta? <strong className="text-cyan-300 font-semibold underline decoration-cyan-400/50">Fazer login</strong></>
                ) : (
                  <>Ainda não tem conta? <strong className="text-pink-300 font-semibold underline decoration-pink-400/50">Criar cadastro gratuito</strong></>
                )}
              </button>
            </div>
          </form>

          {/* Right Column: Glass Testimonial & Security Badge */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-3.5 pt-2 lg:pt-0 border-t lg:border-t-0 lg:border-l border-white/10 lg:pl-6">
            {/* Motivational Quote Frosted Box */}
            <div className="glass-quote rounded-xl p-3.5 sm:p-4 relative overflow-hidden">
              {/* Quote mark decoration */}
              <div className="text-4xl font-serif text-white/15 leading-none absolute -top-1 left-2.5 select-none pointer-events-none">
                “
              </div>
              <p className="text-[11px] sm:text-xs text-white/90 leading-relaxed relative z-10 pt-1.5 font-normal">
                Cada oportunidade que você não perde é um cliente a mais amanhã. A SAVYRON trabalha com inteligência artificial enquanto você foca no que realmente importa: vender e crescer.
              </p>
              <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between">
                <div>
                  <h5 className="text-[11px] font-bold text-pink-300 tracking-wide">SAVYRON</h5>
                  <p className="text-[9.5px] text-white/60">Inteligência Comercial & IA</p>
                </div>
                <Sparkles className="w-3.5 h-3.5 text-cyan-400/80 animate-pulse" />
              </div>
            </div>

            {/* Extra Benefit highlights */}
            <div className="space-y-1.5 px-0.5">
              <div className="flex items-center gap-2 text-[11px] text-white/80">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee] shrink-0" />
                <span>Prospecção inteligente de clientes</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-white/80">
                <div className="w-1.5 h-1.5 rounded-full bg-pink-400 shadow-[0_0_6px_#f472b6] shrink-0" />
                <span>Mascote reativo e intuitivo</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-white/80">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_6px_#c084fc] shrink-0" />
                <span>Automação e segurança criptográfica</span>
              </div>
            </div>

            {/* Bottom Pill Badge: Secure & Encrypted */}
            <div className="glass-badge px-3.5 py-2 rounded-full flex items-center justify-between text-[11px] text-white/90 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white shadow-[0_0_6px_rgba(139,92,246,0.6)]">
                  <ShieldCheck className="w-3 h-3" />
                </span>
                <span className="font-medium tracking-wide">Seguro & Criptografado</span>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399] animate-ping" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
