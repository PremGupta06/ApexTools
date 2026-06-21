import { useState, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { 
  Copy, 
  Lock, 
  Unlock, 
  RefreshCw, 
  Palette, 
  Check, 
  Code,
  LayoutTemplate,
  Accessibility
} from "lucide-react";
import { toast } from "sonner";

const generateColor = () =>
  "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");

const presets = [
  {
    name: "F1 Redline",
    colors: ["#e10600", "#121214", "#ffffff", "#00d2c4", "#ffb703"]
  },
  {
    name: "Cyberpunk Neon",
    colors: ["#ff0055", "#00f0ff", "#9d4edd", "#39ff14", "#ffb703"]
  },
  {
    name: "Pastel Dreams",
    colors: ["#ffadad", "#ffd6a5", "#fdffb6", "#caffbf", "#9bf6ff"]
  },
  {
    name: "Deep Ocean",
    colors: ["#0a192f", "#172a45", "#3066be", "#b4c5e4", "#00b4d8"]
  },
  {
    name: "Sunset Drift",
    colors: ["#f72585", "#7209b7", "#3f37c9", "#4cc9f0", "#f77f00"]
  }
];

const ColorPaletteGenerator = () => {
  const [colors, setColors] = useState<string[]>([
    "#e10600",
    "#00f0ff",
    "#ffffff",
    "#0b0f1a",
    "#ffb703"
  ]);
  const [lockedIndices, setLockedIndices] = useState<number[]>([]);
  const [contrastSource, setContrastSource] = useState<number>(0);
  const [contrastTarget, setContrastTarget] = useState<number>(2);

  // Generate palette
  const generatePalette = () => {
    setColors(prevColors =>
      prevColors.map((color, index) =>
        lockedIndices.includes(index) ? color : generateColor()
      )
    );
    toast.success("Palette randomized!");
  };

  // Trigger generator with spacebar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        const target = e.target as HTMLElement;
        if (
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable
        ) {
          return;
        }
        e.preventDefault();
        generatePalette();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lockedIndices]);

  const toggleLock = (index: number) => {
    if (lockedIndices.includes(index)) {
      setLockedIndices(lockedIndices.filter(i => i !== index));
      toast.success("Unlocked slot");
    } else {
      setLockedIndices([...lockedIndices, index]);
      toast.success("Locked slot");
    }
  };

  const updateColor = (index: number, newColor: string) => {
    const updated = [...colors];
    updated[index] = newColor;
    setColors(updated);
  };

  const copyColor = (color: string) => {
    navigator.clipboard.writeText(color);
    toast.success(`${color} copied to clipboard`);
  };

  const loadPreset = (presetColors: string[], name: string) => {
    setColors([...presetColors]);
    setLockedIndices([]);
    toast.success(`Loaded preset: ${name}`);
  };

  // WCAG Contrast Calculation Formula
  const getRGB = (hex: string) => {
    let color = hex.replace("#", "");
    if (color.length === 3) {
      color = color[0] + color[0] + color[1] + color[1] + color[2] + color[2];
    }
    const r = parseInt(color.substring(0, 2), 16);
    const g = parseInt(color.substring(2, 4), 16);
    const b = parseInt(color.substring(4, 6), 16);
    return { r, g, b };
  };

  const getLuminance = (r: number, g: number, b: number) => {
    const a = [r, g, b].map(v => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  };

  const getContrastRatio = (hex1: string, hex2: string) => {
    try {
      const c1 = getRGB(hex1);
      const c2 = getRGB(hex2);
      const l1 = getLuminance(c1.r, c1.g, c1.b);
      const l2 = getLuminance(c2.r, c2.g, c2.b);
      const brightest = Math.max(l1, l2);
      const darkest = Math.min(l1, l2);
      return (brightest + 0.05) / (darkest + 0.05);
    } catch (e) {
      return 1;
    }
  };

  const contrastRatio = getContrastRatio(colors[contrastSource], colors[contrastTarget]);
  const aaNormal = contrastRatio >= 4.5 ? "PASS" : "FAIL";
  const aaaNormal = contrastRatio >= 7.0 ? "PASS" : "FAIL";
  const aaLarge = contrastRatio >= 3.0 ? "PASS" : "FAIL";

  // Exports
  const getCSSExport = () => {
    return `:root {\n  --color-one: ${colors[0]};\n  --color-two: ${colors[1]};\n  --color-three: ${colors[2]};\n  --color-four: ${colors[3]};\n  --color-five: ${colors[4]};\n}`;
  };

  const getTailwindExport = () => {
    return `colors: {\n  palette: {\n    50: '${colors[0]}',\n    100: '${colors[1]}',\n    200: '${colors[2]}',\n    300: '${colors[3]}',\n    400: '${colors[4]}',\n  }\n}`;
  };

  const copyExport = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`Copied ${label} variables to clipboard!`);
  };

  return (
    <ToolLayout title="Color Palette Generator">
      <div className="space-y-8">
        
        {/* TOP BAR TRIGGERS */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-white text-[10px]">SPACEBAR</kbd> anywhere on screen to randomize unlocked slots!
          </p>
          <Button
            onClick={generatePalette}
            className="btn-f1 w-full sm:w-auto font-semibold px-6 flex items-center justify-center gap-2"
          >
            <RefreshCw className="h-4 w-4 animate-spin-slow" />
            Randomize Palette
          </Button>
        </div>

        {/* INTERACTIVE COLOR GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
          {colors.map((color, index) => {
            const isLocked = lockedIndices.includes(index);
            return (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md flex flex-col group relative transition-all duration-300 hover:border-white/20"
              >
                {/* COLOR PREVIEW */}
                <div
                  className="h-36 w-full relative flex items-center justify-center transition-transform"
                  style={{ backgroundColor: color }}
                >
                  {/* Inline Color Picker */}
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => updateColor(index, e.target.value)}
                    className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center justify-center">
                    <span className="text-[11px] font-bold text-white uppercase tracking-wider bg-black/60 px-2.5 py-1 rounded-full border border-white/10">
                      Edit Color
                    </span>
                  </div>
                </div>

                {/* SLIDER TEXT & ACTIONS */}
                <div className="p-3.5 space-y-3 relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-white uppercase select-all">
                      {color}
                    </span>
                    <button
                      onClick={() => copyColor(color)}
                      className="p-1.5 rounded-lg text-muted-foreground hover:text-white hover:bg-white/5 transition"
                      title="Copy color hex"
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleLock(index)}
                      className={`flex-1 py-1 px-2.5 rounded-lg border text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition ${
                        isLocked
                          ? "bg-red-500/10 border-red-500/30 text-red-400"
                          : "border-white/5 text-muted-foreground hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {isLocked ? (
                        <>
                          <Lock className="h-3 w-3" />
                          Locked
                        </>
                      ) : (
                        <>
                          <Unlock className="h-3 w-3" />
                          Lock
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* BOTTOM DOUBLE COLUMN: PRESETS, CONTRAST CHECKER, MOCKUP PREVIEW */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* LEFT SIDE: PRESETS & ACCESSIBILITY CONTRAST */}
          <div className="md:col-span-6 space-y-6">
            
            {/* THEME PRESETS */}
            <div className="p-5 rounded-2xl border border-white/10 bg-black/30 space-y-4">
              <h3 className="text-xs font-bold tracking-widest text-muted-foreground uppercase flex items-center gap-2">
                <Palette className="h-4 w-4 text-red-500" />
                PRESETS & THEMES
              </h3>
              <div className="space-y-2">
                {presets.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => loadPreset(preset.colors, preset.name)}
                    className="w-full p-2.5 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/10 transition flex items-center justify-between group text-left"
                  >
                    <span className="text-xs font-bold text-white group-hover:text-red-400 transition">
                      {preset.name}
                    </span>
                    <div className="flex gap-1.5">
                      {preset.colors.map((c, i) => (
                        <div
                          key={i}
                          className="w-4 h-4 rounded-full border border-black/30"
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* CONTRAST CHECKER */}
            <div className="p-5 rounded-2xl border border-white/10 bg-black/30 space-y-4">
              <h3 className="text-xs font-bold tracking-widest text-muted-foreground uppercase flex items-center gap-2">
                <Accessibility className="h-4 w-4 text-green-400" />
                ACCESSIBILITY CONTRACT CHECKER (WCAG)
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">Text Color</label>
                  <select
                    value={contrastSource}
                    onChange={(e) => setContrastSource(Number(e.target.value))}
                    className="w-full h-9 rounded bg-black/50 border border-white/10 text-white text-xs px-2 focus:border-red-500/50 outline-none"
                  >
                    {colors.map((c, idx) => (
                      <option key={idx} value={idx}>
                        Slot {idx + 1} ({c})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">Bg Color</label>
                  <select
                    value={contrastTarget}
                    onChange={(e) => setContrastTarget(Number(e.target.value))}
                    className="w-full h-9 rounded bg-black/50 border border-white/10 text-white text-xs px-2 focus:border-red-500/50 outline-none"
                  >
                    {colors.map((c, idx) => (
                      <option key={idx} value={idx}>
                        Slot {idx + 1} ({c})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* RATIO RATINGS */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white">Contrast Ratio</span>
                  <span className="font-mono text-lg font-bold text-green-400">
                    {contrastRatio.toFixed(2)} : 1
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-bold">
                  <div className="p-2 rounded bg-white/5 border border-white/5">
                    <p className="text-muted-foreground mb-0.5">AA Normal</p>
                    <span className={aaNormal === "PASS" ? "text-green-400" : "text-red-500"}>
                      {aaNormal}
                    </span>
                  </div>
                  <div className="p-2 rounded bg-white/5 border border-white/5">
                    <p className="text-muted-foreground mb-0.5">AAA Normal</p>
                    <span className={aaaNormal === "PASS" ? "text-green-400" : "text-red-500"}>
                      {aaaNormal}
                    </span>
                  </div>
                  <div className="p-2 rounded bg-white/5 border border-white/5">
                    <p className="text-muted-foreground mb-0.5">AA Large</p>
                    <span className={aaLarge === "PASS" ? "text-green-400" : "text-red-500"}>
                      {aaLarge}
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT SIDE: UI MOCKUP PREVIEW & CODE EXPORTS */}
          <div className="md:col-span-6 space-y-6">
            
            {/* UI MOCKUP PREVIEW */}
            <div className="p-5 rounded-2xl border border-white/10 bg-black/30 space-y-4">
              <h3 className="text-xs font-bold tracking-widest text-muted-foreground uppercase flex items-center gap-2">
                <LayoutTemplate className="h-4 w-4 text-cyan-400" />
                LIVE MOCKUP PREVIEW
              </h3>
              
              <div 
                className="p-5 rounded-xl border border-white/5 transition-all duration-300 space-y-4"
                style={{ backgroundColor: colors[3] }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold tracking-wider uppercase" style={{ color: colors[2] }}>
                    Student Portal
                  </span>
                  <span
                    className="text-[8px] px-2 py-0.5 rounded-full font-bold uppercase"
                    style={{ backgroundColor: colors[4], color: colors[3] }}
                  >
                    Active Streak
                  </span>
                </div>
                
                <h4 className="text-base font-bold tracking-wide" style={{ color: colors[2] }}>
                  F1 Analytics Engine
                </h4>
                
                <p className="text-xs leading-relaxed" style={{ color: colors[2] }}>
                  Design complete, accessible dashboard pages instantly. Modify colors above to refresh.
                </p>

                <div className="flex gap-2">
                  <button
                    className="px-3 py-1.5 rounded-lg text-xs font-bold transition hover:opacity-90 active:scale-95"
                    style={{ backgroundColor: colors[0], color: colors[2] }}
                  >
                    Launch Suite
                  </button>
                  <button
                    className="px-3 py-1.5 rounded-lg text-xs font-bold border transition hover:bg-white/5 active:scale-95"
                    style={{ borderColor: colors[1], color: colors[1] }}
                  >
                    Documentation
                  </button>
                </div>
              </div>
            </div>

            {/* CODE EXPORTS */}
            <div className="p-5 rounded-2xl border border-white/10 bg-black/30 space-y-4">
              <h3 className="text-xs font-bold tracking-widest text-muted-foreground uppercase flex items-center gap-2">
                <Code className="h-4 w-4 text-purple-400" />
                DEVELOPER EXPORT CENTER
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={() => copyExport(getCSSExport(), "CSS Variables")}
                  variant="outline"
                  className="border-white/10 hover:border-red-500/50 hover:bg-red-500/10 text-white flex items-center justify-center gap-2 text-xs"
                >
                  <Copy className="h-3.5 w-3.5 text-red-500" />
                  CSS Variables
                </Button>
                <Button
                  onClick={() => copyExport(getTailwindExport(), "Tailwind Config")}
                  variant="outline"
                  className="border-white/10 hover:border-cyan-400/50 hover:bg-cyan-500/10 text-white flex items-center justify-center gap-2 text-xs"
                >
                  <Copy className="h-3.5 w-3.5 text-cyan-400" />
                  Tailwind Theme
                </Button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </ToolLayout>
  );
};

export default ColorPaletteGenerator;