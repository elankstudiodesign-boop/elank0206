import React, { useState } from 'react';

interface AuthOverlayProps {
  onUnlock: () => void;
}

export const AuthOverlay: React.FC<AuthOverlayProps> = ({ onUnlock }) => {
  const [key, setKey] = useState('');
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const handleUnlock = () => {
    if (key === '2024' || key === '2025') {
      setIsVisible(false);
      setTimeout(onUnlock, 1000); // Wait for transition
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  if (!isVisible) return null;

  return (
    <div className={`auth-overlay ${!isVisible ? 'opacity-0' : ''}`}>
      <div className="auth-card animate-in zoom-in duration-700">
        <h1 className="font-[Space_Grotesk] text-[2.5rem] font-bold text-[var(--gold)] tracking-[4px] mb-2 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">ELANK STUDIO</h1>
        <p className="text-[0.7rem] tracking-[6px] text-[#888] uppercase mb-10">CỔNG KỸ THUẬT MÙI HƯƠNG CAO CẤP</p>
        
        <div className="relative w-[300px] mx-auto my-8 group">
          <input
            type={showPassword ? "text" : "password"}
            className="auth-input focus:border-[var(--gold)] transition-colors"
            placeholder="MÃ TRUY CẬP"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
          />
          <span 
            className="absolute right-0 top-4 cursor-pointer text-[0.6rem] text-[#555] tracking-[1px] hover:text-[var(--gold)] transition-colors"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "ẨN" : "HIỆN"}
          </span>
        </div>

        {error && (
            <div className="text-[var(--error)] text-[0.7rem] mt-2 mb-4 tracking-[1px] animate-pulse font-medium bg-[rgba(255,0,0,0.1)] py-1 rounded">
            Mã truy cập không hợp lệ.
            </div>
        )}

        <br />
        <button
          className="btn-custom px-12 py-4 border-[var(--gold)] text-[var(--gold)] font-bold text-[0.75rem] tracking-[3px] hover:bg-[var(--gold)] hover:text-black hover:shadow-[0_0_20px_var(--gold-dim)] transition-all duration-300"
          onClick={handleUnlock}
        >
          TRUY CẬP HỆ THỐNG
        </button>
      </div>
    </div>
  );
};
