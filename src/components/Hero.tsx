import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">

      {/* 🏎️ BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 scale-105"
        style={{
          backgroundImage: "url('/mcqueen.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* 🌌 DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/60" />

      {/* 🔴 LEFT RED GLOW */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-red-500/30 blur-[140px] rounded-full" />

      {/* 🔵 RIGHT CYAN GLOW */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-400/25 blur-[120px] rounded-full" />

      {/* 🌫️ CENTER VIGNETTE */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/70" />

      <div className="container mx-auto px-4 lg:px-10 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-7"
          >

            {/* BADGE */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-500/40 bg-red-500/10 text-red-400 text-xs font-medium w-fit backdrop-blur-md"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Free for all students
            </motion.div>

            {/* HEADING */}
            <h1 className="font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-[1.1] tracking-tight">
              <span className="text-white">All Student Tools</span>
              <br />
              <span className="text-gradient-f1">In One Place</span>
            </h1>

            {/* SUBTEXT */}
            <p className="text-foreground-muted text-lg max-w-lg leading-relaxed">
              Built like a racing machine — fast, powerful, and designed for students.
              Access CGPA calculators, study tools, and productivity boosters instantly.
            </p>

            {/* BUTTONS */}
            <div className="flex flex-wrap gap-4 pt-3">

              <Button
                asChild
                size="lg"
                className="btn-f1 font-semibold px-6 py-3 rounded-xl"
              >
                <Link to="/tools">
                  Explore Tools
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="border border-white/20 bg-black/30 backdrop-blur-md text-white hover:bg-white/10 px-6 py-3 rounded-xl"
              >
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </motion.div>

          {/* RIGHT SIDE (EMPTY FOR CAR FOCUS) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="hidden lg:block"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;