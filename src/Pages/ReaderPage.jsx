import React from 'react'
import { pdfjs } from 'react-pdf';
import PDFReader from '../Components/PDFReader';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

function ReaderPage({
  path='/batman.pdf',
  title='Batman'
}) {
  return (
    <PDFReader 
        pdfPath={path}
        title={title}
      />
  )
}

export default ReaderPage