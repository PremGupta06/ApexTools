import { useState, useRef } from "react";
import ToolLayout from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Upload, Download, Image as ImageIcon, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

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
    toast.success(`${files.length} image(s) added`);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const clearAll = () => {
    setImages([]);
    toast("Cleared all images");
  };

  const generatePDF = () => {
    if (!images.length) {
      toast.error("Upload images first");
      return;
    }

    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>PDF</title>
          <style>
            body { margin: 0; background: black; }
            img {
              width: 100%;
              page-break-after: always;
              display: block;
            }
          </style>
        </head>
        <body>
          ${images.map((img) => `<img src="${img.url}" />`).join("")}
        </body>
      </html>
    `);

    printWindow.document.close();

    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
    }, 500);
  };

  return (
    <ToolLayout title="Image to PDF Converter">

      {/* 🛞 WHEEL */}
      <motion.img
        src="https://cdn-icons-png.flaticon.com/512/1048/1048315.png"
        className="absolute top-4 right-6 w-14 opacity-20"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 12 }}
      />

      {/* 🏎️ CAR */}
      <motion.img
        src="https://cdn.pixabay.com/photo/2013/07/13/10/07/car-156275_1280.png"
        className="absolute bottom-2 right-10 w-56 opacity-20 hidden sm:block"
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 5 }}
      />

      <div className="space-y-6">

        {/* UPLOAD */}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFiles}
          className="hidden"
        />

        <Button
          onClick={() => inputRef.current?.click()}
          className="w-full border border-white/10 bg-black/40 text-white hover:bg-white/10"
        >
          <Upload className="mr-2 h-4 w-4" />
          Upload Images
        </Button>

        {/* PREVIEW */}
        {images.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {images.map((img, i) => (
                <div
                  key={i}
                  className="relative rounded-lg overflow-hidden border border-white/10 group"
                >
                  <img
                    src={img.url}
                    alt={img.name}
                    className="w-full h-full object-cover"
                  />

                  {/* REMOVE BTN */}
                  <button
                    onClick={() => removeImage(i)}
                    className="absolute top-2 right-2 bg-black/60 p-1 rounded opacity-0 group-hover:opacity-100 transition"
                  >
                    <Trash2 className="h-4 w-4 text-red-400" />
                  </button>
                </div>
              ))}
            </div>

            <p className="text-sm text-center text-muted-foreground">
              {images.length} image(s) selected
            </p>

            {/* ACTIONS */}
            <div className="flex gap-3">
              <Button onClick={generatePDF} className="flex-1 btn-f1">
                <Download className="mr-2 h-4 w-4" />
                Generate PDF
              </Button>

              <Button
                onClick={clearAll}
                variant="ghost"
                className="border border-white/10"
              >
                Clear
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-10">
            <ImageIcon className="h-14 w-14 text-gray-500 mx-auto mb-4" />
            <p className="text-sm text-muted-foreground">
              Upload images to convert them into PDF
            </p>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default ImageToPDF;