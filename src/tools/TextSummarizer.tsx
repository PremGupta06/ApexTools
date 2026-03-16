import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const TextSummarizer = () => {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");

  const summarize = () => {
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
    if (sentences.length <= 3) { setSummary(text); return; }
    // Simple extractive: pick first, middle, last sentences
    const count = Math.max(3, Math.ceil(sentences.length * 0.3));
    const step = sentences.length / count;
    const picked: string[] = [];
    for (let i = 0; i < count; i++) {
      picked.push(sentences[Math.min(Math.floor(i * step), sentences.length - 1)].trim());
    }
    setSummary(picked.join(" "));
  };

  return (
    <ToolLayout title="Text Summarizer">
      <div className="space-y-4">
        <Textarea placeholder="Paste your long text here..." value={text} onChange={(e) => setText(e.target.value)} rows={8} className="resize-none" />
        <Button onClick={summarize} className="w-full" disabled={!text.trim()}>Summarize</Button>
        {summary && (
          <div className="p-4 rounded-lg bg-primary/10 border-glow">
            <p className="text-sm text-muted-foreground mb-2">Summary</p>
            <p className="text-sm leading-relaxed">{summary}</p>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default TextSummarizer;
