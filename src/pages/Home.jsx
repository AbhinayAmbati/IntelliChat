import { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Mic, MicOff, Smile, Frown, Meh } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import NavbarIn from '../components/NavbarIn';
import geminiService from '../services/geminiService';

// Safe localStorage utility
const safeLocalStorage = {
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      return false;
    }
  },
  get: (key, defaultValue = null) => {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : defaultValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return defaultValue;
    }
  }
};

// Simple sentiment analysis utility
const analyzeSentiment = (text) => {
  // List of positive and negative words for basic sentiment analysis
  const positiveWords = ['happy', 'good', 'great', 'excellent', 'wonderful', 'amazing', 'love', 'like', 'thanks', 'thank', 'appreciated', 'helpful', 'glad', 'excited', 'awesome', 'fantastic', 'brilliant', 'enjoy', 'perfect', 'pleased'];
  
  const negativeWords = ['sad', 'bad', 'terrible', 'awful', 'horrible', 'hate', 'dislike', 'angry', 'upset', 'disappointed', 'frustrating', 'annoying', 'unfortunate', 'not working', 'problem', 'issue', 'wrong', 'error', 'confused', 'unhappy'];
  
  const lowerText = text.toLowerCase();
  let positiveScore = 0;
  let negativeScore = 0;
  
  // Count matches
  positiveWords.forEach(word => {
    if (lowerText.includes(word)) positiveScore++;
  });
  
  negativeWords.forEach(word => {
    if (lowerText.includes(word)) negativeScore++;
  });
  
  // Determine overall sentiment
  if (positiveScore > negativeScore) return 'positive';
  if (negativeScore > positiveScore) return 'negative';
  return 'neutral';
};

