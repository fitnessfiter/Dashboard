
import { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, Mic, MicOff, User, Bot, Sparkles, ThumbsUp, ThumbsDown, ChevronRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const initialChatHistory = [
  {
    type: "ai",
    message: "👋 Hi! I'm your AI Fitness Assistant. Ask me anything about your workouts, nutrition, or recovery!",
    time: "Just now",
    isWelcome: true
  },
  {
    type: "user",
    message: "Why am I plateauing on squats?",
    time: "2 min ago"
  },
  {
    type: "ai",
    message: "Based on your data, you've been squatting 225lbs for 3 weeks. Try: 1) Increase volume by 10%, 2) Add pause squats, 3) Check your sleep quality - it's been below 7hrs.",
    time: "2 min ago"
  }
];

const quickQuestions = [
  { label: "Bench Press Tips", value: "How to improve my bench press?", color: "bg-cyber-purple/20 text-cyber-purple hover:bg-cyber-purple/30" },
  { label: "Nutrition", value: "Best post-workout meal?", color: "bg-cyber-pink/20 text-cyber-pink hover:bg-cyber-pink/30" },
  { label: "Fat Loss", value: "How to lose fat without losing muscle?", color: "bg-cyber-green/20 text-cyber-green hover:bg-cyber-green/30" },
  { label: "Motivation", value: "How to stay motivated on tough days?", color: "bg-cyber-blue/20 text-cyber-blue hover:bg-cyber-blue/30" },
  { label: "Supplements", value: "Do I need supplements for muscle gain?", color: "bg-cyber-orange/20 text-cyber-orange hover:bg-cyber-orange/30" },
];

const followUpSuggestions = [
  "Show me a new workout plan",
  "How can I improve my sleep?",
  "What are good protein sources?",
  "How to recover faster?"
];

export function AIAssistant() {
  const [message, setMessage] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [history, setHistory] = useState(initialChatHistory);
  const [highlightIndex, setHighlightIndex] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<{ [key: number]: "up" | "down" | null }>({});
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (highlightIndex !== null) {
      const timer = setTimeout(() => setHighlightIndex(null), 1200);
      return () => clearTimeout(timer);
    }
  }, [highlightIndex]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, isTyping]);

  const handleSend = () => {
    if (message.trim()) {
      setHistory([
        ...history,
        { type: "user", message, time: "Just now" },
      ]);
      setMessage("");
      setIsTyping(true);
      setTimeout(() => {
        const aiMsg = {
          type: "ai",
          message: "Here's a demo AI response to your question! (Try asking about nutrition, recovery, or training.)",
          time: "Just now"
        };
        setHistory((prev) => [...prev, aiMsg]);
        setHighlightIndex(history.length + 1);
        setIsTyping(false);
      }, 1200);
    }
  };

  const toggleVoice = () => {
    setIsListening(!isListening);
  };

  const handleFeedback = (idx: number, type: "up" | "down") => {
    setFeedback((prev) => ({ ...prev, [idx]: type }));
  };

  return (
    <Card className="glass border-cyber-purple/30 neon-glow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MessageSquare className="h-5 w-5 text-cyber-blue" />
            <CardTitle className="text-cyber-white text-lg">AI Fitness Assistant</CardTitle>
          </div>
          <Badge className="bg-ai-glow text-white font-mono text-xs animate-pulse">
            ONLINE
          </Badge>
        </div>
        <CardDescription className="text-cyber-white/70">
          Ask anything about your fitness journey
        </CardDescription>
        {/* Onboarding Tip */}
        <div className="flex items-center gap-2 mt-2 p-2 rounded-lg bg-cyber-blue/10 border border-cyber-blue/20 animate-fade-in">
          <Sparkles className="h-4 w-4 text-cyber-blue" />
          <span className="text-xs text-cyber-white/80">Tip: Try asking about nutrition, recovery, or training plans!</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Chat Area Background */}
        <div className="rounded-xl p-4 bg-gradient-to-br from-cyber-black/60 to-cyber-purple/10 border border-cyber-purple/10 shadow-inner min-h-[220px] relative">
        {/* Chat History */}
          <div className="space-y-3 max-h-64 overflow-y-auto pb-2">
            {history.map((chat, index) => (
            <div
              key={index}
                className={`flex items-start gap-2 animate-fade-in ${chat.type === "user" ? "justify-end flex-row-reverse" : ""}`}
              >
                <div className="flex-shrink-0">
                  {chat.type === "user" ? (
                    <div className="w-8 h-8 rounded-full bg-cyber-blue flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-cyber-green flex items-center justify-center">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
                <div className={`relative p-3 rounded-lg max-w-xs md:max-w-md transition-all duration-500 ${
                chat.type === "user"
                    ? "bg-cyber-blue/10 border-l-2 border-cyber-blue text-right"
                    : "bg-cyber-green/10 border-l-2 border-cyber-green text-left"
                } ${highlightIndex === index ? "ring-2 ring-cyber-pink/60 bg-cyber-pink/10" : ""}`}
            >
                  <p className={`text-sm text-cyber-white mb-1 ${chat.isWelcome ? "font-semibold" : ""}`}>{chat.message}</p>
              <span className="text-xs text-cyber-white/50">{chat.time}</span>
                  {/* Feedback for AI answers */}
                  {chat.type === "ai" && !chat.isWelcome && (
                    <div className="flex gap-1 mt-1">
                      <button
                        className={`rounded-full p-1 hover:bg-cyber-green/20 ${feedback[index] === "up" ? "bg-cyber-green/30" : ""}`}
                        onClick={() => handleFeedback(index, "up")}
                        aria-label="Thumbs up"
                      >
                        <ThumbsUp className="h-4 w-4 text-cyber-green" />
                      </button>
                      <button
                        className={`rounded-full p-1 hover:bg-cyber-pink/20 ${feedback[index] === "down" ? "bg-cyber-pink/30" : ""}`}
                        onClick={() => handleFeedback(index, "down")}
                        aria-label="Thumbs down"
                      >
                        <ThumbsDown className="h-4 w-4 text-cyber-pink" />
                      </button>
                    </div>
                  )}
                  {/* Follow-up suggestions after AI answer */}
                  {chat.type === "ai" && !chat.isWelcome && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {followUpSuggestions.slice(0, 2).map((s, i) => (
                        <button
                          key={i}
                          className="flex items-center gap-1 px-2 py-1 rounded bg-cyber-blue/10 text-cyber-blue text-xs hover:bg-cyber-blue/20 transition"
                          onClick={() => setMessage(s)}
                        >
                          <ChevronRight className="h-3 w-3" /> {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
            </div>
          ))}
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-start gap-2 animate-fade-in">
                <div className="w-8 h-8 rounded-full bg-cyber-green flex items-center justify-center">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="p-3 rounded-lg bg-cyber-green/10 border-l-2 border-cyber-green max-w-xs md:max-w-md flex items-center gap-2">
                  <span className="text-sm text-cyber-white/70 flex items-center gap-1">
                    <span className="animate-pulse">AI is typing</span>
                    <span className="animate-bounce">...</span>
                  </span>
                  <span className="ml-2 animate-shimmer bg-gradient-to-r from-cyber-green/20 to-cyber-blue/20 rounded h-2 w-8 block" />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="flex space-x-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask your AI coach..."
            className="bg-cyber-black/30 border-cyber-purple/30 text-cyber-white placeholder:text-cyber-white/50"
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
          />
          <Button
            onClick={toggleVoice}
            variant="outline"
            size="icon"
            className={`border-cyber-blue ${
              isListening 
                ? "bg-cyber-blue text-white animate-pulse" 
                : "text-cyber-blue hover:bg-cyber-blue hover:text-white"
            }`}
          >
            {isListening ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
          </Button>
          <Button
            onClick={handleSend}
            size="icon"
            className="bg-neon-gradient hover:opacity-90"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>

        {/* Quick Questions */}
        <div className="flex flex-wrap gap-2">
          {quickQuestions.map((q, i) => (
          <Badge 
              key={i}
              className={`${q.color} cursor-pointer text-xs`}
              onClick={() => setMessage(q.value)}
          >
              {q.label}
          </Badge>
          ))}
        </div>

        {/* Session Summary */}
        <div className="mt-4 p-3 rounded-lg bg-cyber-purple/10 border border-cyber-purple/20 flex items-center gap-2 animate-fade-in">
          <Bot className="h-4 w-4 text-cyber-purple" />
          <span className="text-xs text-cyber-white/80">Session summary: Get personalized tips, track your progress, and ask for workout or nutrition advice anytime!</span>
        </div>
      </CardContent>
    </Card>
  );
}
