import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ToolLayoutProps {
  title: string;
  children: ReactNode;
}

const ToolLayout = ({ title, children }: ToolLayoutProps) => {
  return (
    <div className="pt-28 pb-20 min-h-screen relative overflow-hidden">

      {/* 🔥 BACKGROUND GLOW */}
      <div className="absolute inset-0 bg-f1-glow opacity-50 pointer-events-none" />

      {/* 🔴 LEFT RED GLOW */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-red-500/20 blur-[120px] rounded-full" />

      {/* 🔵 RIGHT CYAN GLOW */}
      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-cyan-400/20 blur-[120px] rounded-full" />

      <div className="container mx-auto px-4 lg:px-10 max-w-3xl relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >

          {/* 🔙 BACK BUTTON */}
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="mb-8 text-muted-foreground hover:text-white transition"
          >
            <Link to="/tools" className="flex items-center gap-2 group">
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition" />
              Back to Tools
            </Link>
          </Button>

          {/* 🏎️ TITLE */}
          <h1 className="font-bold text-3xl sm:text-4xl text-gradient-f1 mb-10 tracking-wide">
            {title}
          </h1>

          {/* 💎 TOOL CARD */}
          <div className="relative p-6 sm:p-8 rounded-2xl glass-strong border border-white/10 card-shadow-hover hover-lift">

            {/* 🔥 INNER GLOW */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-500/10 via-purple-500/10 to-cyan-400/10 opacity-0 hover:opacity-100 transition duration-500 blur-xl" />

            <div className="relative z-10">
              {children}
            </div>
          </div>

        </motion.div>
      </div>
    </div>
  );
};

export default ToolLayout;