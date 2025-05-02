
import { useState, useEffect, useRef } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content: "E aí... Eu sou o FodaCerta™. Seu conselheiro pra não surtar nas conversas. Me fale sua situação e te ajudarei a não ser só mais um trouxa no jogo da conquista.",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (input.trim()) {
      const userMessage: Message = {
        id: messages.length + 1,
        role: "user",
        content: input,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, userMessage]);
      setInput("");
      setIsTyping(true);
      
      // Simular resposta da IA
      setTimeout(() => {
        const responses = [
          "Deixa eu te falar uma coisa... Essa atitude de textão? Mata qualquer atração. Quanto mais você escreve, mais poder entrega. Seja econômico e misterioso.",
          "Você tá tentando EXPLICAR atração? Pff. Atração não se explica, se provoca. Para de justificar e comece a ser menos previsível.",
          "Ela tá claramente te testando e você tá caindo feito um pato. Quando ela te provoca, você tem que virar o jogo, não ficar na defensiva.",
          "Sabe qual é seu problema? Você quer aprovação. Quem quer aprovação perde o jogo antes de começar. Pare de buscar validação e comece a ser o prêmio.",
          "Você tá com medo de perder algo que nem tem ainda. Relaxa essa ansiedade. Pessoa que tem opções não age com desespero."
        ];
        
        const botMessage: Message = {
          id: messages.length + 2,
          role: "assistant",
          content: responses[Math.floor(Math.random() * responses.length)],
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
      }, 1500);
    }
  };

  return (
    <Card className="border border-white/10 bg-dark-100 h-[500px] flex flex-col">
      <CardHeader className="border-b border-white/10 py-3">
        <CardTitle className="text-lg">
          <span className="text-neon animate-text-flicker">FodaCerta™</span> Conselheiro
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto p-0">
        <div className="p-4 space-y-4">
          {messages.map((msg) => (
            <div 
              key={msg.id}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div 
                className={`max-w-[80%] p-3 rounded-lg ${
                  msg.role === "user" 
                    ? "bg-neon/20 border border-neon/40" 
                    : "bg-dark-200 border border-white/10"
                }`}
              >
                <p className="text-sm">{msg.content}</p>
                <span className="text-[10px] text-foreground/60 mt-1 block text-right">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-dark-200 border border-white/10 p-3 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-foreground/60 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-foreground/60 rounded-full animate-pulse delay-150"></div>
                  <div className="w-2 h-2 bg-foreground/60 rounded-full animate-pulse delay-300"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef}></div>
        </div>
      </CardContent>
      <div className="p-4 border-t border-white/10">
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <Input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Explique sua situação..." 
            className="flex-1 bg-dark-200 border-border/50"
          />
          <Button 
            type="submit" 
            size="icon" 
            disabled={isTyping || !input.trim()}
            className="bg-neon hover:bg-neon/90 hover:shadow-[0_0_10px_#ff0055]"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </Card>
  );
}
