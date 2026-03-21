import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, RotateCcw } from "lucide-react";
import { toast } from "sonner";

const TextSummarizer = () => {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [level, setLevel] = useState<"short" | "medium" | "long">("medium");

  const splitSentences = (input: string) => {
    return input
      .replace(/\n/g, " ")
      .split(/(?<=[.!?])\s+/)
      .filter((s) => s.trim().length > 10);
  };

  const summarize = () => {
    if (!text.trim()) {
      toast.error("Enter text first");
      return;
    }

    const sentences = splitSentences(text);

    if (sentences.length <= 3) {
      setSummary(text);
      return;
    }

    let ratio = 0.3;
    if (level === "short") ratio = 0.2;
    if (level === "long") ratio = 0.5;

    const count = Math.max(2, Math.ceil(sentences.length * ratio));
    const step = sentences.length / count;

    const picked: string[] = [];

    for (let i = 0; i < count; i++) {
      picked.push(
        sentences[Math.min(Math.floor(i * step), sentences.length - 1)]
      );
    }

    setSummary(picked.join(" "));
    toast.success("Summary generated");
  };

  const copy = () => {
    navigator.clipboard.writeText(summary);
    toast.success("Copied!");
  };

  const reset = () => {
    setText("");
    setSummary("");
  };

  return (
    <ToolLayout title="Text Summarizer">

      <div className="space-y-6">

        {/* INPUT */}
        <Textarea
          placeholder="Paste your long text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={8}
          className="resize-none bg-black/40 border border-white/10 text-white backdrop-blur-md"
        />

        {/* LENGTH SELECT */}
        <div className="flex gap-2">
          {["short", "medium", "long"].map((l) => (
            <Button
              key={l}
              onClick={() => setLevel(l as any)}
              className={`flex-1 ${
                level === l
                  ? "btn-f1"
                  : "bg-black/30 border border-white/10"
              }`}
            >
              {l}
            </Button>
          ))}
        </div>

        {/* ACTIONS */}
        <div className="flex gap-3">
          <Button
            onClick={summarize}
            className="flex-1 btn-f1 font-semibold"
          >
            Summarize
          </Button>

          <Button
            onClick={reset}
            variant="ghost"
            className="border border-white/10"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>

        {/* OUTPUT */}
        {summary && (
          <div className="relative p-5 rounded-xl bg-black/40 border border-white/10 backdrop-blur-md">

            <p className="text-xs text-muted-foreground mb-2">
              Summary
            </p>

            <p className="text-sm leading-relaxed text-white">
              {summary}
            </p>

            <Button
              variant="ghost"
              size="icon"
              onClick={copy}
              className="absolute top-2 right-2"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default TextSummarizer;