const reviewsList = document.getElementById('reviews-list');

// Function to check if the user is authenticated
function isAuthenticated() {
    return localStorage.getItem('token') !== null; // Adjust based on your auth mechanism
}

// Redirect to login if not authenticated
function checkAuthentication() {
    if (!isAuthenticated()) {
        alert('You are not authenticated. Redirecting to the login page.');
        window.location.href = 'login.html'; // Change to your login page
    }
}

// Fetch reviews from the server
function fetchReviews() {
    const site = localStorage.getItem('site'); // Get the site from local storage
    const token = localStorage.getItem('token'); // Retrieve the token from local storage
    console.log(site);

    fetch(`https://customer-review-tracking-application-be.onrender.com/reviews?site=${encodeURIComponent(site)}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}` // Include the token in the authorization header
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(reviews => {
            displayReviews(reviews);
        })
        .catch(error => {
            console.error('Error fetching reviews:', error);
            reviewsList.innerHTML = '<p>Error fetching reviews. Please try again later.</p>';
        });
}

// Function to display reviews on the page
function displayReviews(reviews) {
    reviewsList.innerHTML = ''; // Clear previous reviews

    if (!Array.isArray(reviews) || reviews.length === 0) {
        reviewsList.innerHTML = '<p>No reviews available.</p>'; // Display message if no reviews
        return;
    }

    reviews.forEach(review => {
        const reviewElement = document.createElement('div');
        reviewElement.className = 'review';
        reviewElement.innerHTML = 
            `<p><strong>${review.name}</strong> (${review.email})</p>
            <p>${review.review}</p>
            <p><em>${new Date(review.timestamp).toLocaleString()}</em></p>
            <button class="delete-button" data-email="${review.email}" data-timestamp="${review.timestamp}">Delete</button>
            <hr>`;
        reviewsList.appendChild(reviewElement);
    });

    // Attach event listeners to delete buttons
    const deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach(button => {
        button.addEventListener('click', deleteReview);
    });
}

// Function to delete a review
function deleteReview(event) {
    event.preventDefault();
    const email = event.target.getAttribute('data-email');
    const timestamp = event.target.getAttribute('data-timestamp');

    const confirmation = confirm('Are you sure you want to delete this review?');

    if (confirmation) {
        const token = localStorage.getItem('token'); // Retrieve the token from local storage

        fetch(`https://customer-review-tracking-application-be.onrender.com/deleteReview?email=${encodeURIComponent(email)}&timestamp=${encodeURIComponent(timestamp)}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}` // Include the token in the authorization header
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            alert(data.message);
            fetchReviews(); // Refresh the reviews list
        })
        .catch(error => {
            console.error('Error deleting review:', error);
            alert('Error deleting review. Please try again.');
        });
    }
}

function logout() {
    // Clear the token from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('site'); // Optional: clear site if you want to reset it
    alert('You have been logged out. Redirecting to the login page.');
    window.location.href = 'login.html'; // Redirect to your login page
}

// Attach the logout function to the button
document.getElementById('logout-button').addEventListener('click', logout);

// Initial checks and fetch of reviews
checkAuthentication(); // Check if user is authenticated
fetchReviews(); // Fetch the reviews
