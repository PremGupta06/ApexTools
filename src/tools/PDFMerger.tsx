import ToolLayout from "@/components/ToolLayout";
import { FileUp } from "lucide-react";

const PDFMerger = () => {
  return (
    <ToolLayout title="PDF Merger">
      <div className="text-center py-12">
        <FileUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="font-display font-semibold mb-2">PDF Merger</h3>
        <p className="text-sm text-muted-foreground max-w-sm mx-auto">
          PDF merging requires server-side processing. This feature will be available soon with backend support. For now, try our Image to PDF converter!
        </p>
      </div>
    </ToolLayout>
  );
};

export default PDFMerger;
