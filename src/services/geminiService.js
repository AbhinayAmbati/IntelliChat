// src/services/geminiService.js
import { GoogleGenerativeAI } from '@google/generative-ai';
import { v4 as uuidv4 } from 'uuid';

// WARNING: Exposing API keys in frontend code is NOT secure!
// In production, use a backend service to handle API calls
const API_KEY = 'AIzaSyD5zlGcH22XurcROi7UqymxzERT-_CLGks';

class GeminiService {
  constructor() {
    this.genAI = new GoogleGenerativeAI(API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    this.chatSessions = {};
    
    // Try to load existing chat sessions from localStorage
    this.loadSessionsFromStorage();
  }
  
  // Save chat sessions to localStorage (only metadata, not the actual chat objects)
  saveSessionsToStorage() {
    // We can't directly store chat objects, so we just save the session IDs
    const sessionIds = Object.keys(this.chatSessions);
    localStorage.setItem('gemini_sessions', JSON.stringify(sessionIds));
  }
  
  // Load chat sessions from localStorage
  loadSessionsFromStorage() {
    try {
      const sessionIds = JSON.parse(localStorage.getItem('gemini_sessions')) || [];
      // We need to recreate the chat objects for each session
      sessionIds.forEach(id => {
        if (!this.chatSessions[id]) {
          this.chatSessions[id] = this.model.startChat({
            history: [], // Can't restore history easily in this approach
            generationConfig: {
              maxOutputTokens: 2048,
              temperature: 0.7,
              topP: 0.95,
              topK: 40,
            },
          });
        }
      });
    } catch (error) {
      console.error('Error loading sessions from storage:', error);
    }
  }

  async initConversation() {
    try {
      const conversationId = uuidv4();
      
      const chat = this.model.startChat({
        history: [],
        generationConfig: {
          maxOutputTokens: 2048,
          temperature: 0.7,
          topP: 0.95,
          topK: 40,
        },
      });
      
      this.chatSessions[conversationId] = chat;
      
      // Save updated sessions to storage
      this.saveSessionsToStorage();
      
      // Also save the current conversation ID
      localStorage.setItem('current_conversation', conversationId);
      
      return { conversationId };
    } catch (error) {
      console.error('Gemini API initialization error:', error);
      throw new Error('Failed to initialize Gemini API');
    }
  }

  async sendMessage(message, conversationId) {
    try {
      console.log('Sending message to conversation:', conversationId);
      console.log('Available sessions:', Object.keys(this.chatSessions));
      
      // Check if we need to reload the chat sessions
      if (!this.chatSessions[conversationId]) {
        this.loadSessionsFromStorage();
      }
      
      // If still not found, try to get the current conversation from storage
      if (!this.chatSessions[conversationId]) {
        const storedId = localStorage.getItem('current_conversation');
        if (storedId && this.chatSessions[storedId]) {
          conversationId = storedId;
          console.log('Using conversation from storage:', conversationId);
        } else {
          // If still not found, create a new conversation
          console.log('Creating new conversation as fallback');
          const { conversationId: newId } = await this.initConversation();
          conversationId = newId;
        }
      }
      
      const chat = this.chatSessions[conversationId];
      
      if (!chat) {
        console.error('Chat session still not found after recovery attempts');
        throw new Error('Unable to create or recover chat session');
      }

      console.log('Sending message to Gemini:', message);
      const result = await chat.sendMessage(message);
      
      const responseText = await result.response.text();
      console.log('Received response from Gemini');
      
      return { response: responseText, conversationId };
    } catch (error) {
      console.error('Gemini API chat error details:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
      throw new Error(`Failed to communicate with Gemini API: ${error.message}`);
    }
  }
}

// Create a singleton instance
const geminiService = new GeminiService();
export default geminiService;