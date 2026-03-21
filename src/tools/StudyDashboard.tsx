import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ToolLayout from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BarChart3, Flame, TrendingUp, Moon, Coffee, Plus, Trash2, RotateCcw } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { toast } from "sonner";

interface DayEntry {
  studyHours: string;
  sleepHours: string;
  breaks: string;
}

const StudyDashboard = () => {
  const [entries, setEntries] = useState<DayEntry[]>([
    { studyHours: "", sleepHours: "", breaks: "" },
  ]);
  const [showResults, setShowResults] = useState(false);

  const addDay = () =>
    setEntries([...entries, { studyHours: "", sleepHours: "", breaks: "" }]);

  const removeDay = (i: number) =>
    setEntries(entries.filter((_, idx) => idx !== i));

  const update = (i: number, field: keyof DayEntry, value: string) => {
    const u = [...entries];
    u[i][field] = value;
    setEntries(u);
  };

  const stats = useMemo(() => {
    const valid = entries.filter(
      (e) => e.studyHours && e.sleepHours
    );

    if (!valid.length) return null;

    const studyArr = valid.map((e) => parseFloat(e.studyHours) || 0);
    const sleepArr = valid.map((e) => parseFloat(e.sleepHours) || 0);
    const breakArr = valid.map((e) => parseFloat(e.breaks) || 0);

    const avgStudy =
      studyArr.reduce((a, b) => a + b, 0) / studyArr.length;

    const avgSleep =
      sleepArr.reduce((a, b) => a + b, 0) / sleepArr.length;

    const avgBreaks =
      breakArr.reduce((a, b) => a + b, 0) / breakArr.length;

    // Better scoring logic
    const studyScore = Math.min(avgStudy / 8, 1);
    const sleepScore = avgSleep >= 7 && avgSleep <= 9 ? 1 : 0.7;
    const breakScore = avgBreaks >= 2 && avgBreaks <= 6 ? 1 : 0.7;

    const score = Math.round(
      (studyScore * 0.5 + sleepScore * 0.3 + breakScore * 0.2) * 100
    );

    // Improved streak
    let streak = 0;
    for (let i = studyArr.length - 1; i >= 0; i--) {
      if (studyArr[i] >= 3) streak++;
      else break;
    }

    const chartData = valid.map((_, i) => ({
      day: `D${i + 1}`,
      study: studyArr[i],
      sleep: sleepArr[i],
    }));

    return {
      avgStudy,
      avgSleep,
      score,
      streak,
      chartData,
      totalDays: valid.length,
    };
  }, [entries]);

  const generate = () => {
    const hasValid = entries.some(
      (e) => e.studyHours && e.sleepHours
    );

    if (!hasValid) {
      toast.error("Enter at least one valid day");
      return;
    }

    setShowResults(true);
    toast.success("Analysis ready!");
  };

  const reset = () => {
    setEntries([{ studyHours: "", sleepHours: "", breaks: "" }]);
    setShowResults(false);
  };

  const scoreColor = (s: number) =>
    s >= 75
      ? "text-emerald-400"
      : s >= 50
      ? "text-amber-400"
      : "text-rose-400";

  return (
    <ToolLayout title="Study Productivity Dashboard">

      <div className="space-y-6">

        {/* INPUT */}
        <div className="space-y-4">

          <div className="text-sm text-muted-foreground flex items-center gap-2">
            <BarChart3 className="h-4 w-4" /> Log Your Days
          </div>

          {entries.map((entry, i) => (
            <div
              key={i}
              className="p-3 rounded-lg bg-black/40 border border-white/10 space-y-2"
            >
              <div className="flex justify-between text-xs text-muted-foreground">
                Day {i + 1}
                {entries.length > 1 && (
                  <button onClick={() => removeDay(i)}>
                    <Trash2 className="h-3 w-3" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-3 gap-2">
                <Input
                  type="number"
                  placeholder="Study"
                  value={entry.studyHours}
                  onChange={(e) =>
                    update(i, "studyHours", e.target.value)
                  }
                  className="bg-black/40 border-white/10 text-white"
                />
                <Input
                  type="number"
                  placeholder="Sleep"
                  value={entry.sleepHours}
                  onChange={(e) =>
                    update(i, "sleepHours", e.target.value)
                  }
                  className="bg-black/40 border-white/10 text-white"
                />
                <Input
                  type="number"
                  placeholder="Breaks"
                  value={entry.breaks}
                  onChange={(e) =>
                    update(i, "breaks", e.target.value)
                  }
                  className="bg-black/40 border-white/10 text-white"
                />
              </div>
            </div>
          ))}

          <Button onClick={addDay} variant="outline" className="w-full">
            <Plus className="mr-2 h-4 w-4" /> Add Day
          </Button>

          <div className="flex gap-3">
            <Button onClick={generate} className="flex-1 btn-f1">
              Analyze
            </Button>
            <Button onClick={reset} variant="ghost" className="border border-white/10">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* RESULTS */}
        <AnimatePresence>
          {showResults && stats && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">

              {/* SCORE */}
              <div className="text-center p-6 rounded-xl bg-black/40 border border-white/10">
                <p className="text-xs text-muted-foreground mb-2">Productivity Score</p>
                <p className={`text-5xl font-bold ${scoreColor(stats.score)}`}>
                  {stats.score}
                </p>
              </div>

              {/* STATS */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: TrendingUp, label: "Avg Study", value: `${stats.avgStudy.toFixed(1)}h` },
                  { icon: Moon, label: "Avg Sleep", value: `${stats.avgSleep.toFixed(1)}h` },
                  { icon: Flame, label: "Streak", value: `${stats.streak}d` },
                  { icon: Coffee, label: "Days", value: stats.totalDays },
                ].map((s) => (
                  <div key={s.label} className="p-3 rounded-lg bg-black/40 border border-white/10 flex gap-2">
                    <s.icon className="h-4 w-4 text-primary" />
                    <div>
                      <p className="text-sm">{s.value}</p>
                      <p className="text-xs text-muted-foreground">{s.label}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CHART */}
              {stats.chartData.length > 1 && (
                <div className="p-4 rounded-xl bg-black/40 border border-white/10">
                  <div className="h-40">
                    <ResponsiveContainer>
                      <BarChart data={stats.chartData}>
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="study" fill="#8b5cf6" />
                        <Bar dataKey="sleep" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ToolLayout>
  );
};

export default StudyDashboard;