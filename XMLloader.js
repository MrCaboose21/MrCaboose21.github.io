fetch("Vehicles.xml")
  .then(response => {
    // Check if the response is OK (status code 200)
    if (!response.ok) {
      throw new Error("Failed to fetch XML: " + response.statusText);
    }
    return response.text();
  })
  .then(xmlString => {
    console.log("Fetched XML:", xmlString);  // Log the raw XML content

    // Parse the XML string into an XML Document
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "application/xml");

    // Check for parsing errors
    const parserError = xmlDoc.querySelector("parsererror");
    if (parserError) {
      throw new Error("Error parsing XML: " + parserError.textContent);
    }

    // Get the list of <Vehicle> elements
    const vehicles = xmlDoc.querySelectorAll("Vehicle");

    // Check if vehicles data is available
    if (!vehicles || vehicles.length === 0) {
      console.error("No vehicles found in XML.");
      return;
    }

    // Reference to the table body
    const tableBody = document.getElementById("data-table");

    // Loop through each <Vehicle> element and extract data
    vehicles.forEach(vehicle => {
      const make = vehicle.querySelector("Make").textContent;
      const model = vehicle.querySelector("Model").textContent;
      const year = vehicle.querySelector("Year").textContent;
      const vin = vehicle.querySelector("VIN").textContent;

      // Add a new row to the table
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${make}</td>
        <td>${model}</td>
        <td>${year}</td>
        <td>${vin}</td>
      `;
      tableBody.appendChild(row);
    });
  })
  .catch(error => console.error("Error fetching or processing XML:", error));