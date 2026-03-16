import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Plus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const gradePoints: Record<string, number> = {
  "O (10)": 10, "A+ (9)": 9, "A (8)": 8, "B+ (7)": 7, "B (6)": 6, "C (5)": 5, "F (0)": 0,
};

const SGPACalculator = () => {
  const [subjects, setSubjects] = useState([{ grade: "", credits: "" }]);
  const [result, setResult] = useState<number | null>(null);

  const add = () => setSubjects([...subjects, { grade: "", credits: "" }]);
  const remove = (i: number) => setSubjects(subjects.filter((_, idx) => idx !== i));

  const calculate = () => {
    let totalCredits = 0, totalPoints = 0;
    for (const sub of subjects) {
      const gp = gradePoints[sub.grade];
      const cr = parseFloat(sub.credits);
      if (gp === undefined || isNaN(cr)) continue;
      totalPoints += gp * cr;
      totalCredits += cr;
    }
    if (totalCredits > 0) setResult(Math.round((totalPoints / totalCredits) * 100) / 100);
  };

  return (
    <ToolLayout title="SGPA Calculator">
      <div className="space-y-4">
        {subjects.map((sub, i) => (
          <div key={i} className="flex gap-3 items-center">
            <Select value={sub.grade} onValueChange={(v) => {
              const u = [...subjects]; u[i].grade = v; setSubjects(u);
            }}>
              <SelectTrigger className="flex-1"><SelectValue placeholder="Grade" /></SelectTrigger>
              <SelectContent>
                {Object.keys(gradePoints).map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}
              </SelectContent>
            </Select>
            <Input placeholder="Credits" type="number" className="w-24" value={sub.credits} onChange={(e) => {
              const u = [...subjects]; u[i].credits = e.target.value; setSubjects(u);
            }} />
            {subjects.length > 1 && (
              <Button variant="ghost" size="icon" onClick={() => remove(i)}><Trash2 className="h-4 w-4 text-muted-foreground" /></Button>
            )}
          </div>
        ))}
        <Button variant="outline" size="sm" onClick={add} className="w-full"><Plus className="mr-2 h-4 w-4" /> Add Subject</Button>
        <Button onClick={calculate} className="w-full">Calculate SGPA</Button>
        {result !== null && (
          <div className="text-center p-4 rounded-lg bg-primary/10 border-glow">
            <p className="text-sm text-muted-foreground">Your SGPA</p>
            <p className="font-display font-bold text-3xl text-primary">{result}</p>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default SGPACalculator;
