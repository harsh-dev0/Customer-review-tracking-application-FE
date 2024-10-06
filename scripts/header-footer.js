// Function to load the header
function loadHeader() {
    const headerPlaceholder = document.getElementById("header-placeholder");
    const currentPage = window.location.pathname.split("/").pop(); // Get the current page name

    // Check if the current page is not the homepage
    const isHomePage = currentPage === "index.html" || currentPage === ""; // Handle root URL case

    // Determine if the user is logged in by checking for a token in local storage
    const isLoggedIn = localStorage.getItem('token') !== null;

    headerPlaceholder.innerHTML = `
        <header>
            <nav class="nav">
                <a class="logo" href="index.html">Customer Review Tracking Application</a>
                <div class="menu">
                    <ul>
                        ${isHomePage ? '<li><a href="#features">Features</a></li>' : ''} <!-- Show only if not homepage -->
                        ${!isLoggedIn ? '<li><a href="register.html">Sign Up</a></li>' : '<li><a href="admin-panel.html">Admin Panel</a></li>'} <!-- Show only if not logged in -->
                    </ul>
                </div>
            </nav>
        </header>
    `;
}

// Function to load the footer
function loadFooter() {
    const footerPlaceholder = document.getElementById("footer-placeholder");
    footerPlaceholder.innerHTML = `
        <footer>
            <p>&copy; 2024 Customer Review Tracking Application. All rights reserved.</p>
        </footer>
    `;
}

// Check for logged-in status and redirect if needed
document.addEventListener('DOMContentLoaded', () => {
    
        loadHeader();
    
    
    loadFooter();
});
