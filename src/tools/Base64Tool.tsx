import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const Base64Tool = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const encode = () => {
    if (!input.trim()) {
      toast.error("Enter text first");
      return;
    }
    try {
      setOutput(btoa(unescape(encodeURIComponent(input))));
    } catch {
      setOutput("Error: Unable to encode");
    }
  };

  const decode = () => {
    if (!input.trim()) {
      toast.error("Enter Base64 string");
      return;
    }
    try {
      setOutput(decodeURIComponent(escape(atob(input))));
    } catch {
      setOutput("Error: Invalid Base64");
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(output);
    toast.success("Copied!");
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
  };

  return (
    <ToolLayout title="Base64 Encoder / Decoder">

      {/* 🛞 WHEEL DECOR */}
      <motion.img
        src="https://cdn-icons-png.flaticon.com/512/743/743131.png"
        alt="wheel"
        className="absolute top-6 right-6 w-16 opacity-20 pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
      />

      {/* 🏎️ CAR DECOR */}
      <motion.img
        src="https://pngimg.com/uploads/formula_1/formula_1_PNG31.png"
        alt="car"
        className="absolute bottom-4 right-10 w-48 opacity-20 pointer-events-none hidden sm:block"
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 4 }}
      />

      <div className="space-y-6 relative z-10">

        {/* INPUT */}
        <Textarea
          placeholder="Enter text or Base64 string..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={5}
          className="resize-none bg-black/40 border border-white/10 backdrop-blur-md text-white focus:border-red-500/50"
        />

        {/* BUTTONS */}
        <div className="flex gap-3">
          <Button
            onClick={encode}
            className="flex-1 btn-f1 font-semibold"
          >
            Encode
          </Button>

          <Button
            onClick={decode}
            className="flex-1 border border-white/20 bg-black/30 text-white hover:bg-white/10"
          >
            Decode
          </Button>

          <Button
            onClick={clearAll}
            variant="ghost"
            className="border border-white/10 hover:bg-white/10"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>

        {/* OUTPUT */}
        {output && (
          <div className="relative">

            <Textarea
              value={output}
              readOnly
              rows={5}
              className="resize-none bg-black/40 border border-white/10 backdrop-blur-md text-white pr-12"
            />

            {/* COPY BUTTON */}
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

export default Base64Tool;