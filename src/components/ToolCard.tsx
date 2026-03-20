import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { type LucideIcon, Sparkles } from "lucide-react";

interface ToolCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  to: string;
  index?: number;
  premium?: boolean;
}

const ToolCard = ({ icon: Icon, title, description, to, index = 0, premium }: ToolCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link to={to}>
        <motion.div
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={`group relative p-6 rounded-xl bg-card border card-shadow hover:card-shadow-hover transition-all duration-300 h-full overflow-hidden ${
            premium ? "border-primary/25" : "border-border"
          }`}
        >
          {premium && (
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
          )}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                premium ? "bg-primary/20 text-primary group-hover:glow-primary" : "bg-primary/15 text-primary"
              }`}>
                <Icon className="h-5 w-5" />
              </div>
              {premium && <Sparkles className="h-3.5 w-3.5 text-primary/60" />}
            </div>
            <h3 className="font-display font-semibold text-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default ToolCard;
