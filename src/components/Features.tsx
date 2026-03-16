import { motion } from "framer-motion";
import { Zap, Gift, Layers } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Fast & Lightweight",
    description: "Instant calculations with zero loading time. No bloat, no waiting.",
    gradient: "from-amber/20 to-rose/10",
  },
  {
    icon: Gift,
    title: "Free for Students",
    description: "All tools are completely free. No subscriptions, no hidden fees.",
    gradient: "from-emerald/20 to-cyan/10",
  },
  {
    icon: Layers,
    title: "All-in-One Toolkit",
    description: "Everything students need in one place. Stop juggling multiple sites.",
    gradient: "from-primary/20 to-pink/10",
  },
];

const Features = () => {
  return (
    <section className="py-24 bg-background-alt relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial opacity-50" />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display font-bold text-3xl sm:text-4xl mb-4">
            Why Students <span className="text-gradient-warm">Love Us</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Built with simplicity and speed in mind for the modern student.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-8 rounded-xl bg-card border border-border card-shadow relative overflow-hidden group"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center text-primary mx-auto mb-4">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
