
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface HeaderProps {
  userEmail?: string;
  onLogout?: () => void;
}

export function Header({ userEmail, onLogout }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b border-white/10 py-4">
      <div className="container flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold relative group">
            <span className="text-foreground">Foda</span>
            <span className="text-neon neon-glow">Certa</span>
            <span className="text-foreground text-xs align-top">™</span>
          </h1>
        </div>
        
        {userEmail && (
          <div className="relative">
            <Button 
              variant="ghost" 
              size="sm"
              className="text-sm text-foreground/70 hover:text-foreground hover:bg-dark-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {userEmail}
            </Button>
            
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-dark-100 border border-white/10 rounded-md shadow-lg z-10">
                <div className="py-1">
                  <button
                    className="px-4 py-2 text-sm text-foreground/70 hover:bg-dark-200 w-full text-left"
                    onClick={() => {
                      setIsMenuOpen(false);
                      onLogout?.();
                    }}
                  >
                    Sair
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
