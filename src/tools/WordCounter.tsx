import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";

const WordCounter = () => {
  const [text, setText] = useState("");

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  const sentences = text.trim() ? text.split(/[.!?]+/).filter(Boolean).length : 0;
  const paragraphs = text.trim() ? text.split(/\n\n+/).filter(Boolean).length : 0;

  return (
    <ToolLayout title="Word Counter">
      <div className="space-y-6">
        <Textarea
          placeholder="Start typing or paste your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={8}
          className="resize-none"
        />

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Words", value: words },
            { label: "Characters", value: chars },
            { label: "Sentences", value: sentences },
            { label: "Paragraphs", value: paragraphs },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-3 rounded-lg bg-primary/5 border border-primary/20">
              <p className="font-display font-bold text-2xl text-primary">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
};

export default WordCounter;
