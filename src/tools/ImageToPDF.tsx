import { useState, useRef } from "react";
import ToolLayout from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Upload, Download, Image as ImageIcon } from "lucide-react";

const ImageToPDF = () => {
  const [images, setImages] = useState<{ url: string; name: string }[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const newImages = Array.from(files).map((f) => ({
      url: URL.createObjectURL(f),
      name: f.name,
    }));
    setImages((prev) => [...prev, ...newImages]);
  };

  const generatePDF = () => {
    // Create a printable page with images
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`
      <html><head><title>Images to PDF</title><style>
        body { margin: 0; } img { max-width: 100%; page-break-after: always; display: block; }
      </style></head><body>
        ${images.map((img) => `<img src="${img.url}" />`).join("")}
      </body></html>
    `);
    printWindow.document.close();
    setTimeout(() => printWindow.print(), 500);
  };

  return (
    <ToolLayout title="Image to PDF Converter">
      <div className="space-y-4">
        <input ref={inputRef} type="file" accept="image/*" multiple onChange={handleFiles} className="hidden" />
        <Button variant="outline" onClick={() => inputRef.current?.click()} className="w-full border-glow">
          <Upload className="mr-2 h-4 w-4" /> Upload Images
        </Button>
        
        {images.length > 0 && (
          <>
            <div className="grid grid-cols-3 gap-2">
              {images.map((img, i) => (
                <div key={i} className="aspect-square rounded-lg overflow-hidden bg-secondary border border-border">
                  <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground text-center">{images.length} image(s) selected</p>
            <Button onClick={generatePDF} className="w-full">
              <Download className="mr-2 h-4 w-4" /> Generate PDF (Print Dialog)
            </Button>
          </>
        )}

        {images.length === 0 && (
          <div className="text-center py-8">
            <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">Upload images to convert them to PDF</p>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default ImageToPDF;
