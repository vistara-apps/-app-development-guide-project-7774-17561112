import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // In a real implementation, this would fetch from database
    // based on the authenticated user's wallet address
    
    const mockOutputs = [
      {
        id: 'output_1',
        prompt: 'Write a short story about a robot learning to paint',
        content: 'In the quiet corner of an art studio, Unit-7 carefully dipped its mechanical brush into cerulean blue. For months, it had observed humans create beauty from chaos, and now it yearned to understand this mysterious process called "art." Each stroke was calculated, yet somehow, something magical began to emerge on the canvas...',
        agentType: 'creative',
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        isLocked: true,
        tokenId: 'token_123',
      },
      {
        id: 'output_2',
        prompt: 'Create a marketing strategy for a sustainable fashion brand',
        content: 'EcoThreads Marketing Strategy:\n\n1. Brand Positioning: "Fashion that doesn\'t cost the Earth"\n2. Target Audience: Environmentally conscious millennials and Gen Z\n3. Key Channels: Instagram, TikTok, sustainable lifestyle blogs\n4. Partnerships: Environmental influencers, eco-friendly events\n5. Unique Value Prop: 100% recycled materials, carbon-neutral shipping',
        agentType: 'text',
        timestamp: new Date(Date.now() - 172800000).toISOString(),
        isLocked: false,
      }
    ];

    return NextResponse.json({ outputs: mockOutputs });
  } catch (error) {
    console.error('Fetch outputs error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch outputs' },
      { status: 500 }
    );
  }
}
