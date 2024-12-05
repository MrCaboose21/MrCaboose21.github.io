fetch("Vehicles.json")
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json(); 
  })
  .then(data => {
    console.log("Fetched data:", data);

    
    const vehiclesArray = data.Vehicles;
    if (!Array.isArray(vehiclesArray)) {
      throw new Error("Data is not an array");
    }

    
    const tableBody = document.getElementById("data-table");
    vehiclesArray.forEach(vehicle => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${vehicle.Make}</td>
        <td>${vehicle.Model}</td>
        <td>${vehicle.Year}</td>
        <td>${vehicle.VIN}</td>
      `;
      tableBody.appendChild(row);
    });
  })
  .catch(error => console.error("Error fetching data:", error));