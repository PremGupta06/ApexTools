import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RotateCcw } from "lucide-react";
import { toast } from "sonner";

const PercentageCalculator = () => {
  const [obtained, setObtained] = useState("");
  const [total, setTotal] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const calculate = () => {
    const o = parseFloat(obtained);
    const t = parseFloat(total);

    if (!obtained || !total) {
      toast.error("Enter both values");
      return;
    }

    if (isNaN(o) || isNaN(t)) {
      toast.error("Invalid numbers");
      return;
    }

    if (t <= 0) {
      toast.error("Total must be greater than 0");
      return;
    }

    const res = ((o / t) * 100).toFixed(2);
    setResult(res);
    toast.success("Calculated!");
  };

  const reset = () => {
    setObtained("");
    setTotal("");
    setResult(null);
  };

  return (
    <ToolLayout title="Percentage Calculator">

      <div className="space-y-6">

        {/* INPUTS */}
        <div className="space-y-4">

          <div>
            <Label className="mb-1 block text-sm">Obtained Marks</Label>
            <Input
              type="number"
              value={obtained}
              onChange={(e) => setObtained(e.target.value)}
              placeholder="e.g. 85"
              className="bg-black/40 border border-white/10 text-white backdrop-blur-md focus:border-red-500/50"
            />
          </div>

          <div>
            <Label className="mb-1 block text-sm">Total Marks</Label>
            <Input
              type="number"
              value={total}
              onChange={(e) => setTotal(e.target.value)}
              placeholder="e.g. 100"
              className="bg-black/40 border border-white/10 text-white backdrop-blur-md focus:border-red-500/50"
            />
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex gap-3">
          <Button
            onClick={calculate}
            className="flex-1 btn-f1 font-semibold"
          >
            Calculate
          </Button>

          <Button
            onClick={reset}
            variant="ghost"
            className="border border-white/10 hover:bg-white/10"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>

        {/* RESULT */}
        {result && (
          <div className="text-center p-6 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md card-shadow-hover">

            <p className="text-sm text-muted-foreground mb-2">
              Percentage
            </p>

            <p className="font-bold text-4xl text-gradient-f1">
              {result}%
            </p>
          </div>
        )}

      </div>
    </ToolLayout>
  );
};

export default PercentageCalculator;