import {
  Percent,
  FileText,
  AlignLeft,
  Timer,
  KeyRound,
  ArrowRightLeft,
  Braces,
  Binary,
  FileImage,
  FilePlus,
  CalendarClock,
  Flame,
  BarChart3,
} from "lucide-react";

export const toolsList = [
  { icon: Percent, title: "Percentage Calculator", description: "Convert grades, marks, and ratios to percentages.", to: "/tool/percentage-calculator" },
  { icon: FileText, title: "Word Counter", description: "Count words, characters, and sentences instantly.", to: "/tool/word-counter" },
  { icon: AlignLeft, title: "Text Summarizer", description: "Summarize long texts into key points.", to: "/tool/text-summarizer" },
  { icon: Timer, title: "Study Timer", description: "Pomodoro-style timer to boost productivity.", to: "/tool/study-timer" },
  { icon: KeyRound, title: "Password Generator", description: "Create strong, secure passwords instantly.", to: "/tool/password-generator" },
  { icon: ArrowRightLeft, title: "Unit Converter", description: "Convert between units of length, weight, and more.", to: "/tool/unit-converter" },
  { icon: Braces, title: "JSON Formatter", description: "Beautify and validate JSON data.", to: "/tool/json-formatter" },
  { icon: Binary, title: "Base64 Encoder / Decoder", description: "Encode or decode Base64 strings.", to: "/tool/base64" },
  { icon: FileImage, title: "Image to PDF Converter", description: "Convert images to PDF documents.", to: "/tool/image-to-pdf" },
  { icon: FilePlus, title: "PDF Merger", description: "Merge multiple PDF files into one.", to: "/tool/pdf-merger" },
];

export const premiumToolsList = [
  { icon: CalendarClock, title: "Smart Study Planner", description: "AI-powered daily study schedule with progress tracking and missed-day recovery.", to: "/tool/smart-study-planner" },
  { icon: Flame, title: "Exam Panic Mode", description: "Emergency study plan with daily targets, priority chapters, and urgency indicators.", to: "/tool/exam-panic-mode" },
  { icon: BarChart3, title: "Study Productivity Dashboard", description: "Track productivity score, weekly performance, streaks, and study analytics.", to: "/tool/study-dashboard" },
];
