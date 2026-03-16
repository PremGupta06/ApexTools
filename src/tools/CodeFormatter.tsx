import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy } from "lucide-react";
import { toast } from "sonner";

const CodeFormatter = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const format = () => {
    // Simple indentation formatter for JS/JSON-like code
    let indent = 0;
    const lines = input.split("\n");
    const formatted = lines.map((line) => {
      const trimmed = line.trim();
      if (trimmed.startsWith("}") || trimmed.startsWith("]") || trimmed.startsWith(")")) indent = Math.max(0, indent - 1);
      const result = "  ".repeat(indent) + trimmed;
      if (trimmed.endsWith("{") || trimmed.endsWith("[") || trimmed.endsWith("(")) indent++;
      return result;
    }).join("\n");
    setOutput(formatted);
  };

  const copy = () => { navigator.clipboard.writeText(output); toast.success("Copied!"); };

  return (
    <ToolLayout title="Code Formatter">
      <div className="space-y-4">
        <Textarea placeholder="Paste your code here..." value={input} onChange={(e) => setInput(e.target.value)} rows={8} className="font-mono text-sm resize-none" />
        <Button onClick={format} className="w-full">Format Code</Button>
        {output && (
          <div className="relative">
            <Textarea value={output} readOnly rows={8} className="font-mono text-sm resize-none" />
            <Button variant="ghost" size="icon" onClick={copy} className="absolute top-2 right-2"><Copy className="h-4 w-4" /></Button>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default CodeFormatter;
