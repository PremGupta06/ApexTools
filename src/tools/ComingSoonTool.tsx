import ToolLayout from "@/components/ToolLayout";
import { Construction } from "lucide-react";

interface ComingSoonToolProps {
  title: string;
}

const ComingSoonTool = ({ title }: ComingSoonToolProps) => {
  return (
    <ToolLayout title={title}>
      <div className="text-center py-12">
        <Construction className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="font-display font-semibold text-foreground mb-2">Coming Soon</h3>
        <p className="text-sm text-muted-foreground">This tool is currently under development. Check back soon!</p>
      </div>
    </ToolLayout>
  );
};

export default ComingSoonTool;
