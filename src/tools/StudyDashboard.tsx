import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ToolLayout from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BarChart3, Flame, TrendingUp, Moon, Coffee, Plus, Trash2 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

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

  const addDay = () => setEntries([...entries, { studyHours: "", sleepHours: "", breaks: "" }]);
  const removeDay = (i: number) => setEntries(entries.filter((_, idx) => idx !== i));
  const update = (i: number, field: keyof DayEntry, value: string) => {
    const u = [...entries];
    u[i][field] = value;
    setEntries(u);
  };

  const stats = useMemo(() => {
    const valid = entries.filter((e) => e.studyHours && e.sleepHours);
    if (!valid.length) return null;

    const studyArr = valid.map((e) => parseFloat(e.studyHours) || 0);
    const sleepArr = valid.map((e) => parseFloat(e.sleepHours) || 0);
    const breakArr = valid.map((e) => parseFloat(e.breaks) || 0);

    const avgStudy = studyArr.reduce((a, b) => a + b, 0) / valid.length;
    const avgSleep = sleepArr.reduce((a, b) => a + b, 0) / valid.length;
    const avgBreaks = breakArr.reduce((a, b) => a + b, 0) / valid.length;

    // Productivity score: study efficiency weighted by sleep quality and break balance
    const sleepFactor = Math.min(avgSleep / 8, 1.2); // optimal ~8h
    const breakFactor = avgBreaks >= 2 && avgBreaks <= 6 ? 1.1 : 0.9;
    const rawScore = (avgStudy / 10) * sleepFactor * breakFactor * 100;
    const score = Math.min(100, Math.round(rawScore));

    // Streak: consecutive days with 3+ hours study
    let streak = 0;
    for (let i = studyArr.length - 1; i >= 0; i--) {
      if (studyArr[i] >= 3) streak++;
      else break;
    }

    const chartData = valid.map((_, i) => ({
      day: `Day ${i + 1}`,
      study: studyArr[i],
      sleep: sleepArr[i],
    }));

    return { avgStudy, avgSleep, score, streak, chartData, totalDays: valid.length };
  }, [entries]);

  const generate = () => {
    if (entries.some((e) => e.studyHours && e.sleepHours)) setShowResults(true);
  };

  const scoreColor = (s: number) =>
    s >= 75 ? "text-emerald-400" : s >= 50 ? "text-amber-400" : "text-rose-400";

  return (
    <ToolLayout title="Study Productivity Dashboard">
      <div className="space-y-6">
        {/* Input */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground uppercase tracking-wider">
            <BarChart3 className="h-4 w-4" /> Log Your Days
          </div>

          <div className="space-y-3">
            {entries.map((entry, i) => (
              <div key={i} className="p-3 rounded-lg bg-secondary/30 border border-border space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">Day {i + 1}</span>
                  {entries.length > 1 && (
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeDay(i)}>
                      <Trash2 className="h-3 w-3 text-muted-foreground" />
                    </Button>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <Label className="text-[10px] text-muted-foreground">Study (h)</Label>
                    <Input type="number" min="0" max="16" value={entry.studyHours} onChange={(e) => update(i, "studyHours", e.target.value)} className="h-8 text-sm" />
                  </div>
                  <div>
                    <Label className="text-[10px] text-muted-foreground">Sleep (h)</Label>
                    <Input type="number" min="0" max="16" value={entry.sleepHours} onChange={(e) => update(i, "sleepHours", e.target.value)} className="h-8 text-sm" />
                  </div>
                  <div>
                    <Label className="text-[10px] text-muted-foreground">Breaks</Label>
                    <Input type="number" min="0" max="20" value={entry.breaks} onChange={(e) => update(i, "breaks", e.target.value)} className="h-8 text-sm" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Button variant="outline" size="sm" onClick={addDay} className="w-full">
            <Plus className="mr-2 h-4 w-4" /> Add Day
          </Button>

          <Button onClick={generate} className="w-full">
            <BarChart3 className="mr-2 h-4 w-4" /> Analyze Productivity
          </Button>
        </div>

        {/* Results */}
        <AnimatePresence>
          {showResults && stats && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              className="space-y-5"
            >
              {/* Score */}
              <div className="text-center p-6 rounded-xl bg-secondary/50 border border-border">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Productivity Score</p>
                <p className={`font-display font-bold text-5xl ${scoreColor(stats.score)}`}>{stats.score}</p>
                <p className="text-xs text-muted-foreground mt-1">out of 100</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: TrendingUp, label: "Avg Study", value: `${stats.avgStudy.toFixed(1)}h`, color: "text-primary" },
                  { icon: Moon, label: "Avg Sleep", value: `${stats.avgSleep.toFixed(1)}h`, color: "text-blue-400" },
                  { icon: Flame, label: "Streak", value: `${stats.streak} day${stats.streak !== 1 ? "s" : ""}`, color: "text-amber-400" },
                  { icon: Coffee, label: "Days Logged", value: stats.totalDays.toString(), color: "text-emerald-400" },
                ].map((s) => (
                  <div key={s.label} className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border">
                    <s.icon className={`h-4 w-4 ${s.color} shrink-0`} />
                    <div>
                      <p className="text-sm font-medium text-foreground">{s.value}</p>
                      <p className="text-[10px] text-muted-foreground">{s.label}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Chart */}
              {stats.chartData.length > 1 && (
                <div className="p-4 rounded-xl bg-card border border-border">
                  <p className="text-xs text-muted-foreground mb-3">Weekly Performance</p>
                  <div className="h-40">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={stats.chartData}>
                        <XAxis dataKey="day" tick={{ fontSize: 10, fill: "hsl(215, 20%, 55%)" }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 10, fill: "hsl(215, 20%, 55%)" }} axisLine={false} tickLine={false} />
                        <Tooltip
                          contentStyle={{
                            background: "hsl(230, 25%, 11%)",
                            border: "1px solid hsl(230, 20%, 18%)",
                            borderRadius: "8px",
                            fontSize: "12px",
                          }}
                        />
                        <Bar dataKey="study" fill="hsl(262, 83%, 58%)" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="sleep" fill="hsl(217, 91%, 60%)" radius={[4, 4, 0, 0]} />
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
