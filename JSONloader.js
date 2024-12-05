// Fetch data from a mock API

fetch("Vehicles.json")

.then(response => response.json())

.then(data => {

const tableBody = document.getElementById('data-table');

data.forEach(Vechicles => {

const row = document.createElement('tr');

row.innerHTML = `

<td>${Vechicles.Make}</td>

<td>${Vechicles.Model}</td>

<td>${Vechicles.Year}</td>

<td>${Vechicles.VIN}</td>

`;

tableBody.appendChild(row);

});

})

.catch(error => console.error('Error fetching data:', error));