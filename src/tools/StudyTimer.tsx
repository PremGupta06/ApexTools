import { useState, useEffect, useRef } from "react";
import ToolLayout from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";

const StudyTimer = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<"work" | "break">("work");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => {
          if (prev === 0) {
            setMinutes((m) => {
              if (m === 0) {
                setIsRunning(false);
                // Switch mode
                if (mode === "work") { setMode("break"); setMinutes(5); } 
                else { setMode("work"); setMinutes(25); }
                return 0;
              }
              return m - 1;
            });
            return prev === 0 && minutes > 0 ? 59 : 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isRunning, mode, minutes]);

  const reset = () => {
    setIsRunning(false);
    setMode("work");
    setMinutes(25);
    setSeconds(0);
  };

  const total = mode === "work" ? 25 * 60 : 5 * 60;
  const remaining = minutes * 60 + seconds;
  const progress = ((total - remaining) / total) * 100;

  return (
    <ToolLayout title="Study Timer">
      <div className="flex flex-col items-center gap-6">
        <div className="text-sm font-medium text-primary uppercase tracking-wider">
          {mode === "work" ? "🎯 Focus Time" : "☕ Break Time"}
        </div>

        <div className="relative w-48 h-48">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="hsl(var(--border))" strokeWidth="4" />
            <circle cx="50" cy="50" r="45" fill="none" stroke="hsl(var(--primary))" strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 45}`}
              strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display font-bold text-4xl tabular-nums">
              {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
            </span>
          </div>
        </div>

        <div className="flex gap-3">
          <Button onClick={() => setIsRunning(!isRunning)} className="glow-primary">
            {isRunning ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
            {isRunning ? "Pause" : "Start"}
          </Button>
          <Button variant="outline" onClick={reset} className="border-glow">
            <RotateCcw className="mr-2 h-4 w-4" /> Reset
          </Button>
        </div>
      </div>
    </ToolLayout>
  );
};

export default StudyTimer;
