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
import WordCounter from "./tools/WordCounter";
import PasswordGenerator from "./tools/PasswordGenerator";
import ComingSoonTool from "./tools/ComingSoonTool";

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
          <Route path="/tool/word-counter" element={<WordCounter />} />
          <Route path="/tool/password-generator" element={<PasswordGenerator />} />
          <Route path="/tool/sgpa-calculator" element={<ComingSoonTool title="SGPA Calculator" />} />
          <Route path="/tool/percentage-calculator" element={<ComingSoonTool title="Percentage Calculator" />} />
          <Route path="/tool/grade-calculator" element={<ComingSoonTool title="Grade Calculator" />} />
          <Route path="/tool/text-summarizer" element={<ComingSoonTool title="Text Summarizer" />} />
          <Route path="/tool/essay-title-generator" element={<ComingSoonTool title="Essay Title Generator" />} />
          <Route path="/tool/study-timer" element={<ComingSoonTool title="Study Timer" />} />
          <Route path="/tool/unit-converter" element={<ComingSoonTool title="Unit Converter" />} />
          <Route path="/tool/json-formatter" element={<ComingSoonTool title="JSON Formatter" />} />
          <Route path="/tool/code-formatter" element={<ComingSoonTool title="Code Formatter" />} />
          <Route path="/tool/base64" element={<ComingSoonTool title="Base64 Encoder / Decoder" />} />
          <Route path="/tool/image-to-pdf" element={<ComingSoonTool title="Image to PDF Converter" />} />
          <Route path="/tool/pdf-merger" element={<ComingSoonTool title="PDF Merger" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
