import { useState, useEffect } from 'react';
import { X, Send, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  recommendation?: string;
  why?: string;
  expectedImpact?: string;
  confidence?: number;
  sources?: string[];
}

interface AiPanelProps {
  context?: string;
}

export function AiPanel({ context = 'farmer' }: AiPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [expandedMessage, setExpandedMessage] = useState<string | null>(null);

  const suggestedPrompts = context === 'farmer'
    ? [
        'What should I plant this season?',
        'How can I improve my soil health?',
        'When should I harvest my tomatoes?',
        'What is the best price to sell wheat?',
        'How do I control late blight?',
      ]
    : [
        'What fresh produce is available near me?',
        'Which farmers sell organic vegetables?',
        'Tell me about seasonal fruits',
        'What is the best price for tomatoes?',
        'Who delivers in my area?',
      ];

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          role: 'assistant',
          content: `Hello! I'm AgriAI, your intelligent farming assistant. How can I help you today?`,
        },
      ]);
    }
  }, [isOpen]);

  const mockResponses: Record<string, Omit<Message, 'role'>> = {
    'What should I plant this season?': {
      content: 'Based on current weather patterns and soil conditions in Punjab, here are my recommendations:',
      recommendation: 'Plant Wheat (Variety: HD-3086) in the North Field and Rice (Basmati 1121) in the South Field',
      why: 'Weather forecast shows optimal conditions for wheat planting in the next 2 weeks. Soil nitrogen levels are adequate for wheat. Rice varieties show 15% higher yield potential this season.',
      expectedImpact: 'Expected 20% increase in yield and 15% reduction in water usage with optimized crop selection',
      confidence: 87,
      sources: ['IMD Weather Data', 'ICAR Crop Advisory', 'Punjab Agricultural University'],
    },
    'How can I improve my soil health?': {
      content: 'Based on your recent soil test results:',
      recommendation: 'Apply 2 tons of vermicompost per acre and reduce chemical fertilizer usage by 20%',
      why: 'Your soil organic matter is at 0.8%, below the optimal 1.5% for your soil type. Microbial activity analysis shows deficiency in beneficial bacteria.',
      expectedImpact: 'Improvement in soil health score from 65 to 85 within 6 months. 10-15% increase in crop yield.',
      confidence: 82,
      sources: ['Soil Health Card Data', 'ICAR Guidelines', 'Local Soil Testing Lab'],
    },
    'When should I harvest my tomatoes?': {
      content: 'Based on growth stage analysis and weather forecast:',
      recommendation: 'Start harvesting in 12-15 days for optimal ripeness',
      why: 'Your tomatoes are currently in the flowering stage (85% complete). Temperature forecast shows ideal conditions for fruit development. Harvesting too early reduces yield; too late increases spoilage risk.',
      expectedImpact: 'Maximize yield by 8-10% and reduce post-harvest loss by 15%',
      confidence: 91,
      sources: ['Growth Stage Analysis', 'Weather Forecast', 'Market Price Trends'],
    },
    'What is the best price to sell wheat?': {
      content: 'Current market analysis for your region:',
      recommendation: 'Hold for 2-3 weeks and sell at expected price of Rs. 2350/quintal',
      why: 'Current price is Rs. 2275/quintal. AI predicts 3.3% increase due to rising demand from flour mills and export opportunities. MSP is Rs. 2275/quintal.',
      expectedImpact: 'Additional revenue of Rs. 75/quintal (~Rs. 31,500 for 420 quintals)',
      confidence: 78,
      sources: ['Mandi Price Data', 'Demand Forecast', 'Export Market Trends'],
    },
    'How do I control late blight?': {
      content: 'Immediate action required for your tomato crop:',
      recommendation: 'Apply copper oxychloride (0.3%) spray immediately. Repeat every 7 days. Remove affected leaves.',
      why: 'Humidity levels above 80% combined with temperature between 20-25°C create ideal conditions for late blight. Your crop shows 72% probability of infection.',
      expectedImpact: 'Prevent 40-60% yield loss if treated within 48 hours',
      confidence: 89,
      sources: ['Disease Detection AI', 'ICAR Plant Pathology', 'Local Agriculture Dept'],
    },
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = mockResponses[input] || {
        content: 'I understand your question. Let me analyze the available data...',
        recommendation: 'Based on current conditions, I recommend monitoring your crops daily and applying preventive measures.',
        why: 'The current weather pattern and soil conditions suggest standard care practices will be effective.',
        expectedImpact: 'Expected positive outcome with consistent monitoring.',
        confidence: 75,
        sources: ['General Advisory', 'Best Practices'],
      };

      setMessages((prev) => [...prev, { ...response, role: 'assistant' }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-primary text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-110"
        >
          <Sparkles className="w-6 h-6" />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[420px] h-[600px] bg-surface rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-primary text-white">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              <h3 className="font-bold">AgriAI Assistant</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] rounded-2xl p-4 ${
                    msg.role === 'user'
                      ? 'bg-primary text-white'
                      : 'bg-gray-50 text-text border border-gray-100'
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                  {msg.recommendation && (
                    <div className="mt-3">
                      <button
                        onClick={() => setExpandedMessage(expandedMessage === idx.toString() ? null : idx.toString())}
                        className="flex items-center gap-1 text-xs font-bold text-primary"
                      >
                        {expandedMessage === idx.toString() ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                        View Detailed Analysis
                      </button>
                      {expandedMessage === idx.toString() && (
                        <div className="mt-3 p-3 bg-white rounded-xl border border-gray-200 space-y-2">
                          <div>
                            <p className="text-xs font-bold text-primary mb-1">Recommendation</p>
                            <p className="text-xs text-text">{msg.recommendation}</p>
                          </div>
                          <div>
                            <p className="text-xs font-bold text-primary mb-1">Why?</p>
                            <p className="text-xs text-text">{msg.why}</p>
                          </div>
                          <div>
                            <p className="text-xs font-bold text-primary mb-1">Expected Impact</p>
                            <p className="text-xs text-text">{msg.expectedImpact}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-primary">Confidence:</span>
                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div className="h-full bg-primary rounded-full" style={{ width: `${msg.confidence}%` }} />
                            </div>
                            <span className="text-xs font-bold text-text">{msg.confidence}%</span>
                          </div>
                          {msg.sources && (
                            <div>
                              <p className="text-xs font-bold text-primary mb-1">Sources</p>
                              <div className="flex flex-wrap gap-1">
                                {msg.sources.map((source, i) => (
                                  <span key={i} className="text-xs bg-gray-100 text-text-light px-2 py-0.5 rounded-full">{source}</span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-50 rounded-2xl p-3 border border-gray-100">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-3 border-t border-gray-100">
            <div className="flex flex-wrap gap-2 mb-3">
              {suggestedPrompts.slice(0, 3).map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => setInput(prompt)}
                  className="text-xs bg-gray-50 hover:bg-gray-100 text-text-light px-3 py-1.5 rounded-full transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask AgriAI anything..."
                className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="p-2.5 bg-primary text-white rounded-xl hover:bg-primary-light transition-colors disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
