const video = document.getElementById("video");

// Access the system camera
navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
        // Assign the camera stream to the video element
        video.srcObject = stream;
        video.play();
    })
    .catch((err) => {
        console.error("Error accessing camera:", err);
    });
