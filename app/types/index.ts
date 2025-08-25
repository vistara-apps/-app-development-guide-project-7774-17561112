
export interface User {
  farcasterId: string;
  connectedWalletAddress?: string;
  createdOutputs: Output[];
}

export interface Output {
  outputId: string;
  userId: string;
  prompt: string;
  agentType: 'text' | 'image';
  generatedContentUrl?: string;
  metadataUrl?: string;
  isLocked: boolean;
  tokenId?: string;
  collectionContractAddress?: string;
  originalPrompt: string;
  resultVersion: number;
  createdAt: Date;
}

export interface TokenizedOutput {
  tokenId: string;
  collectionContractAddress: string;
  outputId: string;
  ownerAddress: string;
  price?: string;
  isForSale: boolean;
  remixRightsEnabled: boolean;
}

export type ViewState = 'home' | 'generate' | 'outputs' | 'marketplace' | 'listing';

export interface AIGenerationRequest {
  prompt: string;
  agentType: 'text' | 'image';
}

export interface AIGenerationResponse {
  content: string;
  contentUrl?: string;
}
