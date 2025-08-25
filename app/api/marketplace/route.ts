import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const filter = searchParams.get('filter') || 'all';

    // In a real implementation, this would fetch from database
    // with proper filtering and pagination
    
    const mockListings = [
      {
        id: 'listing_1',
        prompt: 'Design a logo for a tech startup',
        content: 'Logo Concept: "NeuralLink Solutions"\n\nDesign Elements:\n- Modern, minimalist typography\n- Neural network-inspired icon with interconnected nodes\n- Color palette: Deep blue (#1a365d) and electric cyan (#00d4ff)\n- Scalable vector format\n- Works on both light and dark backgrounds\n\nThe logo symbolizes connectivity, innovation, and the future of technology.',
        agentType: 'creative',
        timestamp: new Date(Date.now() - 259200000).toISOString(),
        isLocked: true,
        tokenId: 'token_456',
        price: '25',
        seller: '0xabcd...1234',
      },
      {
        id: 'listing_2',
        prompt: 'Write a Python function to analyze social media sentiment',
        content: '```python\nimport re\nfrom textblob import TextBlob\n\ndef analyze_sentiment(text):\n    """\n    Analyze sentiment of social media text\n    Returns: dict with polarity, subjectivity, and classification\n    """\n    # Clean text\n    cleaned = re.sub(r\'http\\S+|@\\w+|#\\w+\', \'\', text)\n    \n    # Analyze sentiment\n    blob = TextBlob(cleaned)\n    \n    return {\n        \'polarity\': blob.sentiment.polarity,\n        \'subjectivity\': blob.sentiment.subjectivity,\n        \'classification\': \'positive\' if blob.sentiment.polarity > 0 else \'negative\' if blob.sentiment.polarity < 0 else \'neutral\'\n    }\n```',
        agentType: 'code',
        timestamp: new Date(Date.now() - 345600000).toISOString(),
        isLocked: true,
        tokenId: 'token_789',
        price: '15',
        seller: '0xefgh...5678',
      }
    ];

    const filteredListings = filter === 'all' 
      ? mockListings 
      : mockListings.filter(listing => listing.agentType === filter);

    return NextResponse.json({ listings: filteredListings });
  } catch (error) {
    console.error('Fetch marketplace error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch marketplace listings' },
      { status: 500 }
    );
  }
}
