document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the input values
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Validate inputs
    if (!email || !password) {
        alert('Please enter both email and password.');
        return;
    }

    // Send POST request to the backend for login
    fetch('http://localhost:5500/login', { // Update the URL if necessary
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Invalid email or password'); // Throw an error if response is not ok
            }
            return response.json(); // Parse the JSON from the response
        })
        .then(data => {
            // Assuming your backend sends back a success message or user data
            localStorage.setItem('loggedIn', true); // Store the login status
            updateNavbar(); // Update the navbar as per your application
            window.location.href = 'index.html'; // Redirect to home page after successful login
        })
        .catch(error => {
            console.error('Error:', error); // Log the error for debugging
            alert(error.message); // Show the error message to the user
        });
});
