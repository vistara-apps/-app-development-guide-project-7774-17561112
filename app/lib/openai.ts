
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  dangerouslyAllowBrowser: true,
});

export async function generateAIContent(prompt: string, agentType: string) {
  try {
    const systemPrompts = {
      text: "You are a creative writing assistant. Generate engaging, original text content based on the user's prompt.",
      image: "You are an image prompt specialist. Create detailed, vivid descriptions for image generation based on the user's request.",
      code: "You are a coding assistant. Generate clean, well-commented code based on the user's requirements.",
      creative: "You are a creative AI assistant. Generate unique, imaginative content that pushes creative boundaries."
    };

    const completion = await openai.chat.completions.create({
      model: 'google/gemini-2.0-flash-001',
      messages: [
        {
          role: 'system',
          content: systemPrompts[agentType as keyof typeof systemPrompts] || systemPrompts.creative
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 1000,
      temperature: 0.8,
    });

    return completion.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('AI generation error:', error);
    throw new Error('Failed to generate AI content');
  }
}
