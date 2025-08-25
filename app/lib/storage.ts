
"use client";

import { Output, TokenizedOutput } from "../types";

// Mock storage for demo - in production this would use a real database
class MockStorage {
  private outputs: Map<string, Output> = new Map();
  private tokenizedOutputs: Map<string, TokenizedOutput> = new Map();
  private userOutputs: Map<string, string[]> = new Map();

  saveOutput(output: Output): void {
    this.outputs.set(output.outputId, output);
    
    const userOutputList = this.userOutputs.get(output.userId) || [];
    if (!userOutputList.includes(output.outputId)) {
      userOutputList.push(output.outputId);
      this.userOutputs.set(output.userId, userOutputList);
    }
  }

  getOutput(outputId: string): Output | undefined {
    return this.outputs.get(outputId);
  }

  getUserOutputs(userId: string): Output[] {
    const outputIds = this.userOutputs.get(userId) || [];
    return outputIds.map(id => this.outputs.get(id)).filter(Boolean) as Output[];
  }

  lockOutput(outputId: string, tokenId: string, contractAddress: string): void {
    const output = this.outputs.get(outputId);
    if (output) {
      output.isLocked = true;
      output.tokenId = tokenId;
      output.collectionContractAddress = contractAddress;
      this.outputs.set(outputId, output);
    }
  }

  saveTokenizedOutput(tokenizedOutput: TokenizedOutput): void {
    this.tokenizedOutputs.set(tokenizedOutput.tokenId, tokenizedOutput);
  }

  getTokenizedOutput(tokenId: string): TokenizedOutput | undefined {
    return this.tokenizedOutputs.get(tokenId);
  }

  getMarketplaceListings(): TokenizedOutput[] {
    return Array.from(this.tokenizedOutputs.values()).filter(item => item.isForSale);
  }

  updateListingPrice(tokenId: string, price: string, isForSale: boolean): void {
    const tokenized = this.tokenizedOutputs.get(tokenId);
    if (tokenized) {
      tokenized.price = price;
      tokenized.isForSale = isForSale;
      this.tokenizedOutputs.set(tokenId, tokenized);
    }
  }
}

export const storage = new MockStorage();
