import { useState, useEffect } from "react";
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

  const lower = "abcdefghijklmnopqrstuvwxyz";
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const nums = "0123456789";
  const syms = "!@#$%^&*()_+-=";

  const getRandomChar = (set) => {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return set[array[0] % set.length];
  };

  const shuffle = (str) => {
    return str
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");
  };

  const generate = () => {
    let charPool = lower;
    let result = "";

    if (uppercase) charPool += upper;
    if (numbers) charPool += nums;
    if (symbols) charPool += syms;

    if (!uppercase && !numbers && !symbols) {
      toast.error("Select at least one option");
      return;
    }

    // Ensure at least one of each selected type
    if (uppercase) result += getRandomChar(upper);
    if (numbers) result += getRandomChar(nums);
    if (symbols) result += getRandomChar(syms);

    while (result.length < length) {
      result += getRandomChar(charPool);
    }

    setPassword(shuffle(result).slice(0, length));
  };

  const copy = () => {
    navigator.clipboard.writeText(password);
    toast.success("Copied!");
  };

  const getStrength = () => {
    if (length < 10) return { label: "Weak", color: "text-red-400" };
    if (length < 16) return { label: "Medium", color: "text-yellow-400" };
    return { label: "Strong", color: "text-green-400" };
  };

  useEffect(() => {
    generate();
  }, []);

  const strength = getStrength();

  return (
    <ToolLayout title="Password Generator">

      <div className="space-y-6">

        {/* PASSWORD OUTPUT */}
        {password && (
          <div className="p-4 rounded-xl bg-black/40 border border-white/10 backdrop-blur-md font-mono text-sm flex items-center gap-2">

            <span className="flex-1 break-all">{password}</span>

            <span className={`text-xs font-semibold ${strength.color}`}>
              {strength.label}
            </span>

            <Button
              variant="ghost"
              size="icon"
              onClick={copy}
              className="hover:shadow-[0_0_10px_rgba(255,0,0,0.6)]"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* LENGTH */}
        <div>
          <div className="flex justify-between mb-2">
            <Label>Length</Label>
            <span className="text-sm text-muted-foreground">{length}</span>
          </div>

          <Slider
            value={[length]}
            onValueChange={([v]) => setLength(v)}
            min={8}
            max={64}
            step={1}
          />
        </div>

        {/* OPTIONS */}
        <div className="space-y-4">
          {[
            { label: "Uppercase letters", checked: uppercase, set: setUppercase },
            { label: "Numbers", checked: numbers, set: setNumbers },
            { label: "Symbols", checked: symbols, set: setSymbols },
          ].map((opt) => (
            <div
              key={opt.label}
              className="flex items-center justify-between p-3 rounded-lg bg-black/30 border border-white/10"
            >
              <Label>{opt.label}</Label>
              <Switch checked={opt.checked} onCheckedChange={opt.set} />
            </div>
          ))}
        </div>

        {/* GENERATE */}
        <Button
          onClick={generate}
          className="w-full btn-f1 font-semibold"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Generate Password
        </Button>
      </div>
    </ToolLayout>
  );
};

export default PasswordGenerator;