// Get DOM elements
const bubble = document.getElementById('review-bubble');
const popup = document.getElementById('review-popup');

const reviewForm = document.getElementById('review-form');

// Function to toggle the visibility of the review popup
bubble.addEventListener('click', () => {
    popup.style.display = (popup.style.display === 'none' || popup.style.display === '') ? 'block' : 'none';
});

window.addEventListener('click', (event) => {
    // Check if the click target is not the popup or the bubble
    if (!bubble.contains(event.target) && !popup.contains(event.target)) {
       popup.style.display = 'none';
    }
});

// Function to fetch five random reviews from the backend without authentication
// function fetchRandomReviews(site) {
//     fetch(`https://customer-review-tracking-application-be.onrender.com/random-reviews?site=${encodeURIComponent(site)}`)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         .then(reviews => {
//             displayReviews(reviews); // Display the reviews on the page
//         })
//         .catch(err => console.error('Error fetching random reviews:', err));
// }

// Function to display fetched reviews
// function displayReviews(reviews) {
//     reviewList.innerHTML = ''; // Clear previous reviews

//     if (reviews.length === 0) {
//         reviewList.innerHTML = '<p>No reviews available.</p>';
//         return;
//     }

//     reviews.forEach(({ name, review }) => {
//         const reviewElement = document.createElement('div');
//         reviewElement.innerHTML = `<strong>${name}:</strong> ${review}`;
//         reviewList.appendChild(reviewElement);
//     });
// }

// Get the current site dynamically
const site = window.location.hostname; // This will get the current site's hostname

// Fetch five random reviews for the current site
// fetchRandomReviews(site);

// Handle form submission
reviewForm.onsubmit = (e) => {
    e.preventDefault(); // Prevent form from refreshing the page

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const review = document.getElementById('review').value;

    const newReview = {
        name,
        email,
        review,
        site // Use the current site for the review
    };

    // Send the new review to the backend (requires authentication)
    const token = localStorage.getItem('token'); // Get token from local storage
    fetch('https://customer-review-tracking-application-be.onrender.com/submit-review', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Include the token in the headers
        },
        body: JSON.stringify(newReview)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Review submitted successfully:', data);
        

        // Add the new review to the list
        const newReviewElement = document.createElement('div');
        newReviewElement.innerHTML = `<strong>${name}:</strong> ${review}`;
        alert("Your message was sent")

        // Clear the form
        reviewForm.reset();
    })
    .catch(err => console.error('Error submitting review:', err));
};