const Home = () => {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [conversation, setConversation] = useState(null);
  const [error, setError] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [userMood, setUserMood] = useState('neutral');
  const [showMoodIndicator, setShowMoodIndicator] = useState(false);
  const [activeChatId, setActiveChatId] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const recognitionRef = useRef(null);
  const timerRef = useRef(null);
  const chatEndRef = useRef(null);

  // Load chat history from localStorage on component mount
  useEffect(() => {
    loadChatHistory();

    // Cleanup function for speech recognition
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // Initialize Gemini conversation
  useEffect(() => {
    if (activeChatId) {
      // Try to get existing conversation ID for this chat
      const existingConversationId = getConversationIdForChat(activeChatId);
      if (existingConversationId) {
        console.log('Resuming existing conversation:', existingConversationId);
        setConversation(existingConversationId);
      } else {
        // Initialize new Gemini API conversation
        initConversation();
      }
    }
  }, [activeChatId]);

  // Auto-scroll to bottom when new messages appear
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

  // Auto-save messages whenever they change
  useEffect(() => {
    // Save messages every time they change
    if (activeChatId && chatMessages.length > 0) {
      updateChatInHistory(activeChatId, chatMessages);
    }
  }, [chatMessages]);

  // Handle storage events from other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'chatHistory') {
        try {
          const newChatHistory = JSON.parse(e.newValue);
          setChatHistory(newChatHistory);
          
          // Update current chat messages if active chat was updated elsewhere
          if (activeChatId) {
            const updatedChat = newChatHistory.find(chat => chat.id === activeChatId);
            if (updatedChat && updatedChat.messages) {
              setChatMessages(updatedChat.messages);
            }
          }
        } catch (error) {
          console.error('Error handling storage event:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [activeChatId]);

  // Helper function to load chat history
  const loadChatHistory = () => {
    try {
      // Try to load chat history from localStorage
      const savedChats = safeLocalStorage.get('chatHistory', []);
      console.log('Loaded chat history from localStorage:', savedChats);
      
      if (savedChats && savedChats.length > 0) {
        setChatHistory(savedChats);
        
        // Set the most recent chat as active if available
        if (!activeChatId) {
          setActiveChatId(savedChats[0].id);
          console.log('Setting active chat to first chat in history:', savedChats[0].id);
          console.log('Messages for this chat:', savedChats[0].messages || []);
          setChatMessages(savedChats[0].messages || []);
          
          // If this chat has a saved conversation ID, restore it
          const savedConversationId = getConversationIdForChat(savedChats[0].id);
          if (savedConversationId) {
            setConversation(savedConversationId);
          } else {
            // Initialize new conversation if needed
            initConversation();
          }
        }
      } else {
        // Create a new chat if none exists
        console.log('No chats in history, creating new chat');
        handleNewChat();
      }
    } catch (error) {
      console.error('Error loading chat history:', error);
      // Create a new chat as fallback
      handleNewChat();
    }
  };

  // Helper function to get conversation ID for a specific chat
  const getConversationIdForChat = (chatId) => {
    try {
      const conversationMap = safeLocalStorage.get('chat_conversations', {});
      return conversationMap[chatId];
    } catch (err) {
      console.error('Error getting conversation ID:', err);
      return null;
    }
  };

  // Helper function to save conversation ID for a specific chat
  const saveConversationIdForChat = (chatId, conversationId) => {
    try {
      const conversationMap = safeLocalStorage.get('chat_conversations', {});
      conversationMap[chatId] = conversationId;
      safeLocalStorage.set('chat_conversations', conversationMap);
    } catch (err) {
      console.error('Error saving conversation ID:', err);
    }
  };

  // Function to update a chat in the history
  const updateChatInHistory = (chatId, messages) => {
    if (!chatId) {
      console.error('Cannot update chat: No active chat ID');
      return false;
    }
    
    try {
      console.log('Current chat history before update:', chatHistory);
      console.log('Messages to save for chat', chatId, ':', messages);
      
      const updatedHistory = chatHistory.map(chat => {
        if (chat.id === chatId) {
          const updatedChat = { 
            ...chat, 
            messages, 
            timestamp: new Date().toLocaleString(),
            lastMessage: messages.length > 0 ? messages[messages.length - 1].content.substring(0, 50) : ''
          };
          console.log('Updated chat:', updatedChat);
          return updatedChat;
        }
        return chat;
      });
      
      console.log('Updated history to save:', updatedHistory);
      setChatHistory(updatedHistory);
      return safeLocalStorage.set('chatHistory', updatedHistory);
    } catch (error) {
      console.error('Error updating chat history:', error);
      return false;
    }
  };

  // Unified function to save messages
  const saveMessages = (newMessages) => {
    if (!activeChatId) {
      console.error('Cannot save messages: No active chat ID');
      return;
    }
    
    console.log('Saving messages:', newMessages);
    setChatMessages(newMessages);
    updateChatInHistory(activeChatId, newMessages);
  };

  const initConversation = async () => {
    try {
      setError(null);
      console.log('Initializing new conversation');
      const data = await geminiService.initConversation();
      console.log('Conversation initialized:', data);
      setConversation(data.conversationId);
      
      if (activeChatId) {
        saveConversationIdForChat(activeChatId, data.conversationId);
      }
    } catch (err) {
      setError('Failed to connect to Gemini API. Please try again later.');
      console.error('Initialization error:', err);
    }
  };

  // Function to handle chat selection from sidebar
  const handleChatSelect = (chatId, messages) => {
    setActiveChatId(chatId);
    
    // Find the chat in the current history
    const selectedChat = chatHistory.find(chat => chat.id === chatId);
    
    // Set the messages from the selected chat
    if (selectedChat && selectedChat.messages && Array.isArray(selectedChat.messages)) {
      console.log('Loading messages for chat', chatId, ':', selectedChat.messages);
      setChatMessages(selectedChat.messages);
    } else if (messages && Array.isArray(messages)) {
      console.log('Loading provided messages for chat', chatId, ':', messages);
      setChatMessages(messages);
    } else {
      // Initialize with welcome message if no messages exist
      console.log('No messages found for chat', chatId, ', initializing with welcome');
      const welcomeMessage = {
        id: Date.now(),
        type: 'bot',
        content: 'Hello! How can I help you today?',
        timestamp: new Date().toLocaleTimeString(),
      };
      
      saveMessages([welcomeMessage]);
    }
  };

  // Function to handle creating a new chat
  const handleNewChat = () => {
    const newChat = {
      id: Date.now(),
      title: "New Conversation",
      timestamp: new Date().toLocaleString(),
      messages: [{
        id: Date.now(),
        type: 'bot',
        content: 'Hello! How can I help you today?',
        timestamp: new Date().toLocaleTimeString(),
      }]
    };
    
    const updatedHistory = [newChat, ...chatHistory];
    setChatHistory(updatedHistory);
    safeLocalStorage.set('chatHistory', updatedHistory);
    
    // Set the new chat as active
    setActiveChatId(newChat.id);
    setChatMessages(newChat.messages);
    
    // Initialize a new conversation for this chat
    initConversation();
  };

  const sendMessageToGemini = async (userMessage) => {
    try {
      setIsLoading(true);
      setError(null);
      
      if (!conversation) {
        console.log('No active conversation, initializing new one');
        await initConversation();
      }
      
      // Analyze the sentiment of the user's message
      const sentiment = analyzeSentiment(userMessage);
      setUserMood(sentiment);
      setShowMoodIndicator(true);
      
      // Hide the mood indicator after 3 seconds
      setTimeout(() => {
        setShowMoodIndicator(false);
      }, 3000);
      
      // Add mood context to the API request
      const messageWithContext = `[User mood appears to be ${sentiment}] ${userMessage}`;
      
      console.log('Sending message to conversation:', conversation);
      console.log('Detected mood:', sentiment);
      
      const data = await geminiService.sendMessage(messageWithContext, conversation);
      
      // In case a new conversationId was returned (fallback case)
      if (data.conversationId && data.conversationId !== conversation) {
        console.log('Updating conversation ID to:', data.conversationId);
        setConversation(data.conversationId);
        
        if (activeChatId) {
          saveConversationIdForChat(activeChatId, data.conversationId);
        }
      }
      
      // Add the bot's response to chat
      const botResponse = {
        id: Date.now(),
        type: 'bot',
        content: data.response,
        timestamp: new Date().toLocaleTimeString(),
        mood: sentiment,
      };
      
      // Get existing chat from localStorage
      const existingChats = safeLocalStorage.get('chatHistory', []);
      const chatIndex = existingChats.findIndex(chat => chat.id === activeChatId);
      
      if (chatIndex !== -1) {
        // Get messages without loading indicator
        const storedMessages = existingChats[chatIndex].messages || [];
        const updatedMessages = [...storedMessages, botResponse];
        
        // Update in localStorage
        existingChats[chatIndex].messages = updatedMessages;
        existingChats[chatIndex].lastMessage = botResponse.content.substring(0, 50);
        existingChats[chatIndex].timestamp = new Date().toLocaleString();
        
        // Save to localStorage
        safeLocalStorage.set('chatHistory', existingChats);
        
        // Update state (remove loading indicator)
        setChatMessages(updatedMessages);
        setChatHistory(existingChats);
        
        // Update chat title based on first message if it's "New Conversation"
        if (existingChats[chatIndex].title === "New Conversation" && updatedMessages.length >= 3) {
          // Extract a title from the first user message (limited to 30 chars)
          const firstUserMessage = updatedMessages.find(msg => msg.type === 'user');
          if (firstUserMessage) {
            const newTitle = firstUserMessage.content.substring(0, 30) + (firstUserMessage.content.length > 30 ? '...' : '');
            
            // Update chat title in history
            existingChats[chatIndex].title = newTitle;
            safeLocalStorage.set('chatHistory', existingChats);
            setChatHistory(existingChats);
          }
        }
      }
    } catch (err) {
      console.error('Error sending message:', err);
      setError(`Failed to get response: ${err.message}`);
      
      // Add error message to chat
      const errorMessage = {
        id: Date.now(),
        type: 'bot',
        content: `Sorry, I encountered an error: ${err.message}`,
        timestamp: new Date().toLocaleTimeString(),
        isError: true,
      };
      
      // Get existing chat from localStorage
      const existingChats = safeLocalStorage.get('chatHistory', []);
      const chatIndex = existingChats.findIndex(chat => chat.id === activeChatId);
      
      if (chatIndex !== -1) {
        // Get messages without loading indicator
        const storedMessages = existingChats[chatIndex].messages || [];
        const updatedMessages = [...storedMessages, errorMessage];
        
        // Update in localStorage
        existingChats[chatIndex].messages = updatedMessages;
        existingChats[chatIndex].lastMessage = errorMessage.content.substring(0, 50);
        existingChats[chatIndex].timestamp = new Date().toLocaleString();
        
        // Save to localStorage
        safeLocalStorage.set('chatHistory', existingChats);
        
        // Update state (remove loading indicator)
        setChatMessages(updatedMessages);
        setChatHistory(existingChats);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // In your handleSubmit function, ensure the message is saved to localStorage:
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim() || !activeChatId) return;
  
    // Add user message to chat
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: message,
      timestamp: new Date().toLocaleTimeString(),
    };
  
    // Get existing chat from localStorage first
    const existingChats = safeLocalStorage.get('chatHistory', []);
    const chatIndex = existingChats.findIndex(chat => chat.id === activeChatId);
    
    if (chatIndex !== -1) {
      // Deep copy the existing messages
      const existingMessages = [...(existingChats[chatIndex].messages || [])];
      
      // Filter out any loading messages with "..." content
      const filteredMessages = existingMessages.filter(msg => msg.content !== "...");
      
      // Add new user message
      const updatedMessages = [...filteredMessages, userMessage];
      
      // Update in localStorage
      existingChats[chatIndex].messages = updatedMessages;
      existingChats[chatIndex].lastMessage = userMessage.content.substring(0, 50);
      existingChats[chatIndex].timestamp = new Date().toLocaleString();
      
      // Save to localStorage
      safeLocalStorage.set('chatHistory', existingChats);
      
      // Update state
      setChatMessages(updatedMessages);
      setChatHistory(existingChats);
    }
    
    // Store the message locally before clearing the input
    const sentMessage = message;
    setMessage('');
    
    // Add loading indicator only to UI state, not to localStorage
    const loadingMessage = {
      id: `loading-${Date.now()}`,
      type: 'bot',
      content: '...',
      timestamp: new Date().toLocaleTimeString(),
      isLoading: true,
    };
    
    // Update UI with loading indicator
    setChatMessages(prev => [...prev, loadingMessage]);
    
    // Send to Gemini API
    await sendMessageToGemini(sentMessage);
  };

  // Voice input functionality
  const toggleVoiceInput = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const startRecording = () => {
    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      if (!SpeechRecognition) {
        setError("Your browser doesn't support speech recognition. Try using Chrome.");
        return;
      }
      
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';
      
      let finalTranscript = '';
      
      recognition.onresult = (event) => {
        let interimTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
          } else {
            interimTranscript += transcript;
          }
        }
        
        // Update the input field with the combined transcript
        setMessage(finalTranscript + interimTranscript);
      };
      
      recognition.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setError(`Voice recognition error: ${event.error}`);
        stopRecording();
      };
      
      recognition.onend = () => {
        // This will fire if speech recognition service disconnects
        // We don't want to stop recording here unless we manually called stop
        if (isRecording) {
          recognition.start();
        }
      };
      
      recognition.start();
      recognitionRef.current = recognition;
      setIsRecording(true);
      
      // Start timer for recording duration
      let seconds = 0;
      timerRef.current = setInterval(() => {
        seconds++;
        setRecordingTime(seconds);
      }, 1000);
      
    } catch (err) {
      console.error('Error starting speech recognition:', err);
      setError('Could not start voice input. Please check browser permissions.');
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    setIsRecording(false);
    setRecordingTime(0);
  };

  // Format recording time
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Helper function to get message background color based on mood
  const getMoodStyleForBot = (mood) => {
    if (!mood) return '';
    
    // Adjust bot message style based on detected user mood
    switch (mood) {
      case 'positive':
        return 'bg-green-50 dark:bg-green-900/30 border-l-4 border-green-500';
      case 'negative':
        return 'bg-rose-50 dark:bg-rose-900/30 border-l-4 border-rose-500';
      default:
        return '';
    }
  };
  
  // Get mood icon based on current user mood
  const getMoodIcon = () => {
    switch (userMood) {
      case 'positive':
        return <Smile className="w-5 h-5 text-green-500" />;
      case 'negative':
        return <Frown className="w-5 h-5 text-rose-500" />;
      default:
        return <Meh className="w-5 h-5 text-gray-500" />;
    }
  };

  // Handle chat deletion
  const handleDeleteChat = (chatId) => {
    try {
      const updatedHistory = chatHistory.filter(chat => chat.id !== chatId);
      setChatHistory(updatedHistory);
      safeLocalStorage.set('chatHistory', updatedHistory);
      
      // Remove conversation ID mapping
      const conversationMap = safeLocalStorage.get('chat_conversations', {});
      if (conversationMap[chatId]) {
        delete conversationMap[chatId];
        safeLocalStorage.set('chat_conversations', conversationMap);
      }
      
      // If the active chat is deleted, select another chat if available
      if (activeChatId === chatId) {
        if (updatedHistory.length > 0) {
          handleChatSelect(updatedHistory[0].id, updatedHistory[0].messages);
        } else {
          // If no chats left, create a new one
          handleNewChat();
        }
      }
    } catch (error) {
      console.error('Error deleting chat:', error);
      setError('Failed to delete chat. Please try again.');
    }
  };

  return (
    <>
      <NavbarIn />
      <div className="flex pt-20 h-screen bg-gray-100 dark:bg-gray-900">
     
        <Sidebar 
          onChatSelect={handleChatSelect} 
          activeChatId={activeChatId}
          chatHistory={chatHistory}
          onNewChat={handleNewChat}
          onDeleteChat={handleDeleteChat}
        />
        
        <main className="flex-1 flex flex-col">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{error}</span>
              <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setError(null)}>
                <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <title>Close</title>
                  <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
                </svg>
              </span>
            </div>
          )}
          
          {/* Mood indicator that appears when mood is detected */}
          {showMoodIndicator && (
            <div className={`fixed top-24 right-6 flex items-center gap-2 px-3 py-2 rounded-full transition-all ${
              userMood === 'positive' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' :
              userMood === 'negative' ? 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-100' :
              'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100'
            }`}>
              {getMoodIcon()}
              <span className="text-sm font-medium capitalize">{userMood} mood detected</span>
            </div>
          )}
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {activeChatId ? (
              <>
                {chatMessages
  .filter(msg => msg.content !== "..." && !msg.isLoading)
  .map((msg) => (
    <div
      key={msg.id}
      className={`flex items-start gap-3 ${
        msg.type === 'user' ? 'flex-row-reverse' : ''
      }`}
    >
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center ${
          msg.type === 'user' ? 'bg-blue-500' : 'bg-gray-600'
        }`}
      >
        {msg.type === 'user' ? (
          <User className="w-5 h-5 text-white" />
        ) : (
          <Bot className="w-5 h-5 text-white" />
        )}
      </div>
      <div
        className={`max-w-[70%] rounded-2xl p-4 ${
          msg.type === 'user'
            ? 'bg-blue-500 text-white'
            : msg.isError 
              ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-100'
              : `bg-white dark:bg-gray-800 dark:text-white ${getMoodStyleForBot(msg.mood)}`
        }`}
      >
        <p className="text-sm">{msg.content}</p>
        <span className="text-xs opacity-70 mt-1 block">
          {msg.timestamp}
        </span>
      </div>
    </div>
  ))}
                <div ref={chatEndRef} /> {/* Empty div for auto-scrolling */}
              </>
            ) : (
              <div className="flex justify-center items-center h-full">
                <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow">
                  <p className="text-lg text-gray-600 dark:text-gray-300">Select a chat from the sidebar or create a new one</p>
                </div>
              </div>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="border-t dark:border-gray-800 p-4 bg-white dark:bg-gray-800"
          >
            <div className="flex items-center gap-4 max-w-4xl mx-auto">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={isRecording ? "Listening..." : "Type your message..."}
                className="flex-1 p-3 rounded-lg border dark:border-gray-700 focus:outline-none focus:border-blue-500 bg-transparent dark:text-white"
                disabled={isLoading || !activeChatId}
              />
              
              {/* Voice input button */}
              <button
                type="button"
                onClick={toggleVoiceInput}
                className={`p-3 rounded-lg transition-colors ${
                  isRecording 
                    ? 'bg-red-500 text-white hover:bg-red-600' 
                    : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
                disabled={isLoading || !activeChatId}
                title={isRecording ? "Stop recording" : "Start voice input"}
              >
                {isRecording ? (
                  <>
                    <MicOff className="w-5 h-5" />
                    <span className="sr-only">Stop recording ({formatTime(recordingTime)})</span>
                  </>
                ) : (
                  <>
                    <Mic className="w-5 h-5" />
                    <span className="sr-only">Start voice input</span>
                  </>
                )}
              </button>
              
              {/* Recording indicator */}
              {isRecording && (
                <div className="absolute top-2 right-20 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {formatTime(recordingTime)}
                </div>
              )}
              
              <button
                type="submit"
                className={`p-3 bg-blue-500 text-white rounded-lg transition-colors ${
                  isLoading || !activeChatId ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
                }`}
                disabled={isLoading || !activeChatId}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </main>
      </div>
    </>
  );
};

export default Home;