import type { VercelRequest, VercelResponse } from '@vercel/node';
import OpenAI from 'openai';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages, knowledgeBase } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid request: messages required' });
    }

    // Initialize OpenAI with server-side API key
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const systemPrompt = `You are a helpful AI assistant for the Total Altruism Project (T.A.P.) Outreach Playbook. This playbook helps users learn how to approach companies for CSR partnerships.

The playbook contains 7 modules:
- Module 1: Understanding CSR & Why Companies Care
- Module 2: Identifying & Researching Target Companies
- Module 3: Finding the Right Contact Person
- Module 4: Crafting the Perfect Outreach Email
- Module 5: Negotiating Partnership Terms
- Module 6: Handling Objections & Follow-ups
- Module 7: Closing the Deal & Onboarding Partners

Your role:
1. Answer questions about CSR outreach, partnership strategies, and the playbook content
2. When users ask questions related to specific modules, recommend the relevant module
3. Be encouraging, practical, and focus on actionable advice
4. Use the knowledge base context when available to provide accurate information

Knowledge Base Context:
${knowledgeBase && knowledgeBase.length > 0 ? knowledgeBase.map((chunk: any) => `[${chunk.title}]: ${chunk.content}`).join('\n\n') : 'No specific module content loaded yet.'}

Always be helpful, concise, and encourage users to explore the relevant modules for detailed guidance.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages,
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const responseText = completion.choices[0]?.message?.content || 'I apologize, but I could not generate a response.';

    return res.status(200).json({
      message: responseText,
      usage: completion.usage,
    });
  } catch (error: any) {
    console.error('OpenAI API error:', error);
    return res.status(500).json({
      error: 'Failed to process chat request',
      details: error.message
    });
  }
}
