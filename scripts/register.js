document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('token')) {
        alert('You are already logged in. Redirecting to the admin panel.');
        window.location.href = 'admin-panel.html'; // Redirect to the admin panel
    }
});
document.getElementById('registerForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const site = document.getElementById('site').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value; // Get confirm password

    // Check if password and confirm password match
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    fetch('https://customer-review-tracking-application-be.onrender.com/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, site, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error);
        } else {
            alert('Registration successful!');
            // Store the token in local storage
            localStorage.setItem('token', data.token);
            // Redirect to the admin panel
            window.location.href = 'admin-panel.html';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    });
});
