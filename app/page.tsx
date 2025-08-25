"use client";

import {
  useMiniKit,
  useAddFrame,
  useOpenUrl,
  usePrimaryButton,
  useNotification,
} from "@coinbase/onchainkit/minikit";
import {
  Name,
  Identity,
  Address,
  Avatar,
  EthBalance,
} from "@coinbase/onchainkit/identity";
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
} from "@coinbase/onchainkit/wallet";
import { useEffect, useState, useCallback } from "react";
import { AgentPromptInput } from "./components/AgentPromptInput";
import { OutputCard } from "./components/OutputCard";
import { MarketplaceListing } from "./components/MarketplaceListing";
import { WalletConnectButton } from "./components/WalletConnectButton";

type Output = {
  id: string;
  prompt: string;
  content: string;
  isLocked: boolean;
  tokenId?: string;
  price?: number;
  isForSale?: boolean;
};

export default function App() {
  const { setFrameReady, isFrameReady, context } = useMiniKit();
  const [frameAdded, setFrameAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<"generate" | "my-outputs" | "marketplace">("generate");
  const [outputs, setOutputs] = useState<Output[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState("");

  const addFrame = useAddFrame();
  const openUrl = useOpenUrl();
  const sendNotification = useNotification();

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  const handleAddFrame = useCallback(async () => {
    const result = await addFrame();
    if (result) {
      setFrameAdded(true);
      console.log('Frame added:', result.url, result.token);
    }
  }, [addFrame]);

  const handleGenerateOutput = useCallback(async (prompt: string) => {
    setIsGenerating(true);
    setCurrentPrompt(prompt);
    
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      
      const data = await response.json();
      
      const newOutput: Output = {
        id: Date.now().toString(),
        prompt,
        content: data.content,
        isLocked: false,
      };
      
      setOutputs(prev => [newOutput, ...prev]);
    } catch (error) {
      console.error('Generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  }, []);

  const handleLockOutput = useCallback(async (outputId: string) => {
    try {
      const response = await fetch('/api/lock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ outputId }),
      });
      
      const data = await response.json();
      
      setOutputs(prev => prev.map(output => 
        output.id === outputId 
          ? { ...output, isLocked: true, tokenId: data.tokenId }
          : output
      ));

      await sendNotification({
        title: 'Output Locked! 🔒',
        body: 'Your AI output has been successfully tokenized as an NFT.'
      });
    } catch (error) {
      console.error('Locking failed:', error);
    }
  }, [sendNotification]);

  const handleListForSale = useCallback(async (outputId: string, price: number) => {
    try {
      const response = await fetch('/api/list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ outputId, price }),
      });
      
      if (response.ok) {
        setOutputs(prev => prev.map(output => 
          output.id === outputId 
            ? { ...output, isForSale: true, price }
            : output
        ));

        await sendNotification({
          title: 'Listed for Sale! 💰',
          body: `Your output is now available for $${price} USDC.`
        });
      }
    } catch (error) {
      console.error('Listing failed:', error);
    }
  }, [sendNotification]);

  // Primary button configuration based on current state
  usePrimaryButton(
    {
      text: activeTab === "generate" 
        ? (isGenerating ? "Generating..." : "Generate AI Output")
        : activeTab === "my-outputs"
        ? "Create New Output"
        : "Browse Marketplace"
    },
    () => {
      if (activeTab === "generate" && !isGenerating && currentPrompt) {
        handleGenerateOutput(currentPrompt);
      } else if (activeTab !== "generate") {
        setActiveTab("generate");
      }
    }
  );

  const saveFrameButton = frameAdded ? (
    <div className="flex items-center space-x-1 text-sm font-medium text-accent animate-fade-in">
      <span>✓</span>
      <span>Saved</span>
    </div>
  ) : context && !context.client.added ? (
    <button
      onClick={handleAddFrame}
      className="text-accent text-sm font-medium hover:text-accent/80 transition-colors"
    >
      + Save Frame
    </button>
  ) : null;

  return (
    <div className="flex flex-col min-h-screen bg-bg text-text-primary">
      <div className="w-full max-w-md mx-auto px-4 py-3">
        <header className="flex justify-between items-center mb-6 h-11">
          <div className="flex items-center space-x-3">
            <h1 className="text-heading text-accent">AgentLockr</h1>
            <Wallet className="z-10">
              <ConnectWallet>
                <Name className="text-inherit text-sm" />
              </ConnectWallet>
              <WalletDropdown>
                <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                  <Avatar />
                  <Name />
                  <Address />
                  <EthBalance />
                </Identity>
                <WalletDropdownDisconnect />
              </WalletDropdown>
            </Wallet>
          </div>
          <div>{saveFrameButton}</div>
        </header>

        {/* Navigation Tabs */}
        <nav className="flex space-x-1 mb-6 bg-surface rounded-lg p-1">
          {[
            { key: "generate", label: "Generate" },
            { key: "my-outputs", label: "My Outputs" },
            { key: "marketplace", label: "Marketplace" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? "bg-accent text-black"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <main className="flex-1 space-y-6">
          {activeTab === "generate" && (
            <div className="space-y-6">
              <div className="card">
                <h2 className="text-heading mb-4">Create AI Output</h2>
                <AgentPromptInput
                  onGenerate={handleGenerateOutput}
                  isGenerating={isGenerating}
                  onPromptChange={setCurrentPrompt}
                />
              </div>
              
              {outputs.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-heading">Recent Outputs</h3>
                  {outputs.slice(0, 3).map((output) => (
                    <OutputCard
                      key={output.id}
                      output={output}
                      variant="display"
                      onLock={() => handleLockOutput(output.id)}
                      onList={(price) => handleListForSale(output.id, price)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "my-outputs" && (
            <div className="space-y-4">
              <h2 className="text-heading">My AI Outputs</h2>
              {outputs.length === 0 ? (
                <div className="card text-center py-8">
                  <p className="text-text-secondary mb-4">No outputs yet</p>
                  <button
                    onClick={() => setActiveTab("generate")}
                    className="btn-accent"
                  >
                    Create Your First Output
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {outputs.map((output) => (
                    <OutputCard
                      key={output.id}
                      output={output}
                      variant={output.isLocked ? "locked" : "compact"}
                      onLock={() => handleLockOutput(output.id)}
                      onList={(price) => handleListForSale(output.id, price)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "marketplace" && (
            <div className="space-y-4">
              <h2 className="text-heading">Marketplace</h2>
              <div className="space-y-4">
                {outputs.filter(o => o.isForSale).length === 0 ? (
                  <div className="card text-center py-8">
                    <p className="text-text-secondary mb-4">No items for sale yet</p>
                    <p className="text-caption text-text-secondary">
                      Lock your outputs and list them to start trading
                    </p>
                  </div>
                ) : (
                  outputs
                    .filter(output => output.isForSale)
                    .map((output) => (
                      <MarketplaceListing
                        key={output.id}
                        output={output}
                        variant="default"
                        onPurchase={() => console.log('Purchase:', output.id)}
                      />
                    ))
                )}
              </div>
            </div>
          )}
        </main>

        <footer className="mt-8 pt-4 flex justify-center">
          <button
            onClick={() => openUrl("https://base.org/builders/minikit")}
            className="text-text-secondary text-caption hover:text-text-primary transition-colors"
          >
            Built on Base with MiniKit
          </button>
        </footer>
      </div>
    </div>
  );
}
