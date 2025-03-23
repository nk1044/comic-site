import React, { useState, useRef, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download, Printer, RotateCw, Search, X, BookOpen, FileText, ArrowLeft, ArrowRight } from 'lucide-react';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// Import required CSS for annotations and text layers
// This fixes the "AnnotationLayer styles not found" warning
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

function PDFReader({ pdfPath, title = "PDF Viewer" }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [rotation, setRotation] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [jumpToPage, setJumpToPage] = useState("");
  const [thumbnailsView, setThumbnailsView] = useState(false);
  const [thumbnails, setThumbnails] = useState([]);
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const pdfContainerRef = useRef(null);

  // Focus on the search input when search is opened
  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Generate thumbnails when document loads
  useEffect(() => {
    if (numPages && thumbnailsView && thumbnails.length === 0) {
      // Generate array of page numbers for thumbnails
      const thumbs = Array.from({ length: Math.min(numPages, 20) }, (_, i) => i + 1);
      setThumbnails(thumbs);
    }
  }, [numPages, thumbnailsView, thumbnails.length]);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setIsLoading(false);
  }

  function changePage(offset) {
    setPageNumber(prevPageNumber => {
      const newPageNumber = prevPageNumber + offset;
      return Math.min(Math.max(1, newPageNumber), numPages);
    });
  }

  function goToPage(page) {
    const pageNum = parseInt(page, 10);
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= numPages) {
      setPageNumber(pageNum);
      if (thumbnailsView) {
        setThumbnailsView(false);
      }
    }
    setJumpToPage("");
  }

  function handlePageInputChange(e) {
    const value = e.target.value;
    setJumpToPage(value);
  }

  function handlePageInputKeyDown(e) {
    if (e.key === 'Enter') {
      goToPage(jumpToPage);
    }
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  function zoomIn() {
    setScale(prevScale => Math.min(prevScale + 0.2, 2.5));
  }

  function zoomOut() {
    setScale(prevScale => Math.max(prevScale - 0.2, 0.5));
  }
  
  function resetZoom() {
    setScale(1.0);
  }

  function rotateClockwise() {
    setRotation(prevRotation => (prevRotation + 90) % 360);
  }

  function downloadPDF() {
    const link = document.createElement('a');
    link.href = pdfPath;
    link.download = pdfPath.split('/').pop();
    link.click();
  }


  function toggleSearch() {
    setIsSearchOpen(!isSearchOpen);
    setSearchText("");
  }

  function toggleThumbnails() {
    setThumbnailsView(!thumbnailsView);
  }

  return (
    <div className="flex flex-col mt-18 md:flex-row items-stretch bg-gray-100 rounded-xl overflow-hidden shadow-2xl w-full max-w-6xl" ref={containerRef}>
      {/* Sidebar (thumbnails or outline) */}
      {thumbnailsView && (
        <div className="w-full md:w-64 bg-gray-800 text-white p-3 flex flex-col">
          <div className="flex justify-between items-center mb-3 border-b border-gray-700 pb-2">
            <h3 className="font-medium">Pages</h3>
            <button 
              onClick={toggleThumbnails} 
              className="p-1 rounded hover:bg-gray-700"
              title="Close thumbnails"
            >
              <X size={18} />
            </button>
          </div>
          <div className="overflow-auto flex-grow space-y-3">
            {thumbnails.map((pageIdx) => (
              <div 
                key={pageIdx} 
                className={`cursor-pointer rounded overflow-hidden ${pageIdx === pageNumber ? 'ring-2 ring-blue-500' : ''}`}
                onClick={() => goToPage(pageIdx)}
              >
                <div className="bg-gray-900 text-xs text-white px-2 py-1">Page {pageIdx}</div>
                <Document file={pdfPath}>
                  <Page 
                    pageNumber={pageIdx} 
                    scale={0.2} 
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                  />
                </Document>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main content area */}
      <div className="flex flex-col flex-grow">
        {/* Top bar */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-600 text-white px-4 py-3 flex justify-between items-center shadow-md">
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleThumbnails}
              className={`p-1.5 rounded-full ${thumbnailsView ? 'bg-blue-500' : 'hover:bg-blue-500'} transition-colors`}
              title="Show thumbnails"
            >
              <BookOpen size={18} />
            </button>
            <h1 className="text-xl font-semibold truncate">{title}</h1>
          </div>
          <div className="flex items-center space-x-2">
            {isSearchOpen ? (
              <div className="relative flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="Search in document..."
                  className="pl-3 pr-8 py-1.5 text-sm text-gray-900 bg-white rounded-full border-none focus:outline-none focus:ring-2 focus:ring-blue-300 w-48 sm:w-56"
                />
                <button 
                  onClick={toggleSearch}
                  className="absolute right-2 text-gray-500 hover:text-gray-700"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <button
                onClick={toggleSearch}
                className="p-1.5 rounded-full hover:bg-blue-500 transition-colors"
                title="Search"
              >
                <Search size={18} />
              </button>
            )}
            <button
              onClick={downloadPDF}
              className="p-1.5 rounded-full hover:bg-blue-500 transition-colors hidden sm:block"
              title="Download PDF"
            >
              <Download size={18} />
            </button>
           
          </div>
        </div>
        
        {/* PDF Display */}
        <div className="relative flex-grow overflow-auto bg-gray-200" ref={pdfContainerRef}>
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 z-10">
              <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
                <p className="mt-4 text-gray-700 font-medium">Loading document...</p>
              </div>
            </div>
          )}
          
          <div className="flex justify-center p-6 min-h-96">
            <Document 
              file={pdfPath} 
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={(error) => {
                console.error("Error loading PDF:", error);
                setIsLoading(false);
              }}
              className="flex justify-center"
              error={
                <div className="flex flex-col items-center justify-center h-64 text-red-500 bg-white p-8 rounded-lg shadow-md">
                  <FileText size={48} className="mb-3" />
                  <p className="text-xl font-semibold">Failed to load PDF</p>
                  <p className="text-sm mt-2 text-gray-600">Please check the file path and try again</p>
                </div>
              }
              noData={
                <div className="flex flex-col items-center justify-center h-64 text-gray-500 bg-white p-8 rounded-lg shadow-md">
                  <FileText size={48} className="mb-3" />
                  <p className="text-xl font-semibold">No PDF file specified</p>
                </div>
              }
            >
              <Page 
                pageNumber={pageNumber} 
                scale={scale}
                rotate={rotation}
                renderTextLayer={true}
                renderAnnotationLayer={true}
                className="shadow-xl"
              />
            </Document>
          </div>

          {/* Large page navigation buttons */}
          <div className="absolute top-1/2 left-4 transform -translate-y-1/2 hidden lg:block">
            <button 
              onClick={previousPage}
              disabled={pageNumber <= 1}
              className="bg-white p-3 rounded-full shadow-md text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              title="Previous page"
            >
              <ArrowLeft size={20} />
            </button>
          </div>
          
          <div className="absolute top-1/2 right-4 transform -translate-y-1/2 hidden lg:block">
            <button 
              onClick={nextPage}
              disabled={!numPages || pageNumber >= numPages}
              className="bg-white p-3 rounded-full shadow-md text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              title="Next page"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="px-4 py-3 bg-white border-t border-gray-200 shadow-inner">
          <div className="flex flex-wrap gap-y-3 justify-between items-center">
            {/* Left side controls */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <button 
                onClick={previousPage}
                disabled={pageNumber <= 1}
                className="p-2 rounded-md text-gray-700 hover:bg-gray-100 disabled:text-gray-300 disabled:hover:bg-transparent transition-colors lg:hidden"
                title="Previous page"
              >
                <ChevronLeft size={20} />
              </button>
              
              <div className="flex items-center">
                <input
                  type="text"
                  value={jumpToPage}
                  onChange={handlePageInputChange}
                  onKeyDown={handlePageInputKeyDown}
                  placeholder={pageNumber.toString()}
                  className="w-14 px-2 py-1.5 text-center border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  aria-label="Page number"
                />
                <span className="px-3 py-1.5 bg-gray-100 border border-l-0 border-gray-300 rounded-r-md whitespace-nowrap">
                  of {numPages || '--'}
                </span>
              </div>
              
              <button 
                onClick={nextPage}
                disabled={!numPages || pageNumber >= numPages}
                className="p-2 rounded-md text-gray-700 hover:bg-gray-100 disabled:text-gray-300 disabled:hover:bg-transparent transition-colors lg:hidden"
                title="Next page"
              >
                <ChevronRight size={20} />
              </button>
            </div>
            
            {/* Right side controls */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <button 
                onClick={zoomOut}
                disabled={scale <= 0.5}
                className="p-2 rounded-md text-gray-700 hover:bg-gray-100 disabled:text-gray-300 disabled:hover:bg-transparent transition-colors"
                title="Zoom out"
              >
                <ZoomOut size={20} />
              </button>
              
              <button
                onClick={resetZoom}
                className="px-3 py-1.5 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 min-w-16 text-center"
              >
                {Math.round(scale * 100)}%
              </button>
              
              <button 
                onClick={zoomIn}
                disabled={scale >= 2.5}
                className="p-2 rounded-md text-gray-700 hover:bg-gray-100 disabled:text-gray-300 disabled:hover:bg-transparent transition-colors"
                title="Zoom in"
              >
                <ZoomIn size={20} />
              </button>
              
              <button 
                onClick={rotateClockwise}
                className="p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors hidden sm:block"
                title="Rotate clockwise"
              >
                <RotateCw size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PDFReader;