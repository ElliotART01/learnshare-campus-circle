
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Send, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { ChatMessage, sendMessageToDeepSeek, SYSTEM_PROMPTS } from "@/services/deepseekApi";

interface AIChatProps {
  chatType: "studentSupport" | "recommendations" | "contentGeneration" | "smartSearch";
  title: string;
  placeholder?: string;
  className?: string;
}

export const AIChat: React.FC<AIChatProps> = ({ 
  chatType, 
  title, 
  placeholder = "Type your message...",
  className = "" 
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useAuth();
  const { language, t } = useLanguage();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom when messages change
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: ChatMessage = {
      role: "user",
      content: input
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    try {
      // Get AI response
      const response = await sendMessageToDeepSeek(
        [...messages, userMessage],
        SYSTEM_PROMPTS[chatType]
      );
      
      // Add AI response
      setMessages((prev) => [
        ...prev, 
        { role: "assistant", content: response }
      ]);
    } catch (error) {
      console.error("Error in chat:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatMessage = (message: ChatMessage) => {
    // Split message by new lines and render paragraphs
    return message.content.split("\n").map((line, i) => 
      line ? <p key={i} className="mb-2">{line}</p> : <br key={i} />
    );
  };

  return (
    <Card className={`flex flex-col h-full ${className}`}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          {t(language, title)}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden p-0">
        <ScrollArea className="h-full max-h-[500px] px-4 py-2">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[200px] text-center px-4 text-gray-500">
              <MessageSquare className="h-10 w-10 mb-2 opacity-50" />
              <p className="text-sm">{t(language, "askMeAnything")}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div 
                  key={index} 
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div 
                    className={`
                      flex gap-2 max-w-[80%] rounded-lg p-3
                      ${message.role === "user" 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-muted"
                      }
                    `}
                  >
                    <div className="shrink-0 mt-1">
                      {message.role === "user" 
                        ? <User className="h-4 w-4" /> 
                        : <MessageSquare className="h-4 w-4" />
                      }
                    </div>
                    <div>{formatMessage(message)}</div>
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>
          )}
        </ScrollArea>
      </CardContent>
      <CardFooter className="pt-4 border-t">
        <form onSubmit={handleSendMessage} className="flex w-full gap-2">
          <Input
            placeholder={t(language, placeholder)}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            className="flex-1"
            dir={language === "ar" ? "rtl" : "ltr"}
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};
