// Utility functions for resume actions

// Function to save the resume
export const saveResume = (resumeData: any) => {
    try {
      // Save to localStorage for now
      localStorage.setItem("savedResume", JSON.stringify(resumeData))
      return true
    } catch (error) {
      console.error("Error saving resume:", error)
      return false
    }
  }
  
  // Function to preview the resume in a new tab
  export const previewResume = () => {
    // Get the resume content
    const resumeContent = document.getElementById("resume-preview-content")
  
    if (!resumeContent) {
      alert("Resume content not found")
      return false
    }
  
    // Open a new window
    const previewWindow = window.open("", "_blank", "width=800,height=600,scrollbars=yes")
  
    if (!previewWindow) {
      alert("Please allow pop-ups to preview your resume")
      return false
    }
  
    // Write the resume content to the new window
    previewWindow.document.write("<html><head><title>Resume Preview</title>")
    previewWindow.document.write("<style>")
    previewWindow.document.write(`
      body { 
        font-family: Arial, sans-serif;
        padding: 20px;
        max-width: 800px;
        margin: 0 auto;
        background-color: white;
        color: black;
      }
      h1, h2, h3 { margin-top: 0; }
      .text-center { text-align: center; }
      .mb-6 { margin-bottom: 1.5rem; }
      .mb-2 { margin-bottom: 0.5rem; }
      .mb-1 { margin-bottom: 0.25rem; }
      .mt-1 { margin-top: 0.25rem; }
      .text-sm { font-size: 0.875rem; }
      .text-2xl { font-size: 1.5rem; }
      .text-lg { font-size: 1.125rem; }
      .font-bold { font-weight: bold; }
      .font-semibold { font-weight: 600; }
      .font-medium { font-weight: 500; }
      .border-b { border-bottom: 1px solid #e2e8f0; }
      .pb-1 { padding-bottom: 0.25rem; }
      .flex { display: flex; }
      .justify-between { justify-content: space-between; }
      .items-start { align-items: flex-start; }
      .flex-wrap { flex-wrap: wrap; }
      .justify-center { justify-content: center; }
      .gap-x-4 { column-gap: 1rem; }
      .gap-2 { gap: 0.5rem; }
      .space-y-4 > * + * { margin-top: 1rem; }
      .rounded-full { border-radius: 9999px; }
      .px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
      .py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
      .bg-gray-100 { background-color: #f3f4f6; }
      .text-gray-500 { color: #6b7280; }
      .text-gray-600 { color: #4b5563; }
      .ml-1 { margin-left: 0.25rem; }
    `)
    previewWindow.document.write("</style></head><body>")
    previewWindow.document.write(resumeContent.innerHTML)
    previewWindow.document.write("</body></html>")
    previewWindow.document.close()
  
    return true
  }
  
  // Function to download the resume as PDF
  export const downloadAsPDF = () => {
    // Get the resume content
    const resumeContent = document.getElementById("resume-preview-content")
  
    if (!resumeContent) {
      alert("Resume content not found")
      return false
    }
  
    // Open a new window
    const printWindow = window.open("", "", "height=600,width=800")
  
    if (!printWindow) {
      alert("Please allow pop-ups to download your resume")
      return false
    }
  
    // Write the resume content to the new window
    printWindow.document.write("<html><head><title>Resume</title>")
    printWindow.document.write("<style>")
    printWindow.document.write(`
      body { 
        font-family: Arial, sans-serif;
        padding: 20px;
        max-width: 800px;
        margin: 0 auto;
      }
      h1, h2, h3 { margin-top: 0; }
      .text-center { text-align: center; }
      .mb-6 { margin-bottom: 1.5rem; }
      .mb-2 { margin-bottom: 0.5rem; }
      .mb-1 { margin-bottom: 0.25rem; }
      .mt-1 { margin-top: 0.25rem; }
      .text-sm { font-size: 0.875rem; }
      .text-2xl { font-size: 1.5rem; }
      .text-lg { font-size: 1.125rem; }
      .font-bold { font-weight: bold; }
      .font-semibold { font-weight: 600; }
      .font-medium { font-weight: 500; }
      .border-b { border-bottom: 1px solid #e2e8f0; }
      .pb-1 { padding-bottom: 0.25rem; }
      .flex { display: flex; }
      .justify-between { justify-content: space-between; }
      .items-start { align-items: flex-start; }
      .flex-wrap { flex-wrap: wrap; }
      .justify-center { justify-content: center; }
      .gap-x-4 { column-gap: 1rem; }
      .gap-2 { gap: 0.5rem; }
      .space-y-4 > * + * { margin-top: 1rem; }
      .rounded-full { border-radius: 9999px; }
      .px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
      .py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
      .bg-gray-100 { background-color: #f3f4f6; }
      .text-gray-500 { color: #6b7280; }
      .text-gray-600 { color: #4b5563; }
      .ml-1 { margin-left: 0.25rem; }
      @media print {
        body { -webkit-print-color-adjust: exact; }
      }
    `)
    printWindow.document.write("</style></head><body>")
    printWindow.document.write(resumeContent.innerHTML)
    printWindow.document.write("</body></html>")
    printWindow.document.close()
  
    // Wait for content to load before printing
    printWindow.onload = () => {
      printWindow.focus()
      printWindow.print()
      printWindow.close()
    }
  
    return true
  }
  
  