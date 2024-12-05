// Fetch data from the XML file
fetch("Vehicles.xml")
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.text(); // Get the raw XML text
  })
  .then(xmlString => {
    console.log("Fetched XML:", xmlString); // Debugging log

    // Parse the XML string into an XML Document
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "application/xml");

    // Check for parsing errors
    const parserError = xmlDoc.querySelector("parsererror");
    if (parserError) {
      throw new Error("Error parsing XML");
    }

    // Get the list of <Vehicle> elements
    const vehicles = xmlDoc.querySelectorAll("Vehicle");

    // Reference to the table body
    const tableBody = document.getElementById("data-table");

    // Loop through each <Vehicle> element and extract data
    vehicles.forEach(vehicle => {
      const make = vehicle.querySelector("Make").textContent;
      const model = vehicle.querySelector("Model").textContent;
      const year = vehicle.querySelector("Year").textContent;
      const vin = vehicle.querySelector("VIN").textContent;

      // Create a new table row
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${make}</td>
        <td>${model}</td>
        <td>${year}</td>
        <td>${vin}</td>
      `;

      // Append the row to the table body
      tableBody.appendChild(row);
    });
  })
  .catch(error => console.error("Error fetching or processing XML:", error));