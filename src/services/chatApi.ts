import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export const chatApiService = {
  async sendMessage(sessionId: string, message: string): Promise<{
    content: string;
    processingTime: number;
    modelUsed: string;
  }> {
    try {
      const response = await axios.post(`${API_URL}/chat/send`, {
        sessionId,
        message
      });

      if (response.data.success) {
        return {
          content: response.data.data.message.content,
          processingTime: response.data.data.processingTime,
          modelUsed: response.data.data.modelUsed
        };
      }

      throw new Error(response.data.message || 'Error en el servidor');
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  },

  async getChatHistory(sessionId: string): Promise<ChatMessage[]> {
    try {
      const response = await axios.get(`${API_URL}/chat/session/${sessionId}`);
      
      if (response.data.success) {
        return response.data.data.chat.messages.map((msg: any) => ({
          role: msg.role.toLowerCase(),
          content: msg.content
        }));
      }

      return [];
    } catch (error) {
      console.error('Error getting chat history:', error);
      return [];
    }
  }
};
