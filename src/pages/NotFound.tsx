import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* 🌌 BACKGROUND GLOW */}
      <div className="absolute inset-0 bg-f1-glow opacity-50" />

      {/* 🔴 RED GLOW */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-red-500/20 blur-[120px] rounded-full" />

      {/* 🔵 CYAN GLOW */}
      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-cyan-400/20 blur-[120px] rounded-full" />

      {/* 🏎️ CAR IMAGE */}
      <motion.img
        src="https://pngimg.com/uploads/formula_1/formula_1_PNG31.png"
        alt="f1 car"
        className="absolute bottom-10 w-[350px] opacity-20 pointer-events-none"
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 4 }}
      />

      {/* CONTENT */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 text-center p-10 rounded-2xl glass-strong border border-white/10 card-shadow-hover max-w-md"
      >

        {/* 404 TEXT */}
        <h1 className="text-6xl font-extrabold mb-4 text-gradient-f1">
          404
        </h1>

        <p className="text-lg text-white mb-3">
          Lost on the track?
        </p>

        <p className="text-sm text-muted-foreground mb-8">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        {/* BUTTON */}
        <Button asChild className="btn-f1 px-6 py-3 rounded-xl font-semibold">
          <Link to="/">Return to Home</Link>
        </Button>
      </motion.div>
    </div>
  );
};

export default NotFound;