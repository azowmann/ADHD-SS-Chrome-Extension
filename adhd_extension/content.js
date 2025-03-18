// Create a container for the video
const videoContainer = document.createElement("div");
videoContainer.className = "video-container";

// Create the video element
const video = document.createElement("video");
video.src = chrome.runtime.getURL("subwaysurfersac.mp4"); // Path to your video file
video.autoplay = true;
video.loop = true;
video.muted = true;

// Append the video to the container
videoContainer.appendChild(video);

// Add the container to the body of the webpage
document.body.appendChild(videoContainer);

// Log the video URL for debugging
console.log("Video URL:", video.src);

// Drag functionality
let isDragging = false;
let offsetX, offsetY;

videoContainer.addEventListener("mousedown", (e) => {
  if (!e.target.classList.contains("resize-handle")) {
    isDragging = true;
    offsetX = e.clientX - videoContainer.getBoundingClientRect().left;
    offsetY = e.clientY - videoContainer.getBoundingClientRect().top;
    videoContainer.style.cursor = "grabbing";
  }
});

document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    videoContainer.style.left = `${e.clientX - offsetX}px`;
    videoContainer.style.top = `${e.clientY - offsetY}px`;
  }
});

document.addEventListener("mouseup", () => {
  isDragging = false;
  videoContainer.style.cursor = "grab";
});

// Resize functionality
const resizeHandle = document.createElement("div");
resizeHandle.className = "resize-handle";
videoContainer.appendChild(resizeHandle);

let isResizing = false;

resizeHandle.addEventListener("mousedown", (e) => {
  isResizing = true;
  e.preventDefault(); // Prevent text selection while resizing
});

document.addEventListener("mousemove", (e) => {
  if (isResizing) {
    const newWidth = e.clientX - videoContainer.getBoundingClientRect().left;
    const newHeight = e.clientY - videoContainer.getBoundingClientRect().top;

    // Set minimum and maximum size constraints
    const minWidth = 100;
    const minHeight = 100;
    const maxWidth = window.innerWidth;
    const maxHeight = window.innerHeight;

    videoContainer.style.width = `${Math.min(Math.max(newWidth, minWidth), maxWidth)}px`;
    videoContainer.style.height = `${Math.min(Math.max(newHeight, minHeight), maxHeight)}px`;
  }
});

document.addEventListener("mouseup", () => {
  isResizing = false;
});