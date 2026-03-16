import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { type LucideIcon } from "lucide-react";

interface ToolCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  to: string;
  index?: number;
}

const ToolCard = ({ icon: Icon, title, description, to, index = 0 }: ToolCardProps) => {
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
          className="group relative p-6 rounded-xl bg-card border border-border card-shadow hover:card-shadow-hover transition-shadow duration-300 h-full"
        >
          <div className="flex flex-col gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
              <Icon className="h-5 w-5" />
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
