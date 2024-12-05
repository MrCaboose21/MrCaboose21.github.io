fetch("Vehicles.xml")
  .then(response => {
    
    if (!response.ok) {
      throw new Error("Failed to fetch XML: " + response.statusText);
    }
    return response.text();
  })
  .then(xmlString => {
    console.log("Fetched XML:", xmlString);  
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "application/xml");

    
    const parserError = xmlDoc.querySelector("parsererror");
    if (parserError) {
      throw new Error("Error parsing XML: " + parserError.textContent);
    }

    
    const vehicles = xmlDoc.querySelectorAll("Vehicle");

    
    if (!vehicles || vehicles.length === 0) {
      console.error("No vehicles found in XML.");
      return;
    }

    const tableBody = document.getElementById("data-table");

    vehicles.forEach(vehicle => {
      const make = vehicle.querySelector("Make").textContent;
      const model = vehicle.querySelector("Model").textContent;
      const year = vehicle.querySelector("Year").textContent;
      const vin = vehicle.querySelector("VIN").textContent;

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