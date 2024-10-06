// Check if the user is already authenticated when the page loads
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('token')) {
        alert('You are already logged in. Redirecting to the admin panel.');
        window.location.href = 'admin-panel.html'; // Redirect to the admin panel
    }
});

// Handle the login form submission
document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const site = document.getElementById('site').value; // Make sure to have an input for site in your form
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('https://customer-review-tracking-application-be.onrender.com/authenticate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, site, password }),
        });

        const data = await response.json();
        if (response.ok) {
            // Store token and site in local storage
            localStorage.setItem('token', data.token);
            localStorage.setItem('site', site); // Use the site variable correctly
            alert('Login successful!');
            window.location.href = 'admin-panel.html'; // Redirect to the admin panel
        } else {
            alert(`Error: ${data.error}`);
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred. Please try again.');
    }
});
