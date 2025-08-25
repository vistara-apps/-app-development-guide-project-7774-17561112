
"use client";

import { useState } from "react";

interface TokenMintButtonProps {
  outputId: string;
  onMint: (outputId: string) => Promise<void>;
  variant?: 'primary' | 'disabled';
  disabled?: boolean;
}

export function TokenMintButton({ 
  outputId, 
  onMint, 
  variant = 'primary',
  disabled = false 
}: TokenMintButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleMint = async () => {
    if (disabled || loading) return;
    
    setLoading(true);
    try {
      await onMint(outputId);
    } catch (error) {
      console.error('Minting failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleMint}
      disabled={disabled || loading}
      className={`w-full transition-all duration-200 ${
        variant === 'disabled' || disabled
          ? 'bg-surface/50 text-text-secondary cursor-not-allowed'
          : 'btn-primary hover:scale-105'
      } ${loading ? 'animate-pulse' : ''}`}
    >
      {loading ? (
        <div className="flex items-center justify-center gap-2">
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          Minting NFT...
        </div>
      ) : (
        '🔒 Lock as NFT'
      )}
    </button>
  );
}
