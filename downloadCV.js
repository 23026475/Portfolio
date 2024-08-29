document.querySelector(".Download").addEventListener("click", function() {
    const resumeLink = document.createElement("a");
    resumeLink.href = "cv_merged.pdf"; // Replace with your file URL or generate dynamically
    resumeLink.download = "Resume.pdf"; // Optional: Specify the download file name
    document.body.appendChild(resumeLink);
    resumeLink.click();
    document.body.removeChild(resumeLink); // Cleanup the dynamically created link
});