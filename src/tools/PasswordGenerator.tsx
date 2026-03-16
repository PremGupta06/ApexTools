import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Copy, RefreshCw } from "lucide-react";
import { toast } from "sonner";

const PasswordGenerator = () => {
  const [length, setLength] = useState(16);
  const [uppercase, setUppercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [password, setPassword] = useState("");

  const generate = () => {
    let chars = "abcdefghijklmnopqrstuvwxyz";
    if (uppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numbers) chars += "0123456789";
    if (symbols) chars += "!@#$%^&*()_+-=";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(result);
  };

  const copy = () => {
    navigator.clipboard.writeText(password);
    toast.success("Copied to clipboard!");
  };

  return (
    <ToolLayout title="Password Generator">
      <div className="space-y-6">
        {password && (
          <div className="flex items-center gap-2 p-4 rounded-lg bg-primary/5 border border-primary/20 font-mono text-sm break-all">
            <span className="flex-1">{password}</span>
            <Button variant="ghost" size="icon" onClick={copy}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        )}

        <div>
          <div className="flex justify-between mb-2">
            <Label>Length</Label>
            <span className="text-sm text-muted-foreground">{length}</span>
          </div>
          <Slider value={[length]} onValueChange={([v]) => setLength(v)} min={8} max={64} step={1} />
        </div>

        <div className="space-y-3">
          {[
            { label: "Uppercase letters", checked: uppercase, set: setUppercase },
            { label: "Numbers", checked: numbers, set: setNumbers },
            { label: "Symbols", checked: symbols, set: setSymbols },
          ].map((opt) => (
            <div key={opt.label} className="flex items-center justify-between">
              <Label>{opt.label}</Label>
              <Switch checked={opt.checked} onCheckedChange={opt.set} />
            </div>
          ))}
        </div>

        <Button onClick={generate} className="w-full">
          <RefreshCw className="mr-2 h-4 w-4" /> Generate Password
        </Button>
      </div>
    </ToolLayout>
  );
};

export default PasswordGenerator;
