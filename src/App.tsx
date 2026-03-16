import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Index from "./pages/Index";
import Tools from "./pages/Tools";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import CGPACalculator from "./tools/CGPACalculator";
import SGPACalculator from "./tools/SGPACalculator";
import PercentageCalculator from "./tools/PercentageCalculator";
import GradeCalculator from "./tools/GradeCalculator";
import WordCounter from "./tools/WordCounter";
import TextSummarizer from "./tools/TextSummarizer";
import EssayTitleGenerator from "./tools/EssayTitleGenerator";
import StudyTimer from "./tools/StudyTimer";
import PasswordGenerator from "./tools/PasswordGenerator";
import UnitConverter from "./tools/UnitConverter";
import JSONFormatter from "./tools/JSONFormatter";
import CodeFormatter from "./tools/CodeFormatter";
import Base64Tool from "./tools/Base64Tool";
import ImageToPDF from "./tools/ImageToPDF";
import PDFMerger from "./tools/PDFMerger";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/about" element={<About />} />
          <Route path="/tool/cgpa-calculator" element={<CGPACalculator />} />
          <Route path="/tool/sgpa-calculator" element={<SGPACalculator />} />
          <Route path="/tool/percentage-calculator" element={<PercentageCalculator />} />
          <Route path="/tool/grade-calculator" element={<GradeCalculator />} />
          <Route path="/tool/word-counter" element={<WordCounter />} />
          <Route path="/tool/text-summarizer" element={<TextSummarizer />} />
          <Route path="/tool/essay-title-generator" element={<EssayTitleGenerator />} />
          <Route path="/tool/study-timer" element={<StudyTimer />} />
          <Route path="/tool/password-generator" element={<PasswordGenerator />} />
          <Route path="/tool/unit-converter" element={<UnitConverter />} />
          <Route path="/tool/json-formatter" element={<JSONFormatter />} />
          <Route path="/tool/code-formatter" element={<CodeFormatter />} />
          <Route path="/tool/base64" element={<Base64Tool />} />
          <Route path="/tool/image-to-pdf" element={<ImageToPDF />} />
          <Route path="/tool/pdf-merger" element={<PDFMerger />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
