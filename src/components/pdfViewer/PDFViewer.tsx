import React, { useEffect } from "react";
import { pdfjs, Document, Page } from "react-pdf";

//PDFViewer Component:

//This component is responsible for rendering a PDF document using the react-pdf library.

const PDFViewer = ({ pdfUrl }: { pdfUrl: string }) => {
  // Set up PDF.js worker source during component mount
  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = new URL(
      "pdfjs-dist/build/pdf.worker.min.js",
      import.meta.url
    ).toString();
  }, []);

  return (
    <div>
      <Document
        file={pdfUrl}
        className="shadow-2xl rounded-xl overflow-hidden w-[300px] h-[400px]">
        <Page
          pageNumber={1}
          renderTextLayer={false}
          renderAnnotationLayer={false}
          className="scale-50 -translate-y-[25%] -translate-x-[25%]"
        />
      </Document>
    </div>
  );
};

export default PDFViewer;
