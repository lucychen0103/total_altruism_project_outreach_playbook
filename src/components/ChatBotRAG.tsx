import React, { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Minus, Maximize2 } from "lucide-react";
import OpenAI from 'openai';

type Role = "user" | "assistant";

interface ChatMessage {
  id: number;
  role: Role;
  content: string;
  recommendedModule?: string | null;
}

interface FloatingChatProps {
  onModuleClick?: (moduleId: string) => void;
  isMinimized?: boolean;
  onToggleMinimize?: (minimized: boolean) => void;
}

interface ModuleChunk {
  id: string;
  moduleId: string;
  title: string;
  content: string;
}

// Floating overlay chat that persists across navigation
const FloatingChat: React.FC<FloatingChatProps> = ({ 
  onModuleClick, 
  isMinimized: externalMinimized = false,
  onToggleMinimize 
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    // Load chat history from localStorage on init
    const savedMessages = localStorage.getItem('tap-chat-history');
    return savedMessages ? JSON.parse(savedMessages) : [];
  });
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isApiAvailable, setIsApiAvailable] = useState(true);
  const [isInitializing, setIsInitializing] = useState(true);
  const [knowledgeBase, setKnowledgeBase] = useState<ModuleChunk[]>([]);
  const [isMinimized, setIsMinimized] = useState(externalMinimized);
  const [isVisible, setIsVisible] = useState(true);
  const [newMessageCount, setNewMessageCount] = useState(0);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
  });

  // Module files mapping - updated to use uploaded files
  const moduleFiles = [
    { id: 'M1', file: '/data/modules/module1.md', title: 'Foundation & Preparation' },
    { id: 'M2', file: '/data/modules/module2.md', title: 'Identifying Target Sponsors' },
    { id: 'M3', file: '/data/modules/module3.md', title: 'Finding the Right Contacts' },
    { id: 'M4', file: '/data/modules/module4.md', title: 'Email Outreach Campaign' },
    { id: 'M5', file: '/data/modules/module5.md', title: 'Sponsorship Packages & Proposals' },
    { id: 'M6', file: '/data/modules/module6.md', title: 'Meeting & Negotiation' },
    { id: 'M7', file: '/data/modules/module7.md', title: 'Closing & Maintaining Partnerships' }
  ];

  // Sync with external minimized state
  useEffect(() => {
    setIsMinimized(externalMinimized);
  }, [externalMinimized]);

  // Initialize RAG system
  useEffect(() => {
    initializeRAG();
  }, []);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current && !isMinimized) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isMinimized]);

  // Save chat history to localStorage when messages change
  useEffect(() => {
    localStorage.setItem('tap-chat-history', JSON.stringify(messages));
  }, [messages]);

  // Count new messages when minimized
  useEffect(() => {
    if (isMinimized && messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === 'assistant') {
        setNewMessageCount(prev => prev + 1);
      }
    }
  }, [messages, isMinimized]);

  const initializeRAG = async () => {
    try {
      setIsInitializing(true);
      const cachedKB = localStorage.getItem('tap-knowledge-base');
      if (cachedKB) {
        const parsed = JSON.parse(cachedKB);
        setKnowledgeBase(parsed);
        setIsInitializing(false);
        return;
      }

      const chunks: ModuleChunk[] = [];
      for (const module of moduleFiles) {
        try {
          const response = await fetch(module.file);
          if (response.ok) {
            const content = await response.text();
            const moduleChunks = await processModuleContent(module.id, module.title, content);
            chunks.push(...moduleChunks);
          }
        } catch (err) {
          console.warn(`Could not load ${module.file}`);
        }
      }

      if (chunks.length > 0) {
        localStorage.setItem('tap-knowledge-base', JSON.stringify(chunks));
        setKnowledgeBase(chunks);
      }
    } catch (err) {
      console.error('Error initializing RAG:', err);
    } finally {
      setIsInitializing(false);
    }
  };

  const processModuleContent = async (moduleId: string, title: string, content: string): Promise<ModuleChunk[]> => {
    const chunks: ModuleChunk[] = [];
    const sections = content.split(/^(#{1,3})\s+(.+)$/gm);
    
    let currentSection = '';
    let currentTitle = title;
    
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      
      if (section.match(/^#{1,3}$/)) {
        if (i + 1 < sections.length) {
          currentTitle = sections[i + 1];
          currentSection = '';
        }
      } else if (!section.match(/^#{1,3}$/)) {
        currentSection += section;
        
        if (currentSection.trim().length > 100) {
          chunks.push({
            id: `${moduleId}-${chunks.length}`,
            moduleId,
            title: currentTitle || title,
            content: currentSection.trim()
          });
        }
      }
    }

    if (chunks.length === 0 && content.trim().length > 100) {
      chunks.push({
        id: `${moduleId}-0`,
        moduleId,
        title,
        content: content.trim()
      });
    }

    return chunks;
  };

  const searchKnowledgeBase = (query: string, topK: number = 5): ModuleChunk[] => {
    if (knowledgeBase.length === 0) return [];

    const queryLower = query.toLowerCase();
    
    // Extract meaningful keywords (nouns, verbs, domain terms)
    const keywords = queryLower
      .split(/\s+/)
      .filter(word => word.length > 2)
      .filter(word => !['how', 'what', 'when', 'where', 'why', 'the', 'and', 'for', 'with'].includes(word));

    const scored = knowledgeBase.map(chunk => {
      const contentLower = chunk.content.toLowerCase();
      const titleLower = chunk.title.toLowerCase();
      
      let score = 0;
      
      // Semantic scoring based on word boundaries
      keywords.forEach(keyword => {
        const titleMatches = (titleLower.match(new RegExp(`\\b${keyword}\\w*\\b`, 'g')) || []).length;
        const contentMatches = (contentLower.match(new RegExp(`\\b${keyword}\\w*\\b`, 'g')) || []).length;
        
        score += titleMatches * 4; // Title matches are most important
        score += contentMatches * 2; // Content matches are valuable
      });
      
      // Boost score based on module relevance to query intent
      const moduleBoost = calculateModuleRelevance(queryLower, chunk.moduleId);
      score += moduleBoost;

      return { chunk, score };
    });

    const results = scored
      .sort((a, b) => b.score - a.score)
      .slice(0, topK)
      .filter(item => item.score > 0)
      .map(item => item.chunk);

    console.log(`🔍 RAG Search: "${query}" → ${results.length} chunks from modules: ${[...new Set(results.map(r => r.moduleId))].join(', ')}`);

    return results;
  };

  // Dynamic module relevance scoring based on query intent
  const calculateModuleRelevance = (query: string, moduleId: string): number => {
    const moduleKeywords: Record<string, string[]> = {
      'M1': ['foundation', 'preparation', 'ready', 'start', 'begin', 'value', 'proposition', 'mission'],
      'M2': ['identify', 'target', 'sponsor', 'company', 'research', 'find', 'corporate', 'business'],
      'M3': ['contact', 'find', 'people', 'linkedin', 'decision', 'maker', 'email', 'address', 'person'],
      'M4': ['email', 'outreach', 'campaign', 'subject', 'line', 'follow', 'template', 'message'],
      'M5': ['proposal', 'package', 'pricing', 'roi', 'return', 'investment', 'benefits', 'tier'],
      'M6': ['meeting', 'negotiation', 'presentation', 'pitch', 'objection', 'discuss', 'present'],
      'M7': ['close', 'closing', 'partnership', 'maintain', 'relationship', 'contract', 'agreement']
    };

    const relevantKeywords = moduleKeywords[moduleId];
    if (!relevantKeywords) return 0;
    
    let relevanceScore = 0;

    relevantKeywords.forEach(keyword => {
      if (query.includes(keyword)) {
        relevanceScore += 1;
      }
    });

    return relevanceScore;
  };

  const buildSystemPromptWithContext = (relevantChunks: ModuleChunk[]): string => {
    const basePrompt = `You are the TAP Coaching Assistant for The Total Altruism Project's sponsorship outreach program.

IMPORTANT: Keep responses CONCISE and CHAT-FRIENDLY (2-4 short paragraphs max).

CONTEXT FROM TAP MODULES:
${relevantChunks.map(chunk => `
**${chunk.title} (${chunk.moduleId})**
${chunk.content}
---`).join('\n')}

RESPONSE GUIDELINES:
1. Answer using TAP context as PRIMARY source
2. Keep responses SHORT and SCANNABLE (2-4 paragraphs max)
3. Use bullet points or numbered lists when helpful
4. Reference specific TAP methods/frameworks when relevant
5. Always mention relevant modules using "**Module X: Title**" format
6. End with "Recommended module: Mx" on new line

TONE: Conversational, practical, encouraging. Think "quick expert advice" not "comprehensive guide."

Module reference: M1: Foundation, M2: Target Sponsors, M3: Contacts, M4: Email Outreach, M5: Proposals, M6: Negotiation, M7: Partnerships

Focus on ACTIONABLE next steps the user can take right now.`;

    return basePrompt;
  };

  const toggleMinimize = () => {
    const newMinimized = !isMinimized;
    setIsMinimized(newMinimized);
    onToggleMinimize?.(newMinimized);
    
    if (!newMinimized) {
      setNewMessageCount(0);
    }
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const clearChatHistory = () => {
    if (confirm('Clear all chat history? This cannot be undone.')) {
      setMessages([]);
      setNewMessageCount(0);
      localStorage.removeItem('tap-chat-history');
    }
  };

  const parseAssistantMessage = (raw: string, searchQuery: string = '', ragChunks: ModuleChunk[] = []): { text: string; moduleId: string | null } => {
    const trimmed = raw.trim();
    if (!trimmed) return { text: "", moduleId: null };

    const lines = trimmed.split("\n");
    const last = lines[lines.length - 1].trim();
    const prefix = "Recommended module:";

    if (last.toLowerCase().startsWith(prefix.toLowerCase())) {
      const moduleId = last.slice(prefix.length).trim();
      const text = lines.slice(0, -1).join("\n").trim();
      
      // Validate module ID
      const validModules = ['M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7'];
      const finalModuleId = validModules.includes(moduleId) ? moduleId : null;
      
      if (finalModuleId) {
        console.log('✅ Module recommendation found in response:', finalModuleId);
        return { text, moduleId: finalModuleId };
      }
    }

    // If no valid module recommendation found, use intelligent inference
    const inferredModule = inferModuleFromContent(trimmed, searchQuery, ragChunks);
    console.warn('⚠️ No valid module recommendation found, using intelligent inference:', inferredModule);
    
    return { text: trimmed, moduleId: inferredModule };
  };

  // Intelligent module inference based on user intent and available RAG content
  const inferModuleFromContent = (content: string, searchQuery: string = '', ragChunks: ModuleChunk[] = []): string => {
    // First priority: Use the modules that were actually found by RAG
    if (ragChunks.length > 0) {
      const moduleFrequency: Record<string, number> = {};
      ragChunks.forEach(chunk => {
        moduleFrequency[chunk.moduleId] = (moduleFrequency[chunk.moduleId] || 0) + 1;
      });
      
      // Return the module with most relevant content found
      const mostRelevantModule = Object.entries(moduleFrequency)
        .sort(([,a], [,b]) => b - a)[0]?.[0];
      
      if (mostRelevantModule) {
        console.log(`📍 Module inferred from RAG content: ${mostRelevantModule}`);
        return mostRelevantModule;
      }
    }

    // Second priority: Analyze the AI's response content for intent clues
    const contentLower = content.toLowerCase();
    const queryLower = searchQuery.toLowerCase();
    const combined = `${contentLower} ${queryLower}`;
    
    // Intent-based mapping (more flexible than exact keywords)
    const intentPatterns = [
      { pattern: /start|begin|new|ready|prepare|foundation|first|value prop/i, module: 'M1', confidence: 'high' },
      { pattern: /research|identify|find.*compan|target|sponsor.*who/i, module: 'M2', confidence: 'high' },
      { pattern: /contact|person|linkedin|find.*people|decision.*maker/i, module: 'M3', confidence: 'high' },
      { pattern: /email|outreach|message|subject|template|campaign/i, module: 'M4', confidence: 'high' },
      { pattern: /proposal|package|pricing|roi|benefit|tier|offer/i, module: 'M5', confidence: 'high' },
      { pattern: /meeting|negotiat|present|pitch|discuss|objection/i, module: 'M6', confidence: 'high' },
      { pattern: /close|partnership|maintain|contract|relationship/i, module: 'M7', confidence: 'high' },
    ];

    // Find the best matching pattern
    for (const { pattern, module, confidence } of intentPatterns) {
      if (pattern.test(combined)) {
        console.log(`📍 Module inferred from intent pattern (${confidence}): ${module}`);
        return module;
      }
    }

    // Fallback: Default to M1 for beginners
    console.log('📍 Module fallback: M1 (no clear intent detected)');
    return 'M1';
  };

  const renderMessageWithModuleLinks = (content: string, onModuleClick?: (moduleId: string) => void): React.ReactNode => {
    if (!onModuleClick) return content;

    // More comprehensive module detection patterns
    const parts = content.split(/(\*\*Module \d+:[^*]+\*\*|Module \d+:[^.!\n,]+|\*\*M\d+:[^*]+\*\*|M\d+:[^.!\n,]+)/g);
    
    return parts.map((part, index) => {
      // Match various module reference formats
      const moduleMatch = part.match(/\*?\*?(Module |M)(\d+):[^*]*/i);
      if (moduleMatch) {
        const moduleNumber = moduleMatch[2];
        const moduleId = `M${moduleNumber}`;
        const cleanText = part.replace(/\*\*/g, '').trim();
        
        return (
          <button
            key={index}
            onClick={() => {
              onModuleClick(moduleId);
              setIsMinimized(true); // Minimize chat when navigating
            }}
            className="text-emerald-600 hover:text-emerald-700 font-medium underline decoration-emerald-300 hover:decoration-emerald-500 transition-colors"
          >
            {cleanText}
          </button>
        );
      }
      
      return <span key={index}>{part}</span>;
    });
  };

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
      const relevantChunks = searchKnowledgeBase(trimmed, 3);
      const systemPrompt = buildSystemPromptWithContext(relevantChunks);

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          ...nextMessages.map((m) => ({
            role: m.role as "user" | "assistant",
            content: m.content,
          })),
        ],
        temperature: 0.4,
      });

      const assistantResponse = completion.choices[0].message.content;
      if (!assistantResponse) throw new Error("No response from OpenAI");

      const { text, moduleId } = parseAssistantMessage(assistantResponse, trimmed, relevantChunks);

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
      
      const botMessage: ChatMessage = {
        id: Date.now() + 2,
        role: "assistant",
        content: "I'd be happy to help with sponsorship questions! Try starting with **Module 1: Foundation & Preparation**.",
        recommendedModule: "M1",
      };
      
      setMessages((prev) => [...prev, botMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
      isMinimized ? 'w-14 h-14' : 'w-96 h-[500px]'
    }`}>
      {/* Minimized State */}
      {isMinimized && (
        <button
          onClick={toggleMinimize}
          className="w-14 h-14 bg-emerald-600 hover:bg-emerald-700 rounded-full shadow-xl flex items-center justify-center transition-all duration-200 hover:scale-105"
        >
          <MessageCircle className="w-6 h-6 text-white" />
          {newMessageCount > 0 && (
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
              {newMessageCount > 9 ? '9+' : newMessageCount}
            </div>
          )}
        </button>
      )}

      {/* Expanded State */}
      {!isMinimized && (
        <div className="bg-white rounded-2xl shadow-2xl border border-emerald-100 overflow-hidden flex flex-col h-full">
          {/* Header */}
          <div className="bg-emerald-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              <span className="font-medium">TAP Assistant</span>
              {isInitializing && (
                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
              )}
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={clearChatHistory}
                className="p-1 hover:bg-emerald-700 rounded transition-colors"
                title="Clear Chat"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
              <button
                onClick={toggleMinimize}
                className="p-1 hover:bg-emerald-700 rounded transition-colors"
                title="Minimize"
              >
                <Minus className="w-4 h-4" />
              </button>
              <button
                onClick={toggleVisibility}
                className="p-1 hover:bg-emerald-700 rounded transition-colors"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 bg-gray-50"
          >
            {isInitializing ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-emerald-600 mx-auto mb-2"></div>
                  <div className="text-xs text-gray-600">Loading...</div>
                </div>
              </div>
            ) : messages.length === 0 ? (
              <div className="text-xs text-gray-500 text-center">
                Ask me about TAP sponsorship strategies!
              </div>
            ) : (
              messages.map((m) => (
                <div
                  key={m.id}
                  className={`mb-3 ${
                    m.role === "user" ? "text-right" : "text-left"
                  }`}
                >
                  <div
                    className={`inline-block rounded-lg px-3 py-2 text-xs max-w-[80%] ${
                      m.role === "user"
                        ? "bg-emerald-600 text-white"
                        : "bg-white border border-gray-200 text-gray-900"
                    }`}
                  >
                    <div className="whitespace-pre-wrap">
                      {m.role === "assistant" 
                        ? renderMessageWithModuleLinks(m.content, onModuleClick)
                        : m.content
                      }
                    </div>

                    {m.role === "assistant" &&
                      m.recommendedModule &&
                      m.recommendedModule !== "None" &&
                      m.recommendedModule !== "" && (
                        <div className="mt-2 text-[10px] rounded-full bg-emerald-50 text-emerald-700 px-2 py-1 inline-block">
                          <span className="text-gray-500">Suggested: </span>
                          <button
                            onClick={() => {
                              onModuleClick?.(m.recommendedModule!);
                              setIsMinimized(true);
                            }}
                            className="font-semibold hover:underline"
                          >
                            {m.recommendedModule}
                          </button>
                        </div>
                      )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-200 bg-white">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isInitializing ? "Loading..." : "Ask a question..."}
                disabled={isInitializing}
                className="flex-1 text-xs border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-emerald-500 disabled:bg-gray-100"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim() || isInitializing}
                className="px-3 py-1 bg-emerald-600 text-white rounded-lg text-xs font-medium hover:bg-emerald-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? "..." : "Send"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingChat;