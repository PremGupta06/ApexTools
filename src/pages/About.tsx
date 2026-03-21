import { motion } from "framer-motion";
import { GraduationCap, Target, Heart } from "lucide-react";

const About = () => {
  return (
    <div className="pt-28 pb-20 min-h-screen relative overflow-hidden">

      {/* 🔥 BACKGROUND GLOW */}
      <div className="absolute inset-0 bg-f1-glow opacity-50 pointer-events-none" />

      {/* 🔴 RED GLOW */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-red-500/20 blur-[120px] rounded-full" />

      {/* 🔵 CYAN GLOW */}
      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-cyan-400/20 blur-[120px] rounded-full" />

      {/* 🛞 WHEEL STICKERS */}
      <motion.img
        src="https://cdn-icons-png.flaticon.com/512/743/743131.png"
        alt="wheel"
        className="absolute top-10 right-10 w-28 opacity-20 pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      />

      <motion.img
        src="https://cdn-icons-png.flaticon.com/512/743/743131.png"
        alt="wheel"
        className="absolute bottom-10 left-10 w-24 opacity-20 pointer-events-none"
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
      />

      {/* 🏎️ CAR STICKER */}
      <motion.img
        src="https://pngimg.com/uploads/formula_1/formula_1_PNG31.png"
        alt="f1 car"
        className="absolute bottom-0 right-1/4 w-[300px] opacity-10 pointer-events-none"
        animate={{ x: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
      />

      <div className="container mx-auto px-4 lg:px-10 max-w-3xl relative z-10">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="font-bold text-4xl sm:text-5xl mb-6 tracking-wide">
            About <span className="text-gradient-f1">Apextools</span>
          </h1>

          <p className="text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto">
            Built like a racing machine — fast, powerful, and designed for students.  
            Access all your academic tools in one place without distractions.
          </p>
        </motion.div>

        {/* CARDS */}
        <div className="grid gap-10">

          {[
            {
              icon: Target,
              title: "Our Mission",
              text: "To provide students worldwide with fast, reliable tools that simplify academic and everyday tasks.",
            },
            {
              icon: GraduationCap,
              title: "Who It's For",
              text: "Students, learners, and creators who want quick access to powerful productivity tools.",
            },
            {
              icon: Heart,
              title: "Why Free?",
              text: "We believe essential tools should be accessible to everyone — no cost, no barriers.",
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative flex gap-5 p-6 rounded-2xl glass-strong border border-white/10 card-shadow-hover hover-lift group"
            >

              {/* 🔥 GLOW OVERLAY */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-red-500/10 via-purple-500/10 to-cyan-400/10 blur-xl" />

              {/* ICON */}
              <div className="relative z-10 w-12 h-12 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition">
                <item.icon className="h-6 w-6 text-red-500 group-hover:text-cyan-400 transition" />
              </div>

              {/* CONTENT */}
              <div className="relative z-10">
                <h3 className="font-semibold text-white mb-2 tracking-wide">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.text}
                </p>
              </div>

            </motion.div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default About;
