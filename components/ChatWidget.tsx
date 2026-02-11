
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { ChatMessage, Department } from '../types';

interface ChatWidgetProps {
  departments: Department[];
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ departments }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Jambo! I am the Moi Voi Hospital Virtual Assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [groundingLinks, setGroundingLinks] = useState<{title: string, uri: string}[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);
    setGroundingLinks([]);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Get user location for maps grounding if available
      let latLng = undefined;
      try {
        const position: any = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 5000 });
        });
        latLng = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
      } catch (e) {
        console.debug('Geolocation not available for grounding', e);
      }

      const deptNames = departments.map(d => d.name).join(', ');

      const response = await ai.models.generateContent({
        // Fixed: Use gemini-2.5-flash which is the recommended model for Google Maps grounding
        model: 'gemini-2.5-flash',
        contents: userMessage,
        config: {
          systemInstruction: `You are the Virtual Assistant for Moi Voi County Referral Hospital in Voi, Taita Taveta County, Kenya. 
          Use Google Maps tools when asked about locations, directions, or nearby facilities.
          Provide helpful information about the hospital's current active departments: ${deptNames}.
          Be empathetic and professional. 
          Remind users that for emergencies they should visit the A&E immediately. 
          Keep answers concise and friendly. Use Swahili greetings like 'Jambo', 'Karibu'.
          Moi Voi Hospital is located in Voi Town, Behind the Sub-County Offices.`,
          tools: [{ googleMaps: {} }],
          toolConfig: {
            retrievalConfig: {
              latLng: latLng
            }
          }
        }
      });

      const aiText = response.text || "I apologize, but I am having trouble connecting. Please call us directly at 0722 000000.";
      
      // Extract grounding links if present
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const links = chunks
        .filter((chunk: any) => chunk.maps)
        .map((chunk: any) => ({
          title: chunk.maps.title || 'View on Maps',
          uri: chunk.maps.uri
        }));

      setMessages(prev => [...prev, { role: 'model', text: aiText }]);
      if (links.length > 0) {
        setGroundingLinks(links);
      }

    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'model', text: "I'm sorry, I'm offline right now. Please visit the hospital or call our emergency line." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {isOpen ? (
        <div className="bg-white w-80 md:w-96 h-[550px] rounded-2xl shadow-2xl flex flex-col border border-slate-200 overflow-hidden animate-in fade-in zoom-in duration-200">
          {/* Header */}
          <div className="bg-teal-600 p-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full">
                <i className="fa-solid fa-hospital-user"></i>
              </div>
              <div>
                <h3 className="font-bold text-sm">Voi Health Assistant</h3>
                <p className="text-[10px] text-teal-100 uppercase tracking-widest">Maps Powered</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded">
              <i className="fa-solid fa-xmark text-lg"></i>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                  msg.role === 'user' 
                  ? 'bg-teal-600 text-white rounded-tr-none' 
                  : 'bg-white text-slate-700 shadow-sm border border-slate-200 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            
            {groundingLinks.length > 0 && (
              <div className="flex flex-col gap-2 animate-in fade-in slide-in-from-left-2 duration-300">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Location Sources:</p>
                <div className="flex flex-wrap gap-2">
                  {groundingLinks.map((link, i) => (
                    <a 
                      key={i} 
                      href={link.uri} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-teal-50 text-teal-700 px-3 py-1.5 rounded-lg text-xs font-bold border border-teal-100 hover:bg-teal-600 hover:text-white transition-all"
                    >
                      <i className="fa-solid fa-location-dot"></i>
                      {link.title}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-200 rounded-tl-none flex gap-1">
                  <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-slate-200 flex flex-col gap-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about location or services..."
                className="flex-1 bg-slate-100 border-none rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
              />
              <button
                onClick={handleSend}
                disabled={isLoading}
                className="bg-teal-600 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-teal-700 disabled:bg-teal-300 transition-colors"
              >
                <i className="fa-solid fa-paper-plane text-sm"></i>
              </button>
            </div>
            <p className="text-[9px] text-center text-slate-400 px-2 leading-tight">
              I can provide directions and nearby info using Google Maps.
            </p>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-teal-600 text-white w-14 h-14 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all flex items-center justify-center group"
        >
          <i className="fa-solid fa-map-location-dot text-2xl group-hover:animate-pulse"></i>
          <span className="absolute -top-2 -right-1 bg-red-500 text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white animate-pulse">!</span>
        </button>
      )}
    </div>
  );
};

export default ChatWidget;
