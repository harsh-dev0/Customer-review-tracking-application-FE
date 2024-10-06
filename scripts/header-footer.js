// header-footer.js

// Function to load the header
function loadHeader() {
  const headerPlaceholder = document.getElementById("header-placeholder");
  const currentPage = window.location.pathname.split("/").pop(); // Get the current page name

  // Check if the current page is not the homepage
  const isHomePage = currentPage === "index.html" || currentPage === ""; // Handle root URL case

  headerPlaceholder.innerHTML = `
      <header>
          <nav class="nav">
              <a class="logo" href="index.html">Customer Review Tracking Application</a>
              <div class="menu">
                  <ul>
                      
                      ${isHomePage ? '<li><a href="#features">Features</a></li>' : ''} <!-- Show only if not homepage -->
                      <li><a href="register.html">Sign Up</a></li>
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

// Load header and footer when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  loadHeader();
  loadFooter();
});
