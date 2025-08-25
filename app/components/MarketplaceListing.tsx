"use client";

interface Output {
  id: string;
  prompt: string;
  content: string;
  isLocked: boolean;
  tokenId?: string;
  price?: number;
  isForSale?: boolean;
}

interface MarketplaceListingProps {
  output: Output;
  variant: "default" | "soldout";
  onPurchase: () => void;
}

export function MarketplaceListing({ output, variant, onPurchase }: MarketplaceListingProps) {
  return (
    <div className={`marketplace-listing ${variant === "soldout" ? "soldout" : ""} animate-slide-up`}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <p className="text-caption text-text-secondary mb-1">AI Output</p>
          <p className="text-body text-text-primary line-clamp-2">{output.prompt}</p>
        </div>
        <div className="text-right">
          <p className="text-caption text-text-secondary">Price</p>
          <p className="text-heading text-accent">${output.price} USDC</p>
        </div>
      </div>

      <div className="mb-4">
        <div className="bg-bg rounded-md p-3 border border-white/10">
          <p className="text-body text-text-primary line-clamp-3">{output.content}</p>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-caption text-text-secondary">
          Token ID: <span className="text-accent font-mono">{output.tokenId}</span>
        </div>
        
        {variant !== "soldout" && (
          <button
            onClick={onPurchase}
            className="btn-accent"
          >
            Buy Now
          </button>
        )}
        
        {variant === "soldout" && (
          <span className="text-text-secondary text-sm">Sold Out</span>
        )}
      </div>
    </div>
  );
}
