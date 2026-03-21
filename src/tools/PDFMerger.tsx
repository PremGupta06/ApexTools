import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Upload, Download, Trash2, FileText } from "lucide-react";
import { toast } from "sonner";
import { PDFDocument } from "pdf-lib";

const PDFMerger = () => {
  const [files, setFiles] = useState<File[]>([]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []) as File[];
    if (!selected.length) return;

    const pdfs = selected.filter((f) => f.type === "application/pdf");

    if (pdfs.length !== selected.length) {
      toast.error("Only PDF files are allowed");
    }

    setFiles((prev) => [...prev, ...pdfs]);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const mergePDFs = async () => {
    if (files.length < 2) {
      toast.error("Upload at least 2 PDFs");
      return;
    }

    try {
      const mergedPdf = await PDFDocument.create();

      for (const file of files) {
        const bytes = await file.arrayBuffer();
        const pdf = await PDFDocument.load(bytes);
        const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        pages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedBytes = await mergedPdf.save();

      const blob = new Blob([mergedBytes as BlobPart], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "merged.pdf";
      a.click();

      toast.success("PDF merged successfully!");
    } catch (err) {
      toast.error("Error merging PDFs");
    }
  };

  return (
    <ToolLayout title="PDF Merger">

      <div className="space-y-6">

        {/* UPLOAD */}
        <label className="block">
          <input
            type="file"
            accept="application/pdf"
            multiple
            onChange={handleUpload}
            className="hidden"
          />

          <div className="cursor-pointer border border-white/10 bg-black/40 text-white p-4 rounded-xl text-center hover:bg-white/10 transition">
            <Upload className="mx-auto mb-2 h-5 w-5" />
            Upload PDF Files
          </div>
        </label>

        {/* FILE LIST */}
        {files.length > 0 && (
          <>
            <div className="space-y-2">
              {files.map((file, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-lg bg-black/40 border border-white/10"
                >
                  <div className="flex items-center gap-2 text-sm">
                    <FileText className="h-4 w-4 text-red-400" />
                    {file.name}
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFile(i)}
                  >
                    <Trash2 className="h-4 w-4 text-gray-400" />
                  </Button>
                </div>
              ))}
            </div>

            {/* MERGE BUTTON */}
            <Button onClick={mergePDFs} className="w-full btn-f1">
              <Download className="mr-2 h-4 w-4" />
              Merge & Download PDF
            </Button>
          </>
        )}

        {/* EMPTY */}
        {files.length === 0 && (
          <div className="text-center py-10 text-muted-foreground text-sm">
            Upload at least 2 PDF files to merge them
          </div>
        )}

      </div>
    </ToolLayout>
  );
};

export default PDFMerger;