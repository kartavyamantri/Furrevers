let currentPage = 1;
const limit = 3; // Show 3 pets per page

// Fetch pets data with pagination support
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
                        <img src="./Assets/${pet.species.toLowerCase()}.jpeg" alt="${pet.species.toLowerCase()}">
                        <p>${pet.description}</p>
                        <a class="btn btn-primary adopt-btn" href="#">Adopt Now</a>
                    </div>
                `;
                petsContainer.innerHTML += petCard;
            });

            // Add event listeners for the Adopt Now buttons
            const adoptButtons = document.querySelectorAll('.adopt-btn');
            adoptButtons.forEach(button => {
                button.addEventListener('click', handleAdoptNow);
            });

            // Update pagination controls
            document.getElementById('page-info').textContent = `Page ${data.currentPage} of ${data.totalPages}`;
            document.getElementById('prev-page').disabled = data.currentPage === 1;
            document.getElementById('next-page').disabled = data.currentPage === data.totalPages;
        })
        .catch(err => console.error('Error fetching pets:', err));
}

// Handle Adopt Now button clicks
function handleAdoptNow() {
    if (isLoggedIn()) {
        // If user is logged in, take them to the adoption form
        window.location.href = 'adopt-form.html'; // Replace with actual form URL
    } else {
        // If not logged in, show an alert and redirect to login page
        if (confirm('You need to login or register before adopting a pet. Would you like to login now?')) {
            window.location.href = 'login.html'; // Redirect to login
        }
    }
}

// Check if the user is logged in
function isLoggedIn() {
    return localStorage.getItem('loggedIn') === 'true';
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
