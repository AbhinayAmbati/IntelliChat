import { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Mic, MicOff, Smile, Frown, Meh } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import NavbarIn from '../components/NavbarIn';
import geminiService from '../services/geminiService';

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
  const [userMood, setUserMood] = useState('neutral'); // Added state for tracking user mood
  const [showMoodIndicator, setShowMoodIndicator] = useState(false); // Control visibility of mood indicator
  const recognitionRef = useRef(null);
  const timerRef = useRef(null);
  const chatEndRef = useRef(null); // Reference for auto-scrolling

  // Initialize chat with welcome message
  useEffect(() => {
    // Try to load chat messages from localStorage
    const storedMessages = loadChatMessages();
    if (storedMessages && storedMessages.length > 0) {
      setChatMessages(storedMessages);
    } else {
      setChatMessages([
        {
          id: 1,
          type: 'bot',
          content: 'Hello! How can I help you today?',
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    }
    
    // Try to get existing conversation ID from localStorage
    const existingConversationId = localStorage.getItem('current_conversation');
    if (existingConversationId) {
      console.log('Resuming existing conversation:', existingConversationId);
      setConversation(existingConversationId);
    } else {
      // Initialize new Gemini API conversation
      initConversation();
    }

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
  
  // Save chat messages to localStorage whenever they change
  useEffect(() => {
    if (chatMessages.length > 0) {
      saveChatMessages(chatMessages);
    }
  }, [chatMessages]);
  
  // Auto-scroll to bottom when new messages appear
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

  // Helper functions for localStorage
  const saveChatMessages = (messages) => {
    try {
      localStorage.setItem('chat_messages', JSON.stringify(messages));
    } catch (err) {
      console.error('Error saving chat messages:', err);
    }
  };
  
  const loadChatMessages = () => {
    try {
      const saved = localStorage.getItem('chat_messages');
      return saved ? JSON.parse(saved) : null;
    } catch (err) {
      console.error('Error loading chat messages:', err);
      return null;
    }
  };

  const initConversation = async () => {
    try {
      setError(null);
      console.log('Initializing new conversation');
      const data = await geminiService.initConversation();
      console.log('Conversation initialized:', data);
      setConversation(data.conversationId);
      localStorage.setItem('current_conversation', data.conversationId);
    } catch (err) {
      setError('Failed to connect to Gemini API. Please try again later.');
      console.error('Initialization error:', err);
    }
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
        localStorage.setItem('current_conversation', data.conversationId);
      }
      
      // Add the bot's response to chat
      const botResponse = {
        id: Date.now(), // Use timestamp for unique ID
        type: 'bot',
        content: data.response,
        timestamp: new Date().toLocaleTimeString(),
        mood: sentiment, // Store the mood with the message for potential UI adaptation
      };
      
      setChatMessages((prev) => [...prev, botResponse]);
    } catch (err) {
      console.error('Error sending message:', err);
      setError(`Failed to get response: ${err.message}`);
      
      // Add error message to chat
      const errorMessage = {
        id: Date.now(), // Use timestamp for unique ID
        type: 'bot',
        content: `Sorry, I encountered an error: ${err.message}`,
        timestamp: new Date().toLocaleTimeString(),
        isError: true,
      };
      
      setChatMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message to chat
    const userMessage = {
      id: Date.now(), // Use timestamp for unique ID
      type: 'user',
      content: message,
      timestamp: new Date().toLocaleTimeString(),
    };

    setChatMessages((prev) => [...prev, userMessage]);
    
    // Store the message locally before clearing the input
    const sentMessage = message;
    setMessage('');
    
    // Add loading indicator
    const loadingMessage = {
      id: `loading-${Date.now()}`, // Unique ID with timestamp
      type: 'bot',
      content: '...',
      timestamp: new Date().toLocaleTimeString(),
      isLoading: true,
    };
    
    setChatMessages((prev) => [...prev, loadingMessage]);
    
    // Send to Gemini API
    await sendMessageToGemini(sentMessage);
    
    // Remove loading indicator - using the fact that only one message can have isLoading=true
    setChatMessages((prev) => prev.filter(msg => !msg.isLoading));
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

  return (
    <>
      <NavbarIn />
      <div className="flex pt-20 h-screen bg-gray-100 dark:bg-gray-900">
        <Sidebar />
        
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
            {chatMessages.map((msg) => (
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
                  {msg.isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  ) : (
                    <p className="text-sm">{msg.content}</p>
                  )}
                  <span className="text-xs opacity-70 mt-1 block">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} /> {/* Empty div for auto-scrolling */}
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
                disabled={isLoading}
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
                disabled={isLoading}
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
                  isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
                }`}
                disabled={isLoading}
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