import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Coins, 
  TrendingUp, 
  RotateCcw, 
  PieChart, 
  Calendar,
  Percent
} from "lucide-react";
import { toast } from "sonner";

interface EmiResult {
  monthlyEmi: number;
  totalInterest: number;
  totalPayment: number;
  principalPercentage: number;
  interestPercentage: number;
}

const EMICalculator = () => {
  const [loan, setLoan] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [result, setResult] = useState<EmiResult | null>(null);

  const calculate = () => {
    const p = Number(loan);
    const r = Number(rate) / 12 / 100;
    const n = Number(years) * 12;

    if (!p || p <= 0) return toast.error("Please enter a valid loan amount");
    if (!rate || Number(rate) <= 0) return toast.error("Please enter a valid interest rate");
    if (!years || Number(years) <= 0) return toast.error("Please enter a valid loan term");

    const monthlyEmi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = monthlyEmi * n;
    const totalInterest = totalPayment - p;
    
    const principalPercentage = (p / totalPayment) * 100;
    const interestPercentage = (totalInterest / totalPayment) * 100;

    setResult({
      monthlyEmi,
      totalInterest,
      totalPayment,
      principalPercentage,
      interestPercentage
    });

    toast.success("EMI schedule computed!");
  };

  const handleReset = () => {
    setLoan("");
    setRate("");
    setYears("");
    setResult(null);
    toast.info("EMI inputs cleared");
  };

  return (
    <ToolLayout title="EMI Calculator">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: INPUT PARAMETERS */}
        <div className="md:col-span-6 space-y-5">
          
          <div className="p-5 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md space-y-4">
            
            {/* LOAN AMOUNT */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-1.5">
                <Coins className="h-4 w-4 text-red-500" />
                Loan Amount
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-gray-400 font-bold">₹</span>
                <Input
                  type="number"
                  placeholder="e.g. 5,00,000"
                  value={loan}
                  onChange={(e) => {
                    setLoan(e.target.value);
                    setResult(null);
                  }}
                  className="pl-8 bg-black/50 border-white/10 text-white focus:border-red-500/50"
                />
              </div>
            </div>

            {/* INTEREST RATE */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-1.5">
                <Percent className="h-4 w-4 text-cyan-400" />
                Interest Rate (p.a.)
              </label>
              <div className="relative">
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-semibold">%</span>
                <Input
                  type="number"
                  step="0.1"
                  placeholder="e.g. 8.5"
                  value={rate}
                  onChange={(e) => {
                    setRate(e.target.value);
                    setResult(null);
                  }}
                  className="pr-8 bg-black/50 border-white/10 text-white focus:border-red-500/50"
                />
              </div>
            </div>

            {/* LOAN TERM */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-purple-400" />
                Loan Term
              </label>
              <div className="relative">
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-semibold">Years</span>
                <Input
                  type="number"
                  placeholder="e.g. 5"
                  value={years}
                  onChange={(e) => {
                    setYears(e.target.value);
                    setResult(null);
                  }}
                  className="pr-12 bg-black/50 border-white/10 text-white focus:border-red-500/50"
                />
              </div>
            </div>

            {/* BUTTONS */}
            <div className="flex gap-2 pt-2">
              <Button onClick={calculate} className="btn-f1 flex-1 font-bold">
                Calculate Schedule
              </Button>
              {(loan || rate || years || result) && (
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

        {/* RIGHT COLUMN: DETAILED REPORT */}
        <div className="md:col-span-6 flex flex-col justify-center">
          {result ? (
            <div className="p-6 rounded-2xl border border-cyan-500/20 bg-black/40 backdrop-blur-md space-y-6 animate-fadeIn">
              
              {/* MONTHLY EMI HEADER */}
              <div className="text-center pb-4 border-b border-white/5">
                <p className="text-[10px] tracking-widest text-muted-foreground uppercase font-bold mb-1">
                  ESTIMATED MONTHLY INSTALLMENT
                </p>
                <h3 className="text-3xl font-extrabold text-white tracking-wide font-display">
                  ₹{result.monthlyEmi.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </h3>
              </div>

              {/* SPLIT BREAKDOWN BAR */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-red-400 flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded bg-red-500" />
                    Principal ({result.principalPercentage.toFixed(1)}%)
                  </span>
                  <span className="text-cyan-400 flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded bg-cyan-400" />
                    Interest ({result.interestPercentage.toFixed(1)}%)
                  </span>
                </div>
                {/* Visual Ratio Progress Bar */}
                <div className="h-3 rounded-full bg-white/5 overflow-hidden flex border border-white/5 shadow-inner">
                  <div 
                    className="h-full bg-gradient-to-r from-red-600 to-red-500 transition-all duration-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]"
                    style={{ width: `${result.principalPercentage}%` }}
                  />
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 transition-all duration-500 shadow-[0_0_10px_rgba(34,211,238,0.3)]"
                    style={{ width: `${result.interestPercentage}%` }}
                  />
                </div>
              </div>

              {/* REPORT GRID */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-3.5 rounded-xl border border-white/5 bg-white/5 hover:border-white/10 transition">
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-1">Principal Loan</p>
                  <p className="text-sm font-extrabold text-white">
                    ₹{Number(loan).toLocaleString()}
                  </p>
                </div>
                <div className="p-3.5 rounded-xl border border-white/5 bg-white/5 hover:border-white/10 transition">
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-1">Interest Payable</p>
                  <p className="text-sm font-extrabold text-cyan-400">
                    ₹{result.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </p>
                </div>
                <div className="p-3.5 rounded-xl border border-white/5 bg-gradient-to-br from-red-950/20 to-black/40 col-span-2 flex justify-between items-center hover:border-red-500/20 transition">
                  <div>
                    <p className="text-[9px] text-muted-foreground uppercase font-bold tracking-wider">Total Repayment Amount</p>
                    <p className="text-base font-extrabold text-white mt-0.5">
                      ₹{result.totalPayment.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </p>
                  </div>
                  <TrendingUp className="h-5 w-5 text-red-500 animate-pulse" />
                </div>
              </div>

            </div>
          ) : (
            <div className="p-6 rounded-2xl border border-dashed border-white/10 bg-black/20 text-center py-14 space-y-3">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/5 flex items-center justify-center mx-auto text-muted-foreground animate-pulse">
                📊
              </div>
              <p className="text-sm font-medium text-white">EMI Analytics Offline</p>
              <p className="text-xs text-muted-foreground max-w-[220px] mx-auto">
                Fill in the parameters on the left to review your detailed installment sheet and ratio split.
              </p>
            </div>
          )}
        </div>

      </div>
    </ToolLayout>
  );
};

export default EMICalculator;