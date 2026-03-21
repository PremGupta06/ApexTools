import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowLeftRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const categories: Record<string, Record<string, number>> = {
  Length: {
    Meters: 1,
    Kilometers: 0.001,
    Centimeters: 100,
    Millimeters: 1000,
    Miles: 0.000621371,
    Feet: 3.28084,
    Inches: 39.3701,
  },
  Weight: {
    Kilograms: 1,
    Grams: 1000,
    Milligrams: 1000000,
    Pounds: 2.20462,
    Ounces: 35.274,
  },
  Temperature: {
    Celsius: 1,
    Fahrenheit: 1,
    Kelvin: 1,
  },
};

const UnitConverter = () => {
  const [category, setCategory] = useState("Length");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [value, setValue] = useState("");

  const convert = () => {
    const v = parseFloat(value);
    if (isNaN(v) || !from || !to) return "";

    // 🌡️ Temperature
    if (category === "Temperature") {
      if (from === to) return v.toFixed(2);

      if (from === "Celsius") {
        if (to === "Fahrenheit") return ((v * 9) / 5 + 32).toFixed(2);
        if (to === "Kelvin") return (v + 273.15).toFixed(2);
      }

      if (from === "Fahrenheit") {
        if (to === "Celsius") return (((v - 32) * 5) / 9).toFixed(2);
        if (to === "Kelvin")
          return (((v - 32) * 5) / 9 + 273.15).toFixed(2);
      }

      if (from === "Kelvin") {
        if (to === "Celsius") return (v - 273.15).toFixed(2);
        if (to === "Fahrenheit")
          return (((v - 273.15) * 9) / 5 + 32).toFixed(2);
      }
    }

    // 📏 Normal conversion
    const units = categories[category];
    const base = v / units[from];
    return (base * units[to]).toFixed(6);
  };

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  const units = Object.keys(categories[category]);
  const result = convert();

  return (
    <ToolLayout title="Unit Converter">

      <div className="space-y-6">

        {/* CATEGORY */}
        <div>
          <Label className="mb-1 block text-sm">Category</Label>
          <Select
            value={category}
            onValueChange={(v) => {
              setCategory(v);
              setFrom("");
              setTo("");
              setValue("");
            }}
          >
            <SelectTrigger className="bg-black/40 border-white/10 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(categories).map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* FROM / TO */}
        <div className="grid grid-cols-2 gap-3 items-end">
          <div>
            <Label className="mb-1 block text-sm">From</Label>
            <Select value={from} onValueChange={setFrom}>
              <SelectTrigger className="bg-black/40 border-white/10 text-white">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {units.map((u) => (
                  <SelectItem key={u} value={u}>
                    {u}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="mb-1 block text-sm">To</Label>
            <Select value={to} onValueChange={setTo}>
              <SelectTrigger className="bg-black/40 border-white/10 text-white">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {units.map((u) => (
                  <SelectItem key={u} value={u}>
                    {u}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* SWAP BUTTON */}
          <Button
            onClick={swap}
            className="col-span-2 border border-white/10 bg-black/30 hover:bg-white/10"
          >
            <ArrowLeftRight className="mr-2 h-4 w-4" />
            Swap Units
          </Button>
        </div>

        {/* VALUE */}
        <div>
          <Label className="mb-1 block text-sm">Value</Label>
          <Input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter value"
            className="bg-black/40 border-white/10 text-white"
          />
        </div>

        {/* RESULT */}
        {result && (
          <div className="text-center p-6 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md">

            <p className="text-sm text-muted-foreground mb-2">
              Result
            </p>

            <p className="text-3xl font-bold text-gradient-f1">
              {result} {to}
            </p>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default UnitConverter;