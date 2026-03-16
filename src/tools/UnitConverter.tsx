import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const categories: Record<string, Record<string, number>> = {
  Length: { Meters: 1, Kilometers: 0.001, Centimeters: 100, Millimeters: 1000, Miles: 0.000621371, Feet: 3.28084, Inches: 39.3701 },
  Weight: { Kilograms: 1, Grams: 1000, Milligrams: 1000000, Pounds: 2.20462, Ounces: 35.274 },
  Temperature: { Celsius: 1, Fahrenheit: 1, Kelvin: 1 },
};

const UnitConverter = () => {
  const [category, setCategory] = useState("Length");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [value, setValue] = useState("");

  const convert = () => {
    const v = parseFloat(value);
    if (isNaN(v) || !from || !to) return "";
    if (category === "Temperature") {
      if (from === to) return v.toFixed(4);
      if (from === "Celsius" && to === "Fahrenheit") return ((v * 9/5) + 32).toFixed(4);
      if (from === "Celsius" && to === "Kelvin") return (v + 273.15).toFixed(4);
      if (from === "Fahrenheit" && to === "Celsius") return ((v - 32) * 5/9).toFixed(4);
      if (from === "Fahrenheit" && to === "Kelvin") return (((v - 32) * 5/9) + 273.15).toFixed(4);
      if (from === "Kelvin" && to === "Celsius") return (v - 273.15).toFixed(4);
      if (from === "Kelvin" && to === "Fahrenheit") return (((v - 273.15) * 9/5) + 32).toFixed(4);
    }
    const units = categories[category];
    const base = v / units[from];
    return (base * units[to]).toFixed(6);
  };

  const units = Object.keys(categories[category]);
  const result = convert();

  return (
    <ToolLayout title="Unit Converter">
      <div className="space-y-4">
        <div>
          <Label>Category</Label>
          <Select value={category} onValueChange={(v) => { setCategory(v); setFrom(""); setTo(""); }}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>{Object.keys(categories).map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div><Label>From</Label><Select value={from} onValueChange={setFrom}><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger><SelectContent>{units.map((u) => <SelectItem key={u} value={u}>{u}</SelectItem>)}</SelectContent></Select></div>
          <div><Label>To</Label><Select value={to} onValueChange={setTo}><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger><SelectContent>{units.map((u) => <SelectItem key={u} value={u}>{u}</SelectItem>)}</SelectContent></Select></div>
        </div>
        <div><Label>Value</Label><Input type="number" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Enter value" /></div>
        {result && value && from && to && (
          <div className="text-center p-4 rounded-lg bg-primary/10 border-glow">
            <p className="text-sm text-muted-foreground">Result</p>
            <p className="font-display font-bold text-2xl text-primary">{result} {to}</p>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default UnitConverter;
