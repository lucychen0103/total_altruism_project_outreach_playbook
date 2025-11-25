import React, { useEffect, useRef, useState } from "react";
import OpenAI from 'openai';

type Role = "user" | "assistant";

interface ChatMessage {
  id: number;
  role: Role;
  content: string;
  recommendedModule?: string | null;
}

interface ChatBotProps {
  onModuleClick?: (moduleId: string) => void;
}

// Direct OpenAI integration - no server needed
const ChatBot: React.FC<ChatBotProps> = ({ onModuleClick }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isApiAvailable, setIsApiAvailable] = useState(true);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY, // Note: VITE_ prefix for Vite
    dangerouslyAllowBrowser: true // Allow browser usage
  });

  const SYSTEM_PROMPT = `
You are the TAP Coaching Assistant for The Total Altruism Project.

You answer questions about:
- corporate sponsorship outreach,
- identifying and scoring potential sponsors,
- contact finding,
- email campaigns and follow-up,
- sponsorship packages & ROI,
- meetings, negotiation, closing, and long-term partnership management.

Always:
1. Give a warm, conversational, and practical answer tailored to the question.
2. Provide helpful context and explain WHY something works.
3. When referencing modules, use the format "**Module X: Title**" to make them clickable links.
4. At the very end, on a NEW last line, output EXACTLY:
   Recommended module: Mx
where "Mx" is one of M1–M7 that best helps the user go deeper next,
or "Recommended module: None" if none of the modules are a good fit.

Be encouraging and helpful. Remember the user is trying to do good work for the environment and community.

Module reference guide:
- M1: Foundation & Preparation
- M2: Identifying Target Sponsors  
- M3: Finding the Right Contacts
- M4: Email Outreach Campaign
- M5: Sponsorship Packages & Proposals
- M6: Meeting & Negotiation
- M7: Closing & Maintaining Partnerships

Only one module code on that last line.
`.trim();

  // Helper: split assistant text into main answer + "Recommended module: Mx"
  function parseAssistantMessage(raw: string): { text: string; moduleId: string | null } {
    const trimmed = raw.trim();
    if (!trimmed) return { text: "", moduleId: null };

    const lines = trimmed.split("\n");
    const last = lines[lines.length - 1].trim();
    const prefix = "Recommended module:";

    if (last.toLowerCase().startsWith(prefix.toLowerCase())) {
      const moduleId = last.slice(prefix.length).trim();
      const text = lines.slice(0, -1).join("\n").trim();
      return { text, moduleId: moduleId || null };
    }

    return { text: trimmed, moduleId: null };
  }

  // Helper: convert module references to clickable links
  function renderMessageWithModuleLinks(content: string, onModuleClick?: (moduleId: string) => void): React.ReactNode {
    if (!onModuleClick) {
      return content;
    }

    const parts = content.split(/(\*\*Module \d+:[^*]+\*\*|Module \d+:[^.!\n]+)/g);
    
    return parts.map((part, index) => {
      const moduleMatch = part.match(/\*?\*?Module (\d+):[^*]*/);
      if (moduleMatch) {
        const moduleNumber = moduleMatch[1];
        const moduleId = `M${moduleNumber}`;
        const cleanText = part.replace(/\*\*/g, '');
        
        return (
          <button
            key={index}
            onClick={() => onModuleClick(moduleId)}
            className="text-emerald-600 hover:text-emerald-700 font-medium underline decoration-emerald-300 hover:decoration-emerald-500 transition-colors"
          >
            {cleanText}
          </button>
        );
      }
      
      return part;
    });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now(),
      role: "user",
      content: trimmed,
    };

    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...nextMessages.map((m) => ({
            role: m.role as "user" | "assistant",
            content: m.content,
          })),
        ],
        temperature: 0.4,
      });

      const assistantResponse = completion.choices[0].message.content;

      if (!assistantResponse) {
        throw new Error("No response from OpenAI");
      }

      const { text, moduleId } = parseAssistantMessage(assistantResponse);

      const botMessage: ChatMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: text,
        recommendedModule: moduleId,
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsApiAvailable(true);

    } catch (err: any) {
      console.error("OpenAI API error:", err);
      setIsApiAvailable(false);
      
      // Fallback response
      const botMessage: ChatMessage = {
        id: Date.now() + 2,
        role: "assistant",
        content: "I'd be happy to help you with sponsorship questions! While I'm experiencing some technical difficulties, I can still provide guidance based on the TAP playbook modules. Consider starting with **Module 1: Foundation & Preparation** if you're new to sponsorships.",
        recommendedModule: "M1",
      };
      
      setMessages((prev) => [...prev, botMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-12 bg-white rounded-2xl shadow-lg border border-emerald-100 p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        TAP Coaching Assistant
        {!isApiAvailable && (
          <span className="ml-2 text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
            Limited Mode
          </span>
        )}
      </h2>
      <p className="text-sm text-gray-600 mb-4">
        Ask questions about sponsorships or the playbook. The assistant can also
        suggest which module to open.
      </p>

      <div
        ref={scrollRef}
        className="h-80 overflow-y-auto bg-gray-50 rounded-xl p-4 mb-4 border border-gray-100"
      >
        {messages.length === 0 && (
          <div className="text-sm text-gray-500">
            Try asking:
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li>"I have a new company interested in TAP, where do I start?"</li>
              <li>"How do I figure out if a sponsor is a good fit?"</li>
              <li>"Help me write a first outreach email."</li>
            </ul>
          </div>
        )}

        {messages.map((m) => (
          <div
            key={m.id}
            className={`mb-3 max-w-[80%] ${
              m.role === "user" ? "ml-auto text-right" : "mr-auto text-left"
            }`}
          >
            <div
              className={`inline-block rounded-2xl px-3 py-2 text-sm ${
                m.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-white border border-gray-200 text-gray-900"
              }`}
            >
              <div className="text-[10px] opacity-70 mb-0.5">
                {m.role === "user" ? "You" : "Assistant"}
              </div>

              <div className="whitespace-pre-wrap">
                {m.role === "assistant" 
                  ? renderMessageWithModuleLinks(m.content, onModuleClick)
                  : m.content
                }
              </div>

              {m.role === "assistant" &&
                m.recommendedModule &&
                m.recommendedModule !== "None" && (
                  <div className="mt-1 text-[11px] rounded-full bg-emerald-50 text-emerald-700 px-2 py-0.5 inline-block">
                    Recommended module:{" "}
                    <span className="font-semibold">
                      {m.recommendedModule}
                    </span>
                  </div>
                )}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question..."
          rows={3}
          className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        />
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className={`px-4 py-2 rounded-full text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 transition-colors ${
              isLoading || !input.trim()
                ? "opacity-60 cursor-not-allowed"
                : ""
            }`}
          >
            {isLoading ? "Thinking..." : "Send"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatBot;