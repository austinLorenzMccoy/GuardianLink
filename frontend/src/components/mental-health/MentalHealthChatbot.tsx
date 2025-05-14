'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SendHorizonal, Mic, RefreshCw, Languages, CheckCircle, UserCircle2 } from 'lucide-react';

// Mock responses from the AI
const mockResponses = [
  {
    text: "Hello! I'm your AI mental health coach. How are you feeling today?",
    delay: 1000
  },
  {
    text: "I understand that can be difficult. Could you tell me more about when you started feeling this way?",
    delay: 2000
  },
  {
    text: "Thank you for sharing that with me. It's common to feel this way during stressful periods. Have you tried any coping strategies so far?",
    delay: 2500
  },
  {
    text: "That's a good start. I'd like to suggest a simple breathing exercise that might help. Would you like to try it now?",
    delay: 2000
  },
  {
    text: "Great! Let's begin by taking a slow, deep breath in through your nose for 4 counts, holding for 2, and then exhaling through your mouth for 6 counts. We'll do this 3 times. Ready when you are.",
    delay: 3000
  }
];

// Language translations (simplified for demo)
const translations = {
  English: mockResponses,
  Swahili: [
    { text: "Habari! Mimi ni kocha wako wa afya ya akili. Unajisikiaje leo?", delay: 1000 },
    { text: "Ninaelewa kuwa inaweza kuwa ngumu. Je, unaweza kunieleza zaidi kuhusu wakati ulianza kujisikia hivi?", delay: 2000 },
    { text: "Asante kwa kushiriki hayo na mimi. Ni kawaida kujisikia hivi wakati wa kipindi cha msongo. Je, umejaribu mikakati yoyote ya kukabiliana hadi sasa?", delay: 2500 },
    { text: "Hiyo ni mwanzo mzuri. Ningependa kupendekeza zoezi rahisi la kupumua ambalo linaweza kusaidia. Je, ungependa kujaribu sasa?", delay: 2000 },
    { text: "Vizuri! Tuanze kwa kuchukua pumzi ndefu, taratibu kupitia pua yako kwa vihesabio 4, kushikilia kwa 2, na kisha kutoa kupitia mdomo wako kwa vihesabio 6. Tutafanya hivi mara 3. Tayari unapoanza.", delay: 3000 }
  ],
  Hindi: [
    { text: "नमस्ते! मैं आपका AI मानसिक स्वास्थ्य कोच हूं। आज आप कैसा महसूस कर रहे हैं?", delay: 1000 },
    { text: "मैं समझता हूं कि यह मुश्किल हो सकता है। क्या आप मुझे बता सकते हैं कि आपने कब से ऐसा महसूस करना शुरू किया?", delay: 2000 },
    { text: "मुझे यह बताने के लिए धन्यवाद। तनावपूर्ण अवधि के दौरान ऐसा महसूस करना आम है। क्या आपने अब तक कोई सामना करने की रणनीति आजमाई है?", delay: 2500 },
    { text: "यह एक अच्छी शुरुआत है। मैं एक सरल श्वास व्यायाम सुझाना चाहूंगा जो मदद कर सकता है। क्या आप इसे अभी आजमाना चाहेंगे?", delay: 2000 },
    { text: "बढ़िया! अपनी नाक से 4 गिनती के लिए धीरे-धीरे, गहरी सांस लेकर शुरू करें, 2 के लिए रोकें, और फिर अपने मुंह से 6 गिनती के लिए सांस छोड़ें। हम यह 3 बार करेंगे। जब आप तैयार हों।", delay: 3000 }
  ],
  Yoruba: [
    { text: "Bawo ni! Emi ni olùkọ́ni ilera ọpọlọ AI rẹ. Báwo ni ìmọ̀lára rẹ lónìí?", delay: 1000 },
    { text: "Mo ti ní òye pé ó lè nira. Ṣé o lè sọ fún mi nípa ìgbà tí o bẹ̀rẹ̀ sí ní ìmọ̀lára báyìí?", delay: 2000 },
    { text: "O ṣeun fún pípin èyí pẹ̀lú mi. Ó wọ́pọ̀ láti ní ìmọ̀lára báyìí ní àwọn àkókò ìnira. Ṣé o ti gbìyànjú àwọn ọ̀nà ìdojúkọ kankan títí di ìsinsin yìí?", delay: 2500 },
    { text: "Èyí jẹ́ ìbẹ̀rẹ̀ tí ó dára. Èmi yíò fẹ́ dábá ìdárayá mímí tí ó rọrùn tí ó lè ràn ọ́ lọ́wọ́. Ṣé o fẹ́ gbìyànjú rẹ̀ nísinsìnyí?", delay: 2000 },
    { text: "Ó dára! Ẹ jẹ́ kí a bẹ̀rẹ̀ nípa mímí sínú pẹ̀lú imú rẹ fún ìṣirò 4, dídúró fún 2, lẹ́yìn náà mímí jáde pẹ̀lú ẹnu rẹ fún ìṣirò 6. A máa ṣe èyí ní ìgbà mẹ́ta. Ṣetán nígbà tí o bá wà.", delay: 3000 }
  ]
};

// Message component
const Message = ({ message, isUser }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className={`flex mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}
  >
    <div className={`flex items-start max-w-[80%] ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-2 ${isUser ? 'ml-2 mr-0 bg-blue-600' : 'bg-purple-600'}`}>
        {isUser ? (
          <UserCircle2 size={20} className="text-white" />
        ) : (
          <div className="relative">
            <div className="absolute inset-0 bg-purple-500 rounded-full animate-pulse"></div>
            <Brain size={20} className="relative z-10 text-white" />
          </div>
        )}
      </div>
      <div
        className={`py-3 px-4 rounded-lg ${
          isUser
            ? 'bg-blue-600 text-white rounded-tr-none'
            : 'bg-purple-900/60 border border-purple-500/30 text-gray-100 rounded-tl-none'
        }`}
      >
        {message}
      </div>
    </div>
  </motion.div>
);

// Brain icon component for the AI
const Brain = ({ size, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 0 19.5v-15A2.5 2.5 0 0 1 2.5 2h7z" />
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 2.5 2.5h7a2.5 2.5 0 0 0 2.5-2.5v-15A2.5 2.5 0 0 0 21.5 2h-7z" />
    <path d="M12 12h4" />
    <path d="M12 16h4" />
    <path d="M12 8h4" />
    <path d="M8 12H4" />
    <path d="M8 16H4" />
    <path d="M8 8H4" />
  </svg>
);

// Typing indicator component
const TypingIndicator = () => (
  <div className="flex items-center space-x-1 p-2 bg-purple-900/40 rounded-lg w-16">
    <motion.div
      animate={{ y: [0, -5, 0] }}
      transition={{ repeat: Infinity, duration: 1, delay: 0 }}
      className="w-2 h-2 bg-purple-400 rounded-full"
    />
    <motion.div
      animate={{ y: [0, -5, 0] }}
      transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
      className="w-2 h-2 bg-purple-400 rounded-full"
    />
    <motion.div
      animate={{ y: [0, -5, 0] }}
      transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
      className="w-2 h-2 bg-purple-400 rounded-full"
    />
  </div>
);

const MentalHealthChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentResponseIndex, setCurrentResponseIndex] = useState(0);
  const [language, setLanguage] = useState('English');
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // Initial greeting
  useEffect(() => {
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setMessages([{ text: translations[language][0].text, isUser: false }]);
        setIsTyping(false);
      }, translations[language][0].delay);
    }, 1000);
  }, []);
  
  // Handle sending a message
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage = { text: inputValue, isUser: true };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputValue('');
    
    // Show typing indicator
    setIsTyping(true);
    
    // Add AI response after delay
    setTimeout(() => {
      const nextIndex = (currentResponseIndex + 1) % translations[language].length;
      const aiResponse = { 
        text: translations[language][nextIndex].text, 
        isUser: false 
      };
      
      setMessages(prevMessages => [...prevMessages, aiResponse]);
      setCurrentResponseIndex(nextIndex);
      setIsTyping(false);
    }, translations[language][(currentResponseIndex + 1) % translations[language].length].delay);
  };
  
  // Handle pressing Enter to send
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  // Handle language change
  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    setShowLanguageMenu(false);
    
    // Add system message about language change
    const systemMessage = { 
      text: `Switching conversation to ${newLanguage}...`, 
      isUser: false,
      isSystem: true
    };
    
    setMessages(prevMessages => [...prevMessages, systemMessage]);
    
    // Reset conversation after language change
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setMessages([{ text: translations[newLanguage][0].text, isUser: false }]);
        setCurrentResponseIndex(0);
        setIsTyping(false);
      }, 1000);
    }, 1000);
  };
  
  // Reset the conversation
  const handleReset = () => {
    setMessages([]);
    setCurrentResponseIndex(0);
    
    // Start with initial greeting again
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setMessages([{ text: translations[language][0].text, isUser: false }]);
        setIsTyping(false);
      }, translations[language][0].delay);
    }, 1000);
  };
  
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-purple-500/30 pb-4 mb-4">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mr-3">
            <Brain size={20} className="text-white" />
          </div>
          <div>
            <h3 className="font-medium text-white">Gaia AI Coach</h3>
            <p className="text-xs text-gray-400">Mental Health Support</p>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <div className="relative">
            <button
              onClick={() => setShowLanguageMenu(!showLanguageMenu)}
              className="p-2 rounded-full hover:bg-purple-800/30 transition-colors"
            >
              <Languages size={20} className="text-purple-300" />
            </button>
            
            {/* Language dropdown */}
            <AnimatePresence>
              {showLanguageMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 top-full mt-2 bg-purple-900/90 backdrop-blur-sm border border-purple-500/30 rounded-lg shadow-lg overflow-hidden w-36 z-10"
                >
                  {Object.keys(translations).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => handleLanguageChange(lang)}
                      className="flex items-center w-full px-4 py-2 hover:bg-purple-800/50 text-left text-sm"
                    >
                      {language === lang && (
                        <CheckCircle size={14} className="mr-2 text-green-400" />
                      )}
                      <span className={language === lang ? "text-white" : "text-gray-300"}>
                        {lang}
                      </span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <button
            onClick={handleReset}
            className="p-2 rounded-full hover:bg-purple-800/30 transition-colors"
            title="Reset conversation"
          >
            <RefreshCw size={20} className="text-purple-300" />
          </button>
        </div>
      </div>
      
      {/* Messages container */}
      <div className="flex-grow overflow-y-auto px-2 pb-4 space-y-2">
        {messages.map((message, index) => (
          <Message
            key={index}
            message={message.text}
            isUser={message.isUser}
          />
        ))}
        
        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-start mb-4">
            <div className="bg-purple-600 w-8 h-8 rounded-full flex items-center justify-center mr-2">
              <Brain size={20} className="text-white" />
            </div>
            <TypingIndicator />
          </div>
        )}
        
        {/* This div helps to scroll to bottom */}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input area */}
      <div className="border-t border-purple-500/30 pt-4 mt-auto">
        <div className="flex items-center bg-purple-900/50 rounded-lg border border-purple-500/30 px-3 py-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="flex-grow bg-transparent border-none focus:ring-0 text-white placeholder-gray-400 text-sm"
          />
          
          <button
            className="p-2 rounded-full bg-purple-600 hover:bg-purple-700 transition-colors ml-2"
            onClick={handleSendMessage}
          >
            <SendHorizonal size={18} className="text-white" />
          </button>
          
          <button
            className="p-2 rounded-full hover:bg-purple-800/50 transition-colors ml-2"
            title="Voice input (coming soon)"
          >
            <Mic size={18} className="text-purple-300" />
          </button>
        </div>
        <div className="text-xs text-center mt-2 text-gray-500">
          Secure, encrypted conversation. Your privacy is our priority.
        </div>
      </div>
    </div>
  );
};

export default MentalHealthChatbot;