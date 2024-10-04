function updateNavbar() {
    const loginLink = document.getElementById('login-link');
    const registerLink = document.getElementById('register-link'); // Add reference to the Register link
    if (!loginLink) return; // Ensure the login link exists

    // Check if the user is logged in
    if (localStorage.getItem('loggedIn') === 'true') {
        loginLink.textContent = 'Logout';
        loginLink.href = '#'; // Set to '#' since it's handled by onclick
        loginLink.onclick = function () {
            localStorage.removeItem('loggedIn'); // Clear the login status
            updateNavbar(); // Update the navbar
            window.location.href = 'index.html'; // Redirect to home page after logout
        };

        // Hide the Register link when logged in
        if (registerLink) {
            registerLink.style.display = 'none'; // Hide the Register link
        }
    } else {
        loginLink.textContent = 'Login';
        loginLink.href = 'login.html'; // Redirect to login page
        loginLink.onclick = null; // Reset the onclick function

        // Show the Register link when not logged in
        if (registerLink) {
            registerLink.style.display = 'block'; // Show the Register link
        }
    }
}

// Update the navbar when the page loads
document.addEventListener('DOMContentLoaded', updateNavbar);
