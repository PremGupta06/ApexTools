import { useState, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Calendar, 
  Hourglass, 
  Sparkles, 
  Clock, 
  RotateCcw,
  Cake,
  TrendingUp 
} from "lucide-react";
import { toast } from "sonner";

interface Zodiac {
  name: string;
  emoji: string;
}

const getZodiacSign = (date: Date): Zodiac => {
  const m = date.getMonth() + 1;
  const d = date.getDate();

  if ((m === 3 && d >= 21) || (m === 4 && d <= 19)) return { name: "Aries", emoji: "♈" };
  if ((m === 4 && d >= 20) || (m === 5 && d <= 20)) return { name: "Taurus", emoji: "♉" };
  if ((m === 5 && d >= 21) || (m === 6 && d <= 20)) return { name: "Gemini", emoji: "♊" };
  if ((m === 6 && d >= 21) || (m === 7 && d <= 22)) return { name: "Cancer", emoji: "♋" };
  if ((m === 7 && d >= 23) || (m === 8 && d <= 22)) return { name: "Leo", emoji: "♌" };
  if ((m === 8 && d >= 23) || (m === 9 && d <= 22)) return { name: "Virgo", emoji: "♍" };
  if ((m === 9 && d >= 23) || (m === 10 && d <= 22)) return { name: "Libra", emoji: "♎" };
  if ((m === 10 && d >= 23) || (m === 11 && d <= 21)) return { name: "Scorpio", emoji: "♏" };
  if ((m === 11 && d >= 22) || (m === 12 && d <= 21)) return { name: "Sagittarius", emoji: "♐" };
  if ((m === 12 && d >= 22) || (m === 1 && d <= 19)) return { name: "Capricorn", emoji: "♑" };
  if ((m === 1 && d >= 20) || (m === 2 && d <= 18)) return { name: "Aquarius", emoji: "♒" };
  return { name: "Pisces", emoji: "♓" };
};

