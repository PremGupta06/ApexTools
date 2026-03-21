import { useState, useEffect, useRef } from "react";
import ToolLayout from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";

const StudyTimer = () => {
  const [time, setTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<"work" | "break">("work");

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const WORK_TIME = 25 * 60;
  const BREAK_TIME = 5 * 60;

  // TIMER LOGIC (FIXED)
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => {
          if (prev <= 1) {
            // Switch mode
            const nextMode = mode === "work" ? "break" : "work";
            setMode(nextMode);
            setIsRunning(false);

            // Optional beep
            new Audio("https://actions.google.com/sounds/v1/alarms/beep_short.ogg").play();

            return nextMode === "work" ? WORK_TIME : BREAK_TIME;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, mode]);

  const reset = () => {
    setIsRunning(false);
    setMode("work");
    setTime(WORK_TIME);
  };

  const switchMode = (newMode: "work" | "break") => {
    setIsRunning(false);
    setMode(newMode);
    setTime(newMode === "work" ? WORK_TIME : BREAK_TIME);
  };

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const total = mode === "work" ? WORK_TIME : BREAK_TIME;
  const progress = ((total - time) / total) * 100;

  const radius = 45;
  const circumference = 2 * Math.PI * radius;

  return (
    <ToolLayout title="Study Timer">

      <div className="flex flex-col items-center gap-6">

        {/* MODE */}
        <div className="flex gap-2">
          <Button
            onClick={() => switchMode("work")}
            className={`px-4 ${
              mode === "work" ? "btn-f1" : "bg-black/30 border border-white/10"
            }`}
          >
            🎯 Work
          </Button>

          <Button
            onClick={() => switchMode("break")}
            className={`px-4 ${
              mode === "break" ? "btn-f1" : "bg-black/30 border border-white/10"
            }`}
          >
            ☕ Break
          </Button>
        </div>

        {/* TIMER CIRCLE */}
        <div className="relative w-52 h-52">

          <svg className="w-full h-full -rotate-90">
            <circle
              cx="50%"
              cy="50%"
              r={radius}
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="4"
            />

            <circle
              cx="50%"
              cy="50%"
              r={radius}
              fill="none"
              stroke="url(#grad)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - progress / 100)}
              className="transition-all duration-500"
            />

            <defs>
              <linearGradient id="grad">
                <stop offset="0%" stopColor="#ff0000" />
                <stop offset="100%" stopColor="#00eaff" />
              </linearGradient>
            </defs>
          </svg>

          {/* TIME */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl font-bold font-mono text-white">
              {String(minutes).padStart(2, "0")}:
              {String(seconds).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* CONTROLS */}
        <div className="flex gap-3">

          <Button
            onClick={() => setIsRunning(!isRunning)}
            className="btn-f1 px-6"
          >
            {isRunning ? (
              <Pause className="mr-2 h-4 w-4" />
            ) : (
              <Play className="mr-2 h-4 w-4" />
            )}
            {isRunning ? "Pause" : "Start"}
          </Button>

          <Button
            onClick={reset}
            variant="ghost"
            className="border border-white/10"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>

      </div>
    </ToolLayout>
  );
};

export default StudyTimer;