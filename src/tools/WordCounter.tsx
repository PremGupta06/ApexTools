import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

const WordCounter = () => {
  const [text, setText] = useState("");

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  const charsNoSpace = text.replace(/\s/g, "").length;
  const sentences = text.trim()
    ? text.split(/[.!?]+/).filter((s) => s.trim().length > 0).length
    : 0;
  const paragraphs = text.trim()
    ? text.split(/\n+/).filter((p) => p.trim().length > 0).length
    : 0;

  // ⏱️ Reading time (~200 wpm)
  const readingTime = Math.ceil(words / 200);

  const reset = () => setText("");

  return (
    <ToolLayout title="Word Counter">

      <div className="space-y-6">

        {/* INPUT */}
        <Textarea
          placeholder="Start typing or paste your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={8}
          className="resize-none bg-black/40 border border-white/10 text-white backdrop-blur-md"
        />

        {/* ACTION */}
        <Button
          onClick={reset}
          variant="ghost"
          className="border border-white/10"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Clear
        </Button>

        {/* STATS */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">

          {[
            { label: "Words", value: words },
            { label: "Characters", value: chars },
            { label: "No Spaces", value: charsNoSpace },
            { label: "Sentences", value: sentences },
            { label: "Paragraphs", value: paragraphs },
            { label: "Reading Time", value: `${readingTime} min` },
          ].map((stat) => (
            <div
              key={stat.label}
              className="p-4 rounded-xl bg-black/40 border border-white/10 text-center backdrop-blur-md"
            >
              <p className="text-2xl font-bold text-gradient-f1">
                {stat.value}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.label}
              </p>
            </div>
          ))}

        </div>
      </div>
    </ToolLayout>
  );
};

export default WordCounter;