import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Plus } from "lucide-react";

const gradePoints: Record<string, number> = {
  "O": 10, "A+": 9, "A": 8, "B+": 7, "B": 6, "C": 5, "F": 0,
};

interface Subject {
  grade: string;
  credits: string;
}

const CGPACalculator = () => {
  const [semesters, setSemesters] = useState<{ sgpa: string; credits: string }[]>([
    { sgpa: "", credits: "" },
  ]);
  const [result, setResult] = useState<number | null>(null);

  const addSemester = () => setSemesters([...semesters, { sgpa: "", credits: "" }]);
  const removeSemester = (i: number) => setSemesters(semesters.filter((_, idx) => idx !== i));

  const calculate = () => {
    let totalCredits = 0;
    let totalPoints = 0;
    for (const sem of semesters) {
      const sgpa = parseFloat(sem.sgpa);
      const credits = parseFloat(sem.credits);
      if (isNaN(sgpa) || isNaN(credits)) continue;
      totalPoints += sgpa * credits;
      totalCredits += credits;
    }
    if (totalCredits > 0) setResult(Math.round((totalPoints / totalCredits) * 100) / 100);
  };

  return (
    <ToolLayout title="CGPA Calculator">
      <div className="space-y-4">
        {semesters.map((sem, i) => (
          <div key={i} className="flex gap-3 items-center">
            <Input
              placeholder="SGPA"
              type="number"
              step="0.01"
              value={sem.sgpa}
              onChange={(e) => {
                const updated = [...semesters];
                updated[i].sgpa = e.target.value;
                setSemesters(updated);
              }}
            />
            <Input
              placeholder="Credits"
              type="number"
              value={sem.credits}
              onChange={(e) => {
                const updated = [...semesters];
                updated[i].credits = e.target.value;
                setSemesters(updated);
              }}
            />
            {semesters.length > 1 && (
              <Button variant="ghost" size="icon" onClick={() => removeSemester(i)}>
                <Trash2 className="h-4 w-4 text-muted-foreground" />
              </Button>
            )}
          </div>
        ))}

        <Button variant="outline" size="sm" onClick={addSemester} className="w-full">
          <Plus className="mr-2 h-4 w-4" /> Add Semester
        </Button>

        <Button onClick={calculate} className="w-full">Calculate CGPA</Button>

        {result !== null && (
          <div className="text-center p-4 rounded-lg bg-primary/5 border border-primary/20">
            <p className="text-sm text-muted-foreground">Your CGPA</p>
            <p className="font-display font-bold text-3xl text-primary">{result}</p>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default CGPACalculator;
