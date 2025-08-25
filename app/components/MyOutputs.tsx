"use client";

import { useState, useEffect } from "react";
import { OutputCard } from "./OutputCard";

export function MyOutputs() {
  const [outputs, setOutputs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyOutputs();
  }, []);

  const fetchMyOutputs = async () => {
    try {
      const response = await fetch('/api/my-outputs');
      const data = await response.json();
      setOutputs(data.outputs || []);
    } catch (error) {
      console.error('Failed to fetch outputs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleListForSale = async (outputId: string) => {
    // Implementation for listing output for sale
    console.log('List for sale:', outputId);
  };

  if (loading) {
    return (
      <div className="card text-center">
        <div className="animate-pulse">
          <div className="w-8 h-8 bg-accent rounded-full mx-auto mb-4"></div>
          <p className="body">Loading your outputs...</p>
        </div>
      </div>
    );
  }

  if (outputs.length === 0) {
    return (
      <div className="card text-center">
        <div className="mb-4">
          <div className="w-16 h-16 bg-surface rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-2xl">🎨</span>
          </div>
          <h3 className="heading mb-2">No Outputs Yet</h3>
          <p className="caption">Create your first AI output to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="heading">My Outputs</h2>
        <span className="caption">{outputs.length} total</span>
      </div>
      
      {outputs.map((output: any) => (
        <OutputCard
          key={output.id}
          output={output}
          variant={output.isLocked ? "locked" : "compact"}
          onList={() => handleListForSale(output.id)}
        />
      ))}
    </div>
  );
}
