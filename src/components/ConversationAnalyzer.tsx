
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Upload } from "lucide-react";

interface AnalysisTag {
  text: string;
  type: "warning" | "positive" | "negative" | "neutral";
  icon: string;
}

interface AnalysisResult {
  tags: AnalysisTag[];
  profile: {
    communication: string[];
    patterns: string[];
    archetype?: string;
    approach: string[];
  };
  risk: "Baixo" | "Médio" | "Alto";
  strategy: string;
}

export function ConversationAnalyzer() {
  const [conversation, setConversation] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = () => {
    if (conversation.trim().length < 10) {
      toast("Texto muito curto", {
        description: "Precisamos de mais conteúdo para análise"
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulando análise de IA
    setTimeout(() => {
      setIsAnalyzing(false);
      
      const mockResult: AnalysisResult = {
        tags: [
          { text: "carente demais", type: "warning", icon: "⚠️" },
          { text: "tensão sexual no ar", type: "positive", icon: "🔥" },
          { text: "risco de ghost", type: "negative", icon: "👻" },
        ],
        profile: {
          communication: ["Passivo-agressiva", "Evasiva"],
          patterns: ["Foge quando sente pressão", "Usa humor para evitar sinceridade"],
          archetype: "Esfinge",
          approach: ["Fale menos", "Crie tensão com silêncio", "Evite elogios diretos"]
        },
        risk: "Médio",
        strategy: "Frases curtas, tom misterioso, humor negro seco. Evite: elogios óbvios, insistência, exposição emocional precoce."
      };
      
      setResult(mockResult);
      toast("Análise concluída", {
        description: "Detectamos os padrões da sua conversa"
      });
    }, 2000);
  };

  const handleUploadImage = () => {
    toast("Função em desenvolvimento", {
      description: "Upload de imagens estará disponível em breve"
    });
  };

  return (
    <div className="space-y-6">
      <Card className="border border-white/10 bg-dark-100">
        <CardHeader>
          <CardTitle className="text-xl flex justify-between items-center">
            <span>Análise de Conversa</span>
            <Button 
              variant="outline" 
              size="icon" 
              className="border-neon/50 hover:border-neon bg-transparent"
              onClick={handleUploadImage}
            >
              <Upload className="h-4 w-4 text-neon" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Cole sua conversa aqui ou descreva a pessoa..."
            value={conversation}
            onChange={(e) => setConversation(e.target.value)}
            className="min-h-[120px] bg-dark-200 border-border/50 resize-none mb-4"
          />
          <Button 
            onClick={handleAnalyze} 
            className="w-full bg-neon hover:bg-neon/90"
            disabled={isAnalyzing}
          >
            {isAnalyzing ? "Analisando..." : "Analisar"}
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Card className="border border-white/10 bg-dark-100 overflow-hidden">
          <div className="bg-neon/10 border-b border-neon/20 p-3">
            <h3 className="text-lg font-medium text-white">Resultado da Análise</h3>
          </div>
          <CardContent className="pt-6 space-y-4">
            <div className="flex flex-wrap gap-2">
              {result.tags.map((tag, i) => (
                <span 
                  key={i} 
                  className="px-3 py-1 rounded-full text-sm bg-dark-200 border border-white/10 flex items-center gap-1"
                >
                  {tag.icon} {tag.text}
                </span>
              ))}
            </div>
            
            <div className="space-y-3 pt-2">
              <div>
                <h4 className="text-sm text-neon mb-1">Comunicação</h4>
                <p className="text-sm text-foreground/80">{result.profile.communication.join(", ")}</p>
              </div>
              
              <div>
                <h4 className="text-sm text-neon mb-1">Padrões</h4>
                <p className="text-sm text-foreground/80">{result.profile.patterns.join(", ")}</p>
              </div>
              
              {result.profile.archetype && (
                <div>
                  <h4 className="text-sm text-neon mb-1">Arquétipo</h4>
                  <p className="text-sm text-foreground/80">{result.profile.archetype}</p>
                </div>
              )}
              
              <div>
                <h4 className="text-sm text-neon mb-1">Abordagem sugerida</h4>
                <ul className="list-disc list-inside text-sm text-foreground/80">
                  {result.profile.approach.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-4 p-3 border border-neon/30 bg-dark-200 rounded-md">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-sm font-medium">Risco de ghost</h4>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    result.risk === "Baixo" ? "bg-green-900/50 text-green-400" :
                    result.risk === "Médio" ? "bg-yellow-900/50 text-yellow-400" :
                    "bg-red-900/50 text-red-400"
                  }`}>
                    {result.risk}
                  </span>
                </div>
                <p className="text-sm text-foreground/80">{result.strategy}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
