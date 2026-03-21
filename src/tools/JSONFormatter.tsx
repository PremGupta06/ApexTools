import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, RotateCcw } from "lucide-react";
import { toast } from "sonner";

const JSONFormatter = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const format = () => {
    if (!input.trim()) {
      toast.error("Enter JSON first");
      return;
    }

    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError("");
      toast.success("Formatted successfully");
    } catch (e: any) {
      setError("Invalid JSON: " + e.message);
      setOutput("");
    }
  };

  const minify = () => {
    if (!input.trim()) {
      toast.error("Enter JSON first");
      return;
    }

    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError("");
      toast.success("Minified successfully");
    } catch (e: any) {
      setError("Invalid JSON: " + e.message);
      setOutput("");
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(output);
    toast.success("Copied!");
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  return (
    <ToolLayout title="JSON Formatter">

      <div className="space-y-6">

        {/* INPUT */}
        <Textarea
          placeholder='Paste JSON here... e.g. {"name":"John"}'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={6}
          className="font-mono text-sm resize-none bg-black/40 border border-white/10 backdrop-blur-md text-white focus:border-red-500/50"
        />

        {/* BUTTONS */}
        <div className="flex gap-3">
          <Button onClick={format} className="flex-1 btn-f1 font-semibold">
            Beautify
          </Button>

          <Button
            onClick={minify}
            className="flex-1 border border-white/20 bg-black/30 text-white hover:bg-white/10"
          >
            Minify
          </Button>

          <Button
            onClick={clearAll}
            variant="ghost"
            className="border border-white/10 hover:bg-white/10"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>

        {/* ERROR */}
        {error && (
          <div className="p-3 rounded-lg border border-red-500/30 bg-red-500/10 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* OUTPUT */}
        {output && (
          <div className="relative">
            <Textarea
              value={output}
              readOnly
              rows={8}
              className="font-mono text-sm resize-none bg-black/40 border border-white/10 backdrop-blur-md text-white pr-12"
            />

            {/* COPY */}
            <Button
              variant="ghost"
              size="icon"
              onClick={copy}
              className="absolute top-2 right-2 hover:shadow-[0_0_10px_rgba(255,0,0,0.6)]"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default JSONFormatter;