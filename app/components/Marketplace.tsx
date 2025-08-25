"use client";

import { useState, useEffect } from "react";
import { OutputCard } from "./OutputCard";

export function Marketplace() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchMarketplaceListings();
  }, [filter]);

  const fetchMarketplaceListings = async () => {
    try {
      const response = await fetch(`/api/marketplace?filter=${filter}`);
      const data = await response.json();
      setListings(data.listings || []);
    } catch (error) {
      console.error('Failed to fetch listings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBuyOutput = async (outputId: string) => {
    // Implementation for buying output
    console.log('Buy output:', outputId);
  };

  if (loading) {
    return (
      <div className="card text-center">
        <div className="animate-pulse">
          <div className="w-8 h-8 bg-accent rounded-full mx-auto mb-4"></div>
          <p className="body">Loading marketplace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="heading">Marketplace</h2>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="input-field text-sm"
        >
          <option value="all">All Types</option>
          <option value="text">Text</option>
          <option value="image">Images</option>
          <option value="code">Code</option>
          <option value="creative">Creative</option>
        </select>
      </div>

      {listings.length === 0 ? (
        <div className="card text-center">
          <div className="mb-4">
            <div className="w-16 h-16 bg-surface rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl">🏪</span>
            </div>
            <h3 className="heading mb-2">No Listings Found</h3>
            <p className="caption">Be the first to list an AI output for sale!</p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {listings.map((listing: any) => (
            <OutputCard
              key={listing.id}
              output={listing}
              variant="locked"
              onBuy={() => handleBuyOutput(listing.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
