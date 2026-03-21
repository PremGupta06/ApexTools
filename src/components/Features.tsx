import { motion } from "framer-motion";
import { Zap, Gift, Layers } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Fast & Lightweight",
    description: "Instant calculations with zero loading time. No bloat, no waiting.",
    glow: "group-hover:shadow-[0_0_30px_rgba(255,0,0,0.5)]",
  },
  {
    icon: Gift,
    title: "Free for Students",
    description: "All tools are completely free. No subscriptions, no hidden fees.",
    glow: "group-hover:shadow-[0_0_30px_rgba(0,255,255,0.5)]",
  },
  {
    icon: Layers,
    title: "All-in-One Toolkit",
    description: "Everything students need in one place. Stop juggling multiple sites.",
    glow: "group-hover:shadow-[0_0_30px_rgba(255,0,100,0.5)]",
  },
];

const Features = () => {
  return (
    <section className="py-28 bg-background-alt relative overflow-hidden">

      {/* 🔥 F1 Glow Background */}
      <div className="absolute inset-0 bg-f1-glow opacity-60" />

      <div className="container mx-auto px-4 lg:px-10 relative z-10">

        {/* HEADING */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="font-bold text-3xl sm:text-5xl mb-6 tracking-wide">
            Why Students{" "}
            <span className="text-gradient-f1">Love Us</span>
          </h2>

          <p className="text-muted-foreground max-w-lg mx-auto text-base">
            Built for speed, designed like a racing machine — powerful, fast, and clean.
          </p>
        </motion.div>

        {/* CARDS */}
        <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">

          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`relative p-8 rounded-2xl glass-strong border border-white/10 hover-lift card-shadow-hover group transition-all duration-300 ${feature.glow}`}
            >

              {/* 🔥 Glow Overlay */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-red-500/10 via-purple-500/10 to-cyan-400/10 blur-xl" />

              <div className="relative z-10 text-center">

                {/* ICON */}
                <div className="w-14 h-14 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition">
                  <feature.icon className="h-6 w-6 text-red-500 group-hover:text-cyan-400 transition" />
                </div>

                {/* TITLE */}
                <h3 className="font-semibold text-lg mb-3 tracking-wide">
                  {feature.title}
                </h3>

                {/* DESC */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Features;