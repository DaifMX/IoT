// document.addEventListener("DOMContentLoaded", function() {
    // DROPDOWN FUNCTIONS
    function toggleDropdown(element) {
        closeAllDropdowns(); // Close other open dropdowns
        element.nextElementSibling.classList.toggle("show");
    }

    function closeAllDropdowns() {
        const dropdowns = document.getElementsByClassName("dropdown-content");
        for (const dropdown of dropdowns) {
            dropdown.classList.remove("show");
        }
    }

    // Event listeners for dropdown buttons
    const dropdownButtons = document.getElementsByClassName("dropdown-btn");
    for (const button of dropdownButtons) {
        button.addEventListener("click", function(event) {
            event.stopPropagation(); // Prevent click from propagating to window
            toggleDropdown(this);
        });
    }

    // POP UP FUNCTIONS
    const modal = document.getElementById("modal");
    const addButton = document.getElementById("addButton");
    const closeModalButton = document.getElementById("closeModal");

    function openModal() {
        modal.style.display = "block";
    }

    function closeModal() {
        modal.style.display = "none";
    }

    // Open modal on add button click
    addButton.addEventListener("click", function(event) {
        event.stopPropagation();
        openModal();
    });

    // Close modal when clicking the close button
    closeModalButton.addEventListener("click", function(event) {
        event.stopPropagation();
        closeModal();
    });

    // Close modal if clicking outside of the modal content
    modal.addEventListener("click", function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Close all dropdowns if clicking outside of them
    window.addEventListener("click", function(event) {
        if (!event.target.matches(".dropdown-btn")) {
            closeAllDropdowns();
        }
    });
// });
