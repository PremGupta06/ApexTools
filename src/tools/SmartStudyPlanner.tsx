import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ToolLayout from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Plus, Trash2, CalendarClock, CheckCircle2, RotateCcw, BookOpen } from "lucide-react";
import { toast } from "sonner";

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
    const valid = subjects.filter((s) => s.name.trim());

    if (!valid.length) {
      toast.error("Add at least one subject");
      return;
    }
    if (!examDate) {
      toast.error("Select exam date");
      return;
    }

    const today = new Date();
    const exam = new Date(examDate);

    const diff = Math.ceil((exam.setHours(0,0,0,0) - today.setHours(0,0,0,0)) / 86400000);
    const daysLeft = Math.max(1, diff);

    const hours = parseFloat(dailyHours);
    if (isNaN(hours) || hours <= 0) {
      toast.error("Enter valid daily hours");
      return;
    }

    // PRIORITY SORT
    const order = { high: 0, medium: 1, low: 2 };
    const sorted = [...valid].sort(
      (a, b) =>
        order[a.priority as keyof typeof order] -
        order[b.priority as keyof typeof order]
    );

    const schedule: DayPlan[] = [];

    for (let d = 0; d < daysLeft; d++) {
      const date = new Date(today);
      date.setDate(date.getDate() + d);

      let remaining = hours;
      const subjectsToday: { name: string; hours: number }[] = [];

      const perDay = Math.min(3, sorted.length);
      const startIdx = d % sorted.length;

      for (let i = 0; i < perDay && remaining > 0; i++) {
        const idx = (startIdx + i) % sorted.length;

        const base =
          sorted[idx].priority === "high"
            ? 2.5
            : sorted[idx].priority === "medium"
            ? 2
            : 1.5;

        const allocated = Math.min(base, remaining);

        subjectsToday.push({
          name: sorted[idx].name,
          hours: allocated,
        });

        remaining -= allocated;
      }

      schedule.push({
        day: d + 1,
        date: date.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        }),
        subjects: subjectsToday,
        isRecovery: d > 0 && d % 7 === 6,
      });
    }

    setPlan(schedule);
    setCompletedDays(new Set());
    toast.success("Study plan generated!");
  };

  const toggleDay = (day: number) => {
    const next = new Set(completedDays);
    next.has(day) ? next.delete(day) : next.add(day);
    setCompletedDays(next);
  };

  const reset = () => {
    setPlan(null);
    setSubjects([{ name: "", priority: "medium" }]);
    setExamDate("");
    setCompletedDays(new Set());
  };

  const progress = plan
    ? Math.round((completedDays.size / plan.length) * 100)
    : 0;

  return (
    <ToolLayout title="Smart Study Planner">

      <div className="space-y-6">

        {/* INPUT */}
        <div className="space-y-4">

          <div className="text-sm text-muted-foreground flex items-center gap-2">
            <CalendarClock className="h-4 w-4" /> Setup
          </div>

          {/* SUBJECTS */}
          <div>
            <Label className="text-xs mb-2 block">Subjects</Label>

            {subjects.map((sub, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <Input
                  value={sub.name}
                  placeholder="Subject"
                  onChange={(e) => {
                    const u = [...subjects];
                    u[i].name = e.target.value;
                    setSubjects(u);
                  }}
                  className="bg-black/40 border-white/10 text-white"
                />

                <select
                  value={sub.priority}
                  onChange={(e) => {
                    const u = [...subjects];
                    u[i].priority = e.target.value;
                    setSubjects(u);
                  }}
                  className="bg-black/40 border border-white/10 text-white px-2 rounded-md"
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>

                {subjects.length > 1 && (
                  <Button variant="ghost" onClick={() => removeSubject(i)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}

            <Button onClick={addSubject} variant="outline" className="w-full">
              <Plus className="mr-2 h-4 w-4" /> Add Subject
            </Button>
          </div>

          {/* DATE + HOURS */}
          <div className="grid grid-cols-2 gap-4">
            <Input type="date" value={examDate} onChange={(e) => setExamDate(e.target.value)} className="bg-black/40 border-white/10 text-white" />
            <Input type="number" value={dailyHours} onChange={(e) => setDailyHours(e.target.value)} className="bg-black/40 border-white/10 text-white" />
          </div>

          {/* BUTTONS */}
          <div className="flex gap-3">
            <Button onClick={generate} className="flex-1 btn-f1">
              Generate Plan
            </Button>

            <Button onClick={reset} variant="ghost" className="border border-white/10">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* RESULTS */}
        <AnimatePresence>
          {plan && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">

              {/* PROGRESS */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/10">
                <div className="flex justify-between text-sm mb-2">
                  <span>Progress</span>
                  <span>{completedDays.size}/{plan.length}</span>
                </div>
                <Progress value={progress} />
              </div>

              {/* DAYS */}
              {plan.slice(0, 14).map((day) => (
                <div
                  key={day.day}
                  onClick={() => toggleDay(day.day)}
                  className={`p-3 rounded-lg border cursor-pointer ${
                    completedDays.has(day.day)
                      ? "bg-emerald-500/10 border-emerald-500/30"
                      : "bg-black/40 border-white/10"
                  }`}
                >
                  <div className="flex justify-between">
                    <span>{day.date}</span>
                    {completedDays.has(day.day) && <CheckCircle2 className="h-4 w-4 text-green-400" />}
                  </div>

                  <div className="text-xs text-muted-foreground mt-1">
                    {day.subjects.map((s) => `${s.name} (${s.hours}h)`).join(", ")}
                  </div>
                </div>
              ))}

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ToolLayout>
  );
};

export default SmartStudyPlanner;