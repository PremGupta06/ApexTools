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

      {/* Popular Tools */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-4">
              Popular Tools
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Explore our most-used student productivity tools.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {toolsList.slice(0, 8).map((tool, i) => (
              <ToolCard key={tool.title} {...tool} index={i} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button asChild variant="outline" className="group">
              <Link to="/tools">
                View All Tools
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Features />

      {/* About snippet */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-6">
              Built for Students
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Student Tools Hub is designed to help students quickly access useful academic tools without installing software or searching multiple websites.
            </p>
            <Button asChild>
              <Link to="/about">Learn More About Us</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Index;
