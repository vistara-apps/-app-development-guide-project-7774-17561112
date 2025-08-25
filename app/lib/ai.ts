
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  dangerouslyAllowBrowser: true,
});

export async function generateTextContent(prompt: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "google/gemini-2.0-flash-001",
      messages: [
        {
          role: "system",
          content: "You are a creative AI assistant that generates high-quality, original content based on user prompts. Be creative, engaging, and provide content that users would want to own as a digital asset."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 1000,
      temperature: 0.8,
    });

    return response.choices[0]?.message?.content || "Unable to generate content at this time.";
  } catch (error) {
    console.error('AI generation error:', error);
    throw new Error('Failed to generate content');
  }
}

export async function generateImagePrompt(prompt: string): Promise<string> {
  // For demo purposes, we'll return a placeholder image URL
  // In production, this would integrate with DALL-E, Midjourney, or similar
  const imageId = Math.random().toString(36).substring(7);
  return `https://picsum.photos/400/400?random=${imageId}`;
}
