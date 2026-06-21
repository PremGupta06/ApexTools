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
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsPage from "./pages/TermsPage";
import ContactPage from "./pages/ContactPage";
import BlogPage from "./pages/BlogPage";
import BlogPost from "./pages/BlogPost";
import NotFound from "./pages/NotFound";
import PercentageCalculator from "./tools/PercentageCalculator";
import WordCounter from "./tools/WordCounter";
import TextSummarizer from "./tools/TextSummarizer";
import StudyTimer from "./tools/StudyTimer";
import PasswordGenerator from "./tools/PasswordGenerator";
import UnitConverter from "./tools/UnitConverter";
import JSONFormatter from "./tools/JSONFormatter";
import Base64Tool from "./tools/Base64Tool";
import ImageToPDF from "./tools/ImageToPDF";
import PDFMerger from "./tools/PDFMerger";
import QRCodeGenerator from "./tools/QRCodeGenerator";
import ColorPaletteGenerator from "./tools/ColorPaletteGenerator";
import AgeCalculator from "./tools/AgeCalculator";
import EMICalculator from "./tools/EMICalculator";
import GSTCalculator from "./tools/GSTCalculator";


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
          <Route path="/tool/percentage-calculator" element={<PercentageCalculator />} />
          <Route path="/tool/word-counter" element={<WordCounter />} />
          <Route path="/tool/text-summarizer" element={<TextSummarizer />} />
          <Route path="/tool/study-timer" element={<StudyTimer />} />
          <Route path="/tool/password-generator" element={<PasswordGenerator />} />
          <Route path="/tool/unit-converter" element={<UnitConverter />} />
          <Route path="/tool/json-formatter" element={<JSONFormatter />} />
          <Route path="/tool/base64" element={<Base64Tool />} />
          <Route path="/tool/image-to-pdf" element={<ImageToPDF />} />
          <Route path="/tool/pdf-merger" element={<PDFMerger />} />
          <Route path="/tool/qr-generator" element={<QRCodeGenerator />} />
          <Route path="/tool/color-palette-generator" element={<ColorPaletteGenerator />} />
          <Route path="/tool/age-calculator" element={<AgeCalculator />} />
          <Route path="/tool/emi-calculator" element={<EMICalculator />} />
          <Route path="/tool/gst-calculator" element={<GSTCalculator />} />
          <Route path="/qr-generator" element={<QRCodeGenerator />} />
          <Route path="/color-palette-generator" element={<ColorPaletteGenerator />} />
          <Route path="/age-calculator" element={<AgeCalculator />} />
          <Route path="/emi-calculator" element={<EMICalculator />} />
          <Route path="/gst-calculator" element={<GSTCalculator />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
