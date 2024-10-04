// Listen for the form submission event
document.getElementById('registerForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Get form data
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Validate email and password
    if (!email || !password) {
        alert('Please fill out both fields.');
        return;
    }

    // Send POST request to the backend
    fetch('http://localhost:5500/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
        .then(response => {
            // Check if the response is ok (status in the range 200-299)
            if (!response.ok) {
                return response.json().then(err => {
                    // Log the error message returned from the server
                    throw new Error(err.message || 'Failed to register.');
                });
            }
            return response.json(); // Parse response if successful
        })
        .then(data => {
            console.log('Success:', data);
            alert('Registration successful!'); // Show success message
            window.location.href = 'login.html'; // Redirect to login page
        })
        .catch(error => {
            console.error('Error:', error); // Log any errors that occur
            alert('Error registering user: ' + error.message);
        });
});
