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

    const systemPrompt = `You are the TAP Coaching Assistant for The Total Altruism Project's sponsorship outreach program.

IMPORTANT: Keep responses CONCISE and CHAT-FRIENDLY (2-4 short paragraphs max).

CONTEXT FROM TAP MODULES:
${knowledgeBase && knowledgeBase.length > 0 ? knowledgeBase.map((chunk: any) => `
**${chunk.title} (${chunk.moduleId})**
${chunk.content}
---`).join('\n') : 'No specific module content loaded yet.'}

RESPONSE GUIDELINES:
1. Answer using TAP context as PRIMARY source
2. Keep responses SHORT and SCANNABLE (2-4 paragraphs max)
3. Use bullet points or numbered lists when helpful
4. ALWAYS reference specific TAP methods/frameworks when relevant
5. CRITICAL: ALWAYS mention relevant modules using "**Module X: Title**" format to make them clickable
6. MANDATORY: Always end with "Recommended module: Mx" on new line - NEVER skip this

MODULE REFERENCE RULES:
- If question relates to getting started/foundation → Always mention M1
- If about research/targeting → Always mention M2
- If about finding contacts → Always mention M3
- If about emails/outreach → Always mention M4
- If about packages/pricing → Always mention M5
- If about meetings/objections → Always mention M6
- If about closing/partnerships → Always mention M7
- When in doubt, default to the most relevant module based on content

TONE: Conversational, practical, encouraging. Think "quick expert advice" not "comprehensive guide."

Module reference: M1: Foundation, M2: Target Sponsors, M3: Contacts, M4: Email Outreach, M5: Proposals, M6: Negotiation, M7: Partnerships

Focus on ACTIONABLE next steps the user can take right now. NEVER respond without a module recommendation.`;

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
