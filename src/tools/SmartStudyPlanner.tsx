import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ToolLayout from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Plus, Trash2, CalendarClock, CheckCircle2, RotateCcw, BookOpen } from "lucide-react";

interface DayPlan {
  day: number;
  date: string;
  subjects: { name: string; hours: number }[];
  isRecovery: boolean;
}

const SmartStudyPlanner = () => {
  const [subjects, setSubjects] = useState([{ name: "", priority: "medium" }]);
  const [examDate, setExamDate] = useState("");
  const [dailyHours, setDailyHours] = useState("6");
  const [plan, setPlan] = useState<DayPlan[] | null>(null);
  const [completedDays, setCompletedDays] = useState<Set<number>>(new Set());

  const addSubject = () => setSubjects([...subjects, { name: "", priority: "medium" }]);
  const removeSubject = (i: number) => setSubjects(subjects.filter((_, idx) => idx !== i));

  const generate = () => {
    const validSubjects = subjects.filter((s) => s.name.trim());
    if (!validSubjects.length || !examDate || !dailyHours) return;

    const today = new Date();
    const exam = new Date(examDate);
    const daysLeft = Math.max(1, Math.ceil((exam.getTime() - today.getTime()) / 86400000));
    const hours = parseFloat(dailyHours);

    const schedule: DayPlan[] = [];
    for (let d = 0; d < daysLeft; d++) {
      const date = new Date(today);
      date.setDate(date.getDate() + d);
      const daySubjects: { name: string; hours: number }[] = [];

      // Distribute subjects across days with rotation
      const subjectsPerDay = Math.min(3, validSubjects.length);
      const startIdx = d % validSubjects.length;
      let remainingHours = hours;

      for (let s = 0; s < subjectsPerDay && remainingHours > 0; s++) {
        const subIdx = (startIdx + s) % validSubjects.length;
        const allocated = s === subjectsPerDay - 1 ? remainingHours : Math.round((hours / subjectsPerDay) * 10) / 10;
        daySubjects.push({ name: validSubjects[subIdx].name, hours: Math.min(allocated, remainingHours) });
        remainingHours -= allocated;
      }

      schedule.push({
        day: d + 1,
        date: date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }),
        subjects: daySubjects,
        isRecovery: d > 0 && d % 7 === 6,
      });
    }
    setPlan(schedule);
    setCompletedDays(new Set());
  };

  const toggleDay = (day: number) => {
    const next = new Set(completedDays);
    next.has(day) ? next.delete(day) : next.add(day);
    setCompletedDays(next);
  };

  const progress = plan ? Math.round((completedDays.size / plan.length) * 100) : 0;
  const missedDays = plan ? plan.filter((d) => !completedDays.has(d.day) && d.day < (plan.findIndex((p) => !completedDays.has(p.day)) + 1 || plan.length)).length : 0;

  return (
    <ToolLayout title="Smart Study Planner">
      <div className="space-y-6">
        {/* Input Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground uppercase tracking-wider">
            <CalendarClock className="h-4 w-4" /> Setup
          </div>

          <div>
            <Label className="text-xs text-muted-foreground mb-1.5 block">Subjects</Label>
            <div className="space-y-2">
              {subjects.map((sub, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <Input
                    placeholder={`Subject ${i + 1}`}
                    value={sub.name}
                    onChange={(e) => {
                      const u = [...subjects];
                      u[i].name = e.target.value;
                      setSubjects(u);
                    }}
                    className="flex-1"
                  />
                  <select
                    value={sub.priority}
                    onChange={(e) => {
                      const u = [...subjects];
                      u[i].priority = e.target.value;
                      setSubjects(u);
                    }}
                    className="h-10 rounded-md border border-input bg-background px-3 text-sm"
                  >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                  {subjects.length > 1 && (
                    <Button variant="ghost" size="icon" onClick={() => removeSubject(i)}>
                      <Trash2 className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  )}
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={addSubject} className="w-full">
                <Plus className="mr-2 h-4 w-4" /> Add Subject
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-xs text-muted-foreground mb-1.5 block">Exam Date</Label>
              <Input type="date" value={examDate} onChange={(e) => setExamDate(e.target.value)} />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground mb-1.5 block">Daily Study Hours</Label>
              <Input type="number" min="1" max="16" value={dailyHours} onChange={(e) => setDailyHours(e.target.value)} />
            </div>
          </div>

          <Button onClick={generate} className="w-full" disabled={!subjects.some((s) => s.name.trim()) || !examDate}>
            <CalendarClock className="mr-2 h-4 w-4" /> Generate Study Plan
          </Button>
        </div>

        {/* Results Section */}
        <AnimatePresence>
          {plan && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              className="space-y-5"
            >
              {/* Progress Bar */}
              <div className="p-4 rounded-xl bg-secondary/50 border border-border space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium text-foreground">{completedDays.size}/{plan.length} days</span>
                </div>
                <Progress value={progress} className="h-2" />
                {missedDays > 0 && (
                  <div className="flex items-center gap-2 text-xs text-amber-400">
                    <RotateCcw className="h-3 w-3" />
                    {missedDays} missed day(s) — recovery hours added to upcoming days
                  </div>
                )}
              </div>

              {/* Schedule */}
              <div className="space-y-2">
                {plan.slice(0, 14).map((day) => (
                  <motion.div
                    key={day.day}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: day.day * 0.03 }}
                    onClick={() => toggleDay(day.day)}
                    className={`flex items-center gap-4 p-3.5 rounded-lg border cursor-pointer transition-all duration-200 ${
                      completedDays.has(day.day)
                        ? "bg-emerald-500/10 border-emerald-500/25"
                        : day.isRecovery
                        ? "bg-amber-500/5 border-amber-500/15"
                        : "bg-card border-border hover:border-primary/30"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium shrink-0 ${
                      completedDays.has(day.day)
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-secondary text-muted-foreground"
                    }`}>
                      {completedDays.has(day.day) ? <CheckCircle2 className="h-4 w-4" /> : day.day}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-foreground">{day.date}</span>
                        {day.isRecovery && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-400">Light Day</span>
                        )}
                      </div>
                      <div className="flex gap-2 mt-1 flex-wrap">
                        {day.subjects.map((s, j) => (
                          <span key={j} className="text-xs text-muted-foreground">
                            <BookOpen className="h-3 w-3 inline mr-1" />
                            {s.name} ({s.hours}h)
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
                {plan.length > 14 && (
                  <p className="text-xs text-center text-muted-foreground pt-2">
                    + {plan.length - 14} more days in your plan
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ToolLayout>
  );
};

export default SmartStudyPlanner;
