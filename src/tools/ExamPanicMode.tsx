import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ToolLayout from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Flame, AlertTriangle, Zap, Clock } from "lucide-react";

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
    if (!valid.length || !examDate) return;

    const today = new Date();
    const exam = new Date(examDate);
    const days = Math.max(1, Math.ceil((exam.getTime() - today.getTime()) / 86400000));
    setDaysLeft(days);
    const hours = parseFloat(dailyHours) || 8;

    // Sort by difficulty (hard first)
    const sorted = [...valid].sort((a, b) => {
      const order = { hard: 0, medium: 1, easy: 2 };
      return (order[a.difficulty as keyof typeof order] ?? 1) - (order[b.difficulty as keyof typeof order] ?? 1);
    });

    const result: ChapterPlan[] = [];
    let currentDay = 1;
    let hoursUsed = 0;

    sorted.forEach((ch, i) => {
      const needed = ch.difficulty === "hard" ? 3 : ch.difficulty === "medium" ? 2 : 1.5;
      if (hoursUsed + needed > hours) {
        currentDay++;
        hoursUsed = 0;
      }
      const urgency: ChapterPlan["urgency"] =
        i < sorted.length * 0.3 ? "critical" : i < sorted.length * 0.7 ? "high" : "medium";

      result.push({ name: ch.name, day: Math.min(currentDay, days), hours: needed, urgency });
      hoursUsed += needed;
    });

    setPlan(result);
  };

  const urgencyColor = {
    critical: "text-rose-400 bg-rose-500/10 border-rose-500/25",
    high: "text-amber-400 bg-amber-500/10 border-amber-500/25",
    medium: "text-blue-400 bg-blue-500/10 border-blue-500/25",
  };

  const urgencyIcon = {
    critical: <AlertTriangle className="h-3.5 w-3.5" />,
    high: <Zap className="h-3.5 w-3.5" />,
    medium: <Clock className="h-3.5 w-3.5" />,
  };

  return (
    <ToolLayout title="Exam Panic Mode">
      <div className="space-y-6">
        {/* Input */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground uppercase tracking-wider">
            <Flame className="h-4 w-4 text-rose-400" /> Emergency Setup
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-xs text-muted-foreground mb-1.5 block">Exam Date</Label>
              <Input type="date" value={examDate} onChange={(e) => setExamDate(e.target.value)} />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground mb-1.5 block">Daily Hours Available</Label>
              <Input type="number" min="1" max="16" value={dailyHours} onChange={(e) => setDailyHours(e.target.value)} />
            </div>
          </div>

          <div>
            <Label className="text-xs text-muted-foreground mb-1.5 block">Chapters Remaining</Label>
            <div className="space-y-2">
              {chapters.map((ch, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <Input
                    placeholder={`Chapter ${i + 1}`}
                    value={ch.name}
                    onChange={(e) => {
                      const u = [...chapters];
                      u[i].name = e.target.value;
                      setChapters(u);
                    }}
                    className="flex-1"
                  />
                  <select
                    value={ch.difficulty}
                    onChange={(e) => {
                      const u = [...chapters];
                      u[i].difficulty = e.target.value;
                      setChapters(u);
                    }}
                    className="h-10 rounded-md border border-input bg-background px-3 text-sm"
                  >
                    <option value="hard">Hard</option>
                    <option value="medium">Medium</option>
                    <option value="easy">Easy</option>
                  </select>
                  {chapters.length > 1 && (
                    <Button variant="ghost" size="icon" onClick={() => removeChapter(i)}>
                      <Trash2 className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  )}
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={addChapter} className="w-full">
                <Plus className="mr-2 h-4 w-4" /> Add Chapter
              </Button>
            </div>
          </div>

          <Button onClick={generate} className="w-full bg-rose-600 hover:bg-rose-700" disabled={!chapters.some((c) => c.name.trim()) || !examDate}>
            <Flame className="mr-2 h-4 w-4" /> Generate Emergency Plan
          </Button>
        </div>

        {/* Results */}
        <AnimatePresence>
          {plan && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              className="space-y-4"
            >
              {/* Stats */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Days Left", value: daysLeft, color: daysLeft <= 3 ? "text-rose-400" : "text-foreground" },
                  { label: "Chapters", value: plan.length, color: "text-foreground" },
                  { label: "Critical", value: plan.filter((p) => p.urgency === "critical").length, color: "text-rose-400" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center p-3 rounded-lg bg-secondary/50 border border-border">
                    <p className={`font-display font-bold text-2xl ${stat.color}`}>{stat.value}</p>
                    <p className="text-[11px] text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Chapter List */}
              <div className="space-y-2">
                {plan.map((ch, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className={`flex items-center gap-3 p-3.5 rounded-lg border ${urgencyColor[ch.urgency]}`}
                  >
                    <div className="shrink-0">{urgencyIcon[ch.urgency]}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{ch.name}</p>
                      <p className="text-xs text-muted-foreground">Day {ch.day} · {ch.hours}h estimated</p>
                    </div>
                    <span className="text-[10px] font-medium uppercase tracking-wider opacity-70">{ch.urgency}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ToolLayout>
  );
};

export default ExamPanicMode;
