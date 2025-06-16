import { GlobalWorkerOptions } from "pdfjs-dist";

// Gunakan CDN untuk worker PDF.js
GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
