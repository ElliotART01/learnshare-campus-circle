
import { toast } from "@/hooks/use-toast";

// DeepSeek API configuration
const DEEPSEEK_API_KEY = "sk-33ae962f76ec42b0ab90a5cd0051ea58";
const DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions";

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface DeepSeekResponse {
  id: string;
  choices: {
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

/**
 * Sends a message to the DeepSeek API and returns the response
 */
export const sendMessageToDeepSeek = async (
  messages: ChatMessage[],
  systemPrompt?: string
): Promise<string> => {
  try {
    // Add system prompt if provided
    const finalMessages = systemPrompt 
      ? [{ role: "system", content: systemPrompt }, ...messages] 
      : messages;
    
    const response = await fetch(DEEPSEEK_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: finalMessages,
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Failed to get response from DeepSeek API");
    }

    const data: DeepSeekResponse = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error calling DeepSeek API:", error);
    toast({
      title: "Error",
      description: "Failed to get response from AI assistant. Please try again later.",
      variant: "destructive",
    });
    return "I'm sorry, I couldn't process your request at the moment. Please try again later.";
  }
};

// Predefined system prompts for different use cases
export const SYSTEM_PROMPTS = {
  studentSupport: "You are a helpful assistant for Najran University students. Provide accurate, concise information about majors, university policies, and resources available at the university. Be respectful and supportive.",
  recommendations: "You are a recommendation system for Najran University students. Based on the user's major, interests, and academic level, suggest relevant resources, study materials, and peer connections that would be beneficial for their academic journey.",
  contentGeneration: "You are an educational content generator. Create clear, concise summaries, explanations, or educational content on requested topics. Focus on accuracy and clarity in your explanations.",
  smartSearch: "You are a search assistant for educational resources. Help users find the most relevant materials, books, courses, and community resources based on their queries. Prioritize resources that match their academic level and learning goals."
};
