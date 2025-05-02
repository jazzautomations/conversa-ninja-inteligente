
import { useState } from "react";
import { Header } from "@/components/Header";
import { LoginForm } from "@/components/LoginForm";
import { ConversationAnalyzer } from "@/components/ConversationAnalyzer";
import { AIChat } from "@/components/AIChat";
import { HistorySection } from "@/components/HistorySection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string | undefined>();

  const handleLogin = (email: string) => {
    setUserEmail(email);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setUserEmail(undefined);
    setIsLoggedIn(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-dark">
      <Header userEmail={userEmail} onLogout={handleLogout} />
      
      <main className="flex-1 container py-6">
        {!isLoggedIn ? (
          <div className="min-h-[80vh] flex flex-col items-center justify-center">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-3">
                <span className="text-foreground">Foda</span>
                <span className="text-neon neon-glow">Certa</span>
                <span className="text-foreground text-sm align-top">™</span>
              </h1>
              <p className="text-foreground/70 max-w-md mx-auto">
                Seu copiloto de IA para decifrar interações amorosas e tomar decisões
                mais estratégicas nas conversas de flerte.
              </p>
            </div>
            <LoginForm onLogin={handleLogin} />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Tabs defaultValue="analysis" className="space-y-6">
                <TabsList className="bg-dark-100 border border-white/10">
                  <TabsTrigger value="analysis" className="data-[state=active]:bg-neon/20">
                    Análise
                  </TabsTrigger>
                  <TabsTrigger value="chat" className="data-[state=active]:bg-neon/20">
                    Conselheiro IA
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="analysis" className="mt-0 space-y-6">
                  <ConversationAnalyzer />
                </TabsContent>
                <TabsContent value="chat" className="mt-0">
                  <AIChat />
                </TabsContent>
              </Tabs>
            </div>
            <div>
              <HistorySection />
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-white/10 py-4">
        <div className="container">
          <p className="text-xs text-center text-foreground/50">
            FodaCerta™ MVP © 2024 - Estratégia amorosa com inteligência artificial
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
