import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RefreshCw } from "lucide-react";

const templates = [
  "The Impact of {topic} on Modern Society",
  "Exploring the Role of {topic} in Education",
  "A Critical Analysis of {topic}",
  "Understanding {topic}: Challenges and Opportunities",
  "The Future of {topic}: A Comprehensive Study",
  "How {topic} Is Shaping the 21st Century",
  "{topic}: Myths vs. Reality",
  "The Ethics of {topic} in Today's World",
  "Rethinking {topic}: New Perspectives",
  "Why {topic} Matters More Than Ever",
];

const EssayTitleGenerator = () => {
  const [topic, setTopic] = useState("");
  const [titles, setTitles] = useState<string[]>([]);

  const generate = () => {
    const shuffled = [...templates].sort(() => Math.random() - 0.5);
    setTitles(shuffled.slice(0, 5).map((t) => t.replace("{topic}", topic.trim())));
  };

  return (
    <ToolLayout title="Essay Title Generator">
      <div className="space-y-4">
        <Input placeholder="Enter your essay topic..." value={topic} onChange={(e) => setTopic(e.target.value)} />
        <Button onClick={generate} className="w-full" disabled={!topic.trim()}>
          <RefreshCw className="mr-2 h-4 w-4" /> Generate Titles
        </Button>
        {titles.length > 0 && (
          <div className="space-y-2">
            {titles.map((t, i) => (
              <div key={i} className="p-3 rounded-lg bg-primary/10 border-glow text-sm">{t}</div>
            ))}
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default EssayTitleGenerator;
