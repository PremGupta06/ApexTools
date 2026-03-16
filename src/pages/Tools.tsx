import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import ToolCard from "@/components/ToolCard";
import { toolsList } from "@/data/tools";
import { Input } from "@/components/ui/input";

const Tools = () => {
  const [search, setSearch] = useState("");
  const filtered = toolsList.filter(
    (t) =>
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="pt-24 pb-16 min-h-screen bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-display font-bold text-4xl text-foreground mb-4">All Tools</h1>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Browse our complete collection of free student tools.
          </p>
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tools..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map((tool, i) => (
            <ToolCard key={tool.title} {...tool} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground mt-12">No tools found matching your search.</p>
        )}
      </div>
    </div>
  );
};

export default Tools;
