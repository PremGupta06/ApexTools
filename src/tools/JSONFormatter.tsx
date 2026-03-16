import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy } from "lucide-react";
import { toast } from "sonner";

const JSONFormatter = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const format = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError("");
    } catch (e: any) {
      setError(e.message);
      setOutput("");
    }
  };

  const minify = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError("");
    } catch (e: any) {
      setError(e.message);
      setOutput("");
    }
  };

  const copy = () => { navigator.clipboard.writeText(output); toast.success("Copied!"); };

  return (
    <ToolLayout title="JSON Formatter">
      <div className="space-y-4">
        <Textarea placeholder='Paste JSON here... e.g. {"name":"John"}' value={input} onChange={(e) => setInput(e.target.value)} rows={6} className="font-mono text-sm resize-none" />
        <div className="flex gap-2">
          <Button onClick={format} className="flex-1">Beautify</Button>
          <Button onClick={minify} variant="outline" className="flex-1 border-glow">Minify</Button>
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
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

export default JSONFormatter;
