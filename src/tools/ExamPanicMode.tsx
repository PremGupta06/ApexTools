import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ToolLayout from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Flame, AlertTriangle, Zap, Clock, RotateCcw } from "lucide-react";
import { toast } from "sonner";

interface ChapterPlan {
  name: string;
  day: number;
  hours: number;
  urgency: "critical" | "high" | "medium";
}

const ExamPanicMode = () => {
  const [examDate, setExamDate] = useState("");
  const [chapters, setChapters] = useState([{ name: "", difficulty: "medium" }]);
  const [dailyHours, setDailyHours] = useState("8");
  const [plan, setPlan] = useState<ChapterPlan[] | null>(null);
  const [daysLeft, setDaysLeft] = useState(0);

  const addChapter = () => setChapters([...chapters, { name: "", difficulty: "medium" }]);
  const removeChapter = (i: number) => setChapters(chapters.filter((_, idx) => idx !== i));

  const generate = () => {
    const valid = chapters.filter((c) => c.name.trim());
    if (!valid.length) {
      toast.error("Add at least one chapter");
      return;
    }
    if (!examDate) {
      toast.error("Select exam date");
      return;
    }

    const today = new Date();
    const exam = new Date(examDate);

    const diff = Math.ceil((exam.setHours(0,0,0,0) - today.setHours(0,0,0,0)) / 86400000);
    const days = Math.max(1, diff);

    setDaysLeft(days);

    const hours = parseFloat(dailyHours) || 8;

    const sorted = [...valid].sort((a, b) => {
      const order = { hard: 0, medium: 1, easy: 2 };
      return order[a.difficulty as keyof typeof order] - order[b.difficulty as keyof typeof order];
    });

    const result: ChapterPlan[] = [];
    let currentDay = 1;
    let used = 0;

    sorted.forEach((ch, i) => {
      const needed = ch.difficulty === "hard" ? 3 : ch.difficulty === "medium" ? 2 : 1.5;

      if (used + needed > hours) {
        currentDay++;
        used = 0;
      }

      result.push({
        name: ch.name,
        day: Math.min(currentDay, days),
        hours: needed,
        urgency:
          i < sorted.length * 0.3
            ? "critical"
            : i < sorted.length * 0.7
            ? "high"
            : "medium",
      });

      used += needed;
    });

    setPlan(result);
  };

  const reset = () => {
    setPlan(null);
    setChapters([{ name: "", difficulty: "medium" }]);
    setExamDate("");
  };

  const urgencyColor = {
    critical: "border-red-500/40 text-red-400",
    high: "border-yellow-500/40 text-yellow-400",
    medium: "border-blue-500/40 text-blue-400",
  };

  const urgencyIcon = {
    critical: <AlertTriangle className="h-4 w-4" />,
    high: <Zap className="h-4 w-4" />,
    medium: <Clock className="h-4 w-4" />,
  };

  return (
    <ToolLayout title="Exam Panic Mode">

      {/* 🛞 WHEEL */}
      <motion.img
        src="https://cdn-icons-png.flaticon.com/512/743/743131.png"
        className="absolute top-4 right-6 w-14 opacity-20"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 12 }}
      />

      {/* 🏎️ NEW CAR */}
      <motion.img
        src="https://pngimg.com/uploads/sports_car/sports_car_PNG10638.png"
        className="absolute bottom-2 right-10 w-56 opacity-25 hidden sm:block"
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 5 }}
      />

      <div className="space-y-6">

        {/* INPUT */}
        <div className="space-y-4">

          <div className="flex items-center gap-2 text-sm text-red-400 font-semibold">
            <Flame className="h-4 w-4" /> Emergency Setup
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input type="date" value={examDate} onChange={(e) => setExamDate(e.target.value)} className="bg-black/40 border-white/10 text-white" />
            <Input type="number" value={dailyHours} onChange={(e) => setDailyHours(e.target.value)} className="bg-black/40 border-white/10 text-white" />
          </div>

          {/* CHAPTERS */}
          {chapters.map((ch, i) => (
            <div key={i} className="flex gap-2">
              <Input
                placeholder="Chapter name"
                value={ch.name}
                onChange={(e) => {
                  const u = [...chapters];
                  u[i].name = e.target.value;
                  setChapters(u);
                }}
                className="bg-black/40 border-white/10 text-white"
              />

              <select
                value={ch.difficulty}
                onChange={(e) => {
                  const u = [...chapters];
                  u[i].difficulty = e.target.value;
                  setChapters(u);
                }}
                className="bg-black/40 border border-white/10 text-white px-2 rounded-md"
              >
                <option value="hard">Hard</option>
                <option value="medium">Medium</option>
                <option value="easy">Easy</option>
              </select>

              {chapters.length > 1 && (
                <Button variant="ghost" onClick={() => removeChapter(i)}>
                  <Trash2 className="h-4 w-4 text-gray-400" />
                </Button>
              )}
            </div>
          ))}

          <Button onClick={addChapter} variant="outline" className="w-full border-white/10">
            <Plus className="mr-2 h-4 w-4" /> Add Chapter
          </Button>

          <Button onClick={generate} className="w-full btn-f1">
            <Flame className="mr-2 h-4 w-4" /> Generate Plan
          </Button>

          <Button onClick={reset} variant="ghost" className="w-full">
            <RotateCcw className="mr-2 h-4 w-4" /> Reset
          </Button>
        </div>

        {/* RESULTS */}
        <AnimatePresence>
          {plan && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">

              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 bg-black/40 rounded-lg text-center">
                  <p className="text-2xl text-red-400 font-bold">{daysLeft}</p>
                  <p className="text-xs text-gray-400">Days</p>
                </div>
                <div className="p-3 bg-black/40 rounded-lg text-center">
                  <p className="text-2xl font-bold">{plan.length}</p>
                  <p className="text-xs text-gray-400">Chapters</p>
                </div>
                <div className="p-3 bg-black/40 rounded-lg text-center">
                  <p className="text-2xl text-red-400 font-bold">
                    {plan.filter((p) => p.urgency === "critical").length}
                  </p>
                  <p className="text-xs text-gray-400">Critical</p>
                </div>
              </div>

              {plan.map((ch, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`p-3 rounded-lg border ${urgencyColor[ch.urgency]} flex justify-between`}
                >
                  <span>{ch.name}</span>
                  <span className="text-xs">
                    Day {ch.day} · {ch.hours}h
                  </span>
                </motion.div>
              ))}

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ToolLayout>
  );
};

export default ExamPanicMode;