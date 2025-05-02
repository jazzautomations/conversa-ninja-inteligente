
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface HistoryEntry {
  id: number;
  date: string;
  profileName: string;
  summary: string;
  tags: string[];
}

interface HistorySectionProps {
  entries?: HistoryEntry[];
}

export function HistorySection({ entries = [] }: HistorySectionProps) {
  const defaultEntries: HistoryEntry[] = [
    {
      id: 1,
      date: "10/05/2024",
      profileName: "Ana do Tinder",
      summary: "Passivo-agressiva, responde melhor quando tem controle",
      tags: ["👻 risco de ghost", "🔥 jogo mental"]
    },
    {
      id: 2,
      date: "08/05/2024",
      profileName: "Maria do Instagram",
      summary: "Carente, busca validação, responde rápido demais",
      tags: ["⚠️ mensagens frequentes", "💀 muito disponível"]
    }
  ];

  const displayEntries = entries.length > 0 ? entries : defaultEntries;

  return (
    <Card className="border border-white/10 bg-dark-100">
      <CardHeader className="border-b border-white/10 py-3">
        <CardTitle className="text-lg">Histórico de Análises</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {displayEntries.map((entry) => (
          <div key={entry.id} className="py-3 px-4 border-b border-white/10 last:border-0">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium text-neon">{entry.profileName}</h3>
              <span className="text-xs text-foreground/60">{entry.date}</span>
            </div>
            <p className="text-sm text-foreground/80 mb-2">{entry.summary}</p>
            <div className="flex flex-wrap gap-1">
              {entry.tags.map((tag, i) => (
                <span key={i} className="text-xs px-2 py-1 bg-dark-200 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
        
        <div className="p-4">
          <Button variant="outline" size="sm" className="w-full text-xs border-neon/50 hover:border-neon bg-transparent text-neon/80 hover:text-neon">
            Ver histórico completo
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
