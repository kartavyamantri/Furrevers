let currentPage = 1;
const limit = 6; // Show 6 pets per page

function fetchPets(page = 1) {
    fetch(`/api/pets?page=${page}&limit=${limit}`)
        .then(response => response.json())
        .then(data => {
            const petsContainer = document.getElementById('pets-container');
            petsContainer.innerHTML = ''; // Clear previous pets

            // Loop through pets and create pet cards dynamically
            data.pets.forEach(pet => {
                const petCard = `
                            <div class="pet">
                                <h3>${pet.name}</h3>
                                <img src="./Assets/${pet.species.toLowerCase()}.jpeg" alt="${pet.name}">
                                <p>${pet.description}</p>
                                <a class="btn btn-primary" href="#">Adopt Now</a>
                            </div>
                        `;
                petsContainer.innerHTML += petCard;
            });

            // Update pagination controls
            document.getElementById('page-info').textContent = `Page ${data.currentPage} of ${data.totalPages}`;
            document.getElementById('prev-page').disabled = data.currentPage === 1;
            document.getElementById('next-page').disabled = data.currentPage === data.totalPages;
        })
        .catch(err => console.error('Error fetching pets:', err));
}

// Event listeners for pagination buttons
document.getElementById('prev-page').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        fetchPets(currentPage);
    }
});

document.getElementById('next-page').addEventListener('click', () => {
    currentPage++;
    fetchPets(currentPage);
});

// Fetch initial page of pets when page loads
document.addEventListener('DOMContentLoaded', () => {
    fetchPets(currentPage);
});