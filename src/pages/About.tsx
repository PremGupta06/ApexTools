import { motion } from "framer-motion";
import { GraduationCap, Target, Heart } from "lucide-react";

const About = () => {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-background">
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="font-display font-bold text-4xl text-foreground mb-6">About Student Tools Hub</h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Student Tools Hub is designed to help students quickly access useful academic tools without installing software or searching multiple websites. Everything you need, all in one place.
          </p>
        </motion.div>

        <div className="grid gap-8">
          {[
            { icon: Target, title: "Our Mission", text: "To provide students worldwide with free, fast, and reliable tools that simplify academic and everyday tasks." },
            { icon: GraduationCap, title: "Who It's For", text: "High school students, college students, and lifelong learners who need quick access to calculators, converters, and productivity tools." },
            { icon: Heart, title: "Why Free?", text: "We believe essential productivity tools should be accessible to every student, regardless of their financial situation." },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-5 p-6 rounded-xl bg-card border border-border card-shadow"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <item.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
