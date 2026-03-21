import Hero from "@/components/Hero";
import ToolCard from "@/components/ToolCard";
import Features from "@/components/Features";
import { toolsList } from "@/data/tools";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <>
      <Hero />

      {/* 🔥 POPULAR TOOLS */}
      <section className="py-28 relative overflow-hidden">

        {/* 🌌 BACKGROUND GLOW */}
        <div className="absolute inset-0 bg-f1-glow opacity-50" />

        {/* 🔴 LEFT GLOW */}
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-red-500/20 blur-[120px] rounded-full" />

        {/* 🔵 RIGHT GLOW */}
        <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-cyan-400/20 blur-[120px] rounded-full" />

        <div className="container mx-auto px-4 lg:px-10 relative z-10">

          {/* HEADER */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="font-bold text-3xl sm:text-5xl mb-6 tracking-wide">
              Popular <span className="text-gradient-f1">Tools</span>
            </h2>

            <p className="text-muted-foreground max-w-lg mx-auto text-base">
              Your racing dashboard of productivity tools — fast, clean, and powerful.
            </p>
          </motion.div>

          {/* TOOLS GRID */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {toolsList.slice(0, 8).map((tool, i) => (
              <ToolCard key={tool.title} {...tool} index={i} />
            ))}
          </div>

          {/* BUTTON */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-14"
          >
            <Button
              asChild
              className="btn-f1 font-semibold px-6 py-3 rounded-xl"
            >
              <Link to="/tools" className="flex items-center gap-2">
                View All Tools
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Features />

      {/* 🏎️ ABOUT SNIPPET */}
      <section className="py-28 relative overflow-hidden">

        {/* 🌌 GLOW */}
        <div className="absolute inset-0 bg-f1-glow opacity-40" />

        <div className="container mx-auto px-4 lg:px-10 max-w-3xl text-center relative z-10">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >

            <h2 className="font-bold text-3xl sm:text-5xl mb-6 tracking-wide">
              Built for <span className="text-gradient-f1">Students</span>
            </h2>

            <p className="text-muted-foreground text-lg leading-relaxed mb-10">
              Designed like a racing machine — fast, responsive, and distraction-free.
              Access all your academic tools in one place.
            </p>

            <Button
              asChild
              className="btn-f1 px-6 py-3 rounded-xl font-semibold"
            >
              <Link to="/about">Learn More About Us</Link>
            </Button>

          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Index;