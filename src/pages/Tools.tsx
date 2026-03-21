import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Sparkles } from "lucide-react";
import ToolCard from "@/components/ToolCard";
import { toolsList, premiumToolsList } from "@/data/tools";
import { Input } from "@/components/ui/input";

const Tools = () => {
  const [search, setSearch] = useState("");

  const allTools = [...toolsList, ...premiumToolsList];

  const filtered = allTools.filter(
    (t) =>
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase())
  );

  const filteredBasic = filtered.filter((t) =>
    toolsList.some((b) => b.to === t.to)
  );

  const filteredPremium = filtered.filter((t) =>
    premiumToolsList.some((p) => p.to === t.to)
  );

  return (
    <div className="pt-28 pb-20 min-h-screen relative overflow-hidden">

      {/* 🌌 BACKGROUND GLOW */}
      <div className="absolute inset-0 bg-f1-glow opacity-50" />

      {/* 🔴 RED GLOW */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-red-500/20 blur-[120px] rounded-full" />

      {/* 🔵 CYAN GLOW */}
      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-cyan-400/20 blur-[120px] rounded-full" />

      <div className="container mx-auto px-4 lg:px-10 relative z-10">

        {/* 🔥 HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="font-bold text-4xl sm:text-5xl mb-6 tracking-wide">
            All <span className="text-gradient-f1">Tools</span>
          </h1>

          <p className="text-muted-foreground mb-10 max-w-lg mx-auto text-base">
            Your complete racing dashboard of productivity tools.
          </p>

          {/* 🔍 SEARCH */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />

            <Input
              placeholder="Search tools..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-black/40 border border-white/10 backdrop-blur-md text-white focus:border-red-500/50"
            />
          </div>
        </motion.div>

        {/* 🔴 PREMIUM TOOLS */}
        {filteredPremium.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-20"
          >
            <div className="flex items-center gap-3 mb-8">

              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/30">
                <Sparkles className="h-4 w-4 text-red-400" />
                <span className="text-sm font-semibold text-red-400">
                  Premium Tools
                </span>
              </div>

              <div className="flex-1 h-px bg-gradient-to-r from-red-500/30 to-transparent" />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPremium.map((tool, i) => (
                <ToolCard key={tool.title} {...tool} index={i} premium />
              ))}
            </div>
          </motion.div>
        )}

        {/* ⚙️ BASIC TOOLS */}
        {filteredBasic.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="text-sm font-medium text-gray-400">
                Basic Tools
              </span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredBasic.map((tool, i) => (
                <ToolCard key={tool.title} {...tool} index={i} />
              ))}
            </div>
          </motion.div>
        )}

        {/* ❌ EMPTY STATE */}
        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground mt-16 text-lg">
            No tools found 🚫
          </p>
        )}
      </div>
    </div>
  );
};

export default Tools;