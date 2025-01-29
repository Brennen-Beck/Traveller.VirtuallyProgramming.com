"use strict";
const videoContainer = document.querySelector(".video-content");
const contentOptions = [
    { type: "image", src: "/images/Free Pik Starport One.jpeg" },
    { type: "image", src: "/images/Starship.jpg" },
    { type: "video", src: "/videos/SpaceshipHallway.mp4" },
    { type: "image", src: "/images/Ship in Port.webp" },
    { type: "image", src: "/images/Spaceport.png" }
];
let currentIndex = 0;
// Display the first content immediately
function displayInitialContent() {
    const content = contentOptions[currentIndex];
    videoContainer.classList.add("fade-in");
    if (content.type === "video") {
        const video = document.createElement("video");
        video.src = content.src;
        video.autoplay = true;
        video.muted = true;
        video.loop = true;
        videoContainer.appendChild(video);
    }
    else if (content.type === "image") {
        const img = document.createElement("img");
        img.src = content.src;
        img.alt = "Background image";
        videoContainer.appendChild(img);
    }
}
// Change content with fade-out and fade-in effect
function changeContent() {
    videoContainer.classList.remove("fade-in");
    videoContainer.classList.add("fade-out");
    setTimeout(() => {
        videoContainer.innerHTML = ""; // Clear current content
        currentIndex = (currentIndex + 1) % contentOptions.length; // Cycle through content
        const content = contentOptions[currentIndex];
        if (content.type === "video") {
            const video = document.createElement("video");
            video.src = content.src;
            video.autoplay = true;
            video.muted = true;
            video.loop = true;
            videoContainer.appendChild(video);
        }
        else if (content.type === "image") {
            const img = document.createElement("img");
            img.src = content.src;
            img.alt = "Background image";
            videoContainer.appendChild(img);
        }
        videoContainer.classList.remove("fade-out");
        videoContainer.classList.add("fade-in");
    }, 1500); // Match fade-out duration
}
// Start the slideshow
displayInitialContent();
setInterval(changeContent, 10000);
