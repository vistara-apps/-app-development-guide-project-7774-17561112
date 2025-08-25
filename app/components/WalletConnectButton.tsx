"use client";

import { ConnectWallet } from "@coinbase/onchainkit/wallet";

interface WalletConnectButtonProps {
  variant?: "default";
}

export function WalletConnectButton({ variant = "default" }: WalletConnectButtonProps) {
  return (
    <ConnectWallet className="btn-primary">
      Connect Wallet
    </ConnectWallet>
  );
}
