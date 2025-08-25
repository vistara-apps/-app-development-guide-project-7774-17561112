"use client";

import { useState } from "react";

interface AgentPromptInputProps {
  onGenerate: (prompt: string) => void;
  isGenerating: boolean;
  onPromptChange: (prompt: string) => void;
}

export function AgentPromptInput({ onGenerate, isGenerating, onPromptChange }: AgentPromptInputProps) {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isGenerating) {
      onGenerate(prompt.trim());
    }
  };

  const handleChange = (value: string) => {
    setPrompt(value);
    onPromptChange(value);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="prompt" className="block text-sm font-medium text-text-primary mb-2">
          AI Prompt
        </label>
        <textarea
          id="prompt"
          value={prompt}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Describe what you want the AI to create..."
          className="input-field w-full h-24 resize-none"
          disabled={isGenerating}
        />
      </div>
      
      <div className="flex space-x-3">
        <button
          type="submit"
          disabled={!prompt.trim() || isGenerating}
          className="btn-accent flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <span className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
              <span>Generating...</span>
            </span>
          ) : (
            "Generate"
          )}
        </button>
      </div>
      
      {prompt.trim() && (
        <div className="text-caption text-text-secondary">
          <p>✨ Your AI will create content based on this prompt</p>
        </div>
      )}
    </form>
  );
}
