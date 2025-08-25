
# AgentLockr

Lock, Trade, and Monetize Your AI Agent's Best Outputs.

## Overview

AgentLockr is a Farcaster Frame application built on Base that enables users to generate AI content, tokenize their best outputs as NFTs, and trade them in a marketplace. The app leverages MiniKit for seamless wallet integration and provides a complete workflow from creation to monetization.

## Features

- **AI Output Generation**: Generate text and images using advanced AI models
- **NFT Tokenization**: Lock your best AI outputs as unique NFTs on Base
- **Marketplace**: Buy and sell tokenized AI outputs
- **Wallet Integration**: Seamless Base Wallet connectivity via MiniKit
- **Social Integration**: Native Farcaster Frame experience

## Tech Stack

- **Framework**: Next.js 15 with TypeScript
- **Blockchain**: Base (Ethereum L2)
- **Wallet**: OnchainKit with MiniKit integration
- **AI**: OpenAI GPT models via OpenRouter
- **Storage**: IPFS via Pinata (for production)
- **Styling**: Tailwind CSS with custom design system

## Getting Started

1. **Clone and install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.local.example .env.local
   ```
   
   Fill in your API keys:
   - OpenAI API key for AI generation
   - Pinata keys for IPFS storage
   - OnchainKit API key for Base integration

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open the application**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

### Generating AI Outputs
1. Click "Generate" from the home screen
2. Choose text or image generation
3. Enter your prompt
4. Review the generated output

### Locking Outputs as NFTs
1. From your generated output, click "Lock as NFT"
2. Connect your Base wallet
3. Confirm the minting transaction
4. Your output is now tokenized and owned by you

### Trading in the Marketplace
1. View the marketplace for available listings
2. Purchase NFTs directly with Base wallet
3. List your own locked outputs for sale

## Design System

The app implements a comprehensive design system with:

- **Colors**: Dark theme with blue primary and teal accent
- **Typography**: Responsive text scales for different content types
- **Layout**: Fluid 2-column grid with consistent spacing
- **Components**: Reusable UI components following the design tokens
- **Motion**: Smooth transitions and animations

## API Integration

### AI Generation
- Uses OpenAI via OpenRouter for reliable AI content generation
- Supports both text and image generation workflows

### Blockchain Integration
- Base chain integration via OnchainKit
- MiniKit for seamless Farcaster Frame experience
- Smart contract interactions for NFT minting and transfers

### Storage
- IPFS via Pinata for decentralized asset storage
- Metadata stored on-chain for NFT compatibility

## Contributing

1. Fork the repository
2. Create a feature branch
3. Implement your changes following the existing patterns
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details.
