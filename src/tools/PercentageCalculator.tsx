import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const PercentageCalculator = () => {
  const [obtained, setObtained] = useState("");
  const [total, setTotal] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const calculate = () => {
    const o = parseFloat(obtained), t = parseFloat(total);
    if (!isNaN(o) && !isNaN(t) && t > 0) {
      setResult(((o / t) * 100).toFixed(2));
    }
  };

  return (
    <ToolLayout title="Percentage Calculator">
      <div className="space-y-4">
        <div><Label>Obtained Marks</Label><Input type="number" value={obtained} onChange={(e) => setObtained(e.target.value)} placeholder="e.g. 85" /></div>
        <div><Label>Total Marks</Label><Input type="number" value={total} onChange={(e) => setTotal(e.target.value)} placeholder="e.g. 100" /></div>
        <Button onClick={calculate} className="w-full">Calculate</Button>
        {result && (
          <div className="text-center p-4 rounded-lg bg-primary/10 border-glow">
            <p className="text-sm text-muted-foreground">Percentage</p>
            <p className="font-display font-bold text-3xl text-primary">{result}%</p>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default PercentageCalculator;
