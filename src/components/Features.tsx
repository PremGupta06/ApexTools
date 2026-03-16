import { motion } from "framer-motion";
import { Zap, Gift, Layers } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Fast & Lightweight",
    description: "Instant calculations with zero loading time. No bloat, no waiting.",
  },
  {
    icon: Gift,
    title: "Free for Students",
    description: "All tools are completely free. No subscriptions, no hidden fees.",
  },
  {
    icon: Layers,
    title: "All-in-One Toolkit",
    description: "Everything students need in one place. Stop juggling multiple sites.",
  },
];

const Features = () => {
  return (
    <section className="py-24 bg-background-alt">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-4">
            Why Students Love Us
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
              className="text-center p-8 rounded-xl bg-card border border-border card-shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
