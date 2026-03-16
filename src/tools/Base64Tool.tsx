import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy } from "lucide-react";
import { toast } from "sonner";

const Base64Tool = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const encode = () => {
    try { setOutput(btoa(input)); } catch { setOutput("Error: Invalid input for encoding"); }
  };
  const decode = () => {
    try { setOutput(atob(input)); } catch { setOutput("Error: Invalid Base64 string"); }
  };
  const copy = () => { navigator.clipboard.writeText(output); toast.success("Copied!"); };

  return (
    <ToolLayout title="Base64 Encoder / Decoder">
      <div className="space-y-4">
        <Textarea placeholder="Enter text to encode or Base64 string to decode..." value={input} onChange={(e) => setInput(e.target.value)} rows={5} className="resize-none" />
        <div className="flex gap-2">
          <Button onClick={encode} className="flex-1">Encode</Button>
          <Button onClick={decode} variant="outline" className="flex-1 border-glow">Decode</Button>
        </div>
        {output && (
          <div className="relative">
            <Textarea value={output} readOnly rows={5} className="resize-none" />
            <Button variant="ghost" size="icon" onClick={copy} className="absolute top-2 right-2"><Copy className="h-4 w-4" /></Button>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default Base64Tool;
