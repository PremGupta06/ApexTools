import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, Plus } from "lucide-react";

const GradeCalculator = () => {
  const [items, setItems] = useState([{ name: "", score: "", weight: "" }]);
  const [result, setResult] = useState<string | null>(null);

  const add = () => setItems([...items, { name: "", score: "", weight: "" }]);
  const remove = (i: number) => setItems(items.filter((_, idx) => idx !== i));
  const update = (i: number, field: string, value: string) => {
    const u = [...items]; (u[i] as any)[field] = value; setItems(u);
  };

  const calculate = () => {
    let totalWeight = 0, totalScore = 0;
    for (const item of items) {
      const s = parseFloat(item.score), w = parseFloat(item.weight);
      if (isNaN(s) || isNaN(w)) continue;
      totalScore += s * (w / 100);
      totalWeight += w;
    }
    if (totalWeight > 0) setResult((totalScore).toFixed(2));
  };

  return (
    <ToolLayout title="Grade Calculator">
      <div className="space-y-4">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2 items-center">
            <Input placeholder="Assignment" value={item.name} onChange={(e) => update(i, "name", e.target.value)} className="flex-1" />
            <Input placeholder="Score %" type="number" value={item.score} onChange={(e) => update(i, "score", e.target.value)} className="w-24" />
            <Input placeholder="Weight %" type="number" value={item.weight} onChange={(e) => update(i, "weight", e.target.value)} className="w-24" />
            {items.length > 1 && <Button variant="ghost" size="icon" onClick={() => remove(i)}><Trash2 className="h-4 w-4 text-muted-foreground" /></Button>}
          </div>
        ))}
        <Button variant="outline" size="sm" onClick={add} className="w-full"><Plus className="mr-2 h-4 w-4" /> Add Item</Button>
        <Button onClick={calculate} className="w-full">Calculate Grade</Button>
        {result && (
          <div className="text-center p-4 rounded-lg bg-primary/10 border-glow">
            <p className="text-sm text-muted-foreground">Weighted Grade</p>
            <p className="font-display font-bold text-3xl text-primary">{result}%</p>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default GradeCalculator;
