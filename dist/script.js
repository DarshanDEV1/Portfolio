document.addEventListener("DOMContentLoaded", function() {
    const pages = document.querySelectorAll(".page");
    
    function showPage(pageId) {
        pages.forEach(page => {
            if (page.id === pageId) {
                page.classList.add("show");
            } else {
                page.classList.remove("show");
            }
        });
    }

    // Initial page load
    showPage("home");

    // Navigation
    const navLinks = document.querySelectorAll("nav a");
    navLinks.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            const targetPageId = this.getAttribute("href").substring(1);
            showPage(targetPageId);
        });
    });
});