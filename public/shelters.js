document.getElementById('locationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const location = document.getElementById('locationInput').value;
    displayShelters(location);
});

function displayShelters(location) {
    // Sample shelter data
    const shelters = [
        { name: 'Shelter 1', location: 'City A', description: 'A brief description of Shelter 1.' },
        { name: 'Shelter 2', location: 'City B', description: 'A brief description of Shelter 2.' },
        { name: 'Shelter 3', location: 'City C', description: 'A brief description of Shelter 3.' },
    ];

    // Filter shelters based on location (for simplicity, we'll just display all shelters)
    const filteredShelters = shelters; // In real implementation, filter shelters based on actual location

    const sheltersList = document.getElementById('sheltersList');
    sheltersList.innerHTML = ''; // Clear previous results

    filteredShelters.forEach(shelter => {
        const shelterDiv = document.createElement('div');
        shelterDiv.classList.add('shelter');
        shelterDiv.innerHTML = `
            <h3>${shelter.name}</h3>
            <p>Location: ${shelter.location}</p>
            <p>${shelter.description}</p>
        `;
        sheltersList.appendChild(shelterDiv);
    });
}
