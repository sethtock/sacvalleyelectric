// Component Loader - Injects reusable components into pages
async function loadComponent(selector, filePath) {
    try {
        const response = await fetch(filePath);
        const html = await response.text();
        const element = document.querySelector(selector);
        if (element) {
            element.innerHTML = html;
            // Re-initialize hamburger menu after header is loaded
            if (selector === '[data-component="header"]') {
                initHamburgerMenu();
            }
        }
    } catch (error) {
        console.error(`Failed to load component from ${filePath}:`, error);
    }
}

// Initialize hamburger menu toggle
function initHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        // Close menu when a link is clicked
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    } else {
        console.warn('Hamburger menu elements not found');
    }
}

// Load all components when DOM is ready
document.addEventListener('DOMContentLoaded', async function() {
    await loadComponent('[data-component="header"]', 'components/header.html');
    await loadComponent('[data-component="footer"]', 'components/footer.html');
});