const AgeCalculator = () => {
  const [dob, setDob] = useState("");
  const [isCalculated, setIsCalculated] = useState(false);
  const [today, setToday] = useState(new Date());

  // Running live ticker updates when date is calculated
  useEffect(() => {
    let interval: any = null;
    if (isCalculated) {
      interval = setInterval(() => {
        setToday(new Date());
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isCalculated]);

  const handleCalculate = () => {
    if (!dob) {
      toast.error("Please select a date of birth");
      return;
    }
    const birthDate = new Date(dob);
    if (birthDate.getTime() > new Date().getTime()) {
      toast.error("Birth date cannot be in the future!");
      return;
    }
    setIsCalculated(true);
    toast.success("Lifetime stats computed!");
  };

  const handleReset = () => {
    setDob("");
    setIsCalculated(false);
    toast.info("Calculator reset");
  };

  // Calculations relative to ticking `today`
  const birth = new Date(dob);
  
  // Exact Age Calculation
  let years = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();
  let days = today.getDate() - birth.getDate();

  if (days < 0) {
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
    months--;
  }
  if (months < 0) {
    months += 12;
    years--;
  }

  // Lifetime Statistics
  const diffMs = today.getTime() - birth.getTime();
  const totalSeconds = Math.floor(diffMs / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const totalDays = Math.floor(totalHours / 24);
  const totalWeeks = Math.floor(totalDays / 7);
  const totalMonthsLived = Math.floor(totalDays / 30.4375);

  // Next Birthday Countdown
  let nextBday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
  if (today.getTime() > nextBday.getTime()) {
    nextBday.setFullYear(today.getFullYear() + 1);
  }
  const bdayDiffMs = nextBday.getTime() - today.getTime();
  const bdayDays = Math.floor(bdayDiffMs / (1000 * 60 * 60 * 24));
  const bdayHours = Math.floor((bdayDiffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const bdayMinutes = Math.floor((bdayDiffMs % (1000 * 60 * 60)) / (1000 * 60));
  const bdaySeconds = Math.floor((bdayDiffMs % (1000 * 60)) / 1000);

  const zodiac = isCalculated ? getZodiacSign(birth) : null;

  return (
    <ToolLayout title="Age Calculator">
      <div className="space-y-6">
        
        {/* INPUT PANEL */}
        <div className="p-5 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md space-y-4">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-red-500" />
              Select Date of Birth
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="date"
                value={dob}
                onChange={(e) => {
                  setDob(e.target.value);
                  setIsCalculated(false);
                }}
                className="bg-black/50 border-white/10 text-white focus:border-red-500/50 flex-1"
              />
              <div className="flex gap-2">
                <Button onClick={handleCalculate} className="btn-f1 flex-1 sm:flex-initial">
                  Analyze Age
                </Button>
                {isCalculated && (
                  <Button 
                    onClick={handleReset} 
                    variant="outline" 
                    className="border-white/10 hover:border-red-500/30 hover:bg-red-500/10 text-white p-2.5"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* RESULTS PANEL */}
        {isCalculated && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* HERO STAT CARD */}
            <div className="p-6 rounded-2xl border border-red-500/20 bg-gradient-to-br from-red-950/20 to-black/60 relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 blur-xl rounded-full" />
              
              <div>
                <p className="text-[10px] tracking-widest text-muted-foreground uppercase font-bold mb-1">
                  CURRENT ACCURATE AGE
                </p>
                <h3 className="text-3xl font-extrabold text-white tracking-wide font-display">
                  {years} <span className="text-sm font-semibold text-muted-foreground">Years</span> • {months} <span className="text-sm font-semibold text-muted-foreground">Months</span> • {days} <span className="text-sm font-semibold text-muted-foreground">Days</span>
                </h3>
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <Clock className="h-3 w-3 text-cyan-400" />
                  Real-time lifecycle counter ticking...
                </p>
              </div>

              {zodiac && (
                <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2.5">
                  <span className="text-2xl">{zodiac.emoji}</span>
                  <div>
                    <p className="text-[9px] text-muted-foreground uppercase font-semibold">Zodiac Sign</p>
                    <p className="text-xs font-bold text-white uppercase tracking-wider">{zodiac.name}</p>
                  </div>
                </div>
              )}
            </div>

            {/* COUNTDOWN TO NEXT BIRTHDAY */}
            <div className="p-5 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md space-y-3">
              <h4 className="text-xs font-bold tracking-widest text-muted-foreground uppercase flex items-center gap-2">
                <Cake className="h-4 w-4 text-pink-500" />
                COUNTDOWN TO NEXT BIRTHDAY
              </h4>
              <div className="grid grid-cols-5 gap-2 text-center">
                {[
                  { label: "Days", val: bdayDays },
                  { label: "Hours", val: bdayHours },
                  { label: "Mins", val: bdayMinutes },
                  { label: "Secs", val: bdaySeconds }
                ].map((item, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                    <p className="text-lg sm:text-2xl font-mono font-bold text-gradient-f1">
                      {String(item.val).padStart(2, "0")}
                    </p>
                    <p className="text-[9px] uppercase font-semibold text-muted-foreground tracking-wider">
                      {item.label}
                    </p>
                  </div>
                ))}
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-red-500/10 to-cyan-500/10 border border-white/5 flex flex-col justify-center items-center">
                  <Sparkles className="h-4 w-4 text-yellow-400 mb-0.5 animate-pulse" />
                  <p className="text-[9px] uppercase font-bold text-white tracking-widest">Wishes</p>
                </div>
              </div>
            </div>

            {/* LIFETIME DETAILS GRID */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold tracking-widest text-muted-foreground uppercase flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-cyan-400" />
                LIFETIME QUANTITY BREAKDOWN
              </h4>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { label: "Total Months", value: totalMonthsLived.toLocaleString(), emoji: "📅" },
                  { label: "Total Weeks", value: totalWeeks.toLocaleString(), emoji: "⏳" },
                  { label: "Total Days", value: totalDays.toLocaleString(), emoji: "☀️" },
                  { label: "Total Hours", value: totalHours.toLocaleString(), emoji: "⏰" },
                  { label: "Total Minutes", value: totalMinutes.toLocaleString(), emoji: "⚙️" },
                  { label: "Total Seconds", value: totalSeconds.toLocaleString(), emoji: "⚡", isMono: true }
                ].map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl border border-white/5 bg-black/40 hover:border-white/10 transition group">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">{item.label}</span>
                      <span className="text-xs">{item.emoji}</span>
                    </div>
                    <p className={`text-sm sm:text-base font-extrabold text-white group-hover:text-cyan-400 transition ${item.isMono ? 'font-mono' : ''}`}>
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </ToolLayout>
  );
};

export default AgeCalculator;