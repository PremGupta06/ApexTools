import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ToolLayoutProps {
  title: string;
  children: ReactNode;
}

const ToolLayout = ({ title, children }: ToolLayoutProps) => {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-background-alt">
      <div className="container mx-auto px-4 lg:px-8 max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Button asChild variant="ghost" size="sm" className="mb-6 text-muted-foreground">
            <Link to="/tools">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Tools
            </Link>
          </Button>

          <h1 className="font-display font-bold text-3xl text-foreground mb-8">{title}</h1>

          <div className="bg-card border border-border rounded-xl p-6 sm:p-8 card-shadow">
            {children}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ToolLayout;
