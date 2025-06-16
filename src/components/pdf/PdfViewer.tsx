'use client';

import React, {useState} from 'react';
import {Document, Page, pdfjs} from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import {ChevronRight, ChevronLeft, ArrowDownToLine} from 'lucide-react';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/4.8.69/pdf.worker.mjs`;

interface PdfModalViewerProps {
  fileUrl: string;
}

const PdfModalViewer: React.FC<PdfModalViewerProps> = ({fileUrl}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({numPages}: {numPages: number}) => {
    setNumPages(numPages);
    setPageNumber(1); // Reset to first page when a new document is loaded
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const nextPage = () => {
    if (pageNumber < (numPages ?? 0)) setPageNumber(pageNumber + 1);
  };

  const prevPage = () => {
    if (pageNumber > 1) setPageNumber(pageNumber - 1);
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={openModal}
        className="text-sky-600 text-sm hover:text-sky-500"
      >
        View Report
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-[100]">
          <div className="relative bg-white w-11/12 h-full">
            {/* Header */}
            <div className="flex justify-between items-center bg-gray-100 dark:bg-slate-800 p-4">
              <h2 className="text-xl font-semibold">Falvo Viewer</h2>
              <button
                onClick={closeModal}
                className="text-gray-700 hover:text-gray-900 dark:text-slate-400 dark:hover:text-slate-200 transition duration-200 ease-in text-lg"
              >
                ✕
              </button>
            </div>

            {/* PDF Viewer */}
            <div className="w-full h-full overflow-hidden overflow-scroll">
              <Document
                file={fileUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={<p>Loading PDF...</p>}
                error={<p>Failed to load the document.</p>}
              >
                <Page pageNumber={pageNumber} />
              </Document>
              <p className="mt-2">
                Page {pageNumber} of {numPages ?? '?'}
              </p>
            </div>

            {/* Footer Controls */}
            <div className="fixed bottom-0 right-[4rem] flex justify-between items-center bg-gray-100 p-4">
              <button
                onClick={prevPage}
                disabled={pageNumber === 1}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 disabled:opacity-50"
              >
                <ChevronLeft />
              </button>
              <button
                onClick={nextPage}
                disabled={pageNumber === numPages}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 disabled:opacity-50"
              >
                <ChevronRight />
              </button>
              <button
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = fileUrl;
                  link.download = 'report.pdf';
                  link.click();
                }}
                className="bg-slate-600 hover:bg-sky-600 transition duration-400 ease-in text-white px-4 py-2 rounded"
              >
                <ArrowDownToLine />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PdfModalViewer;
