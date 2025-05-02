
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface LoginFormProps {
  onLogin: (email: string) => void;
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Mock login - in a real app, this would connect to Supabase/Clerk
    setTimeout(() => {
      setIsLoading(false);
      if (email && email.includes("@")) {
        onLogin(email);
        toast("Login bem-sucedido", {
          description: "Bem-vindo ao FodaCerta™"
        });
      } else {
        toast("Erro no login", {
          description: "Por favor, use um email válido"
        });
      }
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm text-foreground/80">
          Email
        </label>
        <Input
          id="email"
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-dark-100 border-border/50"
          required
        />
      </div>
      <Button 
        type="submit" 
        className="w-full bg-neon hover:bg-neon/90 hover:shadow-[0_0_10px_#ff0055]"
        disabled={isLoading}
      >
        {isLoading ? "Conectando..." : "Entrar"}
      </Button>
      <p className="text-xs text-foreground/60 text-center pt-2">
        * No MVP, apenas simularemos o login
      </p>
    </form>
  );
}
