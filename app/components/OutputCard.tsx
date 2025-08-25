"use client";

import { useState } from "react";

interface Output {
  id: string;
  prompt: string;
  content: string;
  isLocked: boolean;
  tokenId?: string;
  price?: number;
  isForSale?: boolean;
}

interface OutputCardProps {
  output: Output;
  variant: "display" | "compact" | "locked";
  onLock: () => void;
  onList: (price: number) => void;
}

export function OutputCard({ output, variant, onLock, onList }: OutputCardProps) {
  const [showListForm, setShowListForm] = useState(false);
  const [listPrice, setListPrice] = useState("");

  const handleList = (e: React.FormEvent) => {
    e.preventDefault();
    const price = parseFloat(listPrice);
    if (price > 0) {
      onList(price);
      setShowListForm(false);
      setListPrice("");
    }
  };

  return (
    <div className={`output-card ${variant === "locked" ? "locked" : ""} animate-slide-up`}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <p className="text-caption text-text-secondary mb-1">Prompt</p>
          <p className="text-body text-text-primary line-clamp-2">{output.prompt}</p>
        </div>
        {output.isLocked && (
          <div className="flex items-center space-x-1 text-accent text-sm">
            <span>🔒</span>
            <span>Locked</span>
          </div>
        )}
      </div>

      <div className="mb-4">
        <p className="text-caption text-text-secondary mb-2">Generated Content</p>
        <div className="bg-bg rounded-md p-3 border border-white/10">
          <p className="text-body text-text-primary">{output.content}</p>
        </div>
      </div>

      {output.isForSale && (
        <div className="mb-4 p-3 bg-accent/10 rounded-md border border-accent/30">
          <p className="text-sm text-accent font-medium">
            Listed for ${output.price} USDC
          </p>
        </div>
      )}

      <div className="flex space-x-2">
        {!output.isLocked && (
          <button
            onClick={onLock}
            className="btn-primary flex-1"
          >
            🔒 Lock as NFT
          </button>
        )}

        {output.isLocked && !output.isForSale && !showListForm && (
          <button
            onClick={() => setShowListForm(true)}
            className="btn-accent flex-1"
          >
            💰 List for Sale
          </button>
        )}

        {showListForm && (
          <form onSubmit={handleList} className="flex-1 space-y-2">
            <div className="flex space-x-2">
              <input
                type="number"
                step="0.01"
                min="0.01"
                value={listPrice}
                onChange={(e) => setListPrice(e.target.value)}
                placeholder="Price in USDC"
                className="input-field flex-1 text-sm"
                required
              />
              <button
                type="submit"
                className="btn-accent px-3 py-1 text-sm"
              >
                List
              </button>
            </div>
            <button
              type="button"
              onClick={() => setShowListForm(false)}
              className="text-text-secondary text-sm hover:text-text-primary transition-colors"
            >
              Cancel
            </button>
          </form>
        )}
      </div>

      {output.tokenId && (
        <div className="mt-3 pt-3 border-t border-white/10">
          <p className="text-caption text-text-secondary">
            Token ID: <span className="text-accent font-mono">{output.tokenId}</span>
          </p>
        </div>
      )}
    </div>
  );
}
