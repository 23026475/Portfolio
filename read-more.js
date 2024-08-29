document.querySelectorAll('.readMore').forEach(button => {
    button.addEventListener('click', () => {
        const siteDescription = button.parentElement;
        siteDescription.classList.toggle('expanded');

        if (siteDescription.classList.contains('expanded')) {
            button.textContent = "Show Less";
        } else {
            button.textContent = "Read More";
        }
    });
});