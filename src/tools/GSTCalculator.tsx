import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Receipt, 
  RotateCcw, 
  TrendingUp, 
  DollarSign, 
  HelpCircle,
  TrendingDown
} from "lucide-react";
import { toast } from "sonner";

interface GstResult {
  originalCost: number;
  gstAmount: number;
  totalCost: number;
  cgst: number;
  sgst: number;
}

const GSTCalculator = () => {
  const [amount, setAmount] = useState("");
  const [gst, setGst] = useState("18");
  const [isInclusive, setIsInclusive] = useState(false); // false = Add GST (Exclusive), true = Remove GST (Inclusive)
  const [result, setResult] = useState<GstResult | null>(null);

  const calculate = () => {
    const amt = Number(amount);
    const rate = Number(gst);

    if (!amt || amt <= 0) return toast.error("Please enter a valid amount");
    if (isNaN(rate) || rate < 0) return toast.error("Please enter a valid GST rate");

    let originalCost = 0;
    let gstAmount = 0;
    let totalCost = 0;

    if (isInclusive) {
      // Remove GST (Inclusive of GST)
      originalCost = amt / (1 + rate / 100);
      gstAmount = amt - originalCost;
      totalCost = amt;
    } else {
      // Add GST (Exclusive of GST)
      originalCost = amt;
      gstAmount = (amt * rate) / 100;
      totalCost = amt + gstAmount;
    }

    const cgst = gstAmount / 2;
    const sgst = gstAmount / 2;

    setResult({
      originalCost,
      gstAmount,
      totalCost,
      cgst,
      sgst
    });

    toast.success("GST breakdown calculated!");
  };

  const handleReset = () => {
    setAmount("");
    setGst("18");
    setResult(null);
    toast.info("GST inputs cleared");
  };

  const handlePresetSelect = (preset: number) => {
    setGst(String(preset));
    // Auto calculate if amount is already entered
    if (amount) {
      setTimeout(() => calculate(), 0);
    }
  };

  return (
    <ToolLayout title="GST Calculator">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: PARAMETER INPUTS */}
        <div className="md:col-span-6 space-y-5">
          
          <div className="p-5 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md space-y-4">
            
            {/* MODE TOGGLE */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Calculation Mode</label>
              <div className="grid grid-cols-2 gap-1.5 p-1 bg-black/40 rounded-xl border border-white/5">
                <button
                  onClick={() => {
                    setIsInclusive(false);
                    setResult(null);
                  }}
                  className={`py-2 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all ${
                    !isInclusive
                      ? "bg-gradient-to-r from-red-600 to-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.3)]"
                      : "text-muted-foreground hover:text-white hover:bg-white/5"
                  }`}
                >
                  Add GST (Excl)
                </button>
                <button
                  onClick={() => {
                    setIsInclusive(true);
                    setResult(null);
                  }}
                  className={`py-2 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all ${
                    isInclusive
                      ? "bg-gradient-to-r from-red-600 to-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.3)]"
                      : "text-muted-foreground hover:text-white hover:bg-white/5"
                  }`}
                >
                  Remove GST (Incl)
                </button>
              </div>
            </div>

            {/* BASE AMOUNT */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-1.5">
                <HelpCircle className="h-4 w-4 text-red-500" />
                {isInclusive ? "Total Inclusive Amount" : "Original Net Cost"}
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-gray-400 font-bold">₹</span>
                <Input
                  type="number"
                  placeholder="e.g. 10,000"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                    setResult(null);
                  }}
                  className="pl-8 bg-black/50 border-white/10 text-white focus:border-red-500/50"
                />
              </div>
            </div>

            {/* TAX RATE & PRESETS */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-1.5">
                <Receipt className="h-4 w-4 text-cyan-400" />
                GST Percentage (%)
              </label>
              <div className="relative">
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-semibold">%</span>
                <Input
                  type="number"
                  placeholder="GST %"
                  value={gst}
                  onChange={(e) => {
                    setGst(e.target.value);
                    setResult(null);
                  }}
                  className="pr-8 bg-black/50 border-white/10 text-white focus:border-red-500/50"
                />
              </div>
              
              {/* Presets Grid */}
              <div className="grid grid-cols-4 gap-2 pt-1">
                {[5, 12, 18, 28].map((rate) => (
                  <button
                    key={rate}
                    onClick={() => handlePresetSelect(rate)}
                    className={`py-1 rounded-lg border text-xs font-bold transition ${
                      gst === String(rate)
                        ? "bg-white/10 border-cyan-400 text-cyan-400"
                        : "border-white/10 text-muted-foreground hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {rate}%
                  </button>
                ))}
              </div>
            </div>

            {/* BUTTONS */}
            <div className="flex gap-2 pt-2">
              <Button onClick={calculate} className="btn-f1 flex-1 font-bold">
                Calculate Breakdown
              </Button>
              {(amount || gst !== "18" || result) && (
                <Button 
                  onClick={handleReset} 
                  variant="outline" 
                  className="border-white/10 hover:border-red-500/30 hover:bg-red-500/10 text-white px-3"
                  title="Reset inputs"
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              )}
            </div>

          </div>

        </div>

        {/* RIGHT COLUMN: TAX BREAKDOWN REPORT */}
        <div className="md:col-span-6 flex flex-col justify-center">
          {result ? (
            <div className="p-6 rounded-2xl border border-cyan-500/20 bg-black/40 backdrop-blur-md space-y-5 animate-fadeIn">
              
              {/* PRIMARY TAX HEADER */}
              <div className="text-center pb-4 border-b border-white/5">
                <p className="text-[10px] tracking-widest text-muted-foreground uppercase font-bold mb-1">
                  TOTAL CALCULATED GST
                </p>
                <h3 className="text-3xl font-extrabold text-cyan-400 tracking-wide font-display">
                  ₹{result.gstAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </h3>
              </div>

              {/* SPLIT BREAKDOWN */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <p className="text-[9px] text-muted-foreground uppercase font-bold">CGST (Central Tax 50%)</p>
                  <p className="text-sm font-extrabold text-white">
                    ₹{result.cgst.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <p className="text-[9px] text-muted-foreground uppercase font-bold">SGST (State Tax 50%)</p>
                  <p className="text-sm font-extrabold text-white">
                    ₹{result.sgst.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </p>
                </div>
              </div>

              {/* ORIGINAL COST VS TOTAL COST */}
              <div className="space-y-3 pt-2">
                <div className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-xs text-muted-foreground font-semibold flex items-center gap-1.5">
                    <TrendingDown className="h-4 w-4 text-red-400" />
                    Original Base Price (Net)
                  </span>
                  <span className="text-sm font-bold text-white">
                    ₹{result.originalCost.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="flex justify-between items-center p-3.5 rounded-xl bg-gradient-to-br from-red-950/20 to-black/60 border border-red-500/20">
                  <span className="text-xs text-white font-bold flex items-center gap-1.5">
                    <TrendingUp className="h-4 w-4 text-red-500" />
                    Total Gross Amount (Final)
                  </span>
                  <span className="text-base font-extrabold text-white">
                    ₹{result.totalCost.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

            </div>
          ) : (
            <div className="p-6 rounded-2xl border border-dashed border-white/10 bg-black/20 text-center py-14 space-y-3">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/5 flex items-center justify-center mx-auto text-muted-foreground animate-pulse">
                🧾
              </div>
              <p className="text-sm font-medium text-white">GST Breakdown Offline</p>
              <p className="text-xs text-muted-foreground max-w-[220px] mx-auto">
                Fill in the net price and tax rates on the left to verify SGST/CGST tax splits.
              </p>
            </div>
          )}
        </div>

      </div>
    </ToolLayout>
  );
};

export default GSTCalculator;