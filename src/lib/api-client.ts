/**
 * BuildPilot X - Shared AI Backend API Client
 * This client communicates with the centralized FastAPI AI Service.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_AI_BACKEND_URL || "http://localhost:8000/api/v1";

export interface GenerateRequest {
  idea: string;
  context?: string;
  stream?: boolean;
}

export interface ApiResponse<T = any> {
  status: "success" | "error";
  data?: T;
  message?: string;
}

export const AIClient = {
  /**
   * Generic POST request handler for standard JSON responses.
   */
  async post<T>(endpoint: string, payload: any): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      const data = await response.json();
      return data as ApiResponse<T>;
    } catch (error: any) {
      console.error(`[AIClient Error] ${endpoint}:`, error);
      return {
        status: "error",
        message: error.message || "An unexpected error occurred while communicating with the AI service.",
      };
    }
  },

  /**
   * Streaming POST request handler for Server-Sent Events (SSE).
   * Parses the chunked responses and calls the onMessage callback.
   */
  async stream(
    endpoint: string, 
    payload: any, 
    onMessage: (data: any) => void,
    onError: (error: any) => void,
    onComplete: () => void
  ): Promise<void> {
    try {
      // Ensure the backend knows to stream
      payload.stream = true;

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "text/event-stream"
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok || !response.body) {
        throw new Error(`API Stream Error: ${response.statusText}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        
        // Parse SSE lines
        const lines = buffer.split('\n\n');
        buffer = lines.pop() || ""; // Keep the last incomplete chunk in the buffer

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const dataStr = line.slice(6); // Remove "data: "
            try {
              const data = JSON.parse(dataStr);
              if (data.status === "DONE") {
                onComplete();
                return;
              }
              onMessage(data);
            } catch (e) {
              console.warn("Failed to parse stream chunk:", dataStr);
            }
          }
        }
      }
      onComplete();
    } catch (error) {
      onError(error);
    }
  },

  // --- Endpoints ---

  generateStartup: (req: GenerateRequest) => AIClient.post("/generate-startup", req),
  
  // Streaming Wrappers
  streamStartup: (req: GenerateRequest, callbacks: { onMessage: (d: any) => void, onError: (e: any) => void, onComplete: () => void }) => 
    AIClient.stream("/generate-startup", req, callbacks.onMessage, callbacks.onError, callbacks.onComplete),

  streamArchitecture: (req: GenerateRequest, callbacks: { onMessage: (d: any) => void, onError: (e: any) => void, onComplete: () => void }) => 
    AIClient.stream("/architecture", req, callbacks.onMessage, callbacks.onError, callbacks.onComplete),

  streamBusinessPlan: (req: GenerateRequest, callbacks: { onMessage: (d: any) => void, onError: (e: any) => void, onComplete: () => void }) => 
    AIClient.stream("/business-plan", req, callbacks.onMessage, callbacks.onError, callbacks.onComplete),

  streamMarketing: (req: GenerateRequest, callbacks: { onMessage: (d: any) => void, onError: (e: any) => void, onComplete: () => void }) => 
    AIClient.stream("/marketing", req, callbacks.onMessage, callbacks.onError, callbacks.onComplete),

  streamInvestorReview: (req: GenerateRequest, callbacks: { onMessage: (d: any) => void, onError: (e: any) => void, onComplete: () => void }) => 
    AIClient.stream("/investor-review", req, callbacks.onMessage, callbacks.onError, callbacks.onComplete),

  // Fallback JSON endpoints
  generateBusinessPlan: (req: GenerateRequest) => AIClient.post("/business-plan", req),
  analyzeMarket: (req: GenerateRequest) => AIClient.post("/market-analysis", req),
  analyzeCompetitors: (req: GenerateRequest) => AIClient.post("/competitor-analysis", req),
  designArchitecture: (req: GenerateRequest) => AIClient.post("/architecture", req),
  designDatabase: (req: GenerateRequest) => AIClient.post("/database", req),
  createWireframes: (req: GenerateRequest) => AIClient.post("/wireframes", req),
  createMarketingStrategy: (req: GenerateRequest) => AIClient.post("/marketing", req),
  investorReview: (req: GenerateRequest) => AIClient.post("/investor-review", req),
};
