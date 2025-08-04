const mockExtractedData = {
    "Title": "CHEMBINE WCW123",
    "Content": "Advanced chemical injection system for deepwater applications.",
    "Features and benefits": "High precision delivery, corrosion resistant materials, remote monitoring capabilities.",
    "Applications from Blocks": "Offshore drilling, subsea production, well stimulation",
    "SourceFile": "product_datasheet_1.pdf",
    "Offshore drilling": "True",
    "Well stimulation": "True",
    "Pipeline integrity": "False",
    "Subsea production": "True"
};

const mockExtractedData2 = {
    "Title": "FLEX-DRILL 5000",
    "Content": "Flexible drilling motor for complex wellbores.",
    "Features and benefits": "Improves ROP, reduces drilling time, high torque output.",
    "Applications from Blocks": "Directional drilling, horizontal drilling, unconventional reservoirs",
    "SourceFile": "flex-drill_spec.pdf",
    "Directional drilling": "True",
    "Well stimulation": "False",
    "Unconventional reservoirs": "True",
    "Geothermal energy": "True"
};

// Simulate calling your backend to run the Python script
export const processFilesWithPython = async (files) => {
  console.log("Simulating backend processing for:", files);
  // In a real app, you would:
  // 1. Upload files to a server (e.g., using FormData and fetch).
  // 2. An Express.js endpoint would receive the files.
  // 3. The Express endpoint would execute your Python script on the files.
  // 4. The Python script would generate the CSV.
  // 5. The Express endpoint would read the CSV and return its content as JSON.
  await new Promise(resolve => setTimeout(resolve, 4000)); // Simulate processing time
  console.log("Processing complete. Returning mock data.");
  return [mockExtractedData, mockExtractedData2];
};
